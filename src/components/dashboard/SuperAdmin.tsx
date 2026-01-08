import { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    TrendingUp,
    Search,
    Filter,
    Coins,
    ArrowUpRight,
    ArrowDownRight,
    Percent,
    Wallet,
    Trash2,
    ArrowLeft,
    X,
    ShoppingCart
} from 'lucide-react';
import { servicesData, networks } from '../../data/services';

// Types
interface Order {
    id: string;
    service: string;
    amount: number;
    price: string;
    date: string;
    status: 'Completed' | 'Processing' | 'Pending';
}

interface OnboardingInfo {
    goal: string;
    industry: string;
    targetAudience: string;
    topPlatforms: string[];
}

interface Transaction {
    id: string;
    type: 'Credit' | 'Debit';
    amount: string;
    reason: string;
    date: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    spend: string;
    balance: string;
    orders: number;
    status: 'Active' | 'Inactive';
    joined: string;
    onboarding: OnboardingInfo;
    orderHistory: Order[];
    transactions: Transaction[];
}

const mockUsers: User[] = [
    {
        id: 1,
        name: "Rahul Sharma",
        email: "rahul@example.com",
        spend: "15,420 Credits",
        balance: "2,500 Credits",
        orders: 12,
        status: "Active",
        joined: "Jan 2, 2024",
        onboarding: {
            goal: "Brand Awareness",
            industry: "Fashion & Lifestyle",
            targetAudience: "Gen Z",
            topPlatforms: ["Instagram", "Pinterest"]
        },
        orderHistory: [
            { id: "ORD-001", service: "Instagram Followers", amount: 1000, price: "120 Credits", date: "Jan 10, 2024", status: "Completed" },
            { id: "ORD-005", service: "Instagram Likes", amount: 500, price: "50 Credits", date: "Jan 15, 2024", status: "Completed" },
            { id: "ORD-012", service: "Pinterest Pins", amount: 200, price: "80 Credits", date: "Jan 20, 2024", status: "Processing" }
        ],
        transactions: [
            { id: "TXN-001", type: "Credit", amount: "5,000 Credits", reason: "UPI Deposit", date: "Jan 02, 2024" },
            { id: "TXN-002", type: "Debit", amount: "120 Credits", reason: "Order #ORD-001", date: "Jan 10, 2024" }
        ]
    },
    {
        id: 2,
        name: "Priya Patel",
        email: "priya@example.com",
        spend: "8,200 Credits",
        balance: "1,200 Credits",
        orders: 5,
        status: "Active",
        joined: "Jan 5, 2024",
        onboarding: {
            goal: "Lead Generation",
            industry: "SaaS / B2B",
            targetAudience: "Business Owners",
            topPlatforms: ["LinkedIn", "Twitter"]
        },
        orderHistory: [
            { id: "ORD-002", service: "LinkedIn Connections", amount: 500, price: "300 Credits", date: "Jan 12, 2024", status: "Completed" }
        ],
        transactions: [
            { id: "TXN-003", type: "Credit", amount: "10,000 Credits", reason: "Bank Deposit", date: "Jan 05, 2024" }
        ]
    },
    {
        id: 3,
        name: "Amit Kumar",
        email: "amit.k@gmail.com",
        spend: "22,100 Credits",
        balance: "50 Credits",
        orders: 28,
        status: "Active",
        joined: "Dec 15, 2023",
        onboarding: {
            goal: "Influencer Growth",
            industry: "Entertainment",
            targetAudience: "Mass Market",
            topPlatforms: ["YouTube", "Instagram"]
        },
        orderHistory: [
            { id: "ORD-101", service: "YouTube Views", amount: 5000, price: "800 Credits", date: "Dec 20, 2023", status: "Completed" }
        ],
        transactions: []
    },
    {
        id: 4,
        name: "Sneha Reddy",
        email: "sneha.r@outlook.com",
        spend: "1,500 Credits",
        balance: "3,000 Credits",
        orders: 1,
        status: "Inactive",
        joined: "Dec 20, 2023",
        onboarding: {
            goal: "Personal Branding",
            industry: "Education",
            targetAudience: "Students",
            topPlatforms: ["LinkedIn"]
        },
        orderHistory: [],
        transactions: []
    },
    {
        id: 5,
        name: "Vikram Singh",
        email: "vikram@example.com",
        spend: "45,000 Credits",
        balance: "12,400 Credits",
        orders: 54,
        status: "Active",
        joined: "Nov 12, 2023",
        onboarding: {
            goal: "E-commerce Sales",
            industry: "Retail",
            targetAudience: "Millennials",
            topPlatforms: ["Instagram", "Facebook", "TikTok"]
        },
        orderHistory: [
            { id: "ORD-205", service: "Facebook Ads Reach", amount: 10000, price: "1200 Credits", date: "Jan 05, 2024", status: "Completed" }
        ],
        transactions: []
    },
];

export const SuperAdmin = () => {
    const [activeTab, setActiveTab] = useState<'analytics' | 'pricing'>('analytics');
    const [searchQuery, setSearchQuery] = useState('');

    // Pricing State
    const [prices, setPrices] = useState<Record<string, number>>({});
    const [costs, setCosts] = useState<Record<string, number>>({});
    const [activeStatus, setActiveStatus] = useState<Record<string, boolean>>({});

    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');

    // User Analytics Filter State
    const [filterStatus, setFilterStatus] = useState<'all' | 'Active' | 'Inactive'>('all');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Initialize prices and simulate costs on mount
    useEffect(() => {
        const initialPrices: Record<string, number> = {};
        const initialCosts: Record<string, number> = {};
        const initialActive: Record<string, boolean> = {};

        Object.values(servicesData).forEach(categories => {
            categories.forEach(cat => {
                cat.packages?.forEach(pkg => {
                    // Parse price string "₹174" -> 174
                    const priceVal = parseInt(pkg.price.replace(/[^\d]/g, '')) || 0;
                    initialPrices[pkg.id] = priceVal;
                    // Simulate Cost check (random margin between 20-40% for demo)
                    const randomMargin = 0.6 + (Math.random() * 0.2);
                    initialCosts[pkg.id] = Math.floor(priceVal * randomMargin);
                    initialActive[pkg.id] = true;
                });
            });
        });
        setPrices(initialPrices);
        setCosts(initialCosts);
        setActiveStatus(initialActive);
    }, []);

    const [users, setUsers] = useState(mockUsers);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    // Modal States
    const [isManageFundsOpen, setIsManageFundsOpen] = useState(false);
    const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);
    const [fundAmount, setFundAmount] = useState('');
    const [fundAction, setFundAction] = useState<'add' | 'deduct'>('add');
    const [fundReason, setFundReason] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [txnSearchQuery, setTxnSearchQuery] = useState('');
    // const [selectedPackage, setSelectedPackage] = useState<any | null>(null);
    // const [showSuccess, setShowSuccess] = useState<string | null>(null);
    const navigate = useNavigate();

    const filteredTransactions = useMemo(() => {
        if (!selectedUser) return [];
        return selectedUser.transactions.filter(txn =>
            txn.id.toLowerCase().includes(txnSearchQuery.toLowerCase()) ||
            txn.reason.toLowerCase().includes(txnSearchQuery.toLowerCase())
        );
    }, [selectedUser, txnSearchQuery]);

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleDeleteUser = (userId: number) => {
        if (confirm('Are you sure you want to delete this user?')) {
            setUsers(prev => prev.filter(u => u.id !== userId));
            if (selectedUser?.id === userId) setSelectedUser(null);
        }
    };

    const handleToggleStatus = (userId: number) => {
        setUsers(prev => prev.map(u => {
            if (u.id === userId) {
                const updated = { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } as User;
                if (selectedUser?.id === userId) setSelectedUser(updated);
                return updated;
            }
            return u;
        }));
    };

    const handleManageFunds = async () => {
        if (!selectedUser || !fundAmount) return;
        const amount = parseInt(fundAmount);
        if (isNaN(amount)) return;

        setIsProcessing(true);

        // Simulate premium processing delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const currentBalance = parseInt(selectedUser.balance.replace(/[^0-9]/g, '')) || 0;
        const newBalanceNum = fundAction === 'add' ? currentBalance + amount : currentBalance - amount;
        const newBalance = `${newBalanceNum.toLocaleString()} Credits`;

        const newTransaction: Transaction = {
            id: `TXN-${Math.floor(Math.random() * 10000)}`,
            type: fundAction === 'add' ? 'Credit' : 'Debit',
            amount: `${amount.toLocaleString()} Credits`,
            reason: fundReason || (fundAction === 'add' ? 'Admin Deposit' : 'Admin Deduction'),
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: '2-digit' })
        };

        const updatedUser = {
            ...selectedUser,
            balance: newBalance,
            transactions: [newTransaction, ...selectedUser.transactions]
        };

        setUsers(prev => prev.map(u => u.id === selectedUser.id ? updatedUser : u));
        setSelectedUser(updatedUser);

        setIsProcessing(false);
        setIsSuccess(true);

        // Show success for a bit then close
        setTimeout(() => {
            setIsManageFundsOpen(false);
            setIsSuccess(false);
            setFundAmount('');
            setFundReason('');
        }, 2000);
    };

    // Handle CSV Export
    const handleExportCSV = () => {
        const headers = ['ID', 'Name', 'Email', 'Spend', 'Orders', 'Status', 'Joined'];
        const rows = filteredUsers.map(user => [
            user.id,
            user.name,
            user.email,
            user.spend.replace(' Credits', ''), // Clean up for CSV
            user.orders,
            user.status,
            user.joined
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'user_analytics.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Filter Logic for Pricing
    const getAllPackages = useMemo(() => {
        const all: any[] = [];
        Object.entries(servicesData).forEach(([netId, cats]) => {
            cats.forEach(cat => {
                cat.packages?.forEach(pkg => {
                    if (selectedCategoryFilter === 'all' || netId === selectedCategoryFilter) {
                        all.push({ ...pkg, category: cat.title, network: netId, icon: cat.icon, color: cat.color, bg: cat.bg });
                    }
                });
            });
        });
        return all.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [searchQuery, selectedCategoryFilter]);

    // Handlers
    const handlePriceChange = (id: string, val: string) => {
        const num = parseInt(val) || 0;
        setPrices(prev => ({ ...prev, [id]: num }));
    };

    const handleCostChange = (id: string, val: string) => {
        const num = parseInt(val) || 0;
        setCosts(prev => ({ ...prev, [id]: num }));
    };

    const handleToggleActive = (id: string) => {
        setActiveStatus(prev => ({ ...prev, [id]: !prev[id] }));
    };



    // Derived Metrics - dynamic sum of user spend
    const totalRevenueNum = useMemo(() => {
        return users.reduce((acc, user) => acc + (parseInt(user.spend.replace(/[^0-9]/g, '')) || 0), 0);
    }, [users]);
    const totalRevenueStr = `${totalRevenueNum.toLocaleString()} Credits`;

    // Weighted Average Margin Calculation (Total Profit / Total Revenue)
    const avgMargin = useMemo(() => {
        const pkgs = getAllPackages;
        if (pkgs.length === 0) return 0;
        let totalRevenue = 0;
        let totalProfit = 0;

        pkgs.forEach(p => {
            if (activeStatus[p.id]) {
                const sp = prices[p.id] || 0;
                const cp = costs[p.id] || 0;
                totalRevenue += sp;
                totalProfit += (sp - cp);
            }
        });

        if (totalRevenue === 0) return 0;
        return ((totalProfit / totalRevenue) * 100).toFixed(1);
    }, [getAllPackages, prices, costs, activeStatus]);

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-archivo text-slate-900">Admin Management</h1>
                    <p className="text-slate-500 mt-2">Oversee users, analytics, and service catalog.</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-slate-100/50 border border-slate-200 rounded-xl w-fit">
                <button
                    onClick={() => setActiveTab('analytics')}
                    className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${activeTab === 'analytics' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                >
                    User Analytics
                </button>
                <button
                    onClick={() => setActiveTab('pricing')}
                    className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${activeTab === 'pricing' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                >
                    Price Management
                </button>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'analytics' ? (
                    selectedUser ? (
                        <motion.div
                            key="user-detail"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setSelectedUser(null)}
                                    className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                                >
                                    <ArrowLeft className="w-6 h-6 text-slate-600" />
                                </button>
                                <div>
                                    <h2 className="text-2xl font-bold font-archivo text-slate-900">{selectedUser.name}</h2>
                                    <p className="text-slate-500">{selectedUser.email}</p>
                                </div>
                                <div className="ml-auto flex gap-3">
                                    <button
                                        onClick={() => handleToggleStatus(selectedUser.id)}
                                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${selectedUser.status === 'Active' ? 'bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100' : 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100'}`}
                                    >
                                        {selectedUser.status === 'Active' ? 'Deactivate User' : 'Activate User'}
                                    </button>
                                    <button
                                        onClick={() => handleDeleteUser(selectedUser.id)}
                                        className="px-4 py-2 rounded-xl text-sm font-bold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-all flex items-center gap-2"
                                    >
                                        <Trash2 className="w-4 h-4" /> Delete
                                    </button>
                                    <div className="h-8 w-px bg-slate-200 mx-1" />
                                    <span className={`px-4 py-2 rounded-xl text-sm font-bold ${selectedUser.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {selectedUser.status}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                    <h3 className="font-bold text-slate-900 mb-4 border-b pb-2">Onboarding Profile</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-xs text-slate-400 uppercase font-bold">Primary Goal</p>
                                            <p className="font-medium text-slate-700">{selectedUser.onboarding?.goal || "N/A"}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 uppercase font-bold">Industry</p>
                                            <p className="font-medium text-slate-700">{selectedUser.onboarding?.industry || "N/A"}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 uppercase font-bold">Top Platforms</p>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {selectedUser.onboarding?.topPlatforms?.map(p => (
                                                    <span key={p} className="text-xs px-2 py-1 bg-slate-100 rounded-md text-slate-600">{p}</span>
                                                )) || "N/A"}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                    <h3 className="font-bold text-slate-900 mb-4 border-b pb-2">Activity Summary</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Current Balance</span>
                                            <span className="font-bold text-green-600 font-mono">{selectedUser.balance}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Total Spend</span>
                                            <span className="font-bold text-blue-600 font-mono">{selectedUser.spend}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Total Orders</span>
                                            <span className="font-bold text-slate-900">{selectedUser.orders}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                    <h3 className="font-bold text-slate-900 mb-4 border-b pb-2">Account Insights</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Member Since</span>
                                            <span className="font-medium text-slate-900">{selectedUser.joined}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Last Active</span>
                                            <span className="font-medium text-slate-900">2 hours ago</span>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 uppercase font-bold mb-1">Account Tier</p>
                                            <span className={`px-2 py-1 rounded text-xs font-bold inline-block ${parseInt(selectedUser.spend.replace(/[^0-9]/g, '')) > 20000 ? 'bg-purple-100 text-purple-700' : parseInt(selectedUser.spend.replace(/[^0-9]/g, '')) > 5000 ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                                                {parseInt(selectedUser.spend.replace(/[^0-9]/g, '')) > 20000 ? 'VIP Platinum' : parseInt(selectedUser.spend.replace(/[^0-9]/g, '')) > 5000 ? 'Gold Member' : 'Standard'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                                <div className="p-6 border-b border-slate-100">
                                    <h3 className="font-bold text-lg text-slate-900">Order History</h3>
                                </div>
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50 border-b border-slate-200">
                                        <tr>
                                            {['Order ID', 'Service', 'Amount', 'Price', 'Date', 'Status'].map(h => (
                                                <th key={h} className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {selectedUser.orderHistory?.length > 0 ? (
                                            selectedUser.orderHistory.map(order => (
                                                <tr key={order.id} className="hover:bg-slate-50/50">
                                                    <td className="px-6 py-4 font-mono text-xs font-bold text-slate-500">{order.id}</td>
                                                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{order.service}</td>
                                                    <td className="px-6 py-4 text-sm text-slate-600">{order.amount}</td>
                                                    <td className="px-6 py-4 text-sm font-mono text-blue-600 font-bold">{order.price}</td>
                                                    <td className="px-6 py-4 text-sm text-slate-500">{order.date}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2 py-1 rounded text-xs font-bold ${order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                            order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-600'
                                                            }`}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={6} className="px-6 py-8 text-center text-slate-500 italic">No orders found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="analytics"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                        >
                            {/* Stats Logic Same as Before but Compact */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                {[
                                    { label: 'Total Revenue', value: totalRevenueStr, icon: Coins, color: 'text-green-600', bg: 'bg-green-50' },
                                    { label: 'Total Users', value: '154', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                                    { label: 'Active Orders', value: '42', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
                                    { label: 'Net Margin', value: `${avgMargin}%`, icon: Percent, color: 'text-orange-600', bg: 'bg-orange-50' },
                                ].map((stat, i) => (
                                    <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-xl ${stat.bg}`}>
                                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                                                <p className="text-2xl font-bold font-archivo text-slate-900">{stat.value}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Search & Filters */}
                            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                                <div className="relative w-full md:w-96">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search users..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                                <div className="flex gap-3 relative">
                                    <button
                                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                                        className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm font-bold transition-all ${isFilterOpen ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}
                                    >
                                        <Filter className="w-4 h-4" />
                                        {filterStatus === 'all' ? 'Filters' : `Status: ${filterStatus}`}
                                    </button>

                                    {isFilterOpen && (
                                        <div className="absolute top-full mt-2 w-48 right-0 bg-white border border-slate-200 rounded-xl shadow-xl z-20 overflow-hidden">
                                            <div className="p-2 border-b border-slate-100 bg-slate-50">
                                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Filter by Status</p>
                                            </div>
                                            <div className="p-1">
                                                {['all', 'Active', 'Inactive'].map((status) => (
                                                    <button
                                                        key={status}
                                                        onClick={() => {
                                                            setFilterStatus(status as any);
                                                            setIsFilterOpen(false);
                                                        }}
                                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${filterStatus === status ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
                                                    >
                                                        {status === 'all' ? 'All Users' : status}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        onClick={handleExportCSV}
                                        className="px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2"
                                    >
                                        <span>Export CSV</span>
                                    </button>
                                </div>
                            </div>

                            {/* Users Table */}
                            <div className="bg-white border border-slate-200 rounded-2xl overflow-visible min-h-[400px]">
                                <div className="overflow-visible">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-slate-50 border-b border-slate-200">
                                            <tr>
                                                {['User', 'Spend', 'Orders', 'Joined', 'Status'].map(h => (
                                                    <th key={h} className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {filteredUsers.map((user) => (
                                                <tr
                                                    key={user.id}
                                                    onClick={() => setSelectedUser(user)}
                                                    className="hover:bg-slate-50/50 transition-colors z-10 relative cursor-pointer"
                                                >
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                                                                {user.name.charAt(0)}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-sm text-slate-900">{user.name}</p>
                                                                <p className="text-xs text-slate-500">{user.email}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 font-mono text-sm text-blue-600 font-bold">{user.spend}</td>
                                                    <td className="px-6 py-4 text-sm font-medium">{user.orders}</td>
                                                    <td className="px-6 py-4 text-sm text-slate-500">{user.joined}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-bold ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                                                            {user.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.div>
                    )
                ) : (
                    <motion.div
                        key="pricing"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                    >
                        {/* Advanced Pricing Table */}
                        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                            <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex gap-4 overflow-x-auto">
                                <button
                                    onClick={() => setSelectedCategoryFilter('all')}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedCategoryFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
                                >
                                    All Networks
                                </button>
                                {Object.keys(servicesData).map(net => (
                                    <button
                                        key={net}
                                        onClick={() => setSelectedCategoryFilter(net)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${selectedCategoryFilter === net ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
                                    >
                                        {net}
                                    </button>
                                ))}
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-white border-b border-slate-200">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-[40%]">Package Details</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Cost (Credits)</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Price (Credits)</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Profit</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Margin</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {getAllPackages.map((pkg) => {
                                            const sp = prices[pkg.id] || 0;
                                            const cp = costs[pkg.id] || 0;
                                            const isActive = activeStatus[pkg.id] ?? true;
                                            const profit = sp - cp;
                                            const margin = sp > 0 ? ((profit / sp) * 100).toFixed(1) : '0.0';
                                            // Determine styles based on margin value
                                            let marginColor = 'bg-slate-100 text-slate-700';
                                            let showUpArrow = false;
                                            let showDownArrow = false;

                                            const marginNum = Number(margin);

                                            if (marginNum >= 40) {
                                                marginColor = 'bg-green-100 text-green-700';
                                                showUpArrow = true;
                                            } else if (marginNum >= 20) {
                                                marginColor = 'bg-blue-50 text-blue-700';
                                                showUpArrow = true;
                                            } else if (marginNum >= 0) {
                                                marginColor = 'bg-amber-100 text-amber-700';
                                                showDownArrow = true;
                                            } else {
                                                marginColor = 'bg-red-100 text-red-700';
                                                showDownArrow = true;
                                            }

                                            return (
                                                <tr key={pkg.id} className={`transition-colors group ${isActive ? 'hover:bg-slate-50/50' : 'bg-slate-50/50'}`}>
                                                    <td className={`px-6 py-4 ${!isActive ? 'opacity-50 grayscale' : ''}`}>
                                                        <div className="flex items-start gap-4">
                                                            <div className={`p-2 rounded-lg mt-1 ${pkg.bg}`}>
                                                                <pkg.icon className={`w-4 h-4 ${pkg.color}`} />
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-sm text-slate-900">{pkg.name}</p>
                                                                <div className="flex gap-2 mt-1">
                                                                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">{pkg.id}</span>
                                                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 font-bold">{pkg.category}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleToggleActive(pkg.id);
                                                            }}
                                                            className={`
                                                                relative w-12 h-7 rounded-full transition-colors duration-300 ease-in-out cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-500/20
                                                                ${isActive ? 'bg-blue-600 shadow-inner' : 'bg-slate-200 shadow-inner'}
                                                            `}
                                                        >
                                                            <motion.span
                                                                layout
                                                                transition={{ type: "spring", stiffness: 700, damping: 30 }}
                                                                className={`
                                                                    block w-5 h-5 bg-white rounded-full shadow-lg pointer-events-none
                                                                    ${isActive ? 'ml-[1.35rem]' : 'ml-1'}
                                                                `}
                                                            />
                                                        </button>
                                                    </td>
                                                    <td className={`px-6 py-4 ${!isActive ? 'opacity-50 grayscale' : ''}`}>
                                                        <div className="relative group/input">
                                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] font-bold uppercase tracking-wider">CR</span>
                                                            <input
                                                                type="number"
                                                                disabled={!isActive}
                                                                value={costs[pkg.id]}
                                                                onChange={(e) => handleCostChange(pkg.id, e.target.value)}
                                                                className="w-24 pl-3 pr-8 py-1.5 rounded-lg border border-transparent bg-slate-50 hover:bg-white focus:bg-white focus:border-blue-500 hover:border-slate-300 transition-all font-mono text-sm font-medium outline-none text-slate-600 disabled:bg-transparent"
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className={`px-6 py-4 ${!isActive ? 'opacity-50 grayscale' : ''}`}>
                                                        <div className="relative group/input">
                                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] font-bold uppercase tracking-wider">CR</span>
                                                            <input
                                                                type="number"
                                                                disabled={!isActive}
                                                                value={prices[pkg.id]}
                                                                onChange={(e) => handlePriceChange(pkg.id, e.target.value)}
                                                                className="w-24 pl-3 pr-8 py-1.5 rounded-lg border border-blue-100 bg-blue-50/30 hover:bg-white focus:bg-white focus:border-blue-500 hover:border-blue-300 transition-all font-mono text-sm font-bold outline-none text-blue-700 disabled:bg-transparent disabled:text-slate-500"
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className={`px-6 py-4 ${!isActive ? 'opacity-50 grayscale' : ''}`}>
                                                        <p className={`font-mono text-sm font-bold ${profit > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                                            {profit > 0 ? '+' : ''}{profit}
                                                        </p>
                                                    </td>
                                                    <td className={`px-6 py-4 ${!isActive ? 'opacity-50 grayscale' : ''}`}>
                                                        <div className="flex items-center gap-2">
                                                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${marginColor}`}>
                                                                {margin}%
                                                            </span>
                                                            {isActive && showUpArrow && <ArrowUpRight className="w-3 h-3 text-green-600" />}
                                                            {isActive && showDownArrow && <ArrowDownRight className="w-3 h-3 text-red-500" />}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button
                                                            disabled={!isActive}
                                                            onClick={() => {
                                                                const { icon, ...pkgSerial } = pkg;
                                                                const net = networks.find(n => n.id === pkg.network);
                                                                const netSerial = net ? { ...net, icon: undefined } : undefined;
                                                                navigate('/dashboard/place-order', { state: { package: pkgSerial, network: netSerial || { title: 'Social Platform' } } });
                                                            }}
                                                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95 whitespace-nowrap ${isActive
                                                                ? 'bg-slate-900 text-white hover:bg-blue-600'
                                                                : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                                                                }`}
                                                        >
                                                            <ShoppingCart className="w-3.5 h-3.5" />
                                                            Order Now
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Manage Funds Modal - The "Ultimate" Premium Edition */}
            {/* Manage Funds Modal - Professional Minimalist Edition */}
            <AnimatePresence>
                {isManageFundsOpen && selectedUser && createPortal(
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => !isProcessing && !isSuccess && setIsManageFundsOpen(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.98 }}
                            className="relative w-full max-w-md bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-200"
                        >
                            {/* Processing/Success Subtle Overlays */}
                            <AnimatePresence>
                                {isSuccess && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm"
                                    >
                                        <motion.div
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                                                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-none stroke-current stroke-[3]">
                                                    <path d="M20 6L9 17L4 12" />
                                                </svg>
                                            </div>
                                        </motion.div>
                                        <h4 className="text-lg font-bold text-slate-900">Adjustment Complete</h4>
                                        <p className="text-sm text-slate-500">The balance has been updated</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Header Section - Refined for Professional Minimalism */}
                            <div className="relative pt-10 px-8 pb-6 overflow-hidden">
                                {/* Subtle Decorative Glow */}
                                <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl opacity-50" />
                                <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl opacity-50" />

                                <div className="relative flex justify-between items-start">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm border border-blue-100/50">
                                            <Wallet className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Update Balance</h3>
                                            <p className="text-sm text-slate-500 mt-0.5">Adjusting credits for <span className="font-semibold text-blue-600">{selectedUser.name}</span></p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsManageFundsOpen(false)}
                                        className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors bg-white/50 backdrop-blur-sm border border-slate-200/50"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="px-8 pb-8 space-y-8">
                                {/* Type Toggle - More Refined */}
                                <div className="flex p-1.5 bg-slate-50 border border-slate-200/60 rounded-2xl">
                                    <button
                                        onClick={() => setFundAction('add')}
                                        className={`flex-1 py-3 rounded-[14px] text-sm font-bold transition-all duration-200 ${fundAction === 'add' ? 'bg-white text-blue-600 shadow-[0_2px_8px_rgba(37,99,235,0.06)] border border-slate-200/50' : 'text-slate-400 hover:text-slate-600'}`}
                                    >
                                        Add Funds
                                    </button>
                                    <button
                                        onClick={() => setFundAction('deduct')}
                                        className={`flex-1 py-3 rounded-[14px] text-sm font-bold transition-all duration-200 ${fundAction === 'deduct' ? 'bg-white text-blue-600 shadow-[0_2px_8px_rgba(37,99,235,0.06)] border border-slate-200/50' : 'text-slate-400 hover:text-slate-600'}`}
                                    >
                                        Deduct Funds
                                    </button>
                                </div>

                                {/* Amount Input */}
                                <div className="space-y-4">
                                    <div className="relative group">
                                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-300 group-focus-within:text-blue-500 transition-colors">
                                            {fundAction === 'add' ? '+' : '-'}
                                        </div>
                                        <input
                                            type="number"
                                            value={fundAmount}
                                            onChange={e => setFundAmount(e.target.value)}
                                            placeholder="0.00"
                                            className="w-full pl-12 pr-6 py-6 bg-slate-50 border border-slate-200 rounded-[2rem] text-4xl font-bold text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all placeholder:text-slate-200"
                                        />
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                            Credits
                                        </div>
                                    </div>

                                    {/* Note Input */}
                                    <div className="space-y-2 px-1">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Transaction Note</label>
                                        <input
                                            type="text"
                                            value={fundReason}
                                            onChange={e => setFundReason(e.target.value)}
                                            placeholder="e.g. Compensation for order lag"
                                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:border-blue-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Summary Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Current</p>
                                        <p className="text-sm font-bold text-slate-900">{selectedUser.balance}</p>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                                        <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Upcoming</p>
                                        <p className="text-sm font-bold text-blue-600">
                                            {(() => {
                                                const cur = parseInt(selectedUser.balance.replace(/[^0-9]/g, '')) || 0;
                                                const amt = parseInt(fundAmount) || 0;
                                                return (fundAction === 'add' ? cur + amt : cur - amt).toLocaleString();
                                            })()} CR
                                        </p>
                                    </div>
                                </div>

                                {/* Action */}
                                <button
                                    onClick={handleManageFunds}
                                    disabled={!fundAmount || isProcessing}
                                    className={`w-full py-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-3 ${fundAmount ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/10 active:scale-[0.98]' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}
                                >
                                    {isProcessing ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>Processing Update...</span>
                                        </>
                                    ) : (
                                        <span>Confirm Adjustment</span>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </div>,
                    document.body
                )}
            </AnimatePresence>

            {/* Movement History (Transactions) - Professional Minimalist Edition */}
            <AnimatePresence>
                {isTransactionsOpen && selectedUser && createPortal(
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsTransactionsOpen(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98, y: -10 }}
                            className="relative bg-white rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.12)] w-full max-w-3xl overflow-hidden border border-slate-200 flex flex-col max-h-[85vh]"
                        >
                            {/* Header */}
                            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">Movement History</h3>
                                    <p className="text-sm text-slate-400 mt-0.5">Comprehensive financial logs for <span className="font-semibold text-blue-600">{selectedUser.name}</span></p>
                                </div>
                                <button
                                    onClick={() => setIsTransactionsOpen(false)}
                                    className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Search Bar - Understated */}
                            <div className="px-8 py-4 bg-slate-50/50 border-b border-slate-100">
                                <div className="relative group max-w-md">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Filter by ref or reason..."
                                        value={txnSearchQuery}
                                        onChange={(e) => setTxnSearchQuery(e.target.value)}
                                        className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-sm transition-all shadow-sm"
                                    />
                                </div>
                            </div>

                            {/* Table Area */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar">
                                <table className="w-full text-left border-separate border-spacing-0">
                                    <thead className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm">
                                        <tr>
                                            <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Reference</th>
                                            <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Type</th>
                                            <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Impact</th>
                                            <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Narrative</th>
                                            <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Timestamp</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {filteredTransactions.length > 0 ? (
                                            filteredTransactions.map((txn) => (
                                                <tr key={txn.id} className="hover:bg-slate-50/50 transition-colors">
                                                    <td className="px-8 py-5">
                                                        <span className="font-mono text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md uppercase">{txn.id}</span>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold ${txn.type === 'Credit' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                                                            {txn.type}
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <span className={`text-sm font-bold ${txn.type === 'Credit' ? 'text-blue-600' : 'text-slate-900'}`}>
                                                            {txn.type === 'Credit' ? '+' : '-'}{txn.amount.split(' ')[0]}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <p className="text-sm text-slate-600 font-medium truncate max-w-[180px]">{txn.reason}</p>
                                                    </td>
                                                    <td className="px-8 py-5 text-right">
                                                        <span className="text-[10px] font-bold text-slate-400">{txn.date}</span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="px-8 py-20 text-center text-slate-400 italic text-sm">
                                                    No activity logs found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Footer */}
                            <div className="px-8 py-5 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    Found Logs: <span className="text-slate-900 font-black">{filteredTransactions.length}</span>
                                </p>
                                <button
                                    onClick={() => setIsTransactionsOpen(false)}
                                    className="px-6 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-md active:scale-95"
                                >
                                    Dismiss Console
                                </button>
                            </div>
                        </motion.div>
                    </div>,
                    document.body
                )}
            </AnimatePresence>

            {/* Order Modal Integration Removed */}

            {/* Global Success Notification Removed */}
        </div>
    );
};
