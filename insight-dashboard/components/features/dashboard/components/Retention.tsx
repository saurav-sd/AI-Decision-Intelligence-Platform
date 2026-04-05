'use client';

import { Event } from '@/components/types/event';

interface Props {
  events: Event[];
}

export default function Retention({ events }: Props) {
  const userMap: Record<string, Event[]> = {};

  // Group events per user
  events.forEach((e) => {
    if (!userMap[e.user_id]) userMap[e.user_id] = [];
    userMap[e.user_id].push(e);
  });

  // Sort events
  Object.values(userMap).forEach((list) =>
    list.sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    )
  );

  // Cohort map
  const cohort: Record<string, Record<number, Set<string>>> = {};

  Object.entries(userMap).forEach(([user, evs]) => {
    const firstDate = new Date(evs[0].timestamp).toISOString().split('T')[0];

    if (!cohort[firstDate]) cohort[firstDate] = {};

    const firstTime = new Date(evs[0].timestamp).getTime();

    evs.forEach((e) => {
      const diff = Math.floor(
        (new Date(e.timestamp).getTime() - firstTime) / (1000 * 60 * 60 * 24)
      );

      if (!cohort[firstDate][diff]) cohort[firstDate][diff] = new Set();

      cohort[firstDate][diff].add(user);
    });
  });

  const cohortDates = Object.keys(cohort).sort();
  const maxDays = 7;

  const getColor = (percentage: number) => {
    if (percentage > 60) return 'bg-green-500/40';
    if (percentage > 30) return 'bg-yellow-500/40';
    if (percentage > 10) return 'bg-orange-500/40';
    return 'bg-red-500/30';
  };

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div>
        <p className="text-xs text-gray-400">Analytics</p>
        <h2 className="text-lg font-semibold">Retention Cohort</h2>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto border border-white/10 rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-[#0B0F19] text-gray-400">
            <tr>
              <th className="p-3 text-left">Cohort</th>
              {Array.from({ length: maxDays }).map((_, i) => (
                <th key={i} className="p-3 text-center">
                  D{i}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {cohortDates.map((date) => {
              const base = cohort[date][0]?.size || 0;

              return (
                <tr key={date} className="border-t border-white/5">
                  <td className="p-3 text-xs text-gray-300">{date}</td>

                  {Array.from({ length: maxDays }).map((_, day) => {
                    const users = cohort[date][day]?.size || 0;

                    const percent = base ? (users / base) * 100 : 0;

                    return (
                      <td key={day} className="p-2 text-center">
                        <div
                          className={`rounded-lg px-2 py-1 text-xs ${getColor(
                            percent
                          )}`}
                        >
                          {users}
                          <div className="text-[10px] text-gray-300">
                            {percent.toFixed(0)}%
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
