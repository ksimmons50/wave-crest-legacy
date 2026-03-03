import { NextResponse } from 'next/server';

// Mark as dynamic to exclude from static export builds
export const dynamic = 'force-dynamic';

interface ContainerStats {
  cpu_stats: {
    cpu_usage: {
      total_usage: number;
    };
    system_cpu_usage: number;
    online_cpus: number;
  };
  precpu_stats: {
    cpu_usage: {
      total_usage: number;
    };
    system_cpu_usage: number;
  };
  memory_stats: {
    usage: number;
    limit: number;
  };
}

interface StatsResponse {
  cpu_percent: number | null;
  memory_percent: number | null;
  memory_used_mb: number | null;
  memory_limit_mb: number | null;
  source: 'ecs_metadata' | 'node_process' | 'unavailable';
  timestamp: string;
}

// Calculate CPU percentage from Docker/ECS stats
function calculateCpuPercent(stats: ContainerStats): number | null {
  try {
    const cpuDelta = stats.cpu_stats.cpu_usage.total_usage - stats.precpu_stats.cpu_usage.total_usage;
    const systemDelta = stats.cpu_stats.system_cpu_usage - stats.precpu_stats.system_cpu_usage;
    
    if (systemDelta > 0 && cpuDelta > 0) {
      const cpuPercent = (cpuDelta / systemDelta) * stats.cpu_stats.online_cpus * 100;
      return Math.round(cpuPercent * 100) / 100;
    }
  } catch {
    // Ignore calculation errors
  }
  return null;
}

// Calculate memory percentage
function calculateMemoryPercent(stats: ContainerStats): { percent: number | null; usedMb: number | null; limitMb: number | null } {
  try {
    const usage = stats.memory_stats.usage;
    const limit = stats.memory_stats.limit;
    
    if (limit > 0) {
      return {
        percent: Math.round((usage / limit) * 10000) / 100,
        usedMb: Math.round(usage / 1024 / 1024),
        limitMb: Math.round(limit / 1024 / 1024),
      };
    }
  } catch {
    // Ignore calculation errors
  }
  return { percent: null, usedMb: null, limitMb: null };
}

// Try to get stats from ECS Task Metadata endpoint (available on Fargate)
async function getEcsStats(): Promise<StatsResponse | null> {
  const metadataUri = process.env.ECS_CONTAINER_METADATA_URI_V4;
  
  if (!metadataUri) {
    return null;
  }

  try {
    const response = await fetch(`${metadataUri}/task/stats`, {
      signal: AbortSignal.timeout(2000),
    });
    
    if (!response.ok) {
      return null;
    }
    
    const allStats = await response.json();
    
    // Get the first container's stats (usually the main app container)
    const containerIds = Object.keys(allStats);
    const firstContainerId = containerIds[0];
    if (!firstContainerId) {
      return null;
    }
    
    // Find the main container (usually not the sidecar/log router)
    const mainContainerStats = allStats[firstContainerId] as ContainerStats;
    
    const cpuPercent = calculateCpuPercent(mainContainerStats);
    const memoryInfo = calculateMemoryPercent(mainContainerStats);
    
    return {
      cpu_percent: cpuPercent,
      memory_percent: memoryInfo.percent,
      memory_used_mb: memoryInfo.usedMb,
      memory_limit_mb: memoryInfo.limitMb,
      source: 'ecs_metadata',
      timestamp: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

// Fallback: get Node.js process stats
function getNodeProcessStats(): StatsResponse {
  const memUsage = process.memoryUsage();
  const heapUsedMb = Math.round(memUsage.heapUsed / 1024 / 1024);
  const heapTotalMb = Math.round(memUsage.heapTotal / 1024 / 1024);
  
  return {
    cpu_percent: null, // Can't easily get CPU in Node without interval measurement
    memory_percent: heapTotalMb > 0 ? Math.round((heapUsedMb / heapTotalMb) * 100) : null,
    memory_used_mb: heapUsedMb,
    memory_limit_mb: heapTotalMb,
    source: 'node_process',
    timestamp: new Date().toISOString(),
  };
}

export async function GET() {
  // Try ECS metadata first (real container stats)
  const ecsStats = await getEcsStats();
  
  if (ecsStats) {
    return NextResponse.json(ecsStats);
  }
  
  // Fallback to Node process stats (less accurate but always available)
  const nodeStats = getNodeProcessStats();
  return NextResponse.json(nodeStats);
}
