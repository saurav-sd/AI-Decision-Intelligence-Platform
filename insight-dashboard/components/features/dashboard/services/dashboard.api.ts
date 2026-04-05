import { apiFetch } from '@/components/lib/api-client';

export const fetchEvents = () => apiFetch('/events');
export const fetchInsights = () => apiFetch('/ai/insights');

export const chatWithAgents = (message: string) =>
  apiFetch('/ai/chat', {
    method: 'POST',
    body: JSON.stringify({ question: message }),
  });
