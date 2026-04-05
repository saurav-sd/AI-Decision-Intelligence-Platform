"use client";

import { Event } from "@/types/event";
import { useState } from "react";

interface Props {
  events: Event[];
}

export default function EventTable({ events }: Props) {
  const [search, setSearch] = useState("");

  const filtered = events.filter((e) =>
    e.event_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-[400px]">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs text-gray-400">Data</p>
          <h2 className="text-lg font-semibold">Events</h2>
        </div>

        {/* SEARCH */}
        <input
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* TABLE */}
      <div className="flex-1 overflow-y-auto rounded-xl border border-white/10">

        <table className="w-full text-sm">

          {/* HEADER */}
          <thead className="sticky top-0 bg-[#0B0F19] text-gray-400">
            <tr>
              <th className="text-left px-4 py-3">User</th>
              <th className="text-left px-4 py-3">Event</th>
              <th className="text-left px-4 py-3">Time</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="divide-y divide-white/5">
            {filtered.map((e) => (
              <tr
                key={e.id}
                className="hover:bg-white/5 transition"
              >
                <td className="px-4 py-3 font-medium">
                  {e.user_id}
                </td>

                {/* EVENT BADGE */}
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 text-xs">
                    {e.event_name}
                  </span>
                </td>

                <td className="px-4 py-3 text-gray-400 text-xs">
                  {new Date(e.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* EMPTY STATE */}
        {filtered.length === 0 && (
          <div className="text-center text-gray-500 py-6">
            No events found
          </div>
        )}
      </div>
    </div>
  );
}