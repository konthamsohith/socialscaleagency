import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Hash, AlertCircle, Loader2, Link as LinkIcon, ShoppingCart } from 'lucide-react';
import { auth, db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface OrderModalProps {
    pkg: {
        id: string;
        name: string;
        price: string;
    };
    network: {
        title: string;
        icon: any;
        color: string;
    };
    onClose: () => void;
    onSuccess: (orderId: string) => void;
}

export const OrderModal = ({ pkg, network, onClose, onSuccess }: OrderModalProps) => {
    const [link, setLink] = useState('');
    const [quantity, setQuantity] = useState(1000);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const pricePerUnit = parseFloat(pkg.price.replace(/[^0-9.]/g, '')) / 1000;
    const totalCost = (quantity * pricePerUnit).toFixed(2);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!link.trim()) {
            setError('Please enter a valid target link');
            return;
        }
        if (quantity < 100) {
            setError('Minimum order quantity is 100');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const user = auth.currentUser;
            if (!user) throw new Error('User not authenticated');

            const orderData = {
                userId: user.uid,
                userEmail: user.email,
                packageId: pkg.id,
                packageName: pkg.name,
                platform: network.title.toLowerCase(),
                link: link.trim(),
                quantity: quantity,
                totalCost: parseFloat(totalCost),
                status: 'pending',
                date: new Date().toISOString().split('T')[0],
                createdAt: serverTimestamp()
            };

            const docRef = await addDoc(collection(db, 'orders'), orderData);
            onSuccess(docRef.id);
        } catch (err: any) {
            console.error('Error placing order:', err);
            setError(err.message || 'Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 10 }}
                className="bg-white w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden relative"
                onClick={e => e.stopPropagation()}
            >
                {/* Header Section */}
                <div className={`p-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] -mr-16 -mt-16" />

                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center`}>
                                <network.icon size={20} className="text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">{network.title} Services</h3>
                                <p className="text-blue-200/60 text-xs font-medium uppercase tracking-widest">Create New Order</p>
                            </div>
                        </div>
                        <h2 className="text-2xl font-black tracking-tight">{pkg.name.replace(/\[.*?\]/g, '').trim()}</h2>
                    </div>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {/* Link Input */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Target Account/Content Link</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                <LinkIcon size={18} />
                            </div>
                            <input
                                type="url"
                                required
                                value={link}
                                onChange={e => setLink(e.target.value)}
                                placeholder="https://..."
                                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all placeholder:text-slate-300"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Quantity Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Quantity</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                    <Hash size={18} />
                                </div>
                                <input
                                    type="number"
                                    required
                                    min="100"
                                    step="100"
                                    value={quantity}
                                    onChange={e => setQuantity(parseInt(e.target.value))}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all"
                                />
                            </div>
                        </div>

                        {/* Cost Display */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Total Cost</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 font-bold">
                                    $
                                </div>
                                <div className="w-full pl-10 pr-4 py-4 bg-blue-50/50 border border-blue-100 rounded-2xl text-blue-600 font-black text-xl leading-none flex items-center h-[58px]">
                                    {totalCost}
                                </div>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm font-medium"
                        >
                            <AlertCircle size={18} />
                            {error}
                        </motion.div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 bg-[#0F172A] hover:bg-blue-600 disabled:bg-slate-300 text-white rounded-[22px] font-black text-sm tracking-widest uppercase transition-all duration-300 shadow-xl shadow-slate-200 flex items-center justify-center gap-3 active:scale-[0.98]"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                <ShoppingCart className="w-5 h-5" />
                                CONFIRM ORDER
                            </>
                        )}
                    </button>

                    <p className="text-center text-[10px] text-slate-400 font-bold leading-relaxed px-4">
                        By confirming, you agree to our terms of service. Orders typically begin processing within 0-12 hours after confirmation.
                    </p>
                </form>
            </motion.div>
        </motion.div>
    );
};
