'use client';

import { Bell, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 h-16 border-b border-white/10 bg-white/5 backdrop-blur">
      {/* Left */}
      <div>
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <p className="text-xs text-gray-400">Real-time AI analytics</p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg hover:bg-white/10">
          <Bell size={18} />
        </button>

        <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
          <User size={16} />
          <span className="text-sm">Sourav</span>
        </div>
      </div>
    </header>
  );
}
