import { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';

interface ServiceData {
    id?: string;
    name: string;
    category: string;
    rate: string | number;
    min: string | number;
    max: string | number;
    status: string;
}

interface ServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (service: ServiceData) => void;
    initialData?: ServiceData | null;
}

const categories = [
    'Instagram', 'YouTube', 'Facebook', 'TikTok',
    'Spotify', 'X - Twitter', 'Discord', 'Threads'
];

export const ServiceModal = ({ isOpen, onClose, onSave, initialData }: ServiceModalProps) => {
    const isEditing = !!initialData;

    const [formData, setFormData] = useState<ServiceData>({
        name: '',
        category: 'Instagram',
        rate: '',
        min: '',
        max: '',
        status: 'Active'
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                rate: initialData.rate.toString(),
                min: initialData.min.toString(),
                max: initialData.max.toString()
            });
        } else {
            // Reset for Add mode
            setFormData({
                name: '',
                category: 'Instagram',
                rate: '',
                min: '',
                max: '',
                status: 'Active'
            });
        }
    }, [initialData, isOpen]);

    const isFormValid = formData.name && formData.rate && formData.min && formData.max;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        onSave({
            ...formData,
            rate: parseFloat(formData.rate as string),
            min: parseInt(formData.min as string),
            max: parseInt(formData.max as string)
        });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50 transition-all"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="bg-white pointer-events-auto w-full max-w-lg rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                                <h3 className="text-lg font-bold text-slate-900 font-instagram">
                                    {isEditing ? 'Edit Service' : 'Add New Service'}
                                </h3>
                                <button
                                    onClick={onClose}
                                    className="p-2 -mr-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="p-6 space-y-5 sm:space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Service Name</label>
                                    <input
                                        autoFocus
                                        type="text"
                                        placeholder="e.g. IG Reel Views - High Quality"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-electric-purple/20 focus:border-electric-purple transition-all"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Category</label>
                                        <div className="relative">
                                            <select
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-electric-purple/20 focus:border-electric-purple transition-all"
                                            >
                                                {categories.map(cat => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Rate per 1000 (₹)</label>
                                        <input
                                            type="number"
                                            placeholder="0.00"
                                            value={formData.rate}
                                            onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-electric-purple/20 focus:border-electric-purple transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Min Quantity</label>
                                        <input
                                            type="number"
                                            placeholder="50"
                                            value={formData.min}
                                            onChange={(e) => setFormData({ ...formData, min: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-electric-purple/20 focus:border-electric-purple transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Max Quantity</label>
                                        <input
                                            type="number"
                                            placeholder="1000000"
                                            value={formData.max}
                                            onChange={(e) => setFormData({ ...formData, max: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-electric-purple/20 focus:border-electric-purple transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="lg"
                                        disabled={!isFormValid}
                                        className={`w-full flex items-center justify-center gap-2 text-white font-medium transition-all ${isFormValid ? 'bg-electric-purple shadow-lg shadow-electric-purple/20 hover:bg-electric-purple-dark' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                                    >
                                        {isEditing ? 'Save Changes' : 'Add Service'} <Check size={18} />
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};
