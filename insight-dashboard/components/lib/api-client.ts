export const API_BASE = 'http://localhost:8000';

export async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) throw new Error('API Error');

  return res.json();
}

// 🤖 AI INSIGHTS
export async function fetchInsights() {
  const res = await fetch(`${API_BASE}/ai/insights`);
  return res.json();
}

// 🧠 AI AGENTS
export async function fetchAgents() {
  const res = await fetch(`${API_BASE}/ai/agents`);
  return res.json();
}

// 💬 AI CHAT
export async function chatWithAgents(question: string) {
  const res = await fetch(`${API_BASE}/ai/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
    }),
  });

  return res.json();
}
