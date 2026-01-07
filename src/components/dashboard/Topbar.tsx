import { useState, useEffect, useRef } from 'react';
import { Bell, Package, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_NOTIFICATIONS = [
    {
        id: 1,
        title: 'Order Status Updated',
        message: 'Your Instagram Followers order (#ORD-7281) is now in progress.',
        time: '2 mins ago',
        type: 'success',
        icon: CheckCircle2,
        read: false,
    },
    {
        id: 2,
        title: 'New Service Available',
        message: 'TikTok Live Stream Views service is now active.',
        time: '1 hour ago',
        type: 'info',
        icon: Info,
        read: false,
    },
    {
        id: 3,
        title: 'Payment Confirmed',
        message: 'Payment for your last mass order has been processed.',
        time: '3 hours ago',
        type: 'success',
        icon: Package,
        read: true,
    },
    {
        id: 4,
        title: 'Welcome to SocialScale',
        message: 'Start your journey by exploring our social growth services.',
        time: '1 day ago',
        type: 'info',
        icon: AlertCircle,
        read: true,
    }
];

export const Topbar = () => {
    const [user, setUser] = useState<User | null>(auth.currentUser);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter(n => !n.read).length;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
        };

        if (showNotifications) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showNotifications]);



    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const markAsRead = (id: number) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };

    return (
        <header className="h-16 flex items-center justify-between px-6 border-b border-slate-200 bg-white/80 backdrop-blur-xl sticky top-0 z-30">
            <div className="flex-1" />

            <div className="flex items-center gap-4">
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className={`relative w-10 h-10 flex items-center justify-center rounded-lg transition-all ${showNotifications ? 'bg-blue-50 text-blue-600' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'
                            }`}
                    >
                        <Bell className="w-5 h-5" />
                        {unreadCount > 0 && (
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white" />
                        )}
                    </button>

                    <AnimatePresence>
                        {showNotifications && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden z-50"
                            >
                                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                    <h3 className="font-bold text-slate-900">Notifications</h3>
                                    <button
                                        onClick={markAllAsRead}
                                        className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
                                    >
                                        Mark all as read
                                    </button>
                                </div>

                                <div className="max-h-[400px] overflow-y-auto">
                                    {notifications.length > 0 ? (
                                        <div className="divide-y divide-slate-50">
                                            {notifications.map((notification) => (
                                                <div
                                                    key={notification.id}
                                                    onClick={() => markAsRead(notification.id)}
                                                    className={`p-4 hover:bg-slate-50 transition-colors cursor-pointer relative group ${!notification.read ? 'bg-blue-50/30' : ''
                                                        }`}
                                                >
                                                    <div className="flex gap-3">
                                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${notification.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                                                            }`}>
                                                            <notification.icon className="w-4 h-4" />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <div className="flex items-center justify-between gap-2">
                                                                <p className={`text-sm font-semibold truncate ${!notification.read ? 'text-slate-900' : 'text-slate-600'
                                                                    }`}>
                                                                    {notification.title}
                                                                </p>
                                                                <span className="text-[10px] text-slate-400 whitespace-nowrap">
                                                                    {notification.time}
                                                                </span>
                                                            </div>
                                                            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                                                {notification.message}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {!notification.read && (
                                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-8 text-center">
                                            <Bell className="w-8 h-8 text-slate-200 mx-auto mb-3" />
                                            <p className="text-sm text-slate-500">No new notifications</p>
                                        </div>
                                    )}
                                </div>

                                <div className="p-3 border-t border-slate-100 bg-slate-50/50">
                                    <button className="w-full py-2 text-center text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                                        View all notifications
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="w-px h-6 bg-slate-200" />
                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-slate-900">
                            {user?.displayName || 'User'}
                        </p>
                        <p className="text-xs text-slate-500">
                            {user?.email || 'Pro Plan'}
                        </p>
                    </div>
                    {user?.photoURL ? (
                        <img
                            src={user.photoURL}
                            alt={user.displayName || 'User'}
                            className="w-9 h-9 rounded-lg object-cover shadow-lg shadow-blue-500/20"
                        />
                    ) : (
                        <img
                            src="/logo1.png"
                            alt="User"
                            className="w-9 h-9 rounded-lg object-cover shadow-lg shadow-blue-500/20"
                        />
                    )}
                </div>
            </div>
        </header>
    );
};
