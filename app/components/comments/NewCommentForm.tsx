'use client';

import { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { CommentPosition } from './types';

interface NewCommentFormProps {
  position: CommentPosition;
  onSubmit: (body: string) => void;
  onCancel: () => void;
}

const FORM_WIDTH = 288; // w-72
const PADDING = 8;

export function NewCommentForm({ position, onSubmit, onCancel }: NewCommentFormProps) {
  const [body, setBody] = useState('');
  const [leftPos, setLeftPos] = useState(position.x + 16);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const adjustHeight = () => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
    
    const viewportWidth = document.documentElement.clientWidth;
    const clickX = position.x - window.scrollX;
    
    // Clamp position to stay within viewport
    const idealLeft = clickX + 16;
    const maxLeft = viewportWidth - FORM_WIDTH - PADDING;
    const minLeft = PADDING;
    
    setLeftPos(Math.max(minLeft, Math.min(idealLeft, maxLeft)) + window.scrollX);
  }, [position.x]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        onCancel();
      }
    };

    // Delay adding listener to avoid immediate close from the click that opened the form
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onCancel]);

  const handleSubmit = () => {
    if (body.trim()) {
      onSubmit(body.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div
      ref={formRef}
      className="absolute z-[9999] w-72"
      style={{ left: leftPos, top: position.y - 8, fontFamily: 'system-ui, -apple-system, sans-serif' }}
      data-comment-ui
    >
      <div 
        className="rounded-lg shadow-2xl border overflow-hidden flex"
        style={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0' }}
      >
        <textarea
          ref={inputRef}
          value={body}
          onChange={(e) => { setBody(e.target.value); adjustHeight(); }}
          onKeyDown={handleKeyDown}
          placeholder={"Add a comment..."}
          rows={2}
          className="flex-1 px-3 py-2 text-sm resize-none focus:outline-none"
          style={{ color: '#334155', backgroundColor: '#ffffff', maxHeight: 200, overflowY: 'auto' }}
        />
        <button
          onClick={handleSubmit}
          disabled={!body.trim()}
          className="px-3 hover:bg-violet-50 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
          style={{ color: '#7c3aed' }}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
