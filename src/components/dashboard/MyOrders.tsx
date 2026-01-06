import { useState } from 'react';
import { ShoppingCart, Search, Settings, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const MyOrders = () => {
    const [activeTab, setActiveTab] = useState('All');

    const tabs = [
        'All', 'In Progress', 'Cancelled', 'Partial', 'Pending', 'Completed', 'Refill'
    ];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold font-archivo text-slate-900 mb-6">My orders</h2>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === tab
                                ? 'bg-slate-900 text-white shadow-md'
                                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                            }`}
                    >
                        {tab}
                    </button>
                ))}

                <div className="ml-auto flex gap-2">
                    <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                        <Search size={18} />
                    </button>
                    <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                        <Settings size={18} />
                    </button>
                </div>
            </div>

            {/* Empty State */}
            <div className="bg-white/50 backdrop-blur-sm border border-slate-200/60 rounded-3xl p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
                <div className="w-16 h-16 bg-electric-purple/10 rounded-2xl flex items-center justify-center mb-6 text-electric-purple">
                    <ShoppingCart size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 font-archivo">You didn't create any orders yet</h3>
                <p className="text-slate-500 max-w-sm mb-8">
                    It looks like you haven't placed any orders yet. Start growing your social media presence today!
                </p>
                <Button className="flex items-center gap-2">
                    Make an order <ArrowRight size={16} />
                </Button>
            </div>
        </div>
    );
};
