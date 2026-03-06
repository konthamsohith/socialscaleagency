import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wallet, CreditCard, AlertTriangle, RefreshCw } from 'lucide-react';
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

interface PendingPayment {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  amount: number;
  savedAt: string;
}

const pendingKey = (userId: string) => `pending_wallet_payment_${userId}`;

export const AddMoneyModal = ({ isOpen, onClose, onSuccess }: AddMoneyModalProps) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [retryLoading, setRetryLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState<{ show: boolean; amount: number }>({ show: false, amount: 0 });
  const [pendingPayment, setPendingPayment] = useState<PendingPayment | null>(null);
  const { user, refreshUser } = useAuth();

  const quickAmounts = [500, 1000, 2000, 5000, 10000];

  // On open, check for any unverified payment left from a previous session
  useEffect(() => {
    if (isOpen && user?.userId) {
      const stored = localStorage.getItem(pendingKey(user.userId));
      if (stored) {
        try {
          setPendingPayment(JSON.parse(stored));
        } catch {
          localStorage.removeItem(pendingKey(user.userId));
        }
      }
    }
  }, [isOpen, user?.userId]);

  // Retry verify-payment up to 3 times; resolves on success, throws on final failure
  const verifyWithRetry = async (
    paymentData: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string },
    maxRetries = 3,
    delayMs = 2000,
  ) => {
    let lastError: any;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await apiService.verifyPayment(paymentData);
      } catch (err: any) {
        lastError = err;
        if (attempt < maxRetries) await new Promise(r => setTimeout(r, delayMs));
      }
    }
    throw lastError;
  };

  // Called when user clicks "Restore Payment" for a previously captured but unverified payment
  const handleRestorePayment = async () => {
    if (!pendingPayment || !user?.userId) return;
    setRetryLoading(true);
    setError('');
    try {
      await verifyWithRetry({
        razorpay_order_id: pendingPayment.razorpay_order_id,
        razorpay_payment_id: pendingPayment.razorpay_payment_id,
        razorpay_signature: pendingPayment.razorpay_signature,
      });
      localStorage.removeItem(pendingKey(user.userId));
      setPendingPayment(null);
      await refreshUser();
      setSuccess({ show: true, amount: pendingPayment.amount });
      setRetryLoading(false);
      setTimeout(() => {
        setSuccess({ show: false, amount: 0 });
        onSuccess();
        onClose();
      }, 2000);
    } catch (err: any) {
      const payId = pendingPayment.razorpay_payment_id;
      setError(
        `Verification still failing. Please contact support with payment ID: ${payId}`
      );
      setRetryLoading(false);
    }
  };

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
          // STEP 1: Persist payment data to localStorage BEFORE hitting the network.
          // If verify-payment fails (network drop, token expiry, tab close), the data
          // survives and the user can restore the credit on their next visit.
          const pending: PendingPayment = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            amount: amountNum,
            savedAt: new Date().toISOString(),
          };
          if (user?.userId) {
            localStorage.setItem(pendingKey(user.userId), JSON.stringify(pending));
          }

          // STEP 2: Try verify-payment with automatic retries.
          try {
            await verifyWithRetry({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            // Success — clear saved state
            if (user?.userId) localStorage.removeItem(pendingKey(user.userId));
            setPendingPayment(null);
            await refreshUser();
            setSuccess({ show: true, amount: amountNum });
            setLoading(false);
            setTimeout(() => {
              setSuccess({ show: false, amount: 0 });
              onSuccess();
              onClose();
            }, 2000);
          } catch {
            // All retries failed — surface the Restore banner so the user can try again
            setPendingPayment(pending);
            setError('Payment was collected but could not be verified right now. Use "Restore Payment" below to credit your wallet.');
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
                {/* Pending Payment Banner — shown when verify-payment previously failed */}
                {pendingPayment && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-2"
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-amber-800 text-sm">Unverified Payment Detected</p>
                        <p className="text-amber-700 text-xs mt-0.5">
                          ₹{pendingPayment.amount.toLocaleString()} was collected by Razorpay on{' '}
                          {new Date(pendingPayment.savedAt).toLocaleString()} but your wallet wasn't updated.
                        </p>
                        <p className="text-amber-600 text-xs mt-1 font-mono break-all">
                          ID: {pendingPayment.razorpay_payment_id}
                        </p>
                      </div>
                      <button
                        onClick={handleRestorePayment}
                        disabled={retryLoading}
                        className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white text-xs font-bold rounded-xl transition-colors"
                      >
                        {retryLoading ? (
                          <>
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="w-3 h-3 border border-white/40 border-t-white rounded-full block"
                            />
                            Restoring…
                          </>
                        ) : (
                          <>
                            <RefreshCw className="w-3 h-3" />
                            Restore ₹{pendingPayment.amount.toLocaleString()}
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}

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
