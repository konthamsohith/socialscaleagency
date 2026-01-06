import { useState, useRef, useEffect } from 'react';
import { Search, Plus, Package, Hash } from 'lucide-react';
import { initialServices } from '../../data/services';

interface TopbarProps {
    onNavigate?: (page: string) => void;
    onServiceSelect?: (serviceId: string) => void;
}

export const Topbar = ({ onNavigate, onServiceSelect }: TopbarProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Mock searching for services
    const filteredServices = initialServices.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.id.includes(searchTerm)
    ).slice(0, 5); // Limit to 5 results

    // Mock finding an order ID (just for demo)
    const orderMatch = searchTerm.match(/^\d{4,}$/) ? searchTerm : null;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const hasResults = searchTerm.length > 0 && (filteredServices.length > 0 || orderMatch);

    const handleServiceClick = (serviceId: string) => {
        if (onServiceSelect) {
            onServiceSelect(serviceId);
        }
        if (onNavigate) {
            onNavigate('New order');
        }
        setIsFocused(false);
        setSearchTerm('');
    };

    const handleOrderClick = () => {
        if (onNavigate) {
            onNavigate('My orders');
        }
        setIsFocused(false);
        setSearchTerm('');
    };

    return (
        <div className="flex items-center justify-between mb-8 z-50 relative">
            <div className="relative w-96" ref={wrapperRef}>
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className={`h-4 w-4 transition-colors ${isFocused ? 'text-electric-purple' : 'text-slate-400'}`} />
                </div>
                <input
                    type="text"
                    placeholder="Search service or order id"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    className="w-full bg-white/80 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-electric-purple/50 transition-all font-medium font-sans shadow-sm"
                />

                {/* Search Dropdown */}
                {isFocused && hasResults && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        {orderMatch && (
                            <div className="p-2 border-b border-slate-50">
                                <div className="text-xs font-semibold text-slate-400 px-3 py-1 uppercase tracking-wider">Orders</div>
                                <button
                                    onClick={() => handleOrderClick()}
                                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-50 rounded-lg transition-colors group"
                                >
                                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-100 transition-colors">
                                        <Hash size={16} />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm font-medium text-slate-900">Order #{orderMatch}</div>
                                        <div className="text-xs text-slate-500">View order details</div>
                                    </div>
                                </button>
                            </div>
                        )}

                        {filteredServices.length > 0 && (
                            <div className="p-2">
                                <div className="text-xs font-semibold text-slate-400 px-3 py-1 uppercase tracking-wider">Services</div>
                                {filteredServices.map(service => (
                                    <button
                                        key={service.id}
                                        onClick={() => handleServiceClick(service.id)}
                                        className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-50 rounded-lg transition-colors group"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-electric-purple/10 flex items-center justify-center text-electric-purple group-hover:bg-electric-purple/20 transition-colors">
                                            <Package size={16} />
                                        </div>
                                        <div className="text-left overflow-hidden">
                                            <div className="text-sm font-medium text-slate-900 truncate">{service.name}</div>
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <span>ID: {service.id}</span>
                                                <span>•</span>
                                                <span>{service.category}</span>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
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
