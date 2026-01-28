import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiService } from '../../services/api';

import { motion } from 'framer-motion';
import {
    FileText,
    Download
} from 'lucide-react';
import clsx from 'clsx';

export const Profile = () => {
    // Auth & Refs
    const { user, isLoading } = useAuth();
    // const fileInputRef = useRef<HTMLInputElement>(null);

    // State
    // const [saving, setSaving] = useState(false);

    // Form Data
    const [displayName, setDisplayName] = useState('');
    // const [phone, setPhone] = useState('');
    // const [company, setCompany] = useState('');
    // const [location, setLocation] = useState('');
    // const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    // const [notes, setNotes] = useState('');


    // UI State
    const [activeTab, setActiveTab] = useState('notifications');
    const [invoices, setInvoices] = useState<any[]>([]);
    const [loadingInvoices, setLoadingInvoices] = useState(false);

    // Initialize User Data
    useEffect(() => {
        if (user) {
            setDisplayName(user.name || '');
            // setAvatarUrl(user.photoURL || null);
            // setPhone(user.phone || '');
            // setCompany(user.company || '');
            // setLocation(user.location || '');
            // setNotes(user.notes || '');
        }
    }, [user]);

    useEffect(() => {
        loadInvoices();
    }, []);


    const loadInvoices = async () => {
        try {
            setLoadingInvoices(true);
            const response = await apiService.getInvoices(1, 10);
            setInvoices(response.data || []);
        } catch (error) {
            console.error('Failed to load invoices:', error);
        } finally {
            setLoadingInvoices(false);
        }
    };

    const handleDownloadInvoice = async (invoiceId: string, invoiceName: string) => {
        try {
            const blob = await apiService.downloadInvoice(invoiceId);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${invoiceName}.pdf`;
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Failed to download invoice:', error);
            alert('Failed to download invoice');
        }
    };

    const getInitials = (name: string | null) => {
        if (!name) return 'U';
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    /*
    const handleImageClick = () => {
        // fileInputRef.current?.click();
        alert("Avatar upload is coming soon!");
    };

    const handleImageChange = async (_: React.ChangeEvent<HTMLInputElement>) => {
        // Disabled for now until API supports upload
        console.log("Image upload disabled");
    };

    const handleSave = async () => {
        if (!user) return;
        setSaving(true);

        try {
            await apiService.updateProfile({
                profile: {
                    name: displayName,
                    phone,
                    company,
                    location,
                    notes,
                }
            });

            await refreshUser();
        } catch (err: any) {
            console.error("Error saving profile:", err);
            alert(`Failed to save changes: ${err.message || 'Unknown error'}`);
        } finally {
            setSaving(false);
        }
    };
    */

    if (isLoading) {

        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-slate-500">Loading profile...</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-slate-500">Please log in to view your profile.</div>
            </div>
        );
    }

    return (
        <div className="max-w-[1600px] mx-auto space-y-6 pb-12 font-sans text-slate-900">
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
                    <p className="text-slate-500 text-sm">View your account information</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* 1. LEFT: Profile Summary Card */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center h-full">
                        <div className="relative mb-5">
                            <div className="w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600 border-4 border-slate-50">
                                {getInitials(user.name)}
                            </div>
                        </div>

                        <h2 className="text-xl font-bold text-slate-900">{displayName || user.name || 'User'}</h2>

                        <p className="text-slate-400 text-sm mb-6">{user.email}</p>

                        <div className="grid grid-cols-2 w-full border-t border-slate-100 pt-6 gap-4">
                            <div>
                                <div className="text-xl font-bold text-slate-900">₹{(user.wallet?.balance || 0).toFixed(2)}</div>
                                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Wallet</div>
                            </div>
                            <div>
                                <div className="text-xl font-bold text-slate-900">{user.role === 'SUPER_ADMIN' ? 'Admin' : 'User'}</div>
                                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Role</div>
                            </div>
                        </div>

                        <button className="w-full mt-6 py-2.5 border border-slate-200 rounded-xl text-slate-600 font-medium hover:bg-slate-50 transition-colors text-sm" onClick={() => alert('Coming soon!')}>
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
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                                <div className="w-full font-semibold text-slate-900 py-1 pl-1">
                                    {user.name}
                                </div>
                            </div>

                            {/* Email */}
                            <div className="group">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email</label>
                                <div className="w-full font-semibold text-slate-900 py-1 pl-1">
                                    {user.email}
                                </div>
                            </div>

                            {/* Role */}
                            <div className="group">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Role</label>
                                <div className="w-full font-semibold text-slate-900 py-1 pl-1">
                                    {user.role === 'SUPER_ADMIN' ? 'Super Admin' : user.role === 'COMPANY_ADMIN' ? 'Company Admin' : 'User'}
                                </div>
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Account Status</label>
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${user.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                    {user.status || 'Active Member'}
                                </span>
                            </div>

                            {/* Wallet Balance */}
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Wallet Balance</label>
                                <div className="font-semibold text-slate-900 pl-1">
                                    ₹{(user.wallet?.balance || 0).toFixed(2)}
                                </div>
                            </div>

                            {/* Registration Date */}
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Registered Date</label>
                                <div className="font-semibold text-slate-900 pl-1">
                                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. RIGHT: Account Settings */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-full">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">Account Settings</h3>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600">Email Notifications</span>
                                <span className="text-xs text-slate-400">Enabled</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600">Two-Factor Auth</span>
                                <span className="text-xs text-slate-400">Not configured</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600">Account Status</span>
                                <span className={`text-xs font-medium ${user.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                                    {user.status === 'active' ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. BOTTOM LEFT: Account Settings */}
                <div className="lg:col-span-9">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 min-h-[400px] flex flex-col">

                        {/* Custom Tab Navigation */}
                        <div className="border-b border-slate-100 mb-6">
                            <div className="flex items-center gap-6">
                                {['Notifications', 'Security'].map(tab => {
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

                            {activeTab === 'security' && (
                                <div className="space-y-6 max-w-2xl">
                                    <div className="pb-6 border-b border-slate-100">
                                        <h4 className="text-sm font-bold text-slate-900 mb-2">Password</h4>
                                        <p className="text-xs text-slate-500 mb-4">Last changed: Never</p>
                                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                                            Change Password
                                        </button>
                                    </div>

                                    <div className="pb-6 border-b border-slate-100">
                                        <h4 className="text-sm font-bold text-slate-900 mb-2">Two-Factor Authentication</h4>
                                        <p className="text-xs text-slate-500 mb-4">Add an extra layer of security to your account</p>
                                        <button className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-lg transition-colors">
                                            Enable 2FA
                                        </button>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900 mb-2">Login Sessions</h4>
                                        <p className="text-xs text-slate-500">Manage your active sessions</p>
                                        <div className="mt-4 space-y-2">
                                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                                <div>
                                                    <p className="text-sm font-medium text-slate-900">Current Session</p>
                                                    <p className="text-xs text-slate-500">Chrome on Windows • Active now</p>
                                                </div>
                                                <span className="text-xs text-green-600 font-medium">Active</span>
                                            </div>
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
                            <h3 className="text-lg font-bold text-slate-900">Invoices</h3>
                        </div>

                        {loadingInvoices ? (
                            <div className="text-center py-8 text-slate-500 text-sm">Loading invoices...</div>
                        ) : invoices.length === 0 ? (
                            <div className="text-center py-8 text-slate-500 text-sm">No invoices found.</div>
                        ) : (
                            <div className="space-y-4">
                                {invoices.map((invoice) => (
                                    <div key={invoice._id} className="group flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                                    Invoice #{invoice._id.slice(-8).toUpperCase()}
                                                </div>
                                                <div className="text-xs text-slate-400">
                                                    {new Date(invoice.createdAt).toLocaleDateString()} · {invoice.currency} {invoice.total.toFixed(2)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleDownloadInvoice(invoice._id, `Invoice-${invoice._id.slice(-8)}`)}
                                                className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500"
                                            >
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

