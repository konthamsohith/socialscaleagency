import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import {
    HelpCircle,
    LogOut,
    PlusCircle,
    FileText,
    Layers,
    User
} from 'lucide-react';

const menuItems = [
    { icon: PlusCircle, label: 'New Order', path: '/dashboard' },
    { icon: FileText, label: 'My Orders', path: '/dashboard/orders' },
    { icon: Layers, label: 'Mass Order', path: '/dashboard/mass-order' },
    { icon: User, label: 'Profile', path: '/dashboard/profile' },
];

export const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

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
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all group"
                >
                    <LogOut className="w-5 h-5 text-red-600/70 group-hover:text-red-600" />
                    <span className="font-medium text-sm">Sign Out</span>
                </button>
            </div>
        </div>
    );
};
