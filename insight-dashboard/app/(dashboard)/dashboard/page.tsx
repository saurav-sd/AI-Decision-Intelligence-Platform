'use client';

import { useEffect } from 'react';
import { fetchEvents } from '@/components/features/dashboard/services/dashboard.api';
import { useDashboard } from '@/components/features/dashboard/hooks/useDashboard';

import Filters from '@/components/features/dashboard/components/Filters';
import StatsCards from '@/components/features/dashboard/components/StatsCards';
import EventChart from '@/components/features/dashboard/components/EventChart';
import EventTable from '@/components/features/dashboard/components/EventTable';
import Funnel from '@/components/features/dashboard/components/Funnel';
import Retention from '@/components/features/dashboard/components/Retention';
import AIChat from '@/components/features/dashboard/components/AIChat';

import { useState } from 'react';

export default function DashboardPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [eventName, setEventName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchEvents().then((res) => {
      setEvents(res?.events || []);
      setLoading(false);
    });
  }, []);

  // 🔥 FILTERING LOGIC
  const filteredEvents = events.filter((event: any) => {
    const matchesEvent = !eventName || event.event_name === eventName;

    const time = new Date(event.timestamp).getTime();

    const matchesStart = !startDate || time >= new Date(startDate).getTime();

    const matchesEnd = !endDate || time <= new Date(endDate).getTime();

    return matchesEvent && matchesStart && matchesEnd;
  });

  if (loading) {
    return <div className="p-6 text-gray-400">Loading dashboard...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* 🔥 HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-gray-400 text-sm">
            Real-time AI analytics & insights
          </p>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition">
            Export
          </button>
          <button className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition">
            New Report
          </button>
        </div>
      </div>

      {/* 🔍 FILTERS */}
      <div className="glass p-4">
        <Filters
          eventName={eventName}
          setEventName={setEventName}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          events={events}
        />
      </div>

      {/* 📊 STATS */}
      <StatsCards events={filteredEvents} />

      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Analytics</h1>

        <div className="glass p-4">
          <EventChart events={filteredEvents} />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="glass p-4">
            <Funnel events={filteredEvents} />
          </div>

          <div className="glass p-4">
            <Retention events={filteredEvents} />
          </div>
        </div>

        <div className="glass p-4">
          <EventTable events={filteredEvents} />
        </div>
      </div>

      {/* 🤖 FLOATING AI CHAT */}
      <AIChat />
    </div>
  );
}
