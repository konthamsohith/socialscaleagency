import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import {
    HelpCircle,
    LogOut,
    PlusCircle,
    FileText,
    Layers,
    User,
    ShieldCheck,
    Bell,
    Wallet,
    BarChart3,
    Building2
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { apiService } from '../../services/api';

const baseMenuItems = [
    { icon: PlusCircle, label: 'New Order', path: '/dashboard' },
    { icon: FileText, label: 'My Orders', path: '/dashboard/orders' },
    { icon: Layers, label: 'Mass Order', path: '/dashboard/mass-order' },
    { icon: Bell, label: 'Notifications', path: '/dashboard/notifications' },
    { icon: User, label: 'Profile', path: '/dashboard/profile' },
];

const adminMenuItems = [
    { icon: ShieldCheck, label: 'Admin Panel', path: '/dashboard/admin-panel' },
    { icon: BarChart3, label: 'Admin Analytics', path: '/dashboard/admin-analytics' },
    { icon: Building2, label: 'Company Management', path: '/dashboard/companies' },
];

export const Sidebar = () => {
    const location = useLocation();
    const { logout, isAdmin, user, refreshUser } = useAuth();
    const [balance, setBalance] = useState<number>(0);

    useEffect(() => {
        loadBalance();
        refreshUser(); // Refresh user data to get latest balance
    }, []);

    // Update balance when user data changes (after payment)
    useEffect(() => {
        if (user?.wallet?.balance !== undefined) {
            setBalance(user.wallet.balance);
        }
    }, [user?.wallet?.balance]);

    const loadBalance = async () => {
        try {
            if (user?.role === 'SUPER_ADMIN') {
                // Admin sees Fampage balance
                const response = await apiService.getBalance();
                const fampageBalance = parseFloat(response.data.balance as any) || 0;
                setBalance(fampageBalance);
            } else {
                // Regular users see wallet balance
                const response = await apiService.getWalletBalance();
                const walletBalance = parseFloat(response.data.balance as any) || 0;
                setBalance(walletBalance);
            }
        } catch (error) {
            console.error('Failed to load balance:', error);
        }
    };

    const menuItems = isAdmin ? [...baseMenuItems, ...adminMenuItems] : baseMenuItems;

    return (
        <div className="fixed left-0 top-0 w-64 bg-white border-r border-slate-200 h-screen z-30 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-6">
                <Link to="/" className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20 overflow-hidden shrink-0">
                        <img
                            src="/logo1.png"
                            alt="SocialScale"
                            className="w-5 h-5 object-contain"
                        />
                    </div>
                    <span className="font-archivo font-bold text-xl text-slate-900 tracking-tight">SocialScale</span>
                </Link>
            </div>

            {/* Wallet Balance Display */}
            <div className="mx-4 mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                    <Wallet size={16} className="text-blue-600" />
                    <span className="text-xs font-semibold text-blue-900">{user?.role === 'SUPER_ADMIN' ? 'Fampage Balance' : 'Wallet Balance'}</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">₹{balance.toFixed(2)}</p>
            </div>

            {/* Menu */}
            <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${isActive
                                ? 'bg-slate-50 text-blue-600'
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                            <span className="font-medium text-sm">{item.label}</span>
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute left-0 w-1 h-6 bg-blue-600 rounded-r-full"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="shrink-0 p-4 border-t border-slate-200 space-y-1">
                <div className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    System
                </div>
                <Link
                    to="/dashboard/support"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all group"
                >
                    <HelpCircle className="w-5 h-5 text-slate-400 group-hover:text-slate-600" />
                    <span className="font-medium text-sm">Support</span>
                </Link>
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all group"
                >
                    <LogOut className="w-5 h-5 text-red-600/70 group-hover:text-red-600" />
                    <span className="font-medium text-sm">Sign Out</span>
                </button>
            </div>
        </div>
    );
};
