'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { X, Sparkles, Check, Info } from 'lucide-react';
import { CommentPosition } from './types';
import { useComments } from './useComments';
import { getElementSelector, findAnchorElement, getSourceMeta } from './utils';
import { CommentPin } from './CommentPin';
import { NewCommentForm } from './NewCommentForm';

export default function CommentOverlay() {
  const { comments, addComment, toggleResolved } = useComments();
  const [commentMode, setCommentMode] = useState(false);
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const [newCommentPosition, setNewCommentPosition] = useState<CommentPosition | null>(null);
  const [showComments, setShowComments] = useState(true);
  const [sendStatus, setSendStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [viewAllComments, setViewAllComments] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const unresolvedComments = comments.filter(c => !c.resolved);
  const unresolvedCount = unresolvedComments.length;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('view_comments') === 'true') {
        setViewAllComments(true);
        setShowComments(true);
      }
      if (params.get('comment_mode') === 'true') {
        setCommentMode(true);
        setShowComments(true);
      }
    }
  }, []);

  const handleApplyComments = useCallback(() => {
    if (unresolvedCount === 0 || sendStatus !== 'idle') return;
    
    setSendStatus('sending');
    setIsPreviewOpen(false);
    
    const isInIframe = typeof window !== 'undefined' && window.parent !== window;
    if (isInIframe) {
      window.parent.postMessage({ type: 'workOnComments' }, '*');
    } else {
      const summary = unresolvedComments.map(c => 
        `- [${c.source?.file || c.elementSelector}${c.source?.line ? `:${c.source.line}` : ''}] ${c.body}`
      ).join('\n');
      console.log('[Comments] Unresolved comments:\n' + summary);
      navigator.clipboard?.writeText(summary).catch(() => {});
    }
    
    setTimeout(() => {
      setSendStatus('sent');
      setTimeout(() => setSendStatus('idle'), 1800);
    }, 1200);
  }, [unresolvedCount, unresolvedComments, sendStatus]);

  // Handle click in comment mode
  const handleOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.tagName === 'BUTTON') {
      return;
    }

    const overlay = e.currentTarget;
    overlay.style.pointerEvents = 'none';
    const elementUnder = document.elementFromPoint(e.clientX, e.clientY);
    overlay.style.pointerEvents = 'auto';
    
    if (!elementUnder) return;

    const anchorElement = findAnchorElement(elementUnder);
    const rect = anchorElement.getBoundingClientRect();
    const selector = getElementSelector(anchorElement);
    const source = getSourceMeta(anchorElement);

    const offsetX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const offsetY = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

    setNewCommentPosition({
      x: e.clientX + window.scrollX,
      y: e.clientY + window.scrollY,
      selector,
      offsetX,
      offsetY,
      source,
    });
    setCommentMode(false);
  }, []);

  // Handle creating a new comment
  const handleCreateComment = useCallback((body: string) => {
    if (!newCommentPosition) return;

    const newComment = addComment({
      selector: newCommentPosition.selector,
      offsetX: newCommentPosition.offsetX,
      offsetY: newCommentPosition.offsetY,
      body,
      source: newCommentPosition.source,
    });

    setNewCommentPosition(null);
    setActiveCommentId(newComment.id);
    setCommentMode(true);
  }, [newCommentPosition, addComment]);

  // Click outside to close active comment and preview
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as Element).closest('[data-comment-ui]')) {
        setActiveCommentId(null);
        setIsPreviewOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape to exit modes
      if (e.key === 'Escape') {
        setCommentMode(false);
        setNewCommentPosition(null);
        setActiveCommentId(null);
        setIsPreviewOpen(false);
      }
      
      // Cmd/Ctrl + K to toggle comment mode
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (commentMode) {
          setCommentMode(false);
        } else {
          setCommentMode(true);
          setShowComments(true);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [commentMode]);

  // Listen for messages from parent iframe
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'enterCommentMode') {
        setCommentMode(true);
        setShowComments(true);
      } else if (e.data?.type === 'exitCommentMode') {
        setCommentMode(false);
      } else if (e.data?.type === 'toggleCommentMode') {
        setCommentMode(prev => !prev);
        setShowComments(true);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <>
      {/* Comment mode overlay */}
      {commentMode && (
        <div
          className="fixed inset-0 z-[9997] cursor-crosshair"
          style={{ pointerEvents: 'auto' }}
          onClick={handleOverlayClick}
          onMouseDown={(e) => e.stopPropagation()}
          data-comment-ui
        >
          <div className="absolute inset-0 bg-violet-500/5 pointer-events-none" />
          <style>{`
            @keyframes headerSlideDown {
              from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
              to { opacity: 1; transform: translateX(-50%) translateY(0); }
            }
            .header-slide-down { animation: headerSlideDown 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
          `}</style>
          <div
            className="header-slide-down fixed top-4 left-1/2 rounded-2xl shadow-lg overflow-hidden"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#4c1d95' }}
          >
            {/* Subtle hint row */}
            <div className={`flex items-center justify-between px-4 pt-2.5 ${unresolvedCount > 0 ? 'pb-1' : 'pb-2.5'}`}>
              <span className="text-xs text-violet-100">Click anywhere to comment</span>
              <button
                onClick={(e) => { e.stopPropagation(); setCommentMode(false); }}
                className="ml-3 text-violet-500 hover:text-violet-300 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>

            {/* Apply action row — only when there are comments */}
            {unresolvedCount > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); handleApplyComments(); }}
                className="w-full px-4 pb-2.5 pt-1 flex items-center gap-2 text-sm font-medium
                  transition-colors hover:bg-violet-600/40"
                style={{ color: '#ffffff' }}
              >
                <Sparkles className="w-4 h-4 text-violet-300" />
                Apply {unresolvedCount} comment{unresolvedCount !== 1 ? 's' : ''}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Comment pins */}
      {showComments && comments.map((comment) => (
        <CommentPin
          key={comment.id}
          comment={comment}
          isActive={activeCommentId === comment.id || viewAllComments}
          onClick={() => setActiveCommentId(activeCommentId === comment.id ? null : comment.id)}
          onResolve={() => toggleResolved(comment.id)}
        />
      ))}

      {/* New comment form */}
      {newCommentPosition && (
        <NewCommentForm
          position={newCommentPosition}
          onSubmit={handleCreateComment}
          onCancel={() => setNewCommentPosition(null)}
        />
      )}

      {/* Floating apply button + expanding modal */}
      <>
        <style>{`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideDown {
            from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
            to { opacity: 1; transform: translateX(-50%) translateY(0); }
          }
            @keyframes expandIn {
              from { 
                opacity: 0;
                transform: scale(0.8);
              }
              to { 
                opacity: 1;
                transform: scale(1);
              }
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes checkPop {
              0% { transform: scale(0); }
              50% { transform: scale(1.2); }
              100% { transform: scale(1); }
            }
            @keyframes successRing {
              0% { transform: scale(0.8); opacity: 1; }
              100% { transform: scale(2); opacity: 0; }
            }
            .slide-up { animation: slideUp 0.2s ease-out forwards; }
            .slide-down { animation: slideDown 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
            .expand-in { animation: expandIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
            .fade-in { animation: fadeIn 0.3s ease-out forwards; }
            .check-pop { animation: checkPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
            .success-ring { animation: successRing 0.6s ease-out forwards; }
          `}</style>

          {/* Idle state: Button — only show standalone when not in comment mode and there are comments */}
          {sendStatus === 'idle' && !commentMode && unresolvedCount > 0 && (
            <div 
              className="slide-down fixed top-4 left-1/2 z-[9998]"
              data-comment-ui
            >
              {/* Preview dropdown */}
              {isPreviewOpen && (
                <div 
                  className="slide-up absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 rounded-lg shadow-xl border overflow-hidden"
                  style={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', fontFamily: 'system-ui, -apple-system, sans-serif' }}
                >
                  <div className="max-h-48 overflow-y-auto">
                    {unresolvedComments.map((comment, i) => (
                      <div 
                        key={comment.id}
                        className="px-3 py-2.5"
                        style={{ borderBottom: i !== unresolvedComments.length - 1 ? '1px solid #f1f5f9' : 'none' }}
                      >
                        <p className="text-sm" style={{ color: '#334155' }}>{comment.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                ref={buttonRef}
                onClick={handleApplyComments}
                disabled={unresolvedCount === 0}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium shadow-lg 
                  transition-all duration-150 active:scale-95 bg-violet-600 hover:bg-violet-500
                  disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-violet-600"
                style={{ color: '#ffffff', fontFamily: 'system-ui, -apple-system, sans-serif' }}
              >
                <Sparkles className="w-4 h-4" />
                <span>{unresolvedCount > 0 ? `Apply ${unresolvedCount} comment${unresolvedCount !== 1 ? 's' : ''}` : 'Apply comments'}</span>
                {unresolvedCount > 0 && (
                  <Info 
                    className="w-4 h-4 text-violet-300 hover:text-white transition-colors cursor-pointer" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPreviewOpen(!isPreviewOpen);
                    }}
                  />
                )}
              </button>
            </div>
          )}

          {/* Sending/Sent state: Centered modal */}
          {(sendStatus === 'sending' || sendStatus === 'sent') && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center" data-comment-ui>
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm fade-in" />
              
              <div 
                className="expand-in relative rounded-2xl shadow-2xl w-80 overflow-hidden"
                style={{ backgroundColor: '#ffffff', fontFamily: 'system-ui, -apple-system, sans-serif' }}
              >
                {/* Header */}
                <div className="px-5 pt-5 pb-3">
                  <h3 className="text-lg font-semibold" style={{ color: '#0f172a' }}>
                    {sendStatus === 'sending' ? 'Applying comments...' : 'Comments sent!'}
                  </h3>
                </div>

                {/* Comments list */}
                <div className="px-5 pb-4 space-y-2 max-h-48 overflow-y-auto">
                  {unresolvedComments.map((comment, i) => (
                    <div 
                      key={comment.id}
                      className="fade-in rounded-xl px-4 py-3"
                      style={{ animationDelay: `${i * 80}ms`, opacity: 0, backgroundColor: '#f8fafc' }}
                    >
                      <p className="text-sm" style={{ color: '#334155' }}>{comment.body}</p>
                    </div>
                  ))}
                </div>

                {/* Status indicator */}
                <div className="px-5 pb-5 pt-2">
                  {sendStatus === 'sending' ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-violet-600 border-t-transparent animate-spin" />
                      <span className="text-sm" style={{ color: '#475569' }}>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="absolute inset-0 bg-emerald-400 rounded-full success-ring" />
                        <div className="relative w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center check-pop">
                          <Check className="w-4 h-4" style={{ color: '#ffffff' }} strokeWidth={3} />
                        </div>
                      </div>
                      <span className="text-sm font-medium" style={{ color: '#059669' }}>We are working on it</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
      </>
    </>
  );
}
