'use client';

import { useState } from 'react';
import { Event } from '@/components/types/event';
import { motion } from 'framer-motion';

interface Props {
  events: Event[];
}

export default function Funnel({ events }: Props) {
  const [steps, setSteps] = useState<string[]>([]);

  const uniqueEvents = Array.from(new Set(events.map((e) => e.event_name)));

  // 🧠 Group events per user
  const userMap: Record<string, Event[]> = {};

  events.forEach((e) => {
    if (!userMap[e.user_id]) userMap[e.user_id] = [];
    userMap[e.user_id].push(e);
  });

  // Sort events by time
  Object.values(userMap).forEach((list) =>
    list.sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    )
  );

  // 🔢 Funnel logic
  const counts = Array(steps.length).fill(0);

  Object.values(userMap).forEach((userEvents) => {
    let stepIndex = 0;

    for (const event of userEvents) {
      if (event.event_name === steps[stepIndex]) {
        stepIndex++;
      }
      if (stepIndex === steps.length) break;
    }

    for (let i = 0; i < stepIndex; i++) {
      counts[i]++;
    }
  });

  const funnelData = steps.map((step, i) => {
    const count = counts[i];
    const prev = i === 0 ? count : counts[i - 1];

    return {
      step,
      count,
      conversion: prev ? ((count / prev) * 100).toFixed(1) : '0',
    };
  });

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div>
        <p className="text-xs text-gray-400">Analytics</p>
        <h2 className="text-lg font-semibold">Funnel</h2>
      </div>

      {/* STEP SELECTOR */}
      <div className="flex flex-wrap gap-2">
        {uniqueEvents.map((event) => (
          <button
            key={event}
            onClick={() =>
              setSteps((prev) =>
                prev.includes(event)
                  ? prev.filter((s) => s !== event)
                  : [...prev, event]
              )
            }
            className={`px-3 py-1 text-xs rounded-lg transition ${
              steps.includes(event)
                ? 'bg-indigo-500 text-white'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            {event}
          </button>
        ))}

        <button
          onClick={() => setSteps([])}
          className="px-3 py-1 text-xs rounded-lg bg-red-500/20 text-red-400"
        >
          Reset
        </button>
      </div>

      {/* EMPTY */}
      {steps.length === 0 && (
        <p className="text-gray-500 text-sm">Select events to build funnel</p>
      )}

      {/* FUNNEL VISUAL */}
      <div className="space-y-4">
        {funnelData.map((item, i) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{item.step}</span>
              <span>{item.count} users</span>
            </div>

            {/* BAR */}
            <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.conversion}%` }}
                transition={{ duration: 0.6 }}
                className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500"
              />
            </div>

            <p className="text-xs text-gray-400">
              Conversion: {item.conversion}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
