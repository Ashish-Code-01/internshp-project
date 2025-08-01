const API_BASE_URL = 'http://localhost:3000/api';

export const api = {
  // Auth endpoints
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  signup: async (name: string, email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    return response.json();
  },

  // Intern endpoints
  getCurrentIntern: async () => {
    const response = await fetch(`${API_BASE_URL}/intern`);
    return response.json();
  },

  getLeaderboard: async () => {
    const response = await fetch(`${API_BASE_URL}/leaderboard`);
    return response.json();
  },

  getAchievements: async () => {
    const response = await fetch(`${API_BASE_URL}/achievements`);
    return response.json();
  },
};