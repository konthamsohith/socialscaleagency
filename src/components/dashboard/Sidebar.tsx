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
    CreditCard,
    Wallet
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { apiService } from '../../services/api';

const baseMenuItems = [
    { icon: PlusCircle, label: 'New Order', path: '/dashboard' },
    { icon: FileText, label: 'My Orders', path: '/dashboard/orders' },
    { icon: Layers, label: 'Mass Order', path: '/dashboard/mass-order' },
    { icon: CreditCard, label: 'Buy Credits', path: '/dashboard/credits' },
    { icon: Bell, label: 'Notifications', path: '/dashboard/notifications' },
    { icon: User, label: 'Profile', path: '/dashboard/profile' },
];

const adminMenuItem = { icon: ShieldCheck, label: 'Admin Panel', path: '/dashboard/admin-panel' };

export const Sidebar = () => {
    const location = useLocation();
    const { logout, isAdmin, user, refreshUser } = useAuth();
    const [credits, setCredits] = useState<number>(0);

    useEffect(() => {
        loadCredits();
        refreshUser(); // Refresh user data to get latest credits
    }, []);

    // Update credits when user data changes (after payment)
    useEffect(() => {
        if (user?.email !== 'admin@socialscale.com' && user?.credits?.balance !== undefined) {
            setCredits(user.credits.balance);
        }
    }, [user?.credits?.balance]);

    const loadCredits = async () => {
        try {
            if (user?.email === 'admin@socialscale.com') {
                const response = await apiService.getFampageBalance();
                const balance = parseFloat(response.data.balance) || 0;
                setCredits(balance);
            } else {
                const response = await apiService.getCreditsBalance();
                const balance = parseFloat(response.data.balance as any) || 0;
                setCredits(balance);
            }
        } catch (error) {
            console.error('Failed to load credits:', error);
        }
    };

    const menuItems = isAdmin ? [...baseMenuItems, adminMenuItem] : baseMenuItems;

    return (
        <div className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 shrink-0">
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

            {/* Credits Display */}
            <div className="mx-4 mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                    <Wallet size={16} className="text-blue-600" />
                    <span className="text-xs font-semibold text-blue-900">Available Credits</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">{credits.toFixed(2)}</p>
                <Link 
                    to="/dashboard/credits" 
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium mt-2 inline-block"
                >
                    Buy more →
                </Link>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1">
                <div className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Menu
                </div>
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

            <div className="p-4 border-t border-slate-200 space-y-1">
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
