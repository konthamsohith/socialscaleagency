
import { Search, Plus } from 'lucide-react';

export const Topbar = () => {
    return (
        <div className="flex items-center justify-between mb-8">
            <div className="relative w-96">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-slate-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search service or order id"
                    className="w-full bg-white/80 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-electric-purple/50 transition-all font-medium font-sans shadow-sm"
                />
            </div>

            <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 transition-colors shadow-sm">
                    <span className="text-slate-500 text-sm font-medium">₹0</span>
                    <div className="w-px h-4 bg-slate-200 mx-1" />
                    <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                        <Plus size={14} /> Add funds
                    </span>
                </button>

                <div className="flex items-center gap-2 bg-white/80 border border-slate-200 rounded-lg px-3 py-1.5 font-sans shadow-sm">
                    <span className="text-slate-600 text-sm font-medium">Discount</span>
                    <span className="bg-gradient-to-r from-electric-purple to-cyan-400 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        0%
                    </span>
                </div>

                <button className="bg-electric-purple/10 hover:bg-electric-purple/20 text-electric-purple border border-electric-purple/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 font-sans">
                    <span className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                    Important Update
                </button>
            </div>
        </div>
    );
};
