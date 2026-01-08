export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

export const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_S0YsSSmMBuT5yg';

export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  COMPANY_USER: 'COMPANY_USER'
} as const;

export const ORDER_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  PARTIAL: 'partial'
} as const;

export const SUBSCRIPTION_PLANS = {
  FREE: 'free',
  GROWTH: 'growth',
  ENTERPRISE: 'enterprise'
} as const;

export const SERVICE_TYPES = {
  FOLLOW: 'follow',
  LIKE: 'like',
  SUBSCRIBE: 'subscribe',
  COMMENT: 'comment',
  RETWEET: 'retweet',
  FAVORITE: 'favorite',
  VOTE: 'vote'
} as const;

export const NETWORKS = [
  'Instagram',
  'Facebook',
  'YouTube',
  'Twitter',
  'LinkedIn',
  'TikTok',
  'Threads',
  'Pinterest',
  'Twitch',
  'Discord',
  'Spotify',
  'Telegram',
  'Quora'
] as const;
