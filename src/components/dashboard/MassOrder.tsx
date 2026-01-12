import { useState } from 'react';
import { Layers, AlertCircle, CheckCircle2 } from 'lucide-react';
import { apiService } from '../../services/api';

export const MassOrder = () => {
    const [orders, setOrders] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!orders.trim()) {
            setStatus('error');
            return;
        }

        setStatus('loading');

        try {
            const response = await apiService.createMassOrder(orders);
            
            if (response.success) {
                setStatus('success');
                setOrders(''); // Clear the form
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Failed to create mass orders:', error);
            setStatus('error');
        }
    };

    return (
        <div className="space-y-6 max-w-4xl">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900 font-archivo">Mass Order</h1>
                <p className="text-slate-500 mt-1">Submit multiple orders at once.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Input Section */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="orders" className="block text-sm font-medium text-slate-700 mb-2">
                                    One order per line in format: <strong>service_id | link | quantity</strong>
                                </label>
                                <textarea
                                    id="orders"
                                    rows={15}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                                    placeholder={`102 | https://instagram.com/post1 | 1000\n102 | https://instagram.com/post2 | 5000\n105 | https://twitter.com/post3 | 100`}
                                    value={orders}
                                    onChange={(e) => setOrders(e.target.value)}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-blue-600/20 active:scale-95 flex items-center gap-2"
                                >
                                    <Layers size={18} />
                                    {status === 'loading' ? 'Submitting...' : 'Submit Orders'}
                                </button>

                                {status === 'success' && (
                                    <div className="flex items-center gap-2 text-green-600 font-medium animate-in fade-in slide-in-from-left-2">
                                        <CheckCircle2 size={18} />
                                        Orders submitted!
                                    </div>
                                )}
                                {status === 'error' && (
                                    <div className="flex items-center gap-2 text-red-600 font-medium animate-in fade-in slide-in-from-left-2">
                                        <AlertCircle size={18} />
                                        Failed to submit orders.
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* Instructions Side Panel */}
                <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                        <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                            <AlertCircle size={18} className="text-blue-600" />
                            Format Instructions
                        </h3>
                        <div className="space-y-4 text-sm text-blue-800/80">
                            <p>Enter each order on a new line using the following format:</p>
                            <div className="bg-white/50 p-3 rounded-lg font-mono text-xs border border-blue-100">
                                service_id | link | quantity
                            </div>
                            <p><strong>Example:</strong></p>
                            <div className="bg-white/50 p-3 rounded-lg font-mono text-xs border border-blue-100">
                                102 | http://link.com | 1000
                            </div>
                            <ul className="list-disc pl-4 space-y-1">
                                <li>Service ID: The ID number of the service.</li>
                                <li>Link: Full URL to the post or profile.</li>
                                <li>Quantity: Number of items to order.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
