'use client';

import { Calendar, Filter, X } from 'lucide-react';

interface Props {
  eventName: string;
  setEventName: (val: string) => void;
  startDate: string;
  setStartDate: (val: string) => void;
  endDate: string;
  setEndDate: (val: string) => void;
  events: any[];
}

export default function Filters({
  eventName,
  setEventName,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  events,
}: Props) {
  const uniqueEvents = Array.from(new Set(events.map((e) => e.event_name)));

  const resetFilters = () => {
    setEventName('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="flex flex-col gap-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Filter size={16} />
          Filters
        </div>

        <button
          onClick={resetFilters}
          className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300"
        >
          <X size={14} />
          Reset
        </button>
      </div>

      {/* FILTER ROW */}
      <div className="grid grid-cols-3 gap-4">
        {/* EVENT SELECT */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">Event Type</label>

          <select
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Events</option>
            {uniqueEvents.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {/* START DATE */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">Start Date</label>

          <div className="relative">
            <Calendar
              size={16}
              className="absolute left-3 top-2.5 text-gray-400"
            />

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* END DATE */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">End Date</label>

          <div className="relative">
            <Calendar
              size={16}
              className="absolute left-3 top-2.5 text-gray-400"
            />

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
