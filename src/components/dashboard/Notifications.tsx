import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Trash2,
    Check,
    Filter,
    MoreVertical,
    Search,
    X,
    Copy,
    Eye,
    CheckCircle,
    Circle,
    ChevronDown,
    Calendar,
    AlertCircle,
    Info,
    CheckCircle2
} from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

export const Notifications = () => {
    const {
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        clearAll,
        deleteNotification
    } = useNotifications();

    const [filter, setFilter] = useState<'all' | 'unread'>('all');
    const [typeFilter, setTypeFilter] = useState<'all' | 'success' | 'info' | 'warning'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeMenu, setActiveMenu] = useState<number | null>(null);
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

    const menuRef = useRef<HTMLDivElement>(null);
    const filterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setActiveMenu(null);
            }
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setShowFilterMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredNotifications = [...notifications]
        .filter(n => {
            // Read status filter
            if (filter === 'unread' && n.read) return false;

            // Type category filter
            if (typeFilter !== 'all' && n.type !== typeFilter) return false;

            // Search query filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                return n.title.toLowerCase().includes(query) || n.message.toLowerCase().includes(query);
            }

            return true;
        })
        .sort((a, b) => {
            if (sortBy === 'newest') return b.timestamp.getTime() - a.timestamp.getTime();
            return a.timestamp.getTime() - b.timestamp.getTime();
        });

    const [selectedNotification, setSelectedNotification] = useState<any>(null);
    const [copiedId, setCopiedId] = useState<number | null>(null);

    const clearFilters = () => {
        setFilter('all');
        setTypeFilter('all');
        setSearchQuery('');
        setSortBy('newest');
    };

    const hasActiveFilters = filter !== 'all' || typeFilter !== 'all' || searchQuery !== '';

    const copyToClipboard = (text: string, id: number) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => {
            setCopiedId(null);
            setActiveMenu(null);
        }, 1500);
    };


    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-archivo text-slate-900">Notifications</h1>
                    <p className="text-slate-500 mt-1">Stay updated with your account activity and orders.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={markAllAsRead}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:border-slate-300 transition-all"
                    >
                        <Check className="w-4 h-4" />
                        Mark all as read
                    </button>
                    <button
                        onClick={clearAll}
                        className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-bold hover:bg-red-100 transition-all"
                    >
                        <Trash2 className="w-4 h-4" />
                        Clear all
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                {/* Search & Tabs Row */}
                <div className="p-4 border-b border-slate-100 bg-slate-50/30 space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search notifications..."
                                className="w-full pl-10 pr-10 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-slate-100 rounded-md transition-colors"
                                >
                                    <X className="w-3.5 h-3.5 text-slate-400" />
                                </button>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            {hasActiveFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="text-xs font-bold text-blue-600 hover:text-blue-700 px-2 py-1"
                                >
                                    Clear all filters
                                </button>
                            )}
                            <div className="relative" ref={filterRef}>
                                <button
                                    onClick={() => setShowFilterMenu(!showFilterMenu)}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold transition-all border ${showFilterMenu || typeFilter !== 'all' || sortBy !== 'newest' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}
                                >
                                    <Filter className="w-4 h-4" />
                                    <span>
                                        {typeFilter === 'all' ? 'Filter' : typeFilter.charAt(0).toUpperCase() + typeFilter.slice(1)}
                                    </span>
                                    <ChevronDown className={`w-3 h-3 transition-transform ${showFilterMenu ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {showFilterMenu && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 5, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden"
                                        >
                                            <div className="p-2 space-y-1">
                                                <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                                    Category
                                                </div>
                                                <button
                                                    onClick={() => { setTypeFilter('all'); setShowFilterMenu(false); }}
                                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${typeFilter === 'all' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <Filter className="w-4 h-4" />
                                                        <span>All Categories</span>
                                                    </div>
                                                    {typeFilter === 'all' && <Check className="w-3 h-3" />}
                                                </button>
                                                <button
                                                    onClick={() => { setTypeFilter('success'); setShowFilterMenu(false); }}
                                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${typeFilter === 'success' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                        <span>Success</span>
                                                    </div>
                                                    {typeFilter === 'success' && <Check className="w-3 h-3" />}
                                                </button>
                                                <button
                                                    onClick={() => { setTypeFilter('info'); setShowFilterMenu(false); }}
                                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${typeFilter === 'info' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <Info className="w-4 h-4 text-blue-500" />
                                                        <span>Information</span>
                                                    </div>
                                                    {typeFilter === 'info' && <Check className="w-3 h-3" />}
                                                </button>
                                                <button
                                                    onClick={() => { setTypeFilter('warning'); setShowFilterMenu(false); }}
                                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${typeFilter === 'warning' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <AlertCircle className="w-4 h-4 text-orange-500" />
                                                        <span>Alerts</span>
                                                    </div>
                                                    {typeFilter === 'warning' && <Check className="w-3 h-3" />}
                                                </button>

                                                <div className="h-px bg-slate-100 my-1" />

                                                <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                                    Sort By
                                                </div>
                                                <button
                                                    onClick={() => { setSortBy('newest'); setShowFilterMenu(false); }}
                                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${sortBy === 'newest' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4" />
                                                        <span>Newest First</span>
                                                    </div>
                                                    {sortBy === 'newest' && <Check className="w-3 h-3" />}
                                                </button>
                                                <button
                                                    onClick={() => { setSortBy('oldest'); setShowFilterMenu(false); }}
                                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${sortBy === 'oldest' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4" />
                                                        <span>Oldest First</span>
                                                    </div>
                                                    {sortBy === 'oldest' && <Check className="w-3 h-3" />}
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-1 p-1 bg-slate-200/50 rounded-lg w-fit">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${filter === 'all' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter('unread')}
                            className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${filter === 'unread' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                        >
                            Unread
                            {unreadCount > 0 && (
                                <span className="bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded text-[10px]">
                                    {unreadCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Notifications List */}
                <div className="divide-y divide-slate-50">
                    <AnimatePresence initial={false}>
                        {filteredNotifications.length > 0 ? (
                            filteredNotifications.map((notification) => (
                                <motion.div
                                    key={notification.id}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className={`p-6 hover:bg-slate-50 transition-colors relative group ${!notification.read ? 'bg-blue-50/20' : ''}`}
                                >
                                    <div className="flex gap-4">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${notification.type === 'success' ? 'bg-green-100 text-green-600' :
                                            notification.type === 'warning' ? 'bg-orange-100 text-orange-600' :
                                                'bg-blue-100 text-blue-600'
                                            }`}>
                                            <notification.icon className="w-6 h-6" />
                                        </div>

                                        <div className="flex-1 space-y-1 pr-32">
                                            <h4 className={`font-bold transition-colors ${!notification.read ? 'text-slate-900' : 'text-slate-600'}`}>
                                                {notification.title}
                                            </h4>
                                            <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">
                                                {notification.message}
                                            </p>
                                        </div>

                                        {/* Row Actions & Time */}
                                        <div className="absolute right-6 top-6 flex items-center gap-4">
                                            <span className="text-xs text-slate-400 font-medium whitespace-nowrap">
                                                {notification.time}
                                            </span>

                                            <div className="flex items-center gap-1">
                                                <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                                                    {!notification.read && (
                                                        <button
                                                            onClick={() => markAsRead(notification.id)}
                                                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                            title="Mark as read"
                                                        >
                                                            <Check className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => deleteNotification(notification.id)}
                                                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                <div className="relative" ref={activeMenu === notification.id ? menuRef : null}>
                                                    <button
                                                        onClick={() => setActiveMenu(activeMenu === notification.id ? null : notification.id)}
                                                        className={`p-1.5 rounded-lg transition-all ${activeMenu === notification.id ? 'bg-slate-200 text-slate-900' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-200/50'}`}
                                                    >
                                                        <MoreVertical className="w-4 h-4" />
                                                    </button>

                                                    <AnimatePresence>
                                                        {activeMenu === notification.id && (
                                                            <motion.div
                                                                initial={{ opacity: 0, scale: 0.95, x: 10 }}
                                                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                                                exit={{ opacity: 0, scale: 0.95, x: 10 }}
                                                                className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-1"
                                                            >
                                                                <button
                                                                    onClick={() => copyToClipboard(notification.message, notification.id)}
                                                                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors ${copiedId === notification.id ? 'text-green-600 bg-green-50' : 'text-slate-600 hover:bg-slate-50'}`}
                                                                >
                                                                    {copiedId === notification.id ? (
                                                                        <Check className="w-4 h-4" />
                                                                    ) : (
                                                                        <Copy className="w-4 h-4" />
                                                                    )}
                                                                    <span>{copiedId === notification.id ? 'Copied!' : 'Copy Message'}</span>
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        setSelectedNotification(notification);
                                                                        setActiveMenu(null);
                                                                    }}
                                                                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                                                                >
                                                                    <Eye className="w-4 h-4" />
                                                                    <span>View Details</span>
                                                                </button>
                                                                <div className="h-px bg-slate-100 my-1" />
                                                                <button
                                                                    onClick={() => { markAsRead(notification.id); setActiveMenu(null); }}
                                                                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                                                                >
                                                                    {notification.read ? (
                                                                        <>
                                                                            <Circle className="w-4 h-4" />
                                                                            <span>Mark as Unread</span>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <CheckCircle className="w-4 h-4" />
                                                                            <span>Mark as Read</span>
                                                                        </>
                                                                    )}
                                                                </button>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {!notification.read && (
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
                                    )}
                                </motion.div>
                            ))
                        ) : (
                            <div className="p-20 text-center">
                                <Search className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-slate-900">
                                    {searchQuery ? 'No matching notifications' : 'No notifications found'}
                                </h3>
                                <p className="text-slate-500">
                                    {searchQuery ? `We couldn't find anything matching "${searchQuery}"` : "You're all caught up! Check back later for updates."}
                                </p>
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="mt-4 text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline"
                                    >
                                        Clear search
                                    </button>
                                )}
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedNotification && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedNotification(null)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
                        >
                            <div className={`p-6 border-b border-slate-100 flex items-center gap-4 ${selectedNotification.type === 'success' ? 'bg-green-50/50' :
                                selectedNotification.type === 'warning' ? 'bg-orange-50/50' :
                                    'bg-blue-50/50'
                                }`}>
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${selectedNotification.type === 'success' ? 'bg-green-100 text-green-600' :
                                    selectedNotification.type === 'warning' ? 'bg-orange-100 text-orange-600' :
                                        'bg-blue-100 text-blue-600'
                                    }`}>
                                    <selectedNotification.icon className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-slate-900">{selectedNotification.title}</h3>
                                    <p className="text-sm text-slate-500">{selectedNotification.time}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedNotification(null)}
                                    className="p-2 hover:bg-black/5 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-slate-500" />
                                </button>
                            </div>
                            <div className="p-6 space-y-6">
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Message</label>
                                    <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        {selectedNotification.message}
                                    </p>
                                </div>
                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => setSelectedNotification(null)}
                                        className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
                                    >
                                        Close
                                    </button>
                                    <button
                                        onClick={() => {
                                            markAsRead(selectedNotification.id);
                                            setSelectedNotification(null);
                                        }}
                                        className="px-4 py-2 text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 rounded-xl transition-all shadow-lg shadow-blue-600/20"
                                    >
                                        Mark as Read
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};
