import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Bell, ChevronDown, User as UserIcon, Settings, LogOut, Plus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '../../context/NotificationContext';
import { AddMoneyModal } from './AddMoneyModal';
import { apiService } from '../../services/api';

export const Topbar = () => {
    const { user, logout, refreshUser } = useAuth();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showAddMoney, setShowAddMoney] = useState(false);
    const [balance, setBalance] = useState<number>(0);
    const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
    const notifRef = useRef<HTMLDivElement>(null);
    const userMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        loadBalance();
    }, [user]);

    // Update balance when user wallet changes
    useEffect(() => {
        if (user?.wallet?.balance !== undefined && user?.role !== 'SUPER_ADMIN') {
            setBalance(user.wallet.balance);
        }
    }, [user?.wallet?.balance, user?.role]);

    const loadBalance = async () => {
        try {
            if (user?.role === 'SUPER_ADMIN') {
                // Admin sees Fampage balance
                const response = await apiService.getBalance();
                const fampageBalance = parseFloat(response.data.balance as any) || 0;
                setBalance(fampageBalance);
            } else if (user) {
                // Regular users see wallet balance
                const response = await apiService.getWalletBalance();
                const walletBalance = parseFloat(response.data.balance as any) || 0;
                setBalance(walletBalance);
            }
        } catch (error) {
            console.error('Failed to load balance:', error);
        }
    };

    const handleAddMoneySuccess = async () => {
        await refreshUser();
        await loadBalance();
    };

    const getDisplayRole = (userType?: string) => {
        const roleMap = {
            creator: 'Content Creator',
            business: 'Business Owner',
            agency: 'Marketing Agency'
        };
        return userType ? roleMap[userType as keyof typeof roleMap] : 'User';
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setShowUserMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <header className="h-16 flex items-center justify-between px-6 border-b border-slate-200 bg-white/80 backdrop-blur-xl sticky top-0 z-30">
            <div className="flex-1" />

            <div className="flex items-center gap-4">
                {/* Add Funds Button */}
                <button
                    onClick={() => setShowAddMoney(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 hover:from-blue-100 hover:to-indigo-100 rounded-xl transition-all"
                >
                    <span className="text-blue-600 font-bold">₹{balance.toFixed(2)}</span>
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                        <Plus className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="font-semibold text-blue-600">Add funds</span>
                </button>

                <div className="relative" ref={notifRef}>
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
                                    <Link
                                        to="/dashboard/notifications"
                                        onClick={() => setShowNotifications(false)}
                                        className="block w-full py-2 text-center text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                                    >
                                        View all notifications
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="w-px h-6 bg-slate-200" />
                
                {/* User Menu */}
                <div className="relative" ref={userMenuRef}>
                    <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center gap-3 hover:bg-slate-50 rounded-lg p-2 transition-all"
                    >
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-slate-900">
                                {user?.name || 'User'}
                            </p>
                            <p className="text-xs text-slate-500">
                                {user?.email || 'user@example.com'}
                            </p>
                        </div>
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold shadow-lg shadow-blue-500/20">
                            {user?.name ? getInitials(user.name) : <UserIcon size={18} />}
                        </div>
                        <ChevronDown size={16} className={`text-slate-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {showUserMenu && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50"
                            >
                                <div className="p-3 border-b border-slate-100 bg-slate-50">
                                    <p className="text-sm font-semibold text-slate-900">{user?.name || 'User'}</p>
                                    <p className="text-xs text-slate-500">{user?.email}</p>
                                    {user?.profile?.userType && (
                                        <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                                            {getDisplayRole(user.profile.userType)}
                                        </span>
                                    )}
                                </div>

                                <div className="p-2">
                                    <Link
                                        to="/dashboard/profile"
                                        onClick={() => setShowUserMenu(false)}
                                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 transition-colors"
                                    >
                                        <UserIcon size={16} />
                                        <span className="text-sm font-medium">Profile</span>
                                    </Link>
                                    <Link
                                        to="/dashboard/settings"
                                        onClick={() => setShowUserMenu(false)}
                                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 transition-colors"
                                    >
                                        <Settings size={16} />
                                        <span className="text-sm font-medium">Settings</span>
                                    </Link>
                                </div>

                                <div className="p-2 border-t border-slate-100">
                                    <button
                                        onClick={() => {
                                            setShowUserMenu(false);
                                            logout();
                                        }}
                                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors w-full"
                                    >
                                        <LogOut size={16} />
                                        <span className="text-sm font-medium">Sign Out</span>
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Add Money Modal */}
            <AddMoneyModal
                isOpen={showAddMoney}
                onClose={() => setShowAddMoney(false)}
                onSuccess={handleAddMoneySuccess}
            />
        </header>
    );
};
