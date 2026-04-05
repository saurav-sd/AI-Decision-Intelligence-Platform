'use client';

import { Activity, Users, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StatsCards({ events }: any) {
  const totalEvents = events.length;
  const uniqueUsers = new Set(events.map((e: any) => e.user_id)).size;
  const eventTypes = new Set(events.map((e: any) => e.event_name)).size;

  const cards = [
    {
      title: 'Total Events',
      value: totalEvents,
      icon: Activity,
      color: 'from-indigo-500 to-cyan-500',
    },
    {
      title: 'Users',
      value: uniqueUsers,
      icon: Users,
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Event Types',
      value: eventTypes,
      icon: Layers,
      color: 'from-orange-500 to-yellow-500',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-6">
      {cards.map((card, i) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-5 relative overflow-hidden group"
          >
            {/* Gradient Glow */}
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition bg-gradient-to-br ${card.color}`}
            />

            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-gray-400 text-sm">{card.title}</p>
                <h2 className="text-3xl font-semibold mt-1">{card.value}</h2>
              </div>

              <div className="p-3 rounded-xl bg-white/10 group-hover:scale-110 transition">
                <Icon size={20} />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
