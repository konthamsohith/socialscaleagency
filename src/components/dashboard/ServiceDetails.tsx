import { useState } from 'react';
import { ArrowLeft, Zap, Star, AlertCircle, Rocket, Info } from 'lucide-react';
import { Button } from '../ui/Button';

interface ServiceDetailsProps {
    serviceId: string;
    onBack: () => void;
}

export const ServiceDetails = ({ serviceId, onBack }: ServiceDetailsProps) => {
    // Mock Data - In a real app this would come from an API based on serviceId
    const serviceName = "IG Reel Views - Cheap";
    const servicePricePer1000 = 0.7;
    const minQuantity = 50;
    const maxQuantity = 1000000;

    const [quantity, setQuantity] = useState<number>(1000);
    const [link, setLink] = useState('');
    const [dripFeed, setDripFeed] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const quantityPresets = [
        { label: '100', price: '₹0.07' },
        { label: '500', price: '₹0.35' },
        { label: '1000', price: '₹0.7' },
        { label: '2500', price: '₹1.8' },
        { label: '5000', price: '₹3.5' },
        { label: '10 000', price: '₹7' },
    ];

    const calculatePrice = (qty: number) => {
        return ((qty / 1000) * servicePricePer1000).toFixed(2);
    };

    return (
        <div className="w-full max-w-6xl animate-in fade-in slide-in-from-right-8 duration-500">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onBack}
                    className="text-slate-900 hover:bg-slate-100 -ml-2 p-2 w-10 h-10 rounded-full"
                >
                    <ArrowLeft size={24} strokeWidth={2.5} />
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Order Form */}
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 font-instagram tracking-tight mb-8">
                            {serviceName}
                        </h1>

                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8">
                            {/* Quantity Presets */}
                            <div className="mb-8">
                                <label className="block text-sm font-semibold text-slate-700 mb-4 font-inter">Quantity</label>
                                <div className="grid grid-cols-3 gap-4">
                                    {quantityPresets.map((preset) => (
                                        <button
                                            key={preset.label}
                                            onClick={() => setQuantity(parseInt(preset.label.replace(' ', '')))}
                                            className={`relative flex flex-col items-center justify-center py-4 rounded-xl border transition-all duration-200 ${quantity === parseInt(preset.label.replace(' ', ''))
                                                ? 'bg-electric-purple border-electric-purple text-white shadow-md transform scale-[1.02]'
                                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-blue-200 hover:bg-blue-50/50'
                                                }`}
                                        >
                                            <span className="text-lg font-bold mb-1">{preset.label}</span>
                                            <span className={`text-xs ${quantity === parseInt(preset.label.replace(' ', '')) ? 'text-slate-300' : 'text-slate-400'}`}>
                                                {preset.price}
                                            </span>
                                            {quantity === parseInt(preset.label.replace(' ', '')) && (
                                                <div className="absolute top-2 right-2 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Custom Quantity Input */}
                            <div className="mb-6">
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-lg font-semibold rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-electric-purple/20 focus:border-electric-purple transition-all font-mono"
                                        placeholder="Custom quantity"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                                        Qty
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-2">
                                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-md border border-slate-200 input-label">min {minQuantity}</span>
                                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-md border border-slate-200 input-label">max {maxQuantity}</span>
                                </div>
                            </div>

                            {/* Link Input */}
                            <div className="mb-8">
                                <label className="block text-sm font-semibold text-slate-700 mb-2 font-inter">Link</label>
                                <input
                                    type="text"
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-base rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-electric-purple/20 focus:border-electric-purple transition-all placeholder:text-slate-400"
                                    placeholder="instagram.com/reel/..."
                                />
                            </div>

                            {/* Drip Feed Toggle (Visual Only) */}
                            <div className="flex items-center gap-3 mb-8 opacity-60 cursor-not-allowed" onClick={() => setDripFeed(!dripFeed)}>
                                <div className={`w-12 h-6 rounded-full relative transition-colors ${dripFeed ? 'bg-electric-purple' : 'bg-slate-200'}`}>
                                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 shadow-sm transition-all ${dripFeed ? 'left-7' : 'left-1'}`} />
                                </div>
                                <span className="text-slate-500 font-medium">Drip feed</span>
                                <Info size={16} className="text-slate-400" />
                            </div>

                            {/* Summary & Submit */}
                            <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-slate-500 font-medium">Quantity</span>
                                    <span className="text-slate-900 font-bold">{quantity}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 font-medium">Price</span>
                                    <span className="text-2xl font-bold text-slate-900">₹{calculatePrice(quantity)}</span>
                                </div>
                            </div>

                            <Button
                                variant="primary"
                                size="lg"
                                className="w-full py-6 text-lg font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all bg-electric-purple hover:bg-blue-700 text-white"
                            >
                                Create order
                            </Button>
                        </div>
                    </div>

                    {/* Important Info */}
                    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 text-amber-900 text-sm leading-relaxed">
                        <h3 className="font-bold mb-2 flex items-center gap-2">
                            <AlertCircle size={16} /> Important Note:
                        </h3>
                        <ul className="list-disc list-inside space-y-1 opacity-90">
                            <li>In case of any problems with delivery speed, use cancel button from order history.</li>
                            <li>Place one order at a time if link is same.</li>
                            <li>When the service is busy, the starting speed of the process changes.</li>
                        </ul>
                    </div>
                </div>

                {/* Right Column - Service Meta */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sticky top-8">
                        <div className="flex justify-between items-center mb-6">
                            <div className="text-sm font-medium text-slate-500">Service ID <span className="text-slate-900 font-mono ml-2 font-bold">{serviceId}</span></div>
                            <button
                                onClick={() => setIsFavorite(!isFavorite)}
                                className={`p-2 rounded-full transition-colors ${isFavorite ? 'text-yellow-400 bg-yellow-50' : 'text-slate-300 hover:bg-slate-50'}`}
                            >
                                <Star size={20} fill={isFavorite ? "currentColor" : "none"} />
                            </button>
                        </div>

                        {/* Speed Gauge Mockup */}
                        <div className="flex flex-col items-center justify-center py-8 relative">
                            {/* CSS Gauge */}
                            <div className="w-40 h-20 overflow-hidden relative">
                                <div className="w-40 h-40 rounded-full border-[12px] border-slate-100 absolute top-0 left-0" />
                                <div className="w-40 h-40 rounded-full border-[12px] border-emerald-500 absolute top-0 left-0 border-r-transparent border-b-transparent border-l-transparent rotate-45" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }} />
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-2 text-center">
                                <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Speed</span>
                                <div className="text-xl font-bold text-slate-900">Fast</div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-400 shadow-sm border border-slate-100">
                                    <Rocket size={16} />
                                </div>
                                <span className="font-semibold text-slate-700 text-sm">Speed 1M per day</span>
                            </div>
                            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-400 shadow-sm border border-slate-100">
                                    <Zap size={16} />
                                </div>
                                <span className="font-semibold text-slate-700 text-sm">No drops</span>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100 space-y-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-500">Start Time</span>
                                <span className="font-semibold text-slate-900">0-20min</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Refill</span>
                                <span className="font-semibold text-slate-900">No</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Quality</span>
                                <span className="font-semibold text-slate-900">Mix</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};
