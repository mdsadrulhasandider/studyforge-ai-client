const BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD 
  ? 'https://studyforge-ai-server.onrender.com/api' 
  : 'http://localhost:5000/api');

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export const api = {
  // Plans
  async getPlans(params: { search?: string; category?: string; difficulty?: string; sort?: string; page?: number } = {}) {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.category) query.append('category', params.category);
    if (params.difficulty) query.append('difficulty', params.difficulty);
    if (params.sort) query.append('sort', params.sort);
    if (params.page) query.append('page', params.page.toString());
    query.append('limit', '8');

    const res = await fetch(`${BASE_URL}/plans?${query.toString()}`);
    return res.json();
  },

  async getPlanById(id: string) {
    const res = await fetch(`${BASE_URL}/plans/${id}`);
    return res.json();
  },

  async getMyPlans() {
    const res = await fetch(`${BASE_URL}/plans/my/all`, {
      headers: getHeaders()
    });
    return res.json();
  },

  async createPlan(planData: any) {
    const res = await fetch(`${BASE_URL}/plans`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(planData)
    });
    return res.json();
  },

  async deletePlan(id: string) {
    const res = await fetch(`${BASE_URL}/plans/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return res.json();
  },

  async getDashboardStats() {
    const res = await fetch(`${BASE_URL}/plans/dashboard/stats`, {
      headers: getHeaders()
    });
    return res.json();
  },

  // AI Actions
  async generateAIPlan(params: { subject: string; difficulty: string; dailyHours: number; duration: number }) {
    const res = await fetch(`${BASE_URL}/ai/generate-plan`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(params)
    });
    return res.json();
  },

  async sendMessage(message: string) {
    const res = await fetch(`${BASE_URL}/ai/chat`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ message })
    });
    return res.json();
  },

  // Database Seed Action
  async seedDatabase() {
    const res = await fetch(`${BASE_URL}/seed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    return res.json();
  }
};
