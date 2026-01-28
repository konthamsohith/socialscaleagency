import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wallet, CreditCard } from 'lucide-react';
import { apiService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface AddMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AddMoneyModal = ({ isOpen, onClose, onSuccess }: AddMoneyModalProps) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState<{ show: boolean; amount: number }>({ show: false, amount: 0 });
  const { user, refreshUser } = useAuth();

  const quickAmounts = [500, 1000, 2000, 5000, 10000];

  const handleAddMoney = async () => {
    try {
      setError('');
      const amountNum = parseFloat(amount);

      if (!amountNum || amountNum < 10) {
        setError('Minimum amount is ₹10');
        return;
      }

      if (amountNum > 100000) {
        setError('Maximum amount is ₹1,00,000');
        return;
      }

      setLoading(true);

      // Create Razorpay order
      const orderResponse = await apiService.createPaymentOrder(amountNum);
      const { orderId, keyId, currency } = orderResponse.data;

      // Initialize Razorpay
      const options = {
        key: keyId,
        amount: amountNum * 100,
        currency: currency,
        name: 'SocialScale',
        description: 'Add Money to Wallet',
        order_id: orderId,
        handler: async function (response: any) {
          try {
            // Verify payment on backend
            await apiService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            // Refresh user data
            await refreshUser();
            
            // Show success message in modal
            setSuccess({ show: true, amount: amountNum });
            setLoading(false);
            
            // Auto close after 2 seconds
            setTimeout(() => {
              setSuccess({ show: false, amount: 0 });
              onSuccess();
              onClose();
            }, 2000);
          } catch (error: any) {
            setError(error.response?.data?.message || 'Payment verification failed');
            setLoading(false);
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
        },
        theme: {
          color: '#3B82F6',
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error: any) {
      console.error('Add money error:', error);
      setError(error.response?.data?.message || 'Failed to initiate payment');
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-auto"
      >
        {/* Backdrop - Blur only, using backdrop-filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
          onClick={onClose}
        />
        
        {/* Modal - Centered */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.3 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden p-8 mx-4 z-[10001]"
          style={{ maxHeight: '90vh', overflowY: 'auto' }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-colors flex items-center justify-center z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-8">
            {/* Success Message */}
            {success.show ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-3">Payment Successful!</h2>
                <p className="text-lg text-slate-600 mb-2">₹{success.amount} has been added to your wallet</p>
                <p className="text-sm text-slate-400">You can now place orders</p>
              </motion.div>
            ) : (
              <>
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Wallet className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 mb-2">Add Funds</h2>
                  <p className="text-slate-500 font-medium">Recharge your wallet instantly</p>
                </div>

                {/* Content */}
                <div className="space-y-8">
              {/* Amount Input */}
              <div className="space-y-4">
                <div className="relative group">
                  <div className="absolute top-1/2 left-8 md:left-12 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <span className="text-2xl font-bold">₹</span>
                  </div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-4xl font-bold text-slate-900 placeholder-slate-300 focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-center"
                    autoFocus
                  />
                </div>

                {/* Quick Select */}
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {quickAmounts.map((quickAmount) => (
                    <button
                      key={quickAmount}
                      onClick={() => setAmount(quickAmount.toString())}
                      className={`py-2 px-1 rounded-xl text-sm font-bold border-2 transition-all ${
                        amount === quickAmount.toString()
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-slate-100 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      ₹{quickAmount >= 1000 ? `${quickAmount/1000}k` : quickAmount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-medium text-center"
                >
                  {error}
                </motion.div>
              )}

              {/* Payment Info */}
              <div className="flex items-center justify-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                <CreditCard className="w-4 h-4" />
                <span>Secured by Razorpay</span>
              </div>

              {/* Action Button */}
              <button
                onClick={handleAddMoney}
                disabled={loading || !amount}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full block"
                    />
                    Processing...
                  </span>
                ) : (
                  `Pay ₹${amount ? parseFloat(amount).toLocaleString() : '0'}`
                )}
              </button>
            </div>              </>
            )}          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};
