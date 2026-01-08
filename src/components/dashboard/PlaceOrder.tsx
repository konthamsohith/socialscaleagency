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
    Activity,
    Star,
    Info,
    Check
} from 'lucide-react';
import { auth, db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { networks } from '../../data/services';
import clsx from 'clsx';

// Helper for large numbers
const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
};

// Network Brand Colors
const getNetworkStyle = (networkName: string = '') => {
    const n = networkName.toLowerCase();
    if (n.includes('instagram')) return { bg: 'bg-gradient-to-br from-pink-500 to-orange-500', text: 'text-pink-600', light: 'bg-pink-50', border: 'border-pink-100', shadow: 'shadow-pink-500/20' };
    if (n.includes('linkedin')) return { bg: 'bg-gradient-to-br from-blue-600 to-cyan-600', text: 'text-blue-700', light: 'bg-blue-50', border: 'border-blue-100', shadow: 'shadow-blue-500/20' };
    if (n.includes('youtube')) return { bg: 'bg-gradient-to-br from-red-600 to-red-500', text: 'text-red-600', light: 'bg-red-50', border: 'border-red-100', shadow: 'shadow-red-500/20' };
    if (n.includes('twitter') || n.includes('x')) return { bg: 'bg-gradient-to-br from-slate-800 to-slate-900', text: 'text-slate-900', light: 'bg-slate-100', border: 'border-slate-200', shadow: 'shadow-slate-500/20' };
    if (n.includes('tiktok')) return { bg: 'bg-gradient-to-br from-black to-slate-800', text: 'text-slate-900', light: 'bg-slate-50', border: 'border-slate-200', shadow: 'shadow-slate-500/20' };
    return { bg: 'bg-gradient-to-br from-indigo-500 to-purple-600', text: 'text-indigo-600', light: 'bg-indigo-50', border: 'border-indigo-100', shadow: 'shadow-indigo-500/20' };
};

export const PlaceOrder = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [pkg, setPkg] = useState<any>(null);
    const [network, setNetwork] = useState<any>(null);
    const [style, setStyle] = useState<any>(getNetworkStyle());

    const [link, setLink] = useState('');
    const [quantity, setQuantity] = useState(100);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successOrderIds, setSuccessOrderIds] = useState<string[]>([]);

    useEffect(() => {
        if (location.state?.package) {
            const p = location.state.package;
            setPkg(p);

            // Derive network info
            const net = location.state.network || networks.find(n => n.id === p.network) || networks.find(n => n.id === p.networkId) || { title: 'Social Platform', icon: Globe };
            setNetwork(net);
            setStyle(getNetworkStyle(net.title));

            // Set init quantity (min)
            if (p.minQuantity) setQuantity(p.minQuantity);
        } else {
            navigate('/dashboard');
        }
    }, [location.state, navigate]);

    if (!pkg || !network) return null;

    const minQty = pkg.minQuantity || 100;
    const maxQty = pkg.maxQuantity || 100000;
    const totalCost = (quantity / 1000) * pkg.price;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!link.trim()) return setError('Please enter a valid target link');
        if (quantity < minQty) return setError(`Minimum order quantity is ${minQty}`);
        if (quantity > maxQty) return setError(`Maximum order quantity is ${maxQty}`);

        setLoading(true);

        try {
            const user = auth.currentUser;
            if (!user) throw new Error('User not authenticated');

            const orderData = {
                userId: user.uid,
                userEmail: user.email,
                serviceId: pkg.id,
                serviceName: pkg.name,
                network: network.title || 'Unknown',
                link: link,
                quantity: quantity,
                price: totalCost,
                status: 'pending',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            };

            const docRef = await addDoc(collection(db, 'orders'), orderData);
            setSuccessOrderIds(prev => [...prev, docRef.id]);

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
        <div className="max-w-[1600px] mx-auto min-h-[calc(100vh-100px)] flex flex-col">
            {/* Header */}
            <div className="mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="group flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-4"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Back to Services</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 flex-1">

                {/* LEFT: Product Configuration */}
                <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl p-8 lg:p-10 shadow-sm border border-slate-100 h-full relative overflow-hidden"
                    >
                        {/* Background Decoration */}
                        <div className={clsx("absolute top-0 right-0 w-64 h-64 opacity-5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none", style.bg)} />

                        {/* Title Section */}
                        <div className="flex items-start gap-6 mb-10 relative">
                            <div className={clsx("w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-lg shadow-gray-200/50", style.text, style.light)}>
                                {network.icon ? <network.icon size={40} /> : <Globe size={40} />}
                            </div>
                            <div>
                                <h1 className="text-3xl lg:text-4xl font-black text-slate-900 mb-3 tracking-tight">{pkg.name}</h1>
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className={clsx("px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 text-white")}>
                                        {network.title} Protocol
                                    </span>
                                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wider">
                                        <Zap size={12} className="fill-current" />
                                        Instant Delivery
                                    </span>
                                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 text-xs font-bold uppercase tracking-wider">
                                        <Star size={12} className="fill-current" />
                                        Premium Quality
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl relative">
                            {/* Link Input */}
                            <div className="space-y-3">
                                <label className="block text-sm font-bold text-slate-700">Target URL</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                        <LinkIcon className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                    </div>
                                    <input
                                        type="url"
                                        value={link}
                                        onChange={(e) => setLink(e.target.value)}
                                        className="block w-full pl-14 pr-5 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-lg"
                                        placeholder={`https://${network.title.toLowerCase()}.com/...`}
                                        required
                                    />
                                </div>
                                <p className="text-xs text-slate-400 flex items-center gap-1.5 pl-2">
                                    <Info size={12} />
                                    Ensure profile is public before ordering.
                                </p>
                            </div>

                            {/* Quantity Input */}
                            <div className="space-y-3">
                                <label className="block text-sm font-bold text-slate-700">Quantity</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                        <Activity className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                    </div>
                                    <input
                                        type="number"
                                        min={minQty}
                                        max={maxQty}
                                        value={quantity}
                                        onChange={(e) => setQuantity(Number(e.target.value))}
                                        className="block w-full pl-14 pr-24 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-2xl"
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none">
                                        <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Credits</span>
                                    </div>
                                </div>
                                {/* Range Slider for better UX */}
                                <input
                                    type="range"
                                    min={minQty}
                                    max={maxQty}
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                                <div className="flex justify-between px-1">
                                    <span className="text-xs font-bold text-slate-400">{formatNumber(minQty)}</span>
                                    <span className="text-xs font-bold text-slate-400">{formatNumber(maxQty)}</span>
                                </div>
                            </div>

                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100"
                                    >
                                        <AlertCircle size={18} className="shrink-0" />
                                        {error}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </motion.div>
                </div>

                {/* RIGHT: Live Preview & Checkout */}
                <div className="lg:col-span-5 xl:col-span-4 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className={clsx("rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl", style.bg)}
                    >
                        {/* Abstract Shapes */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                        <div className="relative z-10">
                            <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                                <Shield className="w-5 h-5 opacity-80" />
                                Order Summary
                            </h3>

                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-white/70 font-medium">Service Rate</span>
                                    <span className="font-bold text-lg">{pkg.price} CR / 1K</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-white/70 font-medium">Quantity</span>
                                    <span className="font-bold text-lg">{quantity.toLocaleString()}</span>
                                </div>

                                <div className="h-px w-full bg-white/20" />

                                <div className="flex justify-between items-end">
                                    <span className="text-white/90 font-bold text-lg">Total Cost</span>
                                    <span className="text-4xl font-black">{totalCost.toFixed(2)} CR</span>
                                </div>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full mt-10 bg-white text-slate-900 py-4 rounded-xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin" />
                                        <span>Processing...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Confirm Order</span>
                                        <ArrowLeft className="rotate-180" size={20} />
                                    </>
                                )}
                            </button>

                            <p className="text-center text-white/50 text-xs mt-4 font-medium">
                                Secure verified transaction
                            </p>
                        </div>
                    </motion.div>

                    {/* Trust Badges */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl p-6 border border-slate-100 flex items-center justify-between"
                    >
                        <div className="flex flex-col items-center gap-2 text-center">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                <Zap size={20} />
                            </div>
                            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wide">Instant</span>
                        </div>
                        <div className="w-px h-10 bg-slate-100" />
                        <div className="flex flex-col items-center gap-2 text-center">
                            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                                <Shield size={20} />
                            </div>
                            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wide">Secure</span>
                        </div>
                        <div className="w-px h-10 bg-slate-100" />
                        <div className="flex flex-col items-center gap-2 text-center">
                            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                <Check size={20} />
                            </div>
                            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wide">Guaranteed</span>
                        </div>
                    </motion.div>
                </div>

            </div>

            {/* Success Overlay */}
            <AnimatePresence>
                {successOrderIds.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white rounded-[2rem] p-10 max-w-sm w-full text-center shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-blue-500 to-purple-500" />
                            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 shadow-sm">
                                <CheckCircle2 size={48} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 mb-2">Order Confirmed!</h2>
                            <p className="text-slate-500 mb-8 font-medium">Your growth protocol has been successfully initialized. Redirecting...</p>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <motion.div
                                    className={clsx("h-full", style.bg)}
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
