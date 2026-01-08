import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { SEO } from '../components/common/SEO';
import { Loader2, ArrowRight, ArrowUpRight } from 'lucide-react';

export const Login = () => {
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError('');
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/onboarding');
        } catch (err: any) {
            console.error(err);
            setError('Failed to sign in with Google. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (mode === 'signup') {
                try {
                    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    if (name) {
                        await updateProfile(userCredential.user, { displayName: name });
                    }
                    navigate('/onboarding');
                } catch (err: any) {
                    if (err.code === 'auth/email-already-in-use') {
                        setMode('login');
                        setError("Account already exists. We've switched you to Log In mode.");
                        return;
                    }
                    throw err;
                }
            } else {
                try {
                    await signInWithEmailAndPassword(auth, email, password);
                    navigate('/onboarding');
                } catch (err: any) {
                    if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
                        setMode('signup');
                        setError("You have no account. We've switched you to Sign Up mode.");
                        return;
                    }
                    throw err;
                }
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || `Failed to ${mode}. Please check your credentials.`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SEO title="Login" description="Access your SocialScale dashboard." />
            <div className="h-screen flex bg-white font-archivo overflow-hidden">
                {/* Left Side: Marketing & Proof */}
                <div className="hidden lg:flex lg:w-1/2 bg-[#3B82F6] p-12 flex-col justify-center relative overflow-hidden">
                    {/* Decorative Background Patterns Removed */}

                    <div className="relative z-10 max-w-xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl font-bold text-white leading-[1.1] tracking-tight mb-4"
                        >
                            Track growth, analyze engagement, and manage your audience all in one place.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-blue-100 text-base mb-8 max-w-md"
                        >
                            Log in to access your SocialScale dashboard and start growing.
                        </motion.p>

                        {/* Performance Card - Visual Proof */}
                        <motion.div
                            initial="initial"
                            animate="animate"
                            variants={{
                                initial: { opacity: 0, scale: 0.9, y: 40 },
                                animate: {
                                    opacity: 1,
                                    scale: 1,
                                    y: 0,
                                    transition: {
                                        delay: 0.2,
                                        type: 'spring',
                                        damping: 20,
                                        staggerChildren: 0.1,
                                        delayChildren: 0.4
                                    }
                                }
                            }}
                            className="relative"
                        >
                            <div className="relative w-full aspect-[4/3] scale-[0.85] xxl:scale-100 flex items-center justify-center">
                                {/* Floating Coins - Plain */}
                                {[
                                    { top: '22%', left: '26%', size: 'w-16', delay: 0.8, y: [0, -10, 0], rotate: -15 },
                                    { top: '50%', left: '16%', size: 'w-18', delay: 1.1, y: [0, -15, 0], rotate: 10 },
                                    { top: '38%', left: '28%', size: 'w-12', delay: 1.4, y: [0, -8, 0], rotate: -5 },
                                ].map((coin, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                            y: coin.y
                                        }}
                                        transition={{
                                            scale: { delay: coin.delay, type: 'spring' },
                                            y: { repeat: Infinity, duration: 4 + i, ease: "easeInOut" }
                                        }}
                                        className={`absolute ${coin.size} aspect-square z-20`}
                                        style={{ top: coin.top, left: coin.left }}
                                    >
                                        <div className={`w-full h-full rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center`} style={{ transform: `rotate(${coin.rotate}deg)` }}>
                                            <div className="w-[85%] h-[85%] rounded-full border border-slate-100" />
                                        </div>
                                    </motion.div>
                                ))}

                                {/* Main Dashboard Card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="relative w-[70%] bg-white rounded-[2rem] shadow-2xl border border-white overflow-hidden z-10"
                                >
                                    <div className="bg-[#007AFF] p-6 pb-20 relative overflow-hidden">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-white text-md font-bold uppercase tracking-tight">sSOCIALS</h4>
                                            <div className="flex gap-1.5 opacity-60">
                                                {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-white" />)}
                                            </div>
                                        </div>
                                        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-[75%] h-32 bg-white/10 rounded-xl border border-white/20 p-3">
                                            <div className="w-full h-[2px] bg-white/20 mb-3" />
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="bg-white/5 rounded-lg h-10" />
                                                <div className="bg-white/10 rounded-lg h-16 relative">
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="w-[60%] h-[2px] bg-white/20" />
                                                        <div className="absolute w-[2px] h-[60%] bg-white/20" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 pt-12 space-y-6">
                                        <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                                            <div>
                                                <p className="text-[10px] font-bold text-[#007AFF] uppercase tracking-wider mb-0.5">Project Owner</p>
                                                <p className="text-sm font-bold text-slate-800">Sarah Desayi</p>
                                            </div>
                                            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-slate-100">
                                                <img src="https://ui-avatars.com/api/?name=Sarah+Desayi&background=ffcc00&color=fff" alt="Sarah" className="w-full h-full object-cover" />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Project Hour</p>
                                            </div>
                                            <div className="flex items-end gap-1.5 h-16">
                                                {[30, 50, 40, 60, 25, 100, 45, 85, 30, 40].map((h, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ height: 0 }}
                                                        animate={{ height: `${h}%` }}
                                                        transition={{ delay: 1 + (i * 0.04), duration: 0.6 }}
                                                        className={`flex-1 ${i === 5 || i === 7 ? 'bg-[#007AFF]' : 'bg-[#007AFF]/20'} rounded-t-sm`}
                                                    />
                                                ))}
                                            </div>
                                            <div className="flex justify-between items-end">
                                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Logged Hours</p>
                                                <p className="text-2xl font-bold text-[#007AFF] leading-none">16:00</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Revenue Card (Dark) */}
                                <motion.div
                                    initial={{ opacity: 0, x: -30, scale: 0.9 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    transition={{ delay: 0.4, duration: 0.8 }}
                                    className="absolute left-[5%] bottom-[12%] w-[45%] bg-[#1A1A1A] rounded-[2rem] p-5 shadow-2xl z-20"
                                >
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">Project Revenue</p>
                                    <div className="h-14 w-full relative mb-4">
                                        <svg viewBox="0 0 200 60" className="w-full h-full overflow-visible">
                                            <motion.path
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ delay: 1.2, duration: 2 }}
                                                d="M 0 45 Q 30 40 50 30 T 90 40 T 130 15 T 200 25"
                                                fill="none"
                                                stroke="#007AFF"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                            />
                                            <motion.circle
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 2.8 }}
                                                cx="130" cy="15" r="3.5" fill="white" stroke="#007AFF" strokeWidth="2"
                                            />
                                        </svg>
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                                            <ArrowUpRight className="w-2.5 h-2.5" />
                                            Increasing
                                        </p>
                                        <p className="text-4xl font-bold text-white tracking-tighter">89%</p>
                                    </div>
                                </motion.div>

                                {/* Cost Card (Light) */}
                                <motion.div
                                    initial={{ opacity: 0, x: 30, y: -20, scale: 0.9 }}
                                    animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                                    transition={{ delay: 0.6, duration: 0.8 }}
                                    className="absolute right-[5%] top-[10%] w-[40%] bg-white rounded-[2rem] p-5 shadow-2xl z-20 border border-slate-50"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-1.5">
                                            <p className="text-[10px] font-bold text-slate-800 uppercase tracking-wider">Project Cost</p>
                                            <svg width="6" height="4" viewBox="0 0 6 4" fill="none" className="text-red-500">
                                                <path d="M1 1L3 3L5 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="relative w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                                        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                                            <circle cx="50" cy="50" r="38" fill="none" stroke="#F1F5F9" strokeWidth="12" />
                                            <motion.circle
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 0.4 }}
                                                transition={{ delay: 1.8, duration: 1.5 }}
                                                cx="50" cy="50" r="38" fill="none" stroke="#FFB800" strokeWidth="12" strokeLinecap="round"
                                            />
                                        </svg>
                                        <div className="absolute flex flex-col items-center">
                                            <p className="text-sm font-bold text-slate-900 leading-none">40%</p>
                                            <p className="text-[8px] font-bold text-slate-400 uppercase">used</p>
                                        </div>
                                    </div>
                                    <p className="text-center text-[9px] font-medium text-slate-500 leading-tight">
                                        60 of Project<br />budget is left
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Right Side: Log In Form */}
                <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 relative overflow-y-auto lg:overflow-hidden">
                    <div className="w-full max-w-sm">
                        <motion.div
                            initial={false}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-6"
                        >
                            <h2 className="text-2xl font-black text-slate-900 mb-1">
                                {mode === 'login' ? 'Welcome back' : 'Create account'}
                            </h2>
                            <p className="text-slate-400 text-xs font-medium">
                                {mode === 'login' ? 'Please enter your details to sign in.' : 'Start your growth journey today.'}
                            </p>
                        </motion.div>

                        <div className="bg-slate-50 border border-slate-100 p-1 rounded-2xl flex mb-6">
                            <button
                                onClick={() => setMode('login')}
                                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${mode === 'login' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                Log In
                            </button>
                            <button
                                onClick={() => setMode('signup')}
                                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${mode === 'signup' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                Sign Up
                            </button>
                        </div>

                        <form onSubmit={handleAuth} className="space-y-4">
                            {error && (
                                <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-[9px] font-bold uppercase tracking-wider">
                                    {error}
                                </div>
                            )}

                            <AnimatePresence mode="wait">
                                {mode === 'signup' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="space-y-1.5 group"
                                    >
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-blue-600 transition-colors">Full Name</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="John Doe"
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-medium text-sm text-slate-900 placeholder:text-slate-300"
                                            required={mode === 'signup'}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="space-y-1.5 group">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-blue-600 transition-colors">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@company.com"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-medium text-sm text-slate-900 placeholder:text-slate-300"
                                    required
                                />
                            </div>

                            <div className="space-y-1.5 group">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-blue-600 transition-colors">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-medium text-sm text-slate-900 placeholder:text-slate-300"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-12 bg-[#3B82F6] hover:bg-blue-600 text-white font-black text-sm rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] flex items-center justify-center gap-2 group"
                            >
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <span>{mode === 'login' ? 'Log In' : 'Create Account'}</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-100"></div>
                                </div>
                                <div className="relative flex justify-center text-[9px] font-black uppercase tracking-widest">
                                    <span className="bg-white px-4 text-slate-300">Or continue with</span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                disabled={loading}
                                className="w-full h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center gap-3 font-bold text-sm text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm active:scale-[0.98]"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                <span>{mode === 'login' ? 'Sign in with Google' : 'Sign up with Google'}</span>
                            </button>
                        </form>

                        <p className="mt-8 text-center text-[10px] font-bold text-slate-400">
                            {mode === 'login' ? 'New to SocialScale?' : 'Already have an account?'}
                            <button
                                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                                className="text-blue-600 hover:text-blue-700 ml-2 transition-colors"
                            >
                                {mode === 'login' ? 'Create Account' : 'Log In'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};
