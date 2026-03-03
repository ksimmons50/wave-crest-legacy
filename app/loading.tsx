export default function Loading() {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-8 animate-pulse bg-background">
        {/* Navigation Bar Skeleton */}
        <div className="mb-8 flex justify-between items-center">
          <div className="h-8 w-32 bg-muted rounded" />
          <div className="hidden md:flex gap-4">
            <div className="h-8 w-20 bg-muted/70 rounded" />
            <div className="h-8 w-20 bg-muted/70 rounded" />
            <div className="h-8 w-20 bg-muted/70 rounded" />
            <div className="h-8 w-20 bg-muted/70 rounded" />
          </div>
          <div className="md:hidden h-8 w-8 bg-muted/70 rounded" />
        </div>

        {/* Hero Section Skeleton */}
        <div className="mb-12">
          <div className="h-96 bg-gradient-to-br from-secondary to-muted rounded-xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/30 to-transparent animate-[shimmer_2s_infinite]" 
                 style={{ backgroundSize: '200% 100%' }} />
            {isDev && (
              <div className="text-center z-10">
                <div className="h-12 w-48 md:w-64 bg-muted rounded-lg mb-4 mx-auto" />
                <div className="h-6 w-32 md:w-48 bg-muted rounded mb-6 mx-auto" />
                <div className="h-12 w-32 bg-primary/30 rounded-lg mx-auto" />
              </div>
            )}
          </div>
        </div>

        {/* Features Section Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card rounded-lg p-6 shadow-sm border border-border">
              <div className="h-12 w-12 bg-muted rounded-lg mb-4" />
              <div className="h-6 w-3/4 bg-muted rounded mb-2" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted/70 rounded" />
                <div className="h-4 w-5/6 bg-muted/70 rounded" />
                <div className="h-4 w-4/6 bg-muted/70 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Content Section Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
          <div className="h-64 bg-muted/70 rounded-lg" />
          <div>
            <div className="h-8 w-3/4 bg-muted rounded mb-4" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-muted/70 rounded" />
              <div className="h-4 w-5/6 bg-muted/70 rounded" />
              <div className="h-4 w-full bg-muted/70 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Loading Status Indicator */}
      {isDev ? (
        // Dev mode: Detailed message card
        <div className="fixed bottom-4 left-4 right-4 md:bottom-8 md:left-1/2 md:transform md:-translate-x-1/2 md:right-auto bg-card rounded-lg shadow-xl px-4 py-3 md:px-6 md:py-4 border border-border md:max-w-lg z-50">
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="flex space-x-1 flex-shrink-0">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <div className="min-w-0">
              <div className="text-foreground font-medium text-sm md:text-base">
                Building your website
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">
                This may take a few seconds on first load
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Production mode: Minimal dots only
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      )}
    </>
  );
}

