import { useState } from 'react';
import { Search, Edit2, Plus } from 'lucide-react';
import { Button } from '../ui/Button';

export const Admin = () => {
    const [searchTerm, setSearchTerm] = useState('');
    // const [isEditing, setIsEditing] = useState<string | null>(null);

    // Mock Data for Admin Pricing
    const [services] = useState([
        // Instagram
        { id: '3894', category: 'Instagram', name: 'IG Reel Views - Cheap', rate: 0.7, min: 50, max: 1000000, status: 'Active' },
        { id: '3895', category: 'Instagram', name: 'IG Reel Views - Good ⚡', rate: 1.8, min: 100, max: 5000000, status: 'Active' },
        { id: '3896', category: 'Instagram', name: 'IG Reel Views - Best ⚡', rate: 2.5, min: 100, max: 10000000, status: 'Active' },
        { id: '3897', category: 'Instagram', name: 'IG Reel Views - Emergency', rate: 2.6, min: 50, max: 1000000, status: 'Active' },
        { id: '3898', category: 'Instagram', name: 'IG Post / Photo Views', rate: 2.5, min: 100, max: 500000, status: 'Active' },
        { id: '3899', category: 'Instagram', name: 'IG Reel Views [ Organic ]', rate: 12.6, min: 100, max: 20000, status: 'Active' },
        { id: '3900', category: 'Instagram', name: 'IG Likes - Real', rate: 15.0, min: 50, max: 5000, status: 'Active' },
        { id: '3901', category: 'Instagram', name: 'IG Followers - Non Drop', rate: 85.0, min: 100, max: 10000, status: 'Active' },

        // YouTube
        { id: '1023', category: 'YouTube', name: 'YouTube Views - Non-Drop', rate: 120, min: 1000, max: 50000, status: 'Active' },
        { id: '1024', category: 'YouTube', name: 'YouTube Likes', rate: 250, min: 50, max: 10000, status: 'Active' },
        { id: '1025', category: 'YouTube', name: 'YouTube Subscribers - Real', rate: 1500, min: 100, max: 5000, status: 'Active' },
        { id: '1026', category: 'YouTube', name: 'YouTube Watch Time (4000h)', rate: 4500, min: 100, max: 4000, status: 'Active' },
        { id: '1027', category: 'YouTube', name: 'YouTube Comments', rate: 800, min: 10, max: 500, status: 'Active' },

        // Facebook
        { id: '2050', category: 'Facebook', name: 'FB Page Likes', rate: 450, min: 100, max: 20000, status: 'Active' },
        { id: '2051', category: 'Facebook', name: 'FB Post Likes', rate: 150, min: 50, max: 10000, status: 'Active' },
        { id: '2052', category: 'Facebook', name: 'FB Video Views', rate: 80, min: 1000, max: 1000000, status: 'Active' },
        { id: '2053', category: 'Facebook', name: 'FB Live Stream Views', rate: 1200, min: 50, max: 5000, status: 'Active' },

        // TikTok
        { id: '5501', category: 'TikTok', name: 'TikTok Views', rate: 0.1, min: 100, max: 1000000, status: 'Active' },
        { id: '5502', category: 'TikTok', name: 'TikTok Likes', rate: 85, min: 50, max: 50000, status: 'Active' },
        { id: '5503', category: 'TikTok', name: 'TikTok Followers', rate: 250, min: 100, max: 20000, status: 'Active' },
        { id: '5504', category: 'TikTok', name: 'TikTok Shares', rate: 45, min: 100, max: 100000, status: 'Active' },

        // Spotify
        { id: '6010', category: 'Spotify', name: 'Spotify Plays (Premium)', rate: 180, min: 1000, max: 500000, status: 'Active' },
        { id: '6011', category: 'Spotify', name: 'Spotify Followers', rate: 350, min: 100, max: 50000, status: 'Active' },
        { id: '6012', category: 'Spotify', name: 'Spotify Monthly Listeners', rate: 220, min: 1000, max: 100000, status: 'Active' },

        // X - Twitter
        { id: '7020', category: 'X - Twitter', name: 'Twitter Followers', rate: 950, min: 50, max: 10000, status: 'Active' },
        { id: '7021', category: 'X - Twitter', name: 'Twitter Retweets', rate: 650, min: 20, max: 5000, status: 'Active' },
        { id: '7022', category: 'X - Twitter', name: 'Twitter Likes', rate: 450, min: 20, max: 5000, status: 'Active' },

        // Discord
        { id: '8030', category: 'Discord', name: 'Discord Server Members (Offline)', rate: 350, min: 100, max: 10000, status: 'Active' },
        { id: '8031', category: 'Discord', name: 'Discord Server Members (Online)', rate: 850, min: 50, max: 5000, status: 'Active' },
        { id: '8032', category: 'Discord', name: 'Discord Boosts (3 Months)', rate: 1200, min: 2, max: 30, status: 'Active' },

        // Threads
        { id: '9040', category: 'Threads', name: 'Threads Followers', rate: 400, min: 100, max: 20000, status: 'Active' },
        { id: '9041', category: 'Threads', name: 'Threads Likes', rate: 120, min: 50, max: 5000, status: 'Active' },
    ]);

    const filteredServices = services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.id.includes(searchTerm)
    );

    // Group services by category
    const groupedServices = filteredServices.reduce((acc, service) => {
        if (!acc[service.category]) {
            acc[service.category] = [];
        }
        acc[service.category].push(service);
        return acc;
    }, {} as Record<string, typeof services>);

    const categories = Object.keys(groupedServices);

    return (
        <div className="w-full animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 font-instagram tracking-tight">Admin Dashboard</h1>
                    <p className="text-slate-500 mt-1">Manage services, pricing, and system settings.</p>
                </div>
                <Button variant="primary" size="sm" className="flex items-center gap-2 bg-electric-purple text-white shadow-lg shadow-blue-500/20">
                    <Plus size={16} /> Add New Service
                </Button>
            </div>

            {/* Pricing / Services Manager */}
            <div className="space-y-6">
                <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900 pl-2">Service Pricing</h2>
                    <div className="relative w-full sm:w-72">
                        <input
                            type="text"
                            placeholder="Search services..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-electric-purple/20 focus:border-electric-purple transition-all"
                        />
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                </div>

                {categories.map((category) => (
                    <div key={category} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center gap-3">
                            <span className="text-lg font-bold text-slate-800">{category}</span>
                            <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-500 text-xs font-medium border border-slate-200 shadow-sm">
                                {groupedServices[category].length} services
                            </span>
                        </div>

                        <div className="overflow-x-auto">
                            <div className="min-w-[800px]">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-slate-100 text-slate-500">
                                            <th className="py-3 px-6 font-semibold w-24">ID</th>
                                            <th className="py-3 px-6 font-semibold">Service Name</th>
                                            <th className="py-3 px-6 font-semibold w-32">Rate (₹)</th>
                                            <th className="py-3 px-6 font-semibold w-40">Min / Max</th>
                                            <th className="py-3 px-6 font-semibold w-24">Status</th>
                                            <th className="py-3 px-6 font-semibold w-20 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {groupedServices[category].map((service) => (
                                            <tr key={service.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                                                <td className="py-4 px-6 font-mono text-slate-500">{service.id}</td>
                                                <td className="py-4 px-6 font-medium text-slate-900">{service.name}</td>
                                                <td className="py-4 px-6 font-bold text-slate-900">₹{service.rate}</td>
                                                <td className="py-4 px-6 text-slate-500 text-xs">
                                                    {service.min.toLocaleString()} / {service.max.toLocaleString()}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                                        <span className="text-emerald-700 font-medium text-xs">{service.status}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <button className="p-2 text-slate-400 hover:text-electric-purple hover:bg-electric-purple/5 rounded-lg transition-colors">
                                                        <Edit2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
