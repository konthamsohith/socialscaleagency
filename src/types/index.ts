export interface User {
  userId: string;
  companyId?: string;
  name: string;
  email: string;
  role: 'SUPER_ADMIN' | 'COMPANY_ADMIN' | 'COMPANY_USER';
  status?: 'active' | 'inactive';
  profile?: {
    userType?: 'creator' | 'business' | 'agency';
    stage?: 'starter' | 'scaling' | 'monetizing';
    industry?: 'fashion' | 'lifestyle' | 'fitness' | 'entertainment' | 'business' | 'other';
    goal?: 'growth' | 'engagement' | 'visibility';
  };
  credits?: {
    balance: number;
    totalPurchased: number;
    totalSpent: number;
  };
  // Profile Fields
  phone?: string;
  location?: string;
  company?: string;
  photoURL?: string;
  notes?: string;

  createdAt: string;
  updatedAt: string;
}

export interface SocialProfile {
  profileId: string;
  platform: 'instagram' | 'facebook' | 'twitter' | 'linkedin' | 'tiktok' | 'youtube';
  handle: string;
  url: string;
  followers: number;
  status: 'active' | 'inactive';
}

export interface Company {
  companyId: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  website?: string;
  status: 'active' | 'inactive';
  socialProfiles?: SocialProfile[];
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  companyName?: string;
  companyEmail?: string;
}

export interface Service {
  service: number;
  name: string;
  type: string;
  category: string;
  rate: number;
  min: number;
  max: number;
  refill: boolean;
  cancel: boolean;
}

export interface Order {
  _id: string;
  companyId: string;
  userId: string;
  fampayOrderId?: number;
  service: number;
  serviceName: string;
  link: string;
  quantity: number;
  creditsUsed: number;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled' | 'partial';
  startCount?: number;
  remains?: number;
  charge?: number;
  currency?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderData {
  companyId?: string;
  service: number;
  link: string;
  quantity: number;
}

export interface Subscription {
  subscriptionId: string;
  userId: string;
  plan: 'free' | 'growth' | 'enterprise';
  credits: number;
  amount: number;
  currency: string;
  status: 'active' | 'cancelled' | 'expired' | 'pending';
  startDate?: string;
  endDate?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionPlan {
  plan: string;
  name: string;
  credits: number;
  amount: number;
  currency: string;
  features: string[];
}

export interface CreateSubscriptionData {
  plan: string;
  paymentId?: string;
}

export interface Analytics {
  totalOrders: number;
  totalCreditsUsed: number;
  totalSpent: number;
  ordersByStatus: {
    pending: number;
    in_progress: number;
    completed: number;
    cancelled: number;
    partial: number;
  };
  recentOrders: Order[];
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
  };
  statusCode: number;
}
