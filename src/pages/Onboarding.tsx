import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { ArrowRight, Check, User, Briefcase, Building2, Rocket, TrendingUp, DollarSign, Target, Globe, Smartphone, Camera, Heart, MoreHorizontal, Users, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';

const steps = [
    {
        id: 'userType',
        title: 'Who are you?',
        subtitle: 'Help us tailor the experience for you.'
    },
    {
        id: 'stage',
        title: 'Current Stage',
        subtitle: 'Where are you in your social media journey?'
    },
    {
        id: 'industry',
        title: 'Your Niche',
        subtitle: 'What industry do you operate in?'
    },
    {
        id: 'goal',
        title: 'Primary Goal',
        subtitle: 'What do you want to achieve?'
    },
    {
        id: 'completion',
        title: "All Systems Go",
        subtitle: "Your dashboard has been calibrated."
    }
];

const userTypes = [
    { id: 'creator', title: 'Content Creator', icon: User, description: 'Influencers, Artists, Personal Brands' },
    { id: 'business', title: 'Business Owner', icon: Briefcase, description: 'E-commerce, Local Business, Startups' },
    { id: 'agency', title: 'Marketing Agency', icon: Building2, description: 'Managing accounts for clients' }
];

const stages = [
    { id: 'starter', title: 'Just Starting', icon: Rocket, description: '0 - 1k Followers' },
    { id: 'scaling', title: 'Scaling Up', icon: TrendingUp, description: '1k - 100k Followers' },
    { id: 'monetizing', title: 'Monetizing', icon: DollarSign, description: '100k+ Followers' }
];

const industries = [
    { id: 'fashion', title: 'Fashion & Beauty', icon: Camera },
    { id: 'lifestyle', title: 'Lifestyle & Travel', icon: Globe },
    { id: 'fitness', title: 'Health & Fitness', icon: Heart },
    { id: 'entertainment', title: 'Entertainment', icon: Smartphone },
    { id: 'business', title: 'Business & Finance', icon: Target },
    { id: 'other', title: 'Other', icon: MoreHorizontal }
];

const goals = [
    { id: 'growth', title: 'Accelerate Growth', description: 'Gain followers & reach', icon: TrendingUp },
    { id: 'engagement', title: 'Boost Engagement', description: 'Likes, comments, shares', icon: Users },
    { id: 'visibility', title: 'Maximize Visibility', description: 'Brand awareness & views', icon: Eye }
];

export const Onboarding = () => {
    const navigate = useNavigate();
    const { user, refreshUser } = useAuth();
    const [currentStep, setCurrentStep] = useState(0);
    const [userName, setUserName] = useState<string>('');

    // Form State
    const [userType, setUserType] = useState<string | null>(null);
    const [stage, setStage] = useState<string | null>(null);
    const [industry, setIndustry] = useState<string | null>(null);
    const [goal, setGoal] = useState<string | null>(null);

    useEffect(() => {
        if (user?.name) {
            setUserName(user.name.split(' ')[0]);
        } else if (user?.email) {
            setUserName(user.email.split('@')[0]);
        }
    }, [user]);

    const handleNext = async () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            // Save onboarding data to user profile
            try {
                await apiService.updateProfile({
                    profile: {
                        userType,
                        stage,
                        industry,
                        goal
                    }
                });
                // Refresh user data
                await refreshUser();
            } catch (error) {
                console.error('Failed to save onboarding data:', error);
                // Still navigate even if save fails
            }
            navigate('/dashboard');
        }
    };

    const isStepValid = () => {
        switch (currentStep) {
            case 0: return !!userType;
            case 1: return !!stage;
            case 2: return !!industry;
            case 3: return !!goal;
            default: return true;
        }
    };

    return (
        <>
            <SEO title="Onboarding" description="Set up your SocialScale preferences." />
            <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900 relative overflow-hidden font-inter selection:bg-blue-100">

                {/* Ambient Background - Light Mode */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-200/40 rounded-full blur-[120px] mix-blend-multiply animate-pulse duration-[10s]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[100px] mix-blend-multiply" />
                </div>

                <div className="w-full max-w-4xl relative z-10 p-6 flex flex-col items-center">

                    {/* Progress Indicator */}
                    <div className="mb-12 flex items-center gap-3">
                        {steps.map((_, index) => (
                            <motion.div
                                key={index}
                                initial={false}
                                animate={{
                                    width: index === currentStep ? 32 : 8,
                                    opacity: 1,
                                    backgroundColor: index <= currentStep ? '#2563EB' : '#E2E8F0' // blue-600 : slate-200
                                }}
                                className="h-2 rounded-full transition-all duration-500"
                            />
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, y: 20, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.98 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="w-full"
                        >
                            <div className="text-center mb-10">
                                <h1 className="text-4xl md:text-5xl font-bold font-archivo tracking-tight mb-4 text-slate-900">
                                    {steps[currentStep].id === 'completion' && userName
                                        ? `Welcome, ${userName}`
                                        : steps[currentStep].title}
                                </h1>
                                <p className="text-lg text-slate-500 max-w-xl mx-auto">
                                    {steps[currentStep].subtitle}
                                </p>
                            </div>

                            {/* Step 1: User Type */}
                            {currentStep === 0 && (
                                <div className="grid md:grid-cols-3 gap-6">
                                    {userTypes.map((type, idx) => (
                                        <SelectionCard
                                            key={type.id}
                                            selected={userType === type.id}
                                            onClick={() => setUserType(type.id)}
                                            icon={type.icon}
                                            title={type.title}
                                            description={type.description}
                                            index={idx}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Step 2: Stage */}
                            {currentStep === 1 && (
                                <div className="grid md:grid-cols-3 gap-6">
                                    {stages.map((s, idx) => (
                                        <SelectionCard
                                            key={s.id}
                                            selected={stage === s.id}
                                            onClick={() => setStage(s.id)}
                                            icon={s.icon}
                                            title={s.title}
                                            description={s.description}
                                            index={idx}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Step 3: Industry */}
                            {currentStep === 2 && (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {industries.map((ind, idx) => (
                                        <SelectionCard
                                            key={ind.id}
                                            selected={industry === ind.id}
                                            onClick={() => setIndustry(ind.id)}
                                            icon={ind.icon}
                                            title={ind.title}
                                            index={idx}
                                            compact
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Step 4: Goals */}
                            {currentStep === 3 && (
                                <div className="grid md:grid-cols-3 gap-6">
                                    {goals.map((g, idx) => (
                                        <SelectionCard
                                            key={g.id}
                                            selected={goal === g.id}
                                            onClick={() => setGoal(g.id)}
                                            icon={g.icon}
                                            title={g.title}
                                            description={g.description}
                                            index={idx}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Step 5: Completion */}
                            {currentStep === 4 && (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <div className="relative mb-8">
                                        <div className="absolute inset-0 bg-green-200 rounded-full blur-xl animate-pulse" />
                                        <motion.div
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                            className="relative w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-xl"
                                        >
                                            <Check size={48} strokeWidth={4} className="text-white drop-shadow-md" />
                                        </motion.div>
                                    </div>
                                    <p className="text-slate-600 max-w-md mx-auto text-lg leading-relaxed">
                                        Your dashboard is calibrated and ready. Buckle up for exponential growth.
                                    </p>
                                </div>
                            )}

                            <motion.div
                                className="mt-16 flex justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <button
                                    onClick={handleNext}
                                    disabled={!isStepValid()}
                                    className="group relative px-8 py-4 bg-blue-600 text-white font-bold rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 hover:shadow-lg hover:scale-105 flex items-center gap-3 overflow-hidden"
                                >
                                    <span className="relative z-10">
                                        {currentStep === steps.length - 1 ? 'Launch Dashboard' : 'Continue'}
                                    </span>
                                    <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
};

const SelectionCard = ({ selected, onClick, icon: Icon, title, description, index, compact = false }: any) => (
    <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        onClick={onClick}
        className={`relative group ${compact ? 'p-6' : 'p-8'} rounded-2xl border text-left transition-all duration-300 overflow-hidden w-full ${selected
            ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500 shadow-lg shadow-blue-500/10'
            : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md'
            }`}
    >
        {Icon && (
            <div className={`p-4 rounded-xl inline-flex mb-4 ${selected
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all duration-300'
                }`}>
                <Icon size={compact ? 24 : 28} />
            </div>
        )}

        <h3 className={`font-bold mb-1 font-archivo transition-colors ${compact ? 'text-lg' : 'text-xl'} ${selected ? 'text-blue-900' : 'text-slate-900 group-hover:text-blue-700'
            }`}>
            {title}
        </h3>
        {description && (
            <p className={`text-sm leading-relaxed transition-colors ${selected ? 'text-blue-700/80' : 'text-slate-500 group-hover:text-slate-600'
                }`}>
                {description}
            </p>
        )}

        {selected && (
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-4 right-4 text-blue-600"
            >
                <Check size={20} strokeWidth={3} />
            </motion.div>
        )}
    </motion.button>
);
