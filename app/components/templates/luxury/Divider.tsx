import React from "react";

interface DividerProps {
  className?: string;
}

export default function Divider({ className = "" }: DividerProps) {
  return (
    <div className={`flex items-center justify-center py-16 ${className}`}>
      <div className="flex items-center gap-4">
        <span className="w-16 h-px bg-gradient-to-r from-transparent to-primary/40" />
        <span className="w-2 h-2 border border-primary/40 rotate-45" />
        <span className="w-16 h-px bg-gradient-to-l from-transparent to-primary/40" />
      </div>
    </div>
  );
}
