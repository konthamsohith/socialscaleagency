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
  notes?: string;
  logo?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  billingDetails?: {
    contactName?: string;
    contactEmail?: string;
    contactPhone?: string;
    taxId?: string;
    billingAddress?: {
      street?: string;
      city?: string;
      state?: string;
      zipCode?: string;
      country?: string;
    };
  };
  status: 'active' | 'inactive' | 'suspended';
  settings?: {
    timezone?: string;
    currency?: string;
    invoiceMultiplier?: number;
  };
  socialProfiles?: SocialProfile[]; // This is computed on frontend, not stored in backend
  socialProfilesCount?: number; // Count of social profiles from backend
  createdAt: string;
  updatedAt: string;
}

export interface SocialAccount {
  _id: string;
  accountId?: string;
  companyId: string;
  platform: 'Instagram' | 'TikTok' | 'LinkedIn' | 'YouTube' | 'X (Twitter)' | 'Threads' | 'Pinterest' | 'Discord' | 'Facebook' | 'Spotify' | 'Telegram' | 'Quora';
  accountName: string;
  accountUrl: string;
  username?: string;
  accountType?: 'profile' | 'page' | 'channel' | 'group' | 'other';
  notes?: string;
  isActive: boolean;
  metadata?: {
    followers?: number;
    followersLastUpdated?: string;
    verificationStatus?: 'verified' | 'unverified' | 'unknown';
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateSocialAccountData {
  companyId: string;
  platform: string;
  accountName: string;
  accountUrl: string;
  username?: string;
  notes?: string;
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
  userId?: string;
  providerId?: string;
  apiOrderId?: string;
  serviceId: number;
  serviceName: string;
  platform: string;
  serviceType: string;
  targetUrl: string;
  quantity: number;
  cost: number;
  creditsUsed: number;
  status: 'pending' | 'in_progress' | 'completed' | 'partial' | 'awaiting' | 'canceled' | 'fail';
  submittedAt: string;
  createdAt?: string;
  updatedAt?: string;
  invoiceId?: string;
}

export interface CreateOrderData {
  companyId?: string;
  service: string | number;
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

export interface CompanyAnalytics {
  summary: {
    overall: {
      totalOrders: number;
      realCost: number;
      revenue: number;
      profit: number;
      profitMargin: number;
    };
    byServiceType: Array<{
      serviceType: string;
      totalUsageCount: number;
      totalQuantity: number;
      realCost: number;
      revenue: number;
      profit: number;
      dates: string[];
      uniqueTargets: number;
      profitMargin: string;
    }>;
  };
  detailed: Array<{
    serviceType: string;
    date: string;
    usageCount: number;
    totalQuantity: number;
    realCost: number;
    revenue: number;
    profit: number;
    uniqueTargets: number;
    profitMargin: number;
  }>;
  orders: Array<Order & {
    realCost: number;
    revenue: number;
    profit: number;
    profitMargin: number;
  }>;
  totalOrders: number;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
  };
  statusCode: number;
}
