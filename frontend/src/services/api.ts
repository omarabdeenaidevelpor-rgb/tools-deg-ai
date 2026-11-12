const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

class ApiService {
  private token: string | null = null;

  setToken(token: string | null) {
    this.token = token;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Request failed' }));
      throw new Error(error.detail || 'Request failed');
    }

    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  }

  // Auth
  async login(username: string, password: string) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Login failed' }));
      throw new Error(error.detail || 'Login failed');
    }

    return response.json();
  }

  async logout() {
    return this.request('/auth/logout', { method: 'POST' });
  }

  async getMe() {
    return this.request('/auth/me');
  }

  async changePassword(currentPassword: string, newPassword: string) {
    return this.request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
    });
  }

  // Dashboard
  async getDashboardStats() {
    return this.request('/dashboard/stats');
  }

  async getDashboardActivity() {
    return this.request('/dashboard/activity');
  }

  // Projects
  async getProjects(params?: { page?: number; limit?: number; studio?: string; search?: string }) {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.studio) searchParams.append('studio', params.studio);
    if (params?.search) searchParams.append('search', params.search);

    return this.request(`/projects?${searchParams.toString()}`);
  }

  async getProject(id: string) {
    return this.request(`/projects/${id}`);
  }

  async createProject(data: any) {
    return this.request('/projects', { method: 'POST', body: JSON.stringify(data) });
  }

  async updateProject(id: string, data: any) {
    return this.request(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }

  async deleteProject(id: string) {
    return this.request(`/projects/${id}`, { method: 'DELETE' });
  }

  async duplicateProject(id: string) {
    return this.request(`/projects/${id}/duplicate`, { method: 'POST' });
  }

  // Studios - Generic CRUD
  async getStudioItems(studio: string, params?: any) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, String(value));
      });
    }
    return this.request(`/${studio}?${searchParams.toString()}`);
  }

  async getStudioItem(studio: string, id: string) {
    return this.request(`/${studio}/${id}`);
  }

  async createStudioItem(studio: string, data: any) {
    return this.request(`/${studio}`, { method: 'POST', body: JSON.stringify(data) });
  }

  async updateStudioItem(studio: string, id: string, data: any) {
    return this.request(`/${studio}/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }

  async deleteStudioItem(studio: string, id: string) {
    return this.request(`/${studio}/${id}`, { method: 'DELETE' });
  }

  // AI
  async getAIProviders() {
    return this.request('/ai/providers');
  }

  async createAIProvider(data: any) {
    return this.request('/ai/providers', { method: 'POST', body: JSON.stringify(data) });
  }

  async testAIProvider(id: string) {
    return this.request('/ai/test', { method: 'POST', body: JSON.stringify({ provider_id: id }) });
  }

  async generateWithAI(data: any) {
    return this.request('/ai/generate', { method: 'POST', body: JSON.stringify(data) });
  }

  // Store
  async getProducts(params?: any) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, String(value));
      });
    }
    return this.request(`/store/products?${searchParams.toString()}`);
  }

  async getProduct(id: string) {
    return this.request(`/store/products/${id}`);
  }

  async createProduct(data: any) {
    return this.request('/store/products', { method: 'POST', body: JSON.stringify(data) });
  }

  async updateProduct(id: string, data: any) {
    return this.request(`/store/products/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }

  async deleteProduct(id: string) {
    return this.request(`/store/products/${id}`, { method: 'DELETE' });
  }

  // Automation
  async getWorkflows() {
    return this.request('/automation/workflows');
  }

  async createWorkflow(data: any) {
    return this.request('/automation/workflows', { method: 'POST', body: JSON.stringify(data) });
  }

  async runWorkflow(id: string) {
    return this.request(`/automation/workflows/${id}/run`, { method: 'POST' });
  }

  async getJobs() {
    return this.request('/automation/jobs');
  }

  async getLogs() {
    return this.request('/automation/logs');
  }

  // Media
  async getMedia(params?: any) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, String(value));
      });
    }
    return this.request(`/media?${searchParams.toString()}`);
  }

  async uploadMedia(file: File, projectId?: string) {
    const formData = new FormData();
    formData.append('file', file);
    if (projectId) formData.append('project_id', projectId);

    const response = await fetch(`${API_BASE_URL}/media`, {
      method: 'POST',
      headers: {
        Authorization: this.token ? `Bearer ${this.token}` : '',
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Upload failed' }));
      throw new Error(error.detail || 'Upload failed');
    }

    return response.json();
  }

  async deleteMedia(id: string) {
    return this.request(`/media/${id}`, { method: 'DELETE' });
  }

  // Export
  async exportProject(projectId: string, format: string) {
    return this.request('/export', {
      method: 'POST',
      body: JSON.stringify({ project_id: projectId, format }),
    });
  }

  async downloadExport(exportId: string) {
    const response = await fetch(`${API_BASE_URL}/export/${exportId}/download`, {
      headers: {
        Authorization: this.token ? `Bearer ${this.token}` : '',
      },
    });

    if (!response.ok) {
      throw new Error('Download failed');
    }

    return response.blob();
  }

  // Backup
  async createBackup() {
    return this.request('/backup', { method: 'POST' });
  }

  async getBackups() {
    return this.request('/backup');
  }

  async restoreBackup(id: string) {
    return this.request(`/backup/${id}/restore`, { method: 'POST' });
  }

  // Settings
  async getSettings() {
    return this.request('/settings');
  }

  async updateSettings(data: any) {
    return this.request('/settings', { method: 'PUT', body: JSON.stringify(data) });
  }
}

export const api = new ApiService();