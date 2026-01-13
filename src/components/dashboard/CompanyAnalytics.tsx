import { useState, useMemo } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from 'recharts';
import { Download, TrendingUp, Users, Activity, Calendar } from 'lucide-react';
import { Company } from '../../types';

interface CompanyAnalyticsProps {
    company: Company;
}

export const CompanyAnalytics = ({ company }: CompanyAnalyticsProps) => {
    const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

    // Mock Data Generation based on company profiles
    const analyticsData = useMemo(() => {
        const data = [];
        const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
        const now = new Date();

        // Calculate base totals from actual profile data or fallback
        const totalFollowers = company.socialProfiles?.reduce((acc, p) => acc + (p.followers || 0), 0) || 0;
        const baseGrowthRate = 0.02 + (Math.random() * 0.05); // 2-7% growth

        for (let i = days; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);

            // Create a realistic growth curve
            const growthFactor = 1 - (i / days) * baseGrowthRate;
            const dailyFollowers = Math.floor(totalFollowers * growthFactor);
            const dailyEngagement = Math.floor(dailyFollowers * (0.05 + Math.random() * 0.02)); // 5-7% engagement

            data.push({
                date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                followers: dailyFollowers,
                engagement: dailyEngagement,
                isoDate: date.toISOString()
            });
        }
        return data;
    }, [company, timeRange]);

    // Platform breakdown data
    const platformData = useMemo(() => {
        return company.socialProfiles?.map(profile => ({
            name: profile.platform,
            followers: profile.followers || Math.floor(Math.random() * 5000) + 1000,
            engagement: Math.floor((profile.followers || 2000) * 0.08)
        })) || [];
    }, [company]);

    const handleExport = () => {
        // Generate CSV content
        const headers = ['Date', 'Total Followers', 'Total Engagement'];
        const rows = analyticsData.map(row => [row.date, row.followers, row.engagement]);

        // Add Platform breakdown section
        const platformHeaders = ['\n\nPlatform Breakdown', ''];
        const platformSubHeaders = ['Platform', 'Followers', 'Est. Engagement'];
        const platformRows = platformData.map(p => [p.name, p.followers, p.engagement]);

        const csvContent = [
            `Analytics Report for ${company.name} - ${timeRange.toUpperCase()}`,
            headers.join(','),
            ...rows.map(r => r.join(',')),
            platformHeaders.join(','),
            platformSubHeaders.join(','),
            ...platformRows.map(r => r.join(','))
        ].join('\n');

        // Create and trigger download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `${company.name.replace(/\s+/g, '_')}_analytics_${timeRange}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    if (!company.socialProfiles || company.socialProfiles.length === 0) {
        return null;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Performance Analytics</h2>
                    <p className="text-slate-500 text-sm">Track growth and engagement across all platforms</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex bg-slate-100 rounded-lg p-1">
                        {(['7d', '30d', '90d'] as const).map((range) => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range)}
                                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${timeRange === range
                                    ? 'bg-white text-slate-900 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                {range.toUpperCase()}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all text-sm font-semibold shadow-lg shadow-slate-900/20"
                    >
                        <Download className="w-4 h-4" />
                        Export Report
                    </button>
                </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <Users className="w-6 h-6" />
                        </div>
                        <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" /> +2.4%
                        </span>
                    </div>
                    <h3 className="text-slate-500 text-sm font-medium">Total Audience</h3>
                    <p className="text-2xl font-bold text-slate-900">
                        {(analyticsData[analyticsData.length - 1]?.followers || 0).toLocaleString()}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                            <Activity className="w-6 h-6" />
                        </div>
                        <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" /> +5.1%
                        </span>
                    </div>
                    <h3 className="text-slate-500 text-sm font-medium">Avg. Engagement</h3>
                    <p className="text-2xl font-bold text-slate-900">
                        {(analyticsData[analyticsData.length - 1]?.engagement || 0).toLocaleString()}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                            <Calendar className="w-6 h-6" />
                        </div>
                    </div>
                    <h3 className="text-slate-500 text-sm font-medium">Data Period</h3>
                    <p className="text-2xl font-bold text-slate-900">Last {timeRange.replace('d', ' Days')}</p>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Growth Chart */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-80">
                    <h3 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wide">Audience Growth</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={analyticsData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                            <XAxis
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#64748B', fontSize: 12 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#64748B', fontSize: 12 }}
                                tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="followers"
                                stroke="#2563EB"
                                strokeWidth={3}
                                dot={false}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Platform Chart */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-80">
                    <h3 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wide">Platform Distribution</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={platformData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E2E8F0" />
                            <XAxis type="number" hide />
                            <YAxis
                                dataKey="name"
                                type="category"
                                width={80}
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#475569', fontSize: 12, fontWeight: 500 }}
                            />
                            <Tooltip
                                cursor={{ fill: '#F1F5F9' }}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Bar
                                dataKey="followers"
                                fill="#3B82F6"
                                radius={[0, 4, 4, 0]}
                                barSize={24}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
