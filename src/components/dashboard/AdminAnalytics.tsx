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
// import { apiService } from '../../services/api';

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

export const AdminAnalytics = () => {
    const [timeRange, setTimeRange] = useState('year');
    const [data, setData] = useState<{
        revenueData: any[];
        orderData: any[];
        userGrowthData: any[];
        platformDistribution: any[];
    } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Ideally, we would fetch real analytical data from the backend here
                // const response = await apiService.getCompanyAnalytics({ range: timeRange });

                // For now, since the backend might not have historical data populated,
                // we'll simulate a delay and use mock data for demonstration
                await new Promise(resolve => setTimeout(resolve, 1000));
                setData(generateMockData());
            } catch (error) {
                console.error('Failed to fetch analytics:', error);
                // Fallback to mock data on error
                setData(generateMockData());
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [timeRange]);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="bg-white rounded-2xl h-80 border border-slate-200" />
                ))}
            </div>
        );
    }

    if (!data) return null;

    const handleDownloadData = () => {
        if (!data) return;

        // Prepare CSV content
        const headers = ['Month', 'Revenue', 'Profit', 'Orders', 'Completed Orders', 'New Users', 'Active Users'];
        const csvRows = [headers.join(',')];

        // Combine data based on index (assuming all arrays are sorted by month and have same length)
        data.revenueData.forEach((item, index) => {
            const revenue = item.revenue;
            const profit = item.profit;
            const orders = data.orderData[index]?.orders || 0;
            const completed = data.orderData[index]?.completed || 0;
            const users = data.userGrowthData[index]?.users || 0;
            const active = data.userGrowthData[index]?.active || 0;

            csvRows.push([
                item.name,
                revenue,
                profit,
                orders,
                completed,
                users,
                active
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
                            <AreaChart data={data.revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                            <BarChart data={data.orderData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                            <LineChart data={data.userGrowthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                                    data={data.platformDistribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {data.platformDistribution.map((_entry, index) => (
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
