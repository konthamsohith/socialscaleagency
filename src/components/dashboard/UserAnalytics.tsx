import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';

interface UserAnalyticsProps {
    orders: any[];
    userId: string;
    userName: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const UserAnalytics = ({ orders, userId, userName }: UserAnalyticsProps) => {
    // Filter orders for this user
    const userOrders = orders.filter(o => o.userId === userId);

    if (userOrders.length === 0) {
        return (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500">
                No analytics data available for this user.
            </div>
        );
    }

    // Process data for charts
    // 1. Spending History (Last 6 months or based on available data)
    const spendingDataMap = new Map<string, number>();
    userOrders.forEach(order => {
        const date = new Date(order.createdAt);
        const month = date.toLocaleString('default', { month: 'short' });
        const existing = spendingDataMap.get(month) || 0;
        spendingDataMap.set(month, existing + (order.total || 0));
    });

    const spendingData = Array.from(spendingDataMap).map(([name, amount]) => ({ name, amount }));

    // 2. Order Status Distribution
    const statusDataMap = new Map<string, number>();
    userOrders.forEach(order => {
        const status = order.status || 'unknown';
        const existing = statusDataMap.get(status) || 0;
        statusDataMap.set(status, existing + 1);
    });

    const statusData = Array.from(statusDataMap).map(([name, value]) => ({ name, value }));

    // Handle CSV Export
    const handleDownloadReport = () => {
        const headers = ['Order ID', 'Date', 'Service', 'Amount', 'Status'];
        const csvRows = [headers.join(',')];

        userOrders.forEach(order => {
            csvRows.push([
                order._id || order.id,
                new Date(order.createdAt).toLocaleDateString(),
                `"${order.serviceName || order.service || 'N/A'}"`, // Quote to handle commas
                order.total || 0,
                order.status
            ].join(','));
        });

        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `user_report_${userName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Analytics & Reports</h3>
                <button
                    onClick={handleDownloadReport}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                    <Download className="w-4 h-4" />
                    Export User Report
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Spending History Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
                >
                    <h4 className="font-bold text-slate-900 mb-4">Spending History</h4>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={spendingData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: '#F1F5F9' }}
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="amount" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Amount Spent" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Order Status Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
                >
                    <h4 className="font-bold text-slate-900 mb-4">Order Status Codes</h4>
                    <div className="h-[250px] w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {statusData.map((_entry, index) => (
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
