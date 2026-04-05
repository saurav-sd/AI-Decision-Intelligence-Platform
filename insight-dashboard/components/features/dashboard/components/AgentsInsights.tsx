'use client';

import { useEffect, useState } from 'react';
import { fetchAgents } from '@/components/lib/api-client';
import { RefreshCw } from 'lucide-react';

export default function AgentsInsights() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const loadAgents = async () => {
    setLoading(true);
    try {
      const res = await fetchAgents();
      setData(res);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAgents();
  }, []);

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">AI Agents</h2>

        <button
          onClick={loadAgents}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {loading && (
        <p className="text-gray-400 text-sm animate-pulse">Running agents...</p>
      )}

      {!loading && data && (
        <>
          {/* AGENTS */}
          <div className="grid grid-cols-1 gap-3">
            <AgentCard
              title="🧠 Data Analyst"
              content={data.agents?.data_agent}
            />

            <AgentCard
              title="📈 Growth Strategist"
              content={data.agents?.growth_agent}
            />

            <AgentCard
              title="⚠️ Risk Analyst"
              content={data.agents?.risk_agent}
            />
          </div>

          {/* FINAL */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-white/10">
            <p className="text-sm text-gray-300 whitespace-pre-line">
              {data.final}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

function AgentCard({ title, content }: any) {
  return (
    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 whitespace-pre-line">
      <p className="font-semibold mb-1">{title}</p>
      {content}
    </div>
  );
}
