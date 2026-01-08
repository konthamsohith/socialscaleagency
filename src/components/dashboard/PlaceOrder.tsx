import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    Link as LinkIcon,
    AlertCircle,
    CheckCircle2,
    Zap,
    Shield,
    Globe,
    Activity
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { apiService } from '../../services/api';
import { networks } from '../../data/services';

const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
};

export const PlaceOrder = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    // const { addNotification } = useNotifications();
    const [pkg, setPkg] = useState<any>(null);
    const [network, setNetwork] = useState<any>(null);

    const [link, setLink] = useState('');
    const [quantity, setQuantity] = useState(100);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successOrderIds, setSuccessOrderIds] = useState<string[]>([]);


    useEffect(() => {
        if (location.state?.package) {
            const p = location.state.package;
            setPkg(p);
            // Derive network info if not explicitly passed
            const net = location.state.network || networks.find(n => n.id === p.network) || networks.find(n => n.id === p.networkId) || { title: 'Social Platform', icon: Globe };
            setNetwork(net);
        } else {
            // Fallback or redirect if no package data
            navigate('/dashboard');
        }
    }, [location.state, navigate]);

    if (!pkg || !network) return null;

    const totalCost = (quantity / 1000) * pkg.price;

    const minQty = pkg.minQuantity || 100;
    const maxQty = pkg.maxQuantity || 100000;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!link.trim()) {
            setError('Please enter a valid target link');
            return;
        }

        // Basic URL validation
        try {
            new URL(link);
        } catch (_) {
            setError('Please enter a valid URL (e.g., https://instagram.com/user)');
            return;
        }

        if (quantity < minQty) {
            setError(`Minimum order quantity is ${minQty}`);
            return;
        }

        if (quantity > maxQty) {
            setError(`Maximum order quantity is ${maxQty}`);
            return;
        }

        // Check if user has enough credits
        const userCredits = user?.credits?.balance || 0;
        if (userCredits < totalCost) {
            alert(`You don't have enough credits. Required: ${totalCost.toFixed(2)} CR, Available: ${userCredits.toFixed(2)} CR. Please purchase more credits.`);
            return;
        }

        setLoading(true);

        try {
            if (!user) throw new Error('User not authenticated');

            const orderData: any = {
                service: pkg.id, // Service ID from the package
                link: link,
                quantity: quantity
            };

            // Only include companyId if it exists (don't send undefined)
            if (user.companyId) {
                orderData.companyId = user.companyId;
            }

            const order = await apiService.createOrder(orderData);

            setSuccessOrderIds(prev => [...prev, order.data.order._id]);

            // Redirect to My Orders after a short delay
            setTimeout(() => {
                navigate('/dashboard/orders');
            }, 2000);

        } catch (err: any) {
            console.error('Order submission error:', err);
            setError(err.message || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-8 group"
            >
                <div className="p-2 rounded-full bg-slate-100 group-hover:bg-slate-200 transition-colors">
                    <ArrowLeft size={16} />
                </div>
                <span className="font-medium">Back to Catalog</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Order Form */}
                <div className="lg:col-span-2 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm"
                    >
                        <div className="flex items-start gap-6 mb-8">
                            <div className={`w-16 h-16 rounded-2xl ${pkg.bg || 'bg-blue-50'} flex items-center justify-center text-3xl shadow-sm border border-slate-100`}>
                                {network.icon ? <network.icon className={`w-8 h-8 ${pkg.color || 'text-blue-600'}`} /> : <Globe className="w-8 h-8 text-slate-400" />}
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-2xl font-bold text-slate-900 leading-tight">{pkg.name}</h1>
                                    <span className="px-2.5 py-1 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider">
                                        {formatNumber(minQty)} - {formatNumber(maxQty)}
                                    </span>
                                </div>
                                <p className="text-slate-500 text-sm leading-relaxed max-w-md">
                                    Initialize high-velocity growth protocol. Ensure target visibility is set to public before execution.
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Link Input */}
                            <div className="space-y-4">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Target Endpoint</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <LinkIcon className="h-5 w-5 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                                    </div>
                                    <input
                                        type="url"
                                        value={link}
                                        onChange={(e) => setLink(e.target.value)}
                                        className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
                                        placeholder="https://..."
                                        required
                                    />
                                </div>
                            </div>

                            {/* Quantity Input */}
                            <div className="space-y-4">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Volume Configuration</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Activity className="h-5 w-5 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                                    </div>
                                    <input
                                        type="number"
                                        min={minQty}
                                        max={maxQty}
                                        value={quantity}
                                        onChange={(e) => setQuantity(Number(e.target.value))}
                                        className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold text-lg"
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Units</span>
                                    </div>
                                </div>
                                <div className="flex justify-between px-2">
                                    <span className="text-xs text-slate-400">Min: {minQty.toLocaleString()}</span>
                                    <span className="text-xs text-slate-400">Max: {maxQty.toLocaleString()}</span>
                                </div>
                            </div>

                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100"
                                    >
                                        <AlertCircle size={18} className="shrink-0" />
                                        {error}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-slate-900 hover:bg-blue-600 text-white p-5 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all shadow-xl shadow-slate-900/20 hover:shadow-blue-600/30 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Processing Protocol...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Initialize Order</span>
                                        <div className="w-px h-4 bg-white/20" />
                                        <span className="opacity-80 font-mono">{totalCost.toFixed(2)} CR</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>

                {/* Right Column: Summary & Info */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-slate-50/50 rounded-3xl p-6 border border-slate-200/60 sticky top-24"
                    >
                        <h3 className="font-archivo font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-blue-600" />
                            Order Summary
                        </h3>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center p-3 rounded-xl bg-white border border-slate-100">
                                <span className="text-sm text-slate-500 font-medium">Service Rate</span>
                                <span className="text-sm font-bold text-slate-900">{pkg.price} CR / 1K</span>
                            </div>
                            <div className="flex justify-between items-center p-3 rounded-xl bg-white border border-slate-100">
                                <span className="text-sm text-slate-500 font-medium">Quantity</span>
                                <span className="text-sm font-bold text-slate-900">{quantity.toLocaleString()}</span>
                            </div>
                            <div className="w-full h-px bg-slate-200 my-2" />
                            <div className="flex justify-between items-center px-2">
                                <span className="text-base font-bold text-slate-900">Total Deduction</span>
                                <span className="text-xl font-black text-blue-600">{totalCost.toFixed(2)} CR</span>
                            </div>
                        </div>

                        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                            <h4 className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider mb-2">
                                <Zap size={14} />
                                Instant Execution
                            </h4>
                            <p className="text-xs text-blue-600/80 leading-relaxed font-medium">
                                Your order will be processed immediately upon confirmation. Credits will be deducted from your active balance.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Success Overlay - Optional if redirection is fast, but good for feedback */}
            <AnimatePresence>
                {successOrderIds.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white rounded-[2rem] p-8 max-w-sm w-full text-center shadow-2xl"
                        >
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                                <CheckCircle2 size={40} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Order Confirmed</h2>
                            <p className="text-slate-500 mb-8">Redirecting to your order history...</p>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-green-500"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 2 }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};
