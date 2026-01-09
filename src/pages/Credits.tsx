import  { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';
import { RAZORPAY_KEY_ID } from '../config/constants';
import { CreditCard, Zap, Check, Loader2, TrendingUp, Award } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const Credits = () => {
  const { user, refreshUser } = useAuth();
  const { addNotification } = useNotifications();
  const [plans, setPlans] = useState<any[]>([]);
  const [credits, setCredits] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [plansRes, creditsRes] = await Promise.all([
        apiService.getSubscriptionPlans(),
        apiService.getCreditsBalance()
      ]);
      
      setPlans(plansRes.data.plans);
      setCredits(creditsRes.data);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planId: string) => {
    setSubscribing(planId);
    
    try {
      const response = await apiService.createSubscription({ plan: planId });
      const { subscription, razorpayOrder } = response.data;

      if (!window.Razorpay) {
        alert('Razorpay not loaded. Please refresh the page.');
        return;
      }

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'SocialScale',
        description: `${planId.toUpperCase()} Plan Subscription`,
        order_id: razorpayOrder.id,
        handler: async (response: any) => {
          try {
            await apiService.activateSubscription((subscription as any)._id, response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature);
            setSuccessMessage('Payment successful! Your subscription has been activated.');
            setShowSuccessModal(true);
            await refreshUser();
            await loadData();

            // Add notification
            addNotification({
              title: 'Subscription Activated',
              message: `Your ${planId.toUpperCase()} plan subscription has been activated successfully.`,
              type: 'success',
              icon: Check
            });
          } catch (error) {
            console.error('Failed to activate subscription:', error);
            alert('Payment successful but activation failed. Please contact support.');
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email
        },
        theme: {
          color: '#3B82F6'
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      console.error('Failed to create subscription:', error);
      alert(error.response?.data?.error?.message || 'Failed to create subscription');
    } finally {
      setSubscribing(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Credits Balance Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium mb-2">Available Credits</p>
            <h1 className="text-5xl font-bold">{(credits?.balance || 0).toFixed(2)}</h1>
            <p className="text-blue-100 mt-2">Use credits to place orders and grow your social presence</p>
          </div>
          <div className="hidden md:block">
            <Zap size={80} className="text-blue-400 opacity-20" />
          </div>
        </div>
      </div>

      {/* Subscription Plans */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Subscription Plans</h2>
          <p className="text-slate-600 mt-1">Choose a plan that fits your needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              whileHover={{ y: -4 }}
              className={`bg-white rounded-2xl border-2 p-8 ${
                plan.plan === 'growth' 
                  ? 'border-blue-500 relative' 
                  : 'border-slate-200'
              }`}
            >
              {plan.plan === 'growth' && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                    POPULAR
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-slate-900">${plan.amount}</span>
                  <span className="text-slate-500">/{plan.currency}</span>
                </div>
                <p className="text-slate-600 mt-2">{plan.credits.toLocaleString()} Credits</p>
              </div>

              <button
                onClick={() => handleSubscribe(plan.plan)}
                disabled={subscribing === plan.plan || plan.plan === 'free'}
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                  plan.plan === 'growth'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : plan.plan === 'free'
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                {subscribing === plan.plan ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Processing...
                  </>
                ) : plan.plan === 'free' ? (
                  'Current Plan'
                ) : (
                  <>
                    <CreditCard size={18} />
                    Subscribe Now
                  </>
                )}
              </button>

              {plan.features && (
                <div className="mt-6 space-y-3">
                  {plan.features.map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-600">{feature}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* How Credits Work */}
      <div className="bg-slate-50 rounded-2xl p-8">
        <h3 className="text-lg font-bold text-slate-900 mb-6">How Credits Work</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <CreditCard className="text-blue-600" size={24} />
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">Buy Credits</h4>
              <p className="text-sm text-slate-600">Purchase a subscription plan to get credits</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="text-green-600" size={24} />
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">Place Orders</h4>
              <p className="text-sm text-slate-600">Use credits to order social media services</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Award className="text-purple-600" size={24} />
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">Track Growth</h4>
              <p className="text-sm text-slate-600">Monitor your social media growth in real-time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      {credits?.transactions && credits.transactions.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Transactions</h3>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">Type</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">Amount</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {credits.transactions.slice(0, 10).map((transaction: any, idx: number) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm text-slate-900">{transaction.type}</td>
                    <td className={`px-6 py-4 text-sm font-semibold ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Payment Successful!</h3>
            <p className="text-slate-600 mb-6">{successMessage}</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              Continue
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};
