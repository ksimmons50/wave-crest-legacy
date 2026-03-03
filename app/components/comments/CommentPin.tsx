'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { MessageCircle, Check } from 'lucide-react';
import { Comment } from './types';

interface CommentPinProps {
  comment: Comment;
  isActive: boolean;
  onClick: () => void;
  onResolve: () => void;
}

const POPUP_WIDTH = 256; // w-64
const PADDING = 8;

export function CommentPin({ comment, isActive, onClick, onResolve }: CommentPinProps) {
  const [position, setPosition] = useState<{ left: number; top: number } | null>(null);
  const [showOnLeft, setShowOnLeft] = useState(false);
  const pinRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(() => {
    try {
      const element = document.querySelector(comment.elementSelector);
      if (!element) {
        setPosition(null);
        return;
      }

      const rect = element.getBoundingClientRect();
      const pinX = rect.left + rect.width * comment.offsetX;
      
      // Check if popup would overflow right edge
      const viewportWidth = document.documentElement.clientWidth;
      setShowOnLeft(pinX + POPUP_WIDTH + 36 > viewportWidth - PADDING);
      
      setPosition({
        left: rect.left + window.scrollX + rect.width * comment.offsetX,
        top: rect.top + window.scrollY + rect.height * comment.offsetY,
      });
    } catch {
      setPosition(null);
    }
  }, [comment.elementSelector, comment.offsetX, comment.offsetY]);

  useEffect(() => {
    updatePosition();
    
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    const interval = setInterval(updatePosition, 1000);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
      clearInterval(interval);
    };
  }, [updatePosition]);

  if (!position) return null;

  return (
    <div
      ref={pinRef}
      className="absolute z-[9998] transform -translate-x-1/2 -translate-y-1/2 group"
      style={{ left: position.left, top: position.top }}
      data-comment-ui
    >
      <button
        onClick={onClick}
        className={`
          w-7 h-7 rounded-full flex items-center justify-center
          shadow-md transition-all duration-200
          ${comment.resolved 
            ? 'bg-emerald-500 opacity-50 hover:opacity-100' 
            : 'bg-violet-600 hover:scale-110'
          }
          ${isActive ? 'ring-2 ring-violet-300 scale-110' : ''}
        `}
      >
        <MessageCircle className="w-3.5 h-3.5" style={{ color: '#ffffff' }} />
      </button>

      {/* Hover preview - minimal */}
      {!isActive && (
        <div className={`absolute top-1/2 -translate-y-1/2 hidden group-hover:block pointer-events-none z-[9999] ${showOnLeft ? 'right-9' : 'left-9'}`}>
          <div 
            className="text-xs px-2 py-1 rounded shadow-lg max-w-[200px] truncate"
            style={{ backgroundColor: '#1e293b', color: '#ffffff', fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            {comment.body}
          </div>
        </div>
      )}

      {/* Expanded view - clean */}
      {isActive && (
        <div 
          className={`absolute top-1/2 -translate-y-1/2 w-64 rounded-lg shadow-xl border z-[9999] ${showOnLeft ? 'right-9' : 'left-9'}`}
          style={{ backgroundColor: '#ffffff', borderColor: '#f1f5f9', fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          <div className="p-3 text-sm leading-relaxed" style={{ color: '#334155' }}>
            {comment.body}
          </div>
          <div className="px-3 pb-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onResolve();
              }}
              className="text-xs flex items-center gap-1 transition-colors"
              style={{ color: comment.resolved ? '#059669' : '#94a3b8' }}
            >
              <Check className="w-3 h-3" />
              {comment.resolved ? 'Resolved' : 'Resolve'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
