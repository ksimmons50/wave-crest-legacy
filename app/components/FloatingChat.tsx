"use client";

import React, { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

interface FloatingChatProps {
  className?: string;
}

const SUGGESTIONS = [
  "What are my options to buy a home?",
  "How does rent-to-own work?",
  "I'd like someone to contact me",
];

function getMessageText(parts: { type: string; text?: string }[] | undefined): string {
  if (!parts) return "";
  return parts
    .filter((p) => p.type === "text")
    .map((p) => p.text ?? "")
    .join("");
}

export default function FloatingChat({ className = "" }: FloatingChatProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isBusy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const submit = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isBusy) return;
    sendMessage({ text: trimmed });
    setInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit(input);
  };

  return (
    <div className={className}>
      {/* Launcher button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open chat assistant"
          className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-[#1f3a6b] shadow-lg shadow-amber-500/30 transition-transform duration-200 hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/40"
        >
          <MessageCircle className="h-7 w-7" strokeWidth={2} />
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Chat with Wave Crest Legacy"
          className="fixed bottom-5 right-5 z-50 flex h-[min(70vh,560px)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-amber-500/30 bg-[#f5f5f0] shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-[#2E5090] px-4 py-3">
            <div className="flex flex-col">
              <span className="font-sans text-sm font-bold text-[#f5f5f0]">Wave Crest Assistant</span>
              <span className="text-xs text-amber-300">Typically replies instantly</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#f5f5f0] transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
            {messages.length === 0 && (
              <div className="space-y-4">
                <div className="rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-sm leading-relaxed text-[#2E5090] shadow-sm">
                  Hi there! I&apos;m the Wave Crest Legacy assistant. Ask me about our divisions, ownership
                  pathways, or let me connect you with the team.
                </div>
                <div className="flex flex-col gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => submit(s)}
                      className="self-start rounded-full border border-[#2E5090]/25 bg-white px-3 py-1.5 text-left text-xs font-medium text-[#2E5090] transition-colors hover:border-amber-500 hover:text-amber-600"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => {
              const text = getMessageText(message.parts);
              if (!text) return null;
              const isUser = message.role === "user";
              return (
                <div key={message.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                      isUser
                        ? "rounded-br-sm bg-[#2E5090] text-[#f5f5f0]"
                        : "rounded-tl-sm bg-white text-[#2E5090]"
                    }`}
                  >
                    {text}
                  </div>
                </div>
              );
            })}

            {isBusy && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-sm text-[#2E5090] shadow-sm">
                  <Loader2 className="h-4 w-4 animate-spin text-amber-500" />
                  <span className="sr-only">Assistant is typing</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-[#2E5090]/10 bg-white p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              aria-label="Type your message"
              className="flex-1 rounded-full border border-[#2E5090]/20 bg-[#f5f5f0] px-4 py-2.5 text-sm text-[#2E5090] outline-none placeholder:text-[#2E5090]/50 focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={isBusy || !input.trim()}
              aria-label="Send message"
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-[#1f3a6b] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
