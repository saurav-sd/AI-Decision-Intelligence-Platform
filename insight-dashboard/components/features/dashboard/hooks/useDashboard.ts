'use client';

import { useEffect, useState } from 'react';
import { fetchEvents } from '../services/dashboard.api';

export function useDashboard() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents()
      .then((res) => setEvents(res.events || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return { events, loading };
}
