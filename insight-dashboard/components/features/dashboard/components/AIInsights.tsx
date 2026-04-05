'use client';

import { useEffect, useState } from 'react';
import { fetchInsights } from '@/components/features/dashboard/services/dashboard.api';
import { RefreshCw } from 'lucide-react';

export default function AIInsights() {
  const [insights, setInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const loadInsights = async () => {
    setLoading(true);
    try {
      const res = await fetchInsights();
      setInsights(res.insight || []);
    } catch {
      setInsights([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInsights();
  }, []);

  return (
    <div className="flex flex-col h-[300px]">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <p className="text-xs text-gray-400">AI</p>
          <h2 className="text-lg font-semibold">Insights</h2>
        </div>

        <button
          onClick={loadInsights}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {/* SCROLL AREA */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {loading && (
          <p className="text-gray-400 text-sm animate-pulse">
            Generating insights...
          </p>
        )}

        {!loading && insights.length === 0 && (
          <p className="text-gray-500 text-sm">No insights available</p>
        )}

        {insights.map((text, i) => (
          <div
            key={i}
            className="p-3 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 leading-relaxed"
          >
            {formatText(text)}
          </div>
        ))}
      </div>
    </div>
  );
}

function formatText(text: string) {
  if (text.startsWith('###')) {
    return (
      <p className="text-indigo-400 font-semibold">{text.replace('###', '')}</p>
    );
  }

  if (text.startsWith('*')) {
    return (
      <p>
        <span className="text-indigo-400 mr-2">•</span>
        {text.replace('*', '')}
      </p>
    );
  }

  return text;
}
