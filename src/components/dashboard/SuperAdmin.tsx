import { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    TrendingUp,
    Search,
    Filter,
    Coins,
    Percent,
    Wallet,
    ArrowLeft,
    X,
    ShoppingCart,
    Download
} from 'lucide-react';
import { apiService } from '../../services/api';

// Types - Define interface that matches backend User model
interface AdminUser {
    _id: string;
    name: string;
    email: string;
    credits: {
        balance: number;
        totalPurchased: number;
        totalSpent: number;
    };
    status: 'active' | 'inactive' | 'suspended';
    createdAt: string;
    lastLogin?: string;
}

export const SuperAdmin = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Users State
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

    // Orders State
    const [orders, setOrders] = useState<any[]>([]);

    // Fetch users and orders from API
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            
            // Fetch users
            const usersResponse = await apiService.getAllUsers(1, 1000);
            const fetchedUsers: AdminUser[] = (usersResponse.data?.users || usersResponse.data || []).map((user: any) => ({
                _id: user._id || user.userId,
                name: user.name,
                email: user.email,
                credits: user.credits,
                status: user.status,
                createdAt: user.createdAt,
                lastLogin: user.lastLogin
            }));
            setUsers(fetchedUsers);

            // Fetch orders
            const ordersResponse = await apiService.getOrders();
            const fetchedOrders = ordersResponse.data || [];
            setOrders(fetchedOrders);
        } catch (error) {
            console.error('Failed to fetch data:', error);
            setUsers([]);
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    // Modal States
    const [isManageFundsOpen, setIsManageFundsOpen] = useState(false);
    const [fundAmount, setFundAmount] = useState('');
    const [fundAction, setFundAction] = useState<'add' | 'deduct'>('add');
    const [fundReason, setFundReason] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const filteredUsers = users.filter(user => {
        const matchesSearch = 
            user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleDeleteUser = async (userId: string) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        
        try {
            await apiService.deleteUser(userId);
            setUsers(users.filter(u => u._id !== userId));
        } catch (error) {
            console.error('Failed to delete user:', error);
            alert('Failed to delete user');
        }
    };

    const handleToggleStatus = async (userId: string) => {
        try {
            const user = users.find(u => u._id === userId);
            if (!user) return;

            const newStatus = user.status === 'active' ? 'inactive' : 'active';
            await apiService.updateUser(userId, { status: newStatus });
            
            setUsers(users.map(u => 
                u._id === userId ? { ...u, status: newStatus } : u
            ));
        } catch (error) {
            console.error('Failed to toggle user status:', error);
            alert('Failed to update user status');
        }
    };

    const handleManageFunds = async () => {
        if (!selectedUser || !fundAmount || parseFloat(fundAmount) <= 0) return;

        setIsProcessing(true);
        setIsSuccess(false);

        try {
            const amount = parseFloat(fundAmount);
            const currentBalance = selectedUser.credits?.balance || 0;
            const newBalance = fundAction === 'add' 
                ? currentBalance + amount 
                : currentBalance - amount;

            if (newBalance < 0) {
                alert('Insufficient balance for deduction');
                setIsProcessing(false);
                return;
            }

            await apiService.updateUser(selectedUser._id, {
                credits: {
                    ...selectedUser.credits,
                    balance: newBalance,
                    totalPurchased: fundAction === 'add' 
                        ? (selectedUser.credits?.totalPurchased || 0) + amount 
                        : selectedUser.credits?.totalPurchased || 0
                }
            });

            // Update local state
            const updatedUser = {
                ...selectedUser,
                credits: {
                    ...selectedUser.credits,
                    balance: newBalance,
                    totalPurchased: fundAction === 'add' 
                        ? (selectedUser.credits?.totalPurchased || 0) + amount 
                        : selectedUser.credits?.totalPurchased || 0
                }
            };

            setSelectedUser(updatedUser);
            setUsers(users.map(u => u._id === selectedUser._id ? updatedUser : u));

            setIsSuccess(true);
            setTimeout(() => {
                setIsManageFundsOpen(false);
                setFundAmount('');
                setFundReason('');
                setIsSuccess(false);
            }, 2000);
        } catch (error) {
            console.error('Failed to manage funds:', error);
            alert('Failed to update user credits');
        } finally {
            setIsProcessing(false);
        }
    };

    // Handle CSV Export
    const handleExportCSV = () => {
        const csvHeaders = 'Name,Email,Balance,Total Purchased,Status,Joined\n';
        const csvData = filteredUsers.map(user => 
            `"${user.name || 'N/A'}","${user.email}","${user.credits?.balance || 0}","${user.credits?.totalPurchased || 0}","${user.status}","${user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}"`
        ).join('\n');
        
        const blob = new Blob([csvHeaders + csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `users-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    // Derived Metrics - dynamic sum of user balances and stats
    const totalRevenueNum = useMemo(() => {
        return users.reduce((sum, user) => sum + (user.credits?.totalPurchased || 0), 0);
    }, [users]);
    const totalRevenueStr = `${totalRevenueNum.toLocaleString()} Credits`;

    const activeOrdersCount = useMemo(() => {
        return orders.filter(order => 
            order.status === 'pending' || order.status === 'in_progress'
        ).length;
    }, [orders]);

    const totalSpent = useMemo(() => {
        return users.reduce((sum, user) => sum + (user.credits?.totalSpent || 0), 0);
    }, [users]);

    // Calculate net margin (revenue - spent) / revenue * 100
    const netMargin = useMemo(() => {
        if (totalRevenueNum === 0) return '0.0';
        return (((totalRevenueNum - totalSpent) / totalRevenueNum) * 100).toFixed(1);
    }, [totalRevenueNum, totalSpent]);

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-archivo text-slate-900">Admin Management</h1>
                    <p className="text-slate-500 mt-2">Oversee users, analytics, and orders.</p>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {selectedUser ? (
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
                                <h2 className="text-2xl font-bold text-slate-900">{selectedUser.name || 'Unnamed User'}</h2>
                                <p className="text-slate-500">{selectedUser.email}</p>
                            </div>
                        </div>

                        {/* User Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-green-50 rounded-xl">
                                        <Wallet className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Current Balance</p>
                                        <p className="text-2xl font-bold text-slate-900">{selectedUser.credits?.balance || 0}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-blue-50 rounded-xl">
                                        <Coins className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Total Purchased</p>
                                        <p className="text-2xl font-bold text-slate-900">{selectedUser.credits?.totalPurchased || 0}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-purple-50 rounded-xl">
                                        <ShoppingCart className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Total Spent</p>
                                        <p className="text-2xl font-bold text-slate-900">{selectedUser.credits?.totalSpent || 0}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => setIsManageFundsOpen(true)}
                                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                            >
                                Manage Funds
                            </button>
                            <button
                                onClick={() => handleToggleStatus(selectedUser._id)}
                                className={`px-6 py-3 rounded-xl transition-colors font-medium ${
                                    selectedUser.status === 'active'
                                        ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                        : 'bg-green-50 text-green-600 hover:bg-green-100'
                                }`}
                            >
                                {selectedUser.status === 'active' ? 'Deactivate User' : 'Activate User'}
                            </button>
                            <button
                                onClick={() => handleDeleteUser(selectedUser._id)}
                                className="px-6 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-medium"
                            >
                                Delete User
                            </button>
                        </div>

                        {/* User Details Table */}
                        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                            <div className="p-6 border-b border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900">User Information</h3>
                            </div>
                            <div className="p-6 overflow-x-auto">
                                <table className="w-full">
                                    <tbody className="divide-y divide-slate-200">
                                        <tr>
                                            <td className="py-3 text-slate-600 font-medium whitespace-nowrap">User ID</td>
                                            <td className="py-3 text-slate-900 font-mono text-sm break-all">{selectedUser._id}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 text-slate-600 font-medium whitespace-nowrap">Email</td>
                                            <td className="py-3 text-slate-900 break-all">{selectedUser.email}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 text-slate-600 font-medium whitespace-nowrap">Status</td>
                                            <td className="py-3">
                                                <span className={`inline-flex px-2 py-0.5 rounded text-xs font-bold ${
                                                    selectedUser.status === 'active' 
                                                        ? 'bg-green-100 text-green-700' 
                                                        : 'bg-slate-100 text-slate-600'
                                                }`}>
                                                    {selectedUser.status}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 text-slate-600 font-medium whitespace-nowrap">Joined</td>
                                            <td className="py-3 text-slate-900">
                                                {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : 'N/A'}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 text-slate-600 font-medium whitespace-nowrap">Last Login</td>
                                            <td className="py-3 text-slate-900">
                                                {selectedUser.lastLogin ? new Date(selectedUser.lastLogin).toLocaleDateString() : 'Never'}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <div className="space-y-6">
                        {/* Stats Overview */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                            {[
                                { label: 'Total Revenue', value: totalRevenueStr, icon: Coins, color: 'text-green-600', bg: 'bg-green-50' },
                                { label: 'Total Users', value: loading ? '...' : users.length.toString(), icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                                { label: 'Active Orders', value: loading ? '...' : activeOrdersCount.toString(), icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
                                { label: 'Net Margin', value: `${netMargin}%`, icon: Percent, color: 'text-orange-600', bg: 'bg-orange-50' },
                            ].map((stat, i) => (
                                <div key={i} className="p-4 md:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                                    <div className="flex items-center gap-3 md:gap-4">
                                        <div className={`p-2 md:p-3 rounded-xl ${stat.bg} shrink-0`}>
                                            <stat.icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.color}`} />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs md:text-sm text-slate-500 truncate">{stat.label}</p>
                                            <p className="text-xl md:text-2xl font-bold text-slate-900 truncate">{stat.value}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* User Management */}
                        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                            <div className="p-4 md:p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <h3 className="text-lg font-bold text-slate-900">All Users</h3>
                                <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                                    <div className="relative flex-1 min-w-[200px] sm:flex-initial">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="Search users..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full sm:w-64 pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                                        />
                                    </div>
                                    <div className="relative">
                                        <button
                                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                                            className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                                        >
                                            <Filter className="w-5 h-5 text-slate-600" />
                                        </button>
                                        {isFilterOpen && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-10 overflow-hidden">
                                                {(['all', 'active', 'inactive'] as const).map((status) => (
                                                    <button
                                                        key={status}
                                                        onClick={() => {
                                                            setFilterStatus(status);
                                                            setIsFilterOpen(false);
                                                        }}
                                                        className={`w-full text-left px-4 py-2 hover:bg-slate-50 transition-colors text-sm ${
                                                            filterStatus === status ? 'bg-blue-50 text-blue-600 font-medium' : 'text-slate-700'
                                                        }`}
                                                    >
                                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={handleExportCSV}
                                        className="px-3 md:px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-2 whitespace-nowrap text-sm"
                                    >
                                        <Download className="w-4 h-4" />
                                        <span className="hidden sm:inline">Export CSV</span>
                                        <span className="sm:hidden">Export</span>
                                    </button>
                                </div>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider whitespace-nowrap">User</th>
                                            <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider whitespace-nowrap">Balance</th>
                                            <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider whitespace-nowrap hidden sm:table-cell">Purchased</th>
                                            <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider whitespace-nowrap hidden lg:table-cell">Spent</th>
                                            <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider whitespace-nowrap hidden md:table-cell">Joined</th>
                                            <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider whitespace-nowrap">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200">
                                        {loading ? (
                                            <tr>
                                                <td colSpan={6} className="px-4 md:px-6 py-8 md:py-12 text-center text-slate-500 text-sm">
                                                    Loading users...
                                                </td>
                                            </tr>
                                        ) : filteredUsers.length === 0 ? (
                                            <tr>
                                                <td colSpan={6} className="px-4 md:px-6 py-8 md:py-12 text-center text-slate-500 text-sm">
                                                    No users found.
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredUsers.map((user) => (
                                                <tr 
                                                    key={user._id} 
                                                    onClick={() => setSelectedUser(user)}
                                                    className="hover:bg-slate-50 cursor-pointer transition-colors"
                                                >
                                                    <td className="px-4 md:px-6 py-3 md:py-4">
                                                        <div className="min-w-0">
                                                            <div className="font-medium text-slate-900 text-sm truncate">{user.name || 'Unnamed User'}</div>
                                                            <div className="text-xs md:text-sm text-slate-500 truncate">{user.email}</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                                                        <span className="font-mono font-medium text-slate-900 text-sm">
                                                            {user.credits?.balance || 0}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap hidden sm:table-cell">
                                                        <span className="font-mono text-slate-600 text-sm">
                                                            {user.credits?.totalPurchased || 0}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap hidden lg:table-cell">
                                                        <span className="font-mono text-slate-600 text-sm">
                                                            {user.credits?.totalSpent || 0}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 md:px-6 py-3 md:py-4 text-slate-600 text-sm whitespace-nowrap hidden md:table-cell">
                                                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                                    </td>
                                                    <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                                                        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-bold ${
                                                            user.status === 'active' 
                                                                ? 'bg-green-100 text-green-700' 
                                                                : 'bg-slate-100 text-slate-600'
                                                        }`}>
                                                            {user.status === 'active' ? 'Active' : 'Inactive'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </AnimatePresence>

            {/* Manage Funds Modal */}
            <AnimatePresence>
                {isManageFundsOpen && selectedUser && createPortal(
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={() => !isProcessing && setIsManageFundsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
                        >
                            <div className="p-4 md:p-6 border-b border-slate-200 flex items-center justify-between">
                                <h3 className="text-lg md:text-xl font-bold text-slate-900">Manage User Funds</h3>
                                <button
                                    onClick={() => !isProcessing && setIsManageFundsOpen(false)}
                                    disabled={isProcessing}
                                    className="p-2 hover:bg-slate-100 rounded-xl transition-colors disabled:opacity-50"
                                >
                                    <X className="w-5 h-5 text-slate-600" />
                                </button>
                            </div>

                            <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                                <div className="p-4 bg-slate-50 rounded-xl">
                                    <p className="text-sm text-slate-600">Current Balance</p>
                                    <p className="text-2xl md:text-3xl font-bold text-slate-900">{selectedUser.credits?.balance || 0} Credits</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-700">Action</label>
                                    <div className="flex gap-2 md:gap-3">
                                        <button
                                            onClick={() => setFundAction('add')}
                                            disabled={isProcessing}
                                            className={`flex-1 px-3 md:px-4 py-2 md:py-3 rounded-xl font-medium transition-all text-sm md:text-base ${
                                                fundAction === 'add'
                                                    ? 'bg-green-600 text-white'
                                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                            }`}
                                        >
                                            Add Credits
                                        </button>
                                        <button
                                            onClick={() => setFundAction('deduct')}
                                            disabled={isProcessing}
                                            className={`flex-1 px-3 md:px-4 py-2 md:py-3 rounded-xl font-medium transition-all text-sm md:text-base ${
                                                fundAction === 'deduct'
                                                    ? 'bg-red-600 text-white'
                                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                            }`}
                                        >
                                            Deduct Credits
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-700">Amount</label>
                                    <input
                                        type="number"
                                        value={fundAmount}
                                        onChange={(e) => setFundAmount(e.target.value)}
                                        disabled={isProcessing}
                                        placeholder="Enter amount"
                                        className="w-full px-4 py-2 md:py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:opacity-50 text-sm md:text-base"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-700">Reason (Optional)</label>
                                    <textarea
                                        value={fundReason}
                                        onChange={(e) => setFundReason(e.target.value)}
                                        disabled={isProcessing}
                                        placeholder="Enter reason for this transaction"
                                        rows={3}
                                        className="w-full px-4 py-2 md:py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none disabled:opacity-50 text-sm md:text-base"
                                    />
                                </div>

                                {isSuccess && (
                                    <div className="p-3 md:p-4 bg-green-50 border border-green-200 rounded-xl">
                                        <p className="text-green-700 font-medium text-center text-sm md:text-base">
                                            ✓ Funds updated successfully!
                                        </p>
                                    </div>
                                )}

                                <button
                                    onClick={handleManageFunds}
                                    disabled={isProcessing || !fundAmount || parseFloat(fundAmount) <= 0}
                                    className={`w-full px-4 md:px-6 py-2 md:py-3 rounded-xl font-medium transition-all text-sm md:text-base ${
                                        fundAction === 'add'
                                            ? 'bg-green-600 hover:bg-green-700 text-white'
                                            : 'bg-red-600 hover:bg-red-700 text-white'
                                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    {isProcessing ? 'Processing...' : `${fundAction === 'add' ? 'Add' : 'Deduct'} Credits`}
                                </button>
                            </div>
                        </motion.div>
                    </div>,
                    document.body
                )}
            </AnimatePresence>
        </div>
    );
};
