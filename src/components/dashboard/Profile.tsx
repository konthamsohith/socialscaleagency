import { useEffect, useState } from 'react';
import { auth } from '../../lib/firebase';
import { Mail, Shield, LogOut, User as UserIcon, MapPin, Phone, Pencil } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, User, updateProfile } from 'firebase/auth';

export const Profile = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [displayName, setDisplayName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) setDisplayName(currentUser.displayName || '');
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const handleSave = async () => {
        if (!user) return;
        try {
            await updateProfile(user, { displayName });
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (loading) return <div className="p-8 text-center text-slate-500">Loading profile...</div>;

    if (!user) {
        return (
            <div className="flex items-center justify-center p-8">
                <p className="text-slate-500">Please log in to view profile.</p>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
            {/* Header Section */}
            <div className="mb-24">
                {/* Banner & Avatar Wrapper */}
                <div className="relative">
                    {/* Gradient Background */}
                    <div className="h-48 w-full bg-gradient-to-r from-[#0037FF] to-purple-600 rounded-3xl relative overflow-hidden shadow-lg">
                        <div className="absolute inset-0 bg-white/5" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                    </div>

                    {/* Avatar & Desktop Info - Flex with negative margin to overlap */}
                    <div className="px-8 -mt-16 relative flex flex-col md:flex-row items-center md:items-end gap-6">
                        <div className="relative group shrink-0">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-white p-1.5 shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500 ease-out">
                                {user.photoURL ? (
                                    <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full object-cover rounded-2xl bg-slate-100" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-slate-100 text-electric-purple rounded-2xl">
                                        <span className="text-4xl md:text-5xl font-bold">{user.displayName?.charAt(0) || 'U'}</span>
                                    </div>
                                )}
                                <div className="absolute -bottom-2 -right-2 bg-emerald-500 border-4 border-white w-6 h-6 md:w-8 md:h-8 rounded-full shadow-lg" />
                            </div>
                        </div>

                        <div className="hidden md:block mb-4 pt-16">
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-1 leading-none tracking-tight">{user.displayName || 'User'}</h1>
                            <p className="text-slate-500 font-medium text-lg">{user.email}</p>
                        </div>
                    </div>
                </div>

                {/* Mobile Name & Info */}
                <div className="md:hidden mt-4 px-4 text-center">
                    <h1 className="text-2xl font-bold text-slate-900 mb-1">{user.displayName || 'User'}</h1>
                    <p className="text-slate-500 text-sm">{user.email}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Personal Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-1">Personal Information</h3>
                                <p className="text-sm text-slate-500">Manage your personal details.</p>
                            </div>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className={`p-2 rounded-xl transition-colors ${isEditing ? 'bg-electric-purple text-white' : 'text-slate-400 hover:bg-slate-100'}`}
                            >
                                <Pencil size={20} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                                    <UserIcon size={14} /> Display Name
                                </label>
                                <input
                                    type="text"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    disabled={!isEditing}
                                    placeholder="Your Name"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:border-electric-purple focus:ring-4 focus:ring-electric-purple/5 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                                    <Mail size={14} /> Email Address
                                </label>
                                <input
                                    type="email"
                                    defaultValue={user.email || ''}
                                    disabled
                                    className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-4 py-3 text-slate-500 font-medium cursor-not-allowed"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                                    <Phone size={14} /> Phone
                                </label>
                                <input
                                    type="tel"
                                    placeholder="+1 (555) 000-0000"
                                    disabled={!isEditing}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:border-electric-purple focus:ring-4 focus:ring-electric-purple/5 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                                    <MapPin size={14} /> Location
                                </label>
                                <input
                                    type="text"
                                    placeholder="San Francisco, CA"
                                    disabled={!isEditing}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:border-electric-purple focus:ring-4 focus:ring-electric-purple/5 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                />
                            </div>
                        </div>

                        {isEditing && (
                            <div className="flex justify-end pt-6 border-t border-slate-100">
                                <Button className="px-8" onClick={handleSave}>Save Changes</Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Account Status */}
                <div className="space-y-6">
                    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <h3 className="text-lg font-bold text-slate-900 mb-6">Account Status</h3>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-200 transition-colors">
                                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                                    <Shield size={20} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">Plan</p>
                                    <p className="font-bold text-slate-900">Pro Member</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-purple-200 transition-colors">
                                <div className="p-3 bg-purple-100 text-purple-600 rounded-xl group-hover:scale-110 transition-transform">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">Verification</p>
                                    <p className="font-bold text-slate-900">{user.emailVerified ? 'Verified' : 'Pending'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 p-4 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 rounded-xl font-bold transition-all duration-200 group"
                        >
                            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
