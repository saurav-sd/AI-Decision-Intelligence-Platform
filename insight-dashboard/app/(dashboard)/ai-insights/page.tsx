'use client';

import AIChat from '@/components/features/dashboard/components/AIChat';
import AIInsights from '@/components/features/dashboard/components/AIInsights';
import AgentsInsights from '@/components/features/dashboard/components/AgentsInsights';

export default function AIAssistantPage() {
  return (
    <div className="grid grid-cols-12 gap-6 h-full">
      {/* LEFT - CHAT */}
      <div className="col-span-7 glass p-4 flex flex-col">
        <AIChat fullPage />
      </div>

      {/* RIGHT - INSIGHTS */}
      <div className="col-span-5 space-y-6">
        <div className="glass p-4">
          <AIInsights />
        </div>

        <div className="glass p-4">
          <AgentsInsights />
        </div>
      </div>
    </div>
  );
}
