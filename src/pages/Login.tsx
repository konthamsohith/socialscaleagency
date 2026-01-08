import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { SEO } from '../components/common/SEO';
import { Loader2, ArrowRight } from 'lucide-react';

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
                    {/* Decorative Background Patterns */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-900/20 rounded-full blur-[80px]" />

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
                            className="bg-white rounded-[2rem] p-6 shadow-2xl shadow-blue-900/20 border border-white/10"
                        >
                            <div className="relative w-full aspect-[4/3] scale-90 xxl:scale-100">
                                {/* Background Elements */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.15 }}
                                    transition={{ delay: 1 }}
                                    className="absolute -right-8 -bottom-8 w-48 h-48"
                                >
                                    <svg viewBox="0 0 200 200" className="w-full h-full text-blue-900 fill-current">
                                        <path d="M100 10 C 130 10, 150 40, 150 80 Q 150 120, 180 140 T 160 190 T 100 170 T 40 190 T 20 140 Q 50 120, 50 80 C 50 40, 70 10, 100 10" />
                                    </svg>
                                </motion.div>

                                {/* Floating Coins */}
                                {[
                                    { top: '10%', left: '25%', size: 'w-16', delay: 0.8, y: [0, -10, 0] },
                                    { top: '35%', left: '15%', size: 'w-20', delay: 1.2, y: [0, -15, 0] },
                                    { top: '25%', left: '70%', size: 'w-12', delay: 1.5, y: [0, -8, 0] },
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
                                            y: { repeat: Infinity, duration: 3 + i, ease: "easeInOut" }
                                        }}
                                        className={`absolute ${coin.size} aspect-square z-20`}
                                        style={{ top: coin.top, left: coin.left }}
                                    >
                                        <div className="w-full h-full rounded-full bg-white shadow-xl shadow-blue-900/10 border border-slate-100 flex items-center justify-center -rotate-12">
                                            <div className="w-[80%] h-[80%] rounded-full border-2 border-slate-100 flex items-center justify-center">
                                                <div className="w-3 h-3 bg-blue-500 rounded-sm rotate-45" />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}

                                {/* Main White Card: Website Design */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="absolute inset-0 m-auto w-[85%] h-[85%] bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/10 border border-white overflow-hidden z-10"
                                >
                                    <div className="h-[40%] bg-blue-600 p-8 relative overflow-hidden">
                                        <h4 className="text-white text-lg font-black tracking-tight uppercase">Website Design</h4>
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[60%] bg-white/10 rounded-xl border border-white/20 p-2">
                                            <div className="flex gap-1 mb-2">
                                                {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-white/40" />)}
                                            </div>
                                            <div className="w-full h-[2px] bg-white/20 mb-2" />
                                            <div className="grid grid-cols-2 gap-2 h-full">
                                                <div className="bg-white/5 rounded h-8" />
                                                <div className="border border-white/10 rounded h-12" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-8 space-y-8">
                                        <div className="flex justify-between items-center pb-4 border-b border-slate-100 border-dashed">
                                            <div>
                                                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest leading-none mb-1">Project Owner</p>
                                                <p className="text-sm font-bold text-slate-800 tracking-tight">Sarah Desayi</p>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-amber-100 overflow-hidden border-2 border-white shadow-sm">
                                                <div className="w-full h-full bg-gradient-to-br from-amber-400 to-orange-500" />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Project Hour</p>
                                            <div className="flex items-end gap-2 h-20">
                                                {[40, 70, 45, 60, 35, 80, 50, 95, 40, 65].map((h, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ height: 0 }}
                                                        animate={{ height: `${h}%` }}
                                                        transition={{ delay: 1.5 + (i * 0.05), duration: 0.8 }}
                                                        className="flex-1 bg-blue-500/20 rounded-t-sm relative group"
                                                    >
                                                        <div className="absolute bottom-0 left-0 w-full bg-blue-500 rounded-t-sm transition-all h-1/3 group-hover:h-full" />
                                                    </motion.div>
                                                ))}
                                            </div>
                                            <div className="flex justify-between items-end">
                                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Logged Hours</p>
                                                <p className="text-2xl font-black text-blue-600 leading-none">16:00</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Overlapping Card: Project Revenue (Dark) */}
                                <motion.div
                                    initial={{ opacity: 0, x: -50, scale: 0.9 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    transition={{ delay: 0.4, duration: 0.8 }}
                                    className="absolute -left-4 bottom-[15%] w-[50%] bg-[#1E1E1E] rounded-[2rem] p-6 shadow-2xl z-30"
                                >
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Project Revenue</p>
                                    <div className="h-16 w-full relative mb-4">
                                        <svg viewBox="0 0 200 60" className="w-full h-full overflow-visible">
                                            <motion.path
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ delay: 1.2, duration: 1.5 }}
                                                d="M 0 45 Q 40 45 60 25 T 100 35 T 140 10 T 200 30"
                                                fill="none"
                                                stroke="#3B82F6"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                            />
                                            <motion.circle
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 2.7 }}
                                                cx="140" cy="10" r="3" fill="white"
                                            />
                                        </svg>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                                            <div className="w-1 h-1 rounded-full bg-emerald-500" />
                                            Increasing
                                        </p>
                                        <p className="text-4xl font-black text-white tracking-tighter">89%</p>
                                    </div>
                                </motion.div>

                                {/* Overlapping Card: Project Cost (Donut) */}
                                <motion.div
                                    initial={{ opacity: 0, x: 50, y: -30, scale: 0.9 }}
                                    animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                                    transition={{ delay: 0.6, duration: 0.8 }}
                                    className="absolute -right-4 top-[5%] w-[45%] bg-white rounded-[2rem] p-6 shadow-2xl z-30 border border-slate-100"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Project Cost</p>
                                        <div className="w-2 h-2 rounded-full bg-red-400" />
                                    </div>
                                    <div className="relative w-24 h-24 mx-auto mb-4">
                                        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                                            <circle cx="50" cy="50" r="40" fill="none" stroke="#F1F5F9" strokeWidth="12" />
                                            <motion.circle
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 0.4 }}
                                                transition={{ delay: 1.8, duration: 1.5, ease: "easeOut" }}
                                                cx="50" cy="50" r="40" fill="none" stroke="#FBBF24" strokeWidth="12" strokeLinecap="round"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <p className="text-sm font-black text-slate-900 leading-none">40%</p>
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
