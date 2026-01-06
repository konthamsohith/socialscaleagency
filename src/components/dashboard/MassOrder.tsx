import { useState } from 'react';
import { ArrowRight, Instagram } from 'lucide-react';
import { Button } from '../ui/Button';

export const MassOrder = () => {
    const [orderType, setOrderType] = useState('Simple order');
    const [quantity, setQuantity] = useState('50');

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold font-archivo text-slate-900 mb-6">Mass order</h2>

            {/* Order Type Toggle */}
            <div className="flex gap-2 mb-8">
                {['Simple order', 'Classic order'].map((type) => (
                    <button
                        key={type}
                        onClick={() => setOrderType(type)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${orderType === type
                            ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                            }`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Column: Form */}
                <div className="flex-1 space-y-6">

                    {/* Category & Service - Only for Simple Order */}
                    {orderType === 'Simple order' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Category</label>
                                <div className="relative">
                                    <select className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-slate-900 font-medium appearance-none focus:outline-none focus:border-electric-purple/50 focus:ring-4 focus:ring-electric-purple/10 transition-all cursor-pointer">
                                        <option>Instagram : Views</option>
                                        <option>Instagram : Likes</option>
                                        <option>Instagram : Followers</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                        <ArrowRight className="w-4 h-4 rotate-90" />
                                    </div>
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-pink-600">
                                        <Instagram className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Service</label>
                                <div className="relative">
                                    <select className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-slate-900 font-medium appearance-none focus:outline-none focus:border-electric-purple/50 focus:ring-4 focus:ring-electric-purple/10 transition-all cursor-pointer">
                                        <option>IG Reel Views - Cheap</option>
                                        <option>IG Reel Views - Instant</option>
                                        <option>IG Reel Views - Real</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                        <ArrowRight className="w-4 h-4 rotate-90" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Order Input */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Enter each order on a new line</label>
                        <textarea
                            className="w-full h-40 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:border-electric-purple/50 focus:ring-4 focus:ring-electric-purple/10 transition-all resize-none placeholder:text-slate-400"
                            placeholder={orderType === 'Simple order' ? "Enter each link on a new line" : "1|instagram.com/username|250"}
                        />
                    </div>

                    {/* Quantity - Only for Simple Order */}
                    {orderType === 'Simple order' && (
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Quantity</label>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-bold text-lg focus:outline-none focus:border-electric-purple/50 focus:ring-4 focus:ring-electric-purple/10 transition-all"
                            />
                            <div className="flex gap-2 mt-2">
                                <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-500 rounded uppercase tracking-wider border border-slate-200">Min 50</span>
                                <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-500 rounded uppercase tracking-wider border border-slate-200">Max 1000000</span>
                            </div>
                        </div>
                    )}

                    {/* Summary Row */}
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <div>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Total Quantity</p>
                            <p className="text-lg font-bold text-slate-900">50</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Price</p>
                            <p className="text-2xl font-bold text-slate-900">₹0.04</p>
                        </div>
                    </div>

                    <Button className="w-full py-4 text-base shadow-xl shadow-electric-purple/20">
                        Create order
                    </Button>
                </div>


            </div>
        </div>
    );
};
