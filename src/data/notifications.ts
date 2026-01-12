import { LucideIcon } from 'lucide-react';


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

export const MOCK_NOTIFICATIONS: Notification[] = [];
