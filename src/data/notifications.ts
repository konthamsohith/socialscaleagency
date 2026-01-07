import { Package, CheckCircle2, AlertCircle, Info, LucideIcon } from 'lucide-react';


export interface Notification {
    id: number;
    title: string;
    message: string;
    time: string;
    timestamp: Date; // Added for sorting
    type: 'success' | 'info' | 'warning';
    icon: LucideIcon;
    read: boolean;
}

export const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: 1,
        title: 'Order Status Updated',
        message: 'Your Instagram Followers order (#ORD-7281) is now in progress.',
        time: '2 mins ago',
        timestamp: new Date(Date.now() - 1000 * 60 * 2), // 2 mins ago
        type: 'success',
        icon: CheckCircle2,
        read: false,
    },
    {
        id: 2,
        title: 'New Service Available',
        message: 'TikTok Live Stream Views service is now active.',
        time: '1 hour ago',
        timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
        type: 'info',
        icon: Info,
        read: false,
    },
    {
        id: 3,
        title: 'Payment Confirmed',
        message: 'Payment for your last mass order has been processed.',
        time: '3 hours ago',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
        type: 'success',
        icon: Package,
        read: true,
    },
    {
        id: 4,
        title: 'Welcome to SocialScale',
        message: 'Start your journey by exploring our social growth services.',
        time: '1 day ago',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        type: 'info',
        icon: AlertCircle,
        read: true,
    },
    {
        id: 5,
        title: 'Account Security',
        message: 'Your login from a new device was successful.',
        time: '2 days ago',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        type: 'info',
        icon: Info,
        read: true,
    },
    {
        id: 6,
        title: 'Bulk Discount',
        message: 'Get 10% off on YouTube Watch Time packages this week!',
        time: '3 days ago',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
        type: 'success',
        icon: Package,
        read: true,
    }
];
