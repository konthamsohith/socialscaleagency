import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Search,
    MoreHorizontal,
    ArrowUpRight,
    Clock,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Copy,
    Instagram,
    Youtube,
    Twitter,
    Facebook,
    Linkedin,
    ExternalLink
} from 'lucide-react';
import { mockOrders, type Order } from '../../data/mockData';

const PlatformIcon = ({ platform }: { platform: Order['platform'] }) => {
    switch (platform) {
        case 'instagram': return <Instagram size={16} className="text-pink-600" />;
        case 'youtube': return <Youtube size={16} className="text-red-600" />;
        case 'twitter': return <Twitter size={16} className="text-sky-500" />;
        case 'facebook': return <Facebook size={16} className="text-blue-600" />;
        case 'linkedin': return <Linkedin size={16} className="text-blue-700" />;
        case 'spotify': return <div className="p-0.5 bg-green-500 rounded-full"><div className="w-3 h-3 bg-white rounded-full" /></div>; // Simple fallback
        default: return <ExternalLink size={16} className="text-slate-400" />;
    }
};

const StatusBadge = ({ status }: { status: Order['status'] }) => {
    const styles = {
        completed: "bg-green-100 text-green-700 border-green-200",
        processing: "bg-blue-100 text-blue-700 border-blue-200",
        pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
        canceled: "bg-red-100 text-red-700 border-red-200",
        partial: "bg-orange-100 text-orange-700 border-orange-200"
    };

    const labels = {
        completed: "Completed",
        processing: "Processing",
        pending: "Pending",
        canceled: "Canceled",
        partial: "Partial"
    };

    const icons = {
        completed: <CheckCircle2 size={12} />,
        processing: <Clock size={12} className="animate-pulse" />,
        pending: <AlertCircle size={12} />,
        canceled: <XCircle size={12} />,
        partial: <AlertCircle size={12} />
    };

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
            {icons[status]}
            {labels[status]}
        </span>
    );
};

export const MyOrders = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState<'all' | 'processing' | 'completed' | 'canceled'>('all');
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

    useEffect(() => {
        const query = searchParams.get('q');
        if (query !== null) {
            setSearchQuery(query);
        }
    }, [searchParams]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        if (value) {
            setSearchParams({ q: value });
        } else {
            setSearchParams({});
        }
    };

    const filteredOrders = mockOrders.filter(order => {
        const matchesTab = activeTab === 'all' || order.status === activeTab;
        const matchesSearch =
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.link.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 font-archivo">My Orders</h1>
                    <p className="text-slate-500 mt-1">Track and manage your service requests</p>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex gap-2 p-1 bg-slate-100/80 rounded-xl overflow-x-auto max-w-full">
                    {(['all', 'processing', 'completed', 'canceled'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize whitespace-nowrap ${activeTab === tab
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search orders..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-200">
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Service</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Link</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Quantity</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order) => (
                                    <motion.tr
                                        key={order.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="hover:bg-slate-50/80 transition-colors group"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 group cursor-pointer">
                                                <span className="font-mono text-sm font-medium text-slate-700">{order.id}</span>
                                                <Copy size={12} className="text-slate-300 group-hover:text-blue-500 transition-colors opacity-0 group-hover:opacity-100" />
                                            </div>
                                            <div className="text-xs text-slate-400 mt-1">{order.date}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                                                    <PlatformIcon platform={order.platform} />
                                                </div>
                                                <span className="text-sm font-medium text-slate-900">{order.service}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a
                                                href={order.link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 hover:underline"
                                            >
                                                <span className="max-w-[150px] truncate">{order.link}</span>
                                                <ArrowUpRight size={12} />
                                            </a>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-slate-700">{order.quantity.toLocaleString()}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-slate-900">${order.price.toFixed(2)}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={order.status} />
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                                <Search size={24} />
                                            </div>
                                            <p className="font-medium">No orders found</p>
                                            <p className="text-sm text-slate-400">Try adjusting your filters or search query</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination (Simplified) */}
                <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
                    <div className="text-sm text-slate-500">
                        Showing <span className="font-medium text-slate-900">1</span> to <span className="font-medium text-slate-900">{filteredOrders.length}</span> of <span className="font-medium text-slate-900">{((mockOrders.length))}</span> results
                    </div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-500 hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
                        <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-500 hover:bg-slate-50 disabled:opacity-50" disabled>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
