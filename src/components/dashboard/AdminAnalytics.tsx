import { useState, useEffect } from 'react';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, Users, ShoppingCart, DollarSign, Download } from 'lucide-react';
import { apiService } from '../../services/api';
import { CompanyAnalytics } from '../../types';

// Mock data generator for when API returns empty
const generateMockData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const revenueData = months.map(month => ({
        name: month,
        revenue: Math.floor(Math.random() * 50000) + 10000,
        profit: Math.floor(Math.random() * 30000) + 5000
    }));

    const orderData = months.map(month => ({
        name: month,
        orders: Math.floor(Math.random() * 500) + 50,
        completed: Math.floor(Math.random() * 450) + 40
    }));

    const userGrowthData = months.map(month => ({
        name: month,
        users: Math.floor(Math.random() * 100) + 10,
        active: Math.floor(Math.random() * 80) + 5
    }));

    const platformDistribution = [
        { name: 'Instagram', value: 45 },
        { name: 'TikTok', value: 25 },
        { name: 'YouTube', value: 15 },
        { name: 'Others', value: 15 }
    ];

    return { revenueData, orderData, userGrowthData, platformDistribution };
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Currency conversion (assuming credits are in INR)
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

export const AdminAnalytics = () => {
    const [timeRange, setTimeRange] = useState('year');
    const [analyticsData, setAnalyticsData] = useState<CompanyAnalytics | null>(null);
    const [userGrowthData, setUserGrowthData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            setLoading(true);
            setError(null);
            try {
                const [analyticsResponse, userGrowthResponse] = await Promise.all([
                    apiService.getCompanyAnalytics(),
                    apiService.getUserGrowthAnalytics()
                ]);

                if (analyticsResponse.success) {
                    setAnalyticsData(analyticsResponse.data);
                }

                if (userGrowthResponse.success) {
                    setUserGrowthData(userGrowthResponse.data);
                }
            } catch (error) {
                console.error('Failed to fetch analytics:', error);
                setError('Failed to load analytics data');
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, [timeRange]);

    // Process analytics data for charts
    const processChartData = () => {
        if (!analyticsData) return generateMockData();

        // Group orders by month for revenue/profit chart
        const monthlyData: { [key: string]: { revenue: number; profit: number; orders: number; completed: number } } = {};

        analyticsData.orders.forEach(order => {
            const date = new Date(order.submittedAt);
            const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

            if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = { revenue: 0, profit: 0, orders: 0, completed: 0 };
            }

            monthlyData[monthKey].revenue += order.revenue || 0;
            monthlyData[monthKey].profit += order.profit || 0;
            monthlyData[monthKey].orders += 1;
            if (order.status === 'completed') {
                monthlyData[monthKey].completed += 1;
            }
        });

        // Convert to arrays for charts
        const revenueData = Object.entries(monthlyData).map(([name, data]) => ({
            name,
            revenue: data.revenue,
            profit: data.profit
        }));

        const orderData = Object.entries(monthlyData).map(([name, data]) => ({
            name,
            orders: data.orders,
            completed: data.completed
        }));

        // Platform distribution from orders
        const platformCounts: { [key: string]: number } = {};
        analyticsData.orders.forEach(order => {
            const platform = order.platform || 'other';
            platformCounts[platform] = (platformCounts[platform] || 0) + 1;
        });

        const platformDistribution = Object.entries(platformCounts).map(([platform, count]) => ({
            name: platform.charAt(0).toUpperCase() + platform.slice(1),
            value: count
        }));

        // User growth data from API
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const userGrowthDataFromAPI = userGrowthData?.chartData || {};
        const processedUserGrowthData = Object.keys(userGrowthDataFromAPI).length > 0
            ? Object.entries(userGrowthDataFromAPI).map(([monthKey, data]: [string, any]) => ({
                name: monthKey,
                users: data.newUsers || 0,
                active: data.activeUsers || 0
            }))
            : months.map(month => ({
                name: month,
                users: Math.floor(Math.random() * 100) + 10,
                active: Math.floor(Math.random() * 80) + 5
            }));

        return { revenueData, orderData, userGrowthData: processedUserGrowthData, platformDistribution };
    };

    const chartData = processChartData();

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="bg-white rounded-2xl h-80 border border-slate-200" />
                ))}
            </div>
        );
    }

    if (error && !analyticsData) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <p className="text-red-600 mb-2">{error}</p>
                    <p className="text-slate-500">Showing mock data for demonstration</p>
                </div>
            </div>
        );
    }

    const handleDownloadData = () => {
        if (!analyticsData) return;

        // Prepare CSV content
        const headers = ['Date', 'Service Type', 'Quantity', 'Cost', 'Revenue', 'Profit', 'Status', 'Platform'];
        const csvRows = [headers.join(',')];

        analyticsData.orders.forEach(order => {
            csvRows.push([
                new Date(order.submittedAt).toLocaleDateString(),
                order.serviceType,
                order.quantity,
                order.realCost || order.cost,
                order.revenue || 0,
                order.profit || 0,
                order.status,
                order.platform
            ].join(','));
        });

        // Create and trigger download
        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `analytics_report_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Performance Analytics</h3>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleDownloadData}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        Export CSV
                    </button>
                    <div className="bg-slate-100 p-1 rounded-lg flex items-center gap-1">
                        {['week', 'month', 'year'].map((range) => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range)}
                                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${timeRange === range
                                    ? 'bg-white text-slate-900 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-900'
                                    }`}
                            >
                                {range.charAt(0).toUpperCase() + range.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            {analyticsData && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-4 rounded-xl border border-slate-200"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <ShoppingCart className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Total Orders</p>
                                <p className="text-2xl font-bold text-slate-900">{analyticsData.summary.overall.totalOrders}</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-4 rounded-xl border border-slate-200"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-50 rounded-lg">
                                <DollarSign className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Revenue</p>
                                <p className="text-2xl font-bold text-slate-900">{formatCurrency(analyticsData.summary.overall.revenue)}</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-4 rounded-xl border border-slate-200"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-50 rounded-lg">
                                <TrendingUp className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Profit</p>
                                <p className="text-2xl font-bold text-slate-900">{formatCurrency(analyticsData.summary.overall.profit)}</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white p-4 rounded-xl border border-slate-200"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-50 rounded-lg">
                                <Users className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Profit Margin</p>
                                <p className="text-2xl font-bold text-slate-900">{analyticsData.summary.overall.profitMargin.toFixed(1)}%</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-50 rounded-lg">
                                <DollarSign className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">Revenue & Profit</h4>
                                <p className="text-xs text-slate-500">Financial performance over time</p>
                            </div>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData.revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ fontSize: '12px', fontWeight: 500 }}
                                    formatter={(value: any, name?: string) => [
                                        name && (name.includes('Revenue') || name.includes('Profit')) ? formatCurrency(Number(value)) : value,
                                        name || ''
                                    ]}
                                />
                                <Legend />
                                <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" name="Revenue" />
                                <Area type="monotone" dataKey="profit" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorProfit)" name="Net Profit" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Orders Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-50 rounded-lg">
                                <ShoppingCart className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">Order Volume</h4>
                                <p className="text-xs text-slate-500">Total orders vs completed</p>
                            </div>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData.orderData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: '#F1F5F9' }}
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend />
                                <Bar dataKey="orders" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="Total Orders" />
                                <Bar dataKey="completed" fill="#A78BFA" radius={[4, 4, 0, 0]} name="Completed" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* User Growth Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <Users className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">User Growth</h4>
                                <p className="text-xs text-slate-500">New signups vs active users</p>
                            </div>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData.userGrowthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="users" stroke="#2563EB" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} name="New Users" />
                                <Line type="monotone" dataKey="active" stroke="#60A5FA" strokeWidth={2} dot={{ r: 4 }} name="Active Users" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Platform Distribution */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-pink-50 rounded-lg">
                                <TrendingUp className="w-5 h-5 text-pink-600" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">Platform Distribution</h4>
                                <p className="text-xs text-slate-500">Orders by platform</p>
                            </div>
                        </div>
                    </div>
                    <div className="h-[300px] w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData.platformDistribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {chartData.platformDistribution.map((_entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend layout="vertical" verticalAlign="middle" align="right" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
