import { useState, useEffect, useRef } from 'react';
import { auth, db, storage } from '../../lib/firebase';
import { updateProfile, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { motion } from 'framer-motion';
import {
    Camera,
    Loader2,
    FileText,
    Download,
    Plus,
    Save,
    Shield,
    Bell,
    CreditCard,
    Check
} from 'lucide-react';
import clsx from 'clsx';

export const Profile = () => {
    // Auth & Refs
    const fileInputRef = useRef<HTMLInputElement>(null);

    // State
    const [fetching, setFetching] = useState(true);
    const [saving, setSaving] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    // Form Data
    const [displayName, setDisplayName] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [notes, setNotes] = useState('');

    // UI State
    const [activeTab, setActiveTab] = useState('notifications');

    // Fetch User Data
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser: User | null) => {
            if (currentUser) {
                // 1. Set Auth data immediately for instant UI
                setUser(currentUser);
                setDisplayName(currentUser.displayName || '');
                setAvatarUrl(currentUser.photoURL);
                setFetching(false); // Stop loading immediately

                // 2. Fetch extended data in background
                try {
                    const docRef = doc(db, 'users', currentUser.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setPhone(data.phone || '');
                        setCompany(data.company || '');
                        setLocation(data.location || '');
                        setNotes(data.notes || '');
                    }
                } catch (err) {
                    console.error("Error fetching user data (background):", err);
                }
            } else {
                setFetching(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const getInitials = (name: string | null) => {
        if (!name) return 'U';
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const handleImageClick = () => fileInputRef.current?.click();

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user) return;

        if (file.size > 5 * 1024 * 1024) {
            alert("Image size must be less than 5MB");
            return;
        }

        try {
            const storageRef = ref(storage, `avatars/${user.uid}/${Date.now()}_${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);

            await updateProfile(user, { photoURL: downloadURL });
            setAvatarUrl(downloadURL);

            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, { photoURL: downloadURL }, { merge: true });
        } catch (err) {
            console.error("Error uploading image:", err);
            alert("Failed to upload image");
        }
    };

    const handleSave = async () => {
        if (!user) return;
        setSaving(true);

        try {
            if (displayName !== user.displayName) {
                await updateProfile(user, { displayName });
            }

            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, {
                displayName,
                phone,
                company,
                location,
                notes,
                updatedAt: new Date().toISOString()
            }, { merge: true });

            // Optional: Add toast notification here
        } catch (err: any) {
            console.error("Error saving profile (FULL):", err);
            // Alert the actual error message or a fallback
            alert(`Failed to save changes: ${err.message || JSON.stringify(err)}`);
        } finally {
            setSaving(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-[1600px] mx-auto space-y-6 pb-12 font-sans text-slate-900">
            {/* Header / Actions */}
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
                    <p className="text-slate-500 text-sm">Manage your personal information and settings</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-blue-600/20 active:scale-95 disabled:opacity-70"
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* 1. LEFT: Profile Summary Card */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center h-full">
                        <div className="relative group cursor-pointer mb-5" onClick={handleImageClick}>
                            {avatarUrl ? (
                                <img
                                    src={avatarUrl}
                                    alt={displayName}
                                    className="w-28 h-28 rounded-full object-cover border-4 border-slate-50 shadow-sm"
                                />
                            ) : (
                                <div className="w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600 border-4 border-slate-50">
                                    {getInitials(displayName)}
                                </div>
                            )}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition-all">
                                <Camera className="w-8 h-8 text-white" />
                            </div>
                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
                        </div>

                        <h2 className="text-xl font-bold text-slate-900">{displayName || 'User'}</h2>
                        <p className="text-slate-400 text-sm mb-6">{user?.email}</p>

                        <div className="grid grid-cols-2 w-full border-t border-slate-100 pt-6 gap-4">
                            <div>
                                <div className="text-xl font-bold text-slate-900">15</div>
                                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Orders</div>
                            </div>
                            <div>
                                <div className="text-xl font-bold text-slate-900">2</div>
                                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Active</div>
                            </div>
                        </div>

                        <button className="w-full mt-6 py-2.5 border border-slate-200 rounded-xl text-slate-600 font-medium hover:bg-slate-50 transition-colors text-sm">
                            Edit Avatar
                        </button>
                    </div>
                </div>

                {/* 2. MIDDLE: General Information */}
                <div className="lg:col-span-6">
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 h-full">
                        <div className="flex justify-between items-start mb-8">
                            <h3 className="text-lg font-bold text-slate-900">General Information</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                            {/* Full Name */}
                            <div className="group">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Display Name</label>
                                <input
                                    type="text"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    className="w-full font-semibold text-slate-900 bg-transparent border-b border-transparent group-hover:border-slate-200 focus:border-blue-500 focus:outline-none transition-colors py-1 pl-1"
                                />
                            </div>

                            {/* Company */}
                            <div className="group">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Company</label>
                                <input
                                    type="text"
                                    value={company}
                                    placeholder="Add Company"
                                    onChange={(e) => setCompany(e.target.value)}
                                    className="w-full font-semibold text-slate-900 bg-transparent border-b border-transparent group-hover:border-slate-200 focus:border-blue-500 focus:outline-none transition-colors py-1 pl-1 placeholder:text-slate-300"
                                />
                            </div>

                            {/* Location */}
                            <div className="group">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Address/Location</label>
                                <input
                                    type="text"
                                    value={location}
                                    placeholder="City, Country"
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="w-full font-semibold text-slate-900 bg-transparent border-b border-transparent group-hover:border-slate-200 focus:border-blue-500 focus:outline-none transition-colors py-1 pl-1 placeholder:text-slate-300"
                                />
                            </div>

                            {/* Phone */}
                            <div className="group">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    value={phone}
                                    placeholder="+1 (555) 000-0000"
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full font-semibold text-slate-900 bg-transparent border-b border-transparent group-hover:border-slate-200 focus:border-blue-500 focus:outline-none transition-colors py-1 pl-1 placeholder:text-slate-300"
                                />
                            </div>

                            {/* Member Status */}
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Member Status</label>
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-wider">
                                    Active Member
                                </span>
                            </div>

                            {/* Reg Date */}
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Registered Date</label>
                                <div className="font-semibold text-slate-900 pl-1">
                                    {user?.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. RIGHT: Notes */}
                <div className="lg:col-span-3">
                    <div className="bg-blue-50/50 rounded-2xl p-6 shadow-sm border border-blue-100 h-full flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-slate-900">Notes</h3>
                            <button className="text-blue-600 text-sm font-medium hover:underline">See all</button>
                        </div>

                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Add generic notes about your account preferences or reminders here..."
                            className="flex-1 w-full bg-white/50 border border-blue-100 rounded-xl p-4 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                        />

                        <button
                            onClick={handleSave}
                            className="w-auto ml-auto mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                        >
                            Save Note
                        </button>
                    </div>
                </div>

                {/* 4. BOTTOM LEFT: Account Settings */}
                <div className="lg:col-span-9">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 min-h-[400px] flex flex-col">

                        {/* Custom Tab Navigation */}
                        <div className="border-b border-slate-100 mb-6">
                            <div className="flex items-center gap-6">
                                {['Notifications', 'Billing'].map(tab => {
                                    const tabKey = tab.toLowerCase();
                                    const isActive = activeTab === tabKey;
                                    return (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tabKey)}
                                            className={clsx(
                                                "pb-4 text-sm font-bold transition-all relative",
                                                isActive ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
                                            )}
                                        >
                                            {tab}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeTab"
                                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full"
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1">
                            {activeTab === 'notifications' && (
                                <div className="space-y-6 max-w-2xl">
                                    {[
                                        { title: 'Order Updates', desc: 'Get notified when your order status changes.', checked: true },
                                        { title: 'Marketing Emails', desc: 'Receive news about new features and updates.', checked: false },
                                        { title: 'Security Alerts', desc: 'Get notified about suspicious activity.', checked: true }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start justify-between pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                                                <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'billing' && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="border border-blue-200 bg-blue-50/50 rounded-2xl p-5 flex flex-col justify-between h-40 relative group cursor-pointer">
                                            <div className="flex justify-between items-start">
                                                <CreditCard className="w-8 h-8 text-blue-600" />
                                                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white">
                                                    <Check className="w-3 h-3" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-slate-900 font-bold tracking-widest">•••• •••• •••• 4242</div>
                                                <div className="text-xs text-slate-500 font-medium mt-1">Expires 12/28</div>
                                            </div>
                                        </div>

                                        <button className="border-2 border-dashed border-slate-200 rounded-2xl p-5 flex flex-col items-center justify-center h-40 text-slate-400 hover:border-blue-300 hover:text-blue-500 hover:bg-slate-50 transition-all">
                                            <Plus className="w-8 h-8 mb-2" />
                                            <span className="text-sm font-bold">Add Payment Method</span>
                                        </button>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900 mb-4">Billing History</h4>
                                        <div className="space-y-3">
                                            {[1, 2].map(i => (
                                                <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-100">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                                                            <FileText className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-bold text-slate-900">Invoice #INV-2024-00{i}</div>
                                                            <div className="text-xs text-slate-500">Oct {20 + i}, 2024</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-sm font-bold text-slate-900">$199.00</div>
                                                        <div className="text-xs text-green-600 font-bold">Paid</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* 5. BOTTOM RIGHT: Files */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-full">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-slate-900">Documents</h3>
                            <button className="flex items-center gap-1.5 text-blue-600 text-sm font-bold hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                                <Plus className="w-4 h-4" />
                                Add
                            </button>
                        </div>

                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="group flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Invoice_Oct_{i}.pdf</div>
                                            <div className="text-xs text-slate-400">123kb</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500">
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
