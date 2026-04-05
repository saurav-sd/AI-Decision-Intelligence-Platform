'use client';

import { useState, useRef, useEffect } from 'react';
import { chatWithAgents } from '@/components/lib/api-client';
import { MessageCircle, X } from 'lucide-react';

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  const sendMessage = async (text: string) => {
    const userMsg = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await chatWithAgents(text);

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: res.final,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <>
      {/* FLOATING BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-indigo-600 hover:bg-indigo-500 shadow-lg"
      >
        {open ? <X /> : <MessageCircle />}
      </button>

      {/* CHAT WINDOW */}
      {open && (
        <div className="fixed bottom-20 right-6 w-[350px] h-[500px] glass flex flex-col">
          {/* HEADER */}
          <div className="p-4 border-b border-white/10 font-semibold">
            AI Assistant
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[80%] ${
                  m.role === 'user'
                    ? 'ml-auto bg-indigo-600 text-white'
                    : 'bg-white/5 text-gray-300'
                }`}
              >
                {m.content}
              </div>
            ))}

            {loading && (
              <p className="text-gray-400 animate-pulse">Thinking...</p>
            )}

            <div ref={bottomRef} />
          </div>

          {/* INPUT */}
          <ChatInput onSend={sendMessage} disabled={loading} />
        </div>
      )}
    </>
  );
}

function ChatInput({ onSend, disabled }: any) {
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput('');
  };

  return (
    <div className="p-3 border-t border-white/10 flex gap-2">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-sm"
        placeholder="Ask AI..."
        onKeyDown={(e) => e.key === 'Enter' && send()}
        disabled={disabled}
      />

      <button onClick={send} className="px-3 bg-indigo-600 rounded text-white">
        Send
      </button>
    </div>
  );
}
