import axios, { AxiosError, AxiosInstance } from 'axios';
import { API_BASE_URL } from '../config/constants';
import type {
  LoginResponse,
  RegisterData,
  User,
  Company,
  Service,
  Order,
  CreateOrderData,
  Subscription,
  SubscriptionPlan,
  CreateSubscriptionData,
  Analytics,
  ApiError
} from '../types';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle token refresh
    this.api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError<ApiError>) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && originalRequest && !(originalRequest as any)._retry) {
          (originalRequest as any)._retry = true;
          
          try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
              throw new Error('No refresh token');
            }

            const response = await axios.post<LoginResponse>(
              `${API_BASE_URL}/auth/refresh-token`,
              { refreshToken }
            );

            const { accessToken, refreshToken: newRefreshToken } = response.data.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', newRefreshToken);

            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            }

            return this.api(originalRequest);
          } catch (refreshError) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // ==================== AUTH ====================
  async register(data: RegisterData): Promise<LoginResponse> {
    const response = await this.api.post<LoginResponse>('/auth/register', data);
    return response.data;
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await this.api.post<LoginResponse>('/auth/login', { email, password });
    return response.data;
  }

  async getCurrentUser(): Promise<{ success: boolean; data: User }> {
    const response = await this.api.get('/auth/me');
    return response.data;
  }

  async changePassword(oldPassword: string, newPassword: string): Promise<{ success: boolean }> {
    const response = await this.api.post('/auth/change-password', { oldPassword, newPassword });
    return response.data;
  }

  async updateProfile(data: { profile?: any }): Promise<{ success: boolean; data: User }> {
    const response = await this.api.put('/users/profile', data);
    return response.data;
  }

  async forgotPassword(email: string): Promise<{ success: boolean }> {
    const response = await this.api.post('/auth/forgot-password', { email });
    return response.data;
  }

  async resetPassword(resetToken: string, newPassword: string): Promise<{ success: boolean }> {
    const response = await this.api.post('/auth/reset-password', { resetToken, newPassword });
    return response.data;
  }

  // ==================== COMPANIES ====================
  async createCompany(data: Partial<Company>): Promise<{ success: boolean; data: Company }> {
    const response = await this.api.post('/companies', data);
    return response.data;
  }

  async getAnalyticsSummary(): Promise<{ success: boolean; data: any }> {
    const response = await this.api.get('/analytics/dashboard');
    return response.data;
  }

  async getCompanyById(companyId: string): Promise<{ success: boolean; data: Company }> {
    const response = await this.api.get(`/companies/${companyId}`);
    return response.data;
  }

  async updateCompany(companyId: string, data: Partial<Company>): Promise<{ success: boolean; data: Company }> {
    const response = await this.api.put(`/companies/${companyId}`, data);
    return response.data;
  }

  async deleteCompany(companyId: string): Promise<{ success: boolean }> {
    const response = await this.api.delete(`/companies/${companyId}`);
    return response.data;
  }

  // ==================== SERVICES ====================
  async getServices(network?: string): Promise<{ success: boolean; data: { services: Service[]; categorized: any } }> {
    const response = await this.api.get('/api-integrations/services', {
      params: network ? { network } : undefined
    });
    return response.data;
  }

  async getBalance(): Promise<{ success: boolean; data: { balance: number; currency: string } }> {
    const response = await this.api.get('/api-integrations/balance');
    return response.data;
  }

  // ==================== ORDERS ====================
  async createOrder(data: CreateOrderData): Promise<{ success: boolean; message: string; data: { order: Order; creditsDeducted: number; fampageOrderId: string } }> {
    const response = await this.api.post('/orders', data);
    return response.data;
  }

  async getOrders(params?: { page?: number; limit?: number; status?: string }): Promise<{ success: boolean; data: Order[]; pagination: any }> {
    const response = await this.api.get('/orders', { params });
    return response.data;
  }

  async getOrderById(orderId: string): Promise<{ success: boolean; data: Order }> {
    const response = await this.api.get(`/orders/${orderId}`);
    return response.data;
  }

  async getOrderStatistics(): Promise<{ success: boolean; data: any }> {
    const response = await this.api.get('/orders/stats');
    return response.data;
  }

  async updateOrderStatus(orderId: string, status: string): Promise<{ success: boolean; data: Order }> {
    const response = await this.api.put(`/orders/${orderId}/status`, { status });
    return response.data;
  }

  // ==================== SUBSCRIPTIONS ====================
  async getSubscriptionPlans(plan?: string): Promise<{ success: boolean; data: { plans: SubscriptionPlan[] } }> {
    const response = await this.api.get('/subscriptions/plans', {
      params: plan ? { plan } : undefined
    });
    return response.data;
  }

  async getCreditsBalance(): Promise<{ success: boolean; data: { balance: number; currency: string; transactions: any[] } }> {
    const response = await this.api.get('/subscriptions/credits');
    return response.data;
  }

  async createSubscription(data: CreateSubscriptionData): Promise<{ success: boolean; data: { subscription: Subscription; razorpayOrder: any } }> {
    const response = await this.api.post('/subscriptions', data);
    return response.data;
  }

  async getUserSubscriptions(params?: { page?: number; limit?: number; status?: string }): Promise<{ success: boolean; data: { data: Subscription[]; pagination: any } }> {
    const response = await this.api.get('/subscriptions', { params });
    return response.data;
  }

  async activateSubscription(subscriptionId: string, paymentId: string, orderId?: string, signature?: string): Promise<{ success: boolean; data: Subscription }> {
    const response = await this.api.post('/subscriptions/activate', { subscriptionId, paymentId, razorpayOrderId: orderId, razorpayPaymentId: paymentId, razorpaySignature: signature });
    return response.data;
  }

  async cancelSubscription(subscriptionId: string): Promise<{ success: boolean }> {
    const response = await this.api.delete(`/subscriptions/${subscriptionId}`);
    return response.data;
  }

  // ==================== PRICING ====================
  async calculateCredits(platform: string, serviceType: string, quantity: number): Promise<{ success: boolean; data: { credits: number; pricing: any } }> {
    const response = await this.api.post('/pricing/calculate', { platform, serviceType, quantity });
    return response.data;
  }

  async getUserPricing(userId?: string): Promise<{ success: boolean; data: any }> {
    const url = userId ? `/pricing/user/${userId}` : '/pricing/user';
    const response = await this.api.get(url);
    return response.data;
  }

  // Admin pricing management
  async getPricingRules(params?: { scope?: string; companyId?: string; userId?: string; isActive?: boolean }): Promise<{ success: boolean; data: any[] }> {
    const response = await this.api.get('/pricing/rules', { params });
    return response.data;
  }

  async createPricingRule(rule: any): Promise<{ success: boolean; data: any }> {
    const response = await this.api.post('/pricing/rules', rule);
    return response.data;
  }

  async updatePricingRule(id: string, rule: any): Promise<{ success: boolean; data: any }> {
    const response = await this.api.put(`/pricing/rules/${id}`, rule);
    return response.data;
  }

  async deletePricingRule(id: string): Promise<{ success: boolean; message: string }> {
    const response = await this.api.delete(`/pricing/rules/${id}`);
    return response.data;
  }

  // ==================== ANALYTICS ====================
  async getDashboardStats(): Promise<{ success: boolean; data: Analytics }> {
    const response = await this.api.get('/analytics/dashboard');
    return response.data;
  }

  async getCompanyAnalytics(params?: { startDate?: string; endDate?: string }): Promise<{ success: boolean; data: any }> {
    const response = await this.api.get('/analytics', { params });
    return response.data;
  }

  async getOrderDetailsByTarget(targetUrl: string): Promise<{ success: boolean; data: any }> {
    const response = await this.api.get(`/analytics/target/${encodeURIComponent(targetUrl)}`);
    return response.data;
  }

  // ==================== ORDER SYNC ====================
  async syncOrder(orderId: string): Promise<{ success: boolean; data: Order }> {
    const response = await this.api.post(`/order-sync/sync/${orderId}`);
    return response.data;
  }

  async syncMultipleOrders(orderIds: string[]): Promise<{ success: boolean; data: { synced: number; failed: number } }> {
    const response = await this.api.post('/order-sync/sync/multiple', { orderIds });
    return response.data;
  }

  // ==================== USERS (Admin only) ====================
  async getAllUsers(page = 1, limit = 10): Promise<{ success: boolean; data: { users: User[]; pagination: any } }> {
    const response = await this.api.get('/users', { params: { page, limit } });
    return response.data;
  }

  async getUserById(userId: string): Promise<{ success: boolean; data: User }> {
    const response = await this.api.get(`/users/${userId}`);
    return response.data;
  }

  async createUser(data: RegisterData): Promise<{ success: boolean; data: User }> {
    const response = await this.api.post('/users', data);
    return response.data;
  }

  async updateUser(userId: string, data: Partial<User>): Promise<{ success: boolean; data: User }> {
    const response = await this.api.put(`/users/${userId}`, data);
    return response.data;
  }

  async deleteUser(userId: string): Promise<{ success: boolean }> {
    const response = await this.api.delete(`/users/${userId}`);
    return response.data;
  }

  // ==================== INVOICES ====================
  async getInvoices(page = 1, limit = 10): Promise<{ success: boolean; data: any[]; pagination: any }> {
    const response = await this.api.get('/invoices', { params: { page, limit } });
    return response.data;
  }

  async getInvoiceById(invoiceId: string): Promise<{ success: boolean; data: any }> {
    const response = await this.api.get(`/invoices/${invoiceId}`);
    return response.data;
  }

  async downloadInvoice(invoiceId: string): Promise<Blob> {
    const response = await this.api.get(`/invoices/${invoiceId}/download`, {
      responseType: 'blob',
    });
    return response.data;
  }

  // ==================== NOTIFICATIONS ====================
  async getNotifications(page = 1, limit = 20, read?: boolean): Promise<{ success: boolean; data: any[]; pagination: any }> {
    const params: any = { page, limit };
    if (typeof read === 'boolean') params.read = read;
    const response = await this.api.get('/notifications', { params });
    return response.data;
  }

  async getUnreadNotificationsCount(): Promise<{ success: boolean; data: { count: number } }> {
    const response = await this.api.get('/notifications/unread-count');
    return response.data;
  }

  async markNotificationAsRead(notificationId: string): Promise<{ success: boolean; data: any }> {
    const response = await this.api.put(`/notifications/${notificationId}/read`);
    return response.data;
  }

  async markAllNotificationsAsRead(): Promise<{ success: boolean; message: string }> {
    const response = await this.api.put('/notifications/mark-all-read');
    return response.data;
  }

  async deleteNotification(notificationId: string): Promise<{ success: boolean; message: string }> {
    const response = await this.api.delete(`/notifications/${notificationId}`);
    return response.data;
  }

  async deleteAllNotifications(): Promise<{ success: boolean; message: string }> {
    const response = await this.api.delete('/notifications');
    return response.data;
  }

  async getFampageBalance(): Promise<{ success: boolean; data: { balance: string; currency: string } }> {
    const response = await this.api.get('/api-integrations/balance');
    return response.data;
  }
}

export const apiService = new ApiService();
export default apiService;
