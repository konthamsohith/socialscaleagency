import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, AlertCircle } from 'lucide-react';
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

export const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {
            setError('');
            await signInWithPopup(auth, googleProvider);
            navigate('/dashboard');
        } catch (error: any) {
            console.error("Google Sign-In Error:", error);
            setError(error.message || 'Failed to sign in with Google');
        }
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    const chartVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 1.5, ease: "easeInOut" }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                // Login Flow
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                // Signup Flow
                try {
                    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    // Update profile with name
                    if (name) {
                        await updateProfile(userCredential.user, {
                            displayName: name
                        });
                    }
                } catch (signupError: any) {
                    if (signupError.code === 'auth/email-already-in-use') {
                        // User exists, try to log in with provided credentials
                        await signInWithEmailAndPassword(auth, email, password);
                    } else {
                        throw signupError;
                    }
                }
            }
            navigate('/dashboard');
        } catch (error: any) {
            console.error("Auth Error:", error);
            let errorMessage = 'Authentication failed';
            if (error.code === 'auth/email-already-in-use') errorMessage = 'Email is already in use';
            if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') errorMessage = 'Account does not exist or invalid credentials';
            if (error.code === 'auth/wrong-password') errorMessage = 'Incorrect password';
            if (error.code === 'auth/weak-password') errorMessage = 'Password should be at least 6 characters';

            if (error.code === 'auth/user-not-found') {
                errorMessage = 'Account does not exist.';
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex font-sans bg-white overflow-hidden">

            {/* Left Column: Visual (Full Height) */}
            <div className="hidden lg:flex w-1/2 bg-[#3b82f6] relative flex-col justify-center items-center p-8 xl:p-12 text-white">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />

                <div className="relative z-10 max-w-lg w-full">
                    <h2 className="text-[32px] lg:text-[40px] leading-[1.1] font-semibold font-archivo mb-3 text-white text-center lg:text-left">
                        Track growth, analyze engagement, and manage your audience all in one place.
                    </h2>
                    <p className="text-blue-100 text-base xl:text-lg mb-6 max-w-md leading-relaxed">
                        Log in to access your SocialScale dashboard and start growing.
                    </p>

                    {/* Dashboard Mockup Visual */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="bg-white rounded-[32px] p-6 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500 ease-out origin-center border border-slate-100/50"
                    >
                        {/* Pinterest-style Header */}
                        <motion.div variants={itemVariants} className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-slate-900">Performance</h3>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-semibold text-slate-500">Last 30 days</span>
                                <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer hover:bg-slate-200">
                                    <ArrowRight className="w-2.5 h-2.5 rotate-90 text-slate-600" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Metrics Row */}
                        <div className="grid grid-cols-3 gap-2 mb-6 text-center">
                            <motion.div variants={itemVariants} className="flex flex-col items-center">
                                <span className="text-[10px] font-semibold text-slate-500 mb-1">Impressions</span>
                                <span className="text-xl font-bold text-slate-900">1.2M</span>
                                <span className="text-[10px] font-bold text-emerald-600 mt-0.5 flex items-center gap-0.5">
                                    <ArrowRight className="w-2.5 h-2.5 -rotate-45" /> 12%
                                </span>
                            </motion.div>
                            <motion.div variants={itemVariants} className="flex flex-col items-center border-l border-slate-100">
                                <span className="text-[10px] font-semibold text-slate-500 mb-1">Engagement</span>
                                <span className="text-xl font-bold text-slate-900">5.8%</span>
                                <span className="text-[10px] font-bold text-emerald-600 mt-0.5 flex items-center gap-0.5">
                                    <ArrowRight className="w-2.5 h-2.5 -rotate-45" /> 8%
                                </span>
                            </motion.div>
                            <motion.div variants={itemVariants} className="flex flex-col items-center border-l border-slate-100">
                                <span className="text-[10px] font-semibold text-slate-500 mb-1">Followers</span>
                                <span className="text-xl font-bold text-slate-900">892k</span>
                                <span className="text-[10px] font-bold text-emerald-600 mt-0.5 flex items-center gap-0.5">
                                    <ArrowRight className="w-2.5 h-2.5 -rotate-45" /> 24%
                                </span>
                            </motion.div>
                        </div>

                        {/* Pinterest-style Smooth Area Chart */}
                        <div className="relative h-32 w-full pt-2">
                            {/* Chart Line & Fill */}
                            <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible preserve-3d">
                                <defs>
                                    <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                <motion.path
                                    variants={chartVariants}
                                    d="M0,35 C10,35 15,20 25,20 C35,20 40,30 50,30 C60,30 65,10 75,10 C85,10 90,25 100,20 L100,40 L0,40 Z"
                                    fill="url(#gradient)"
                                />
                                <motion.path
                                    variants={chartVariants}
                                    d="M0,35 C10,35 15,20 25,20 C35,20 40,30 50,30 C60,30 65,10 75,10 C85,10 90,25 100,20"
                                    fill="none"
                                    stroke="#3b82f6"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                {/* Data Points */}
                                <motion.circle variants={itemVariants} cx="25" cy="20" r="1.5" fill="white" stroke="#3b82f6" strokeWidth="1.5" />
                                <motion.circle variants={itemVariants} cx="50" cy="30" r="1.5" fill="white" stroke="#3b82f6" strokeWidth="1.5" />
                                <motion.circle variants={itemVariants} cx="75" cy="10" r="1.5" fill="white" stroke="#3b82f6" strokeWidth="1.5" />
                            </svg>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Right Column: Form (Full Height) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative">
                <button
                    onClick={() => navigate('/')}
                    className="absolute top-6 left-6 text-slate-400 hover:text-slate-900 transition-colors font-medium text-sm flex items-center gap-2 lg:hidden"
                >
                    Start Over
                </button>

                <div className="max-w-md w-full">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <img src="/logo.png" alt="SocialScale Logo" className="w-8 h-8 object-contain" />
                            <span style={{
                                fontFamily: 'sans-serif',
                                fontWeight: 700,
                                fontStyle: 'normal',
                                color: 'rgb(0, 0, 0)',
                                fontSize: '20px',
                                lineHeight: 'normal'
                            }}>SocialScale</span>
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 font-archivo mb-1.5 tracking-tight">
                            {isLogin ? 'Welcome back' : 'Create an account'}
                        </h1>
                        <p className="text-sm text-slate-500 mb-6">
                            {isLogin ? 'Please enter your details to sign in.' : 'Enter your details to get started.'}
                        </p>

                        {/* Tabs */}
                        <div className="bg-slate-100 p-1 rounded-xl flex items-center mb-6 relative">
                            <div
                                className="absolute inset-y-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm transition-all duration-300 ease-spring"
                                style={{
                                    left: isLogin ? '4px' : '50%',
                                }}
                            />
                            <button
                                onClick={() => setIsLogin(true)}
                                className={`flex-1 relative z-10 py-2 text-sm font-semibold transition-colors duration-200 ${isLogin ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Log In
                            </button>
                            <button
                                onClick={() => setIsLogin(false)}
                                className={`flex-1 relative z-10 py-2 text-sm font-semibold transition-colors duration-200 ${!isLogin ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>

                    {/* Error Message */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl flex items-center justify-between gap-2 border border-red-100"
                            >
                                <div className="flex items-center gap-2">
                                    <AlertCircle size={16} className="shrink-0" />
                                    <span>{error}</span>
                                </div>
                                {(error.includes('Account does not exist') || error.includes('User not found')) && (
                                    <button
                                        onClick={() => {
                                            setIsLogin(false);
                                            setError('');
                                        }}
                                        className="text-xs bg-white border border-red-200 px-3 py-1 rounded-lg font-bold text-red-700 hover:bg-red-50 transition-colors whitespace-nowrap shadow-sm"
                                    >
                                        Switch to Sign Up
                                    </button>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <AnimatePresence mode="wait">
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                    animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                    className="overflow-hidden"
                                >
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                        placeholder="John Doe"
                                        required={!isLogin}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                placeholder="name@company.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {!isLogin && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-start gap-2"
                            >
                                <div className="mt-0.5 min-w-[14px] h-3.5 border border-slate-300 rounded flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors">
                                    <Check size={10} className="text-blue-600 opacity-0 hover:opacity-100" />
                                </div>
                                <p className="text-[10px] text-slate-500 leading-snug">
                                    I agree to the <span className="text-blue-600 font-medium cursor-pointer hover:underline">Terms</span> and <span className="text-blue-600 font-medium cursor-pointer hover:underline">Privacy Policy</span>.
                                </p>
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-sm"
                        >
                            {loading ? 'Processing...' : (isLogin ? 'Log In' : 'Sign Up')}
                            {!loading && <ArrowRight size={16} />}
                        </button>
                    </form>

                    <div className="mt-6">
                        <div className="relative flex py-2 items-center mb-4">
                            <div className="flex-grow border-t border-slate-200"></div>
                            <span className="flex-shrink-0 mx-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest">Or Continue With</span>
                            <div className="flex-grow border-t border-slate-200"></div>
                        </div>

                        <button
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 py-2.5 rounded-xl transition-all duration-200 font-semibold text-slate-700 text-sm"
                        >
                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4" />
                            <span>Sign in with Google</span>
                        </button>
                    </div>

                    <div className="mt-6 text-center text-xs">
                        <span className="text-slate-500">{isLogin ? "New to SocialScale?" : "Already have an account?"}</span>
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="ml-2 font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                        >
                            {isLogin ? 'Create Account' : 'Log In'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
