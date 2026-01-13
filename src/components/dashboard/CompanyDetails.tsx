import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Building2,
    Globe,
    Mail,
    Phone,
    ArrowLeft,
    Plus,
    Trash2,
    ExternalLink,
    Share2,
    AtSign,
    Pencil,
    Save,
    X
} from 'lucide-react';
import {
    FaInstagram,
    FaFacebook,
    FaLinkedin,
    FaYoutube,
    FaPinterest,
    FaSnapchatGhost,
    FaDiscord,
    FaTelegram,
    FaTiktok,
    FaSpotify
} from 'react-icons/fa';
import {
    FaXTwitter,
    FaThreads
} from 'react-icons/fa6';
import { apiService } from '../../services/api';
import { Company, SocialProfile } from '../../types';
import { CompanyAnalytics } from './CompanyAnalytics';

export const CompanyDetails = () => {
    const { id } = useParams<{ id: string }>(); // Use 'id' from route params
    const navigate = useNavigate();
    const location = useLocation(); // Access passed state
    const companyId = id; // Alias for clarity if needed, or adjust to match route param name

    // Safe initialization from navigation state
    const stateCompany = location.state?.company as Company | undefined;

    // Initialize with state data if available (regardless of ID match, useEffect will correct if needed)
    const [company, setCompany] = useState<Company | null>(stateCompany || null);

    // Loading is true ONLY if we have no company data
    const [loading, setLoading] = useState(!stateCompany);

    // Social Profile State
    const [newProfile, setNewProfile] = useState({
        platform: 'instagram',
        handle: ''
    });

    // Edit Mode State
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState<Partial<Company>>({});

    useEffect(() => {
        if (company) {
            setEditForm(company);
        }
    }, [company]);

    const handleSaveCompany = async () => {
        if (!company || !editForm.name) return;

        try {
            // In a real app, await apiService.updateCompany(company.companyId, editForm);
            // Updating local state to reflect changes immediately
            setCompany({ ...company, ...editForm } as Company);
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update company', error);
        }
    };

    useEffect(() => {
        if (companyId) {
            // If we have no data, OR if the data we have doesn't match the URL ID, fetch it.
            if (!company || company.companyId !== companyId) {
                // If ID mismatch, ensure we show loading
                if (company && company.companyId !== companyId) {
                    setLoading(true);
                    setCompany(null);
                }
                loadCompany(companyId);
            }
        }
    }, [companyId]);

    const loadCompany = async (id: string) => {
        setLoading(true);
        try {
            const response = await apiService.getCompany(id);
            setCompany(response.data);
        } catch (err) {
            console.error('Failed to load company:', err);
            // Mock data fallback for demonstration if API fails
            setCompany({
                companyId: id,
                name: 'Acme Corp',
                email: 'contact@acme.com',
                phone: '+1 555 0123',
                website: 'https://acme.com',
                status: 'active',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                socialProfiles: [
                    {
                        profileId: 'sp1',
                        platform: 'instagram',
                        handle: '@acmecorp',
                        url: 'https://instagram.com/acmecorp',
                        followers: 5000,
                        status: 'active'
                    }
                ]
            });
        } finally {
            setLoading(false);
        }
    };

    const handleAddProfile = async () => {
        if (!newProfile.handle || !company) return;

        // Auto-generate URL
        let url = '';
        const handle = newProfile.handle.replace('@', '');

        switch (newProfile.platform) {
            case 'instagram': url = `https://instagram.com/${handle}`; break;
            case 'facebook': url = `https://facebook.com/${handle}`; break;
            case 'x': url = `https://x.com/${handle}`; break;
            case 'linkedin': url = `https://linkedin.com/in/${handle}`; break;
            case 'tiktok': url = `https://tiktok.com/@${handle}`; break;
            case 'youtube': url = `https://youtube.com/@${handle}`; break;
            case 'threads': url = `https://threads.net/@${handle}`; break;
            case 'pinterest': url = `https://pinterest.com/${handle}`; break;
            case 'snapchat': url = `https://snapchat.com/add/${handle}`; break;
            case 'spotify': url = `https://open.spotify.com/user/${handle}`; break;
            case 'discord': url = `https://discord.gg/${handle}`; break;
            case 'telegram': url = `https://t.me/${handle}`; break;
            default: url = `https://${handle}`;
        }

        const profileData: Partial<SocialProfile> = {
            platform: newProfile.platform as any,
            handle: newProfile.handle.startsWith('@') ? newProfile.handle : `@${handle}`,
            url,
            status: 'active'
        };

        try {
            // Optimistic update
            const newProfileObj = { ...profileData, profileId: Math.random().toString(36).substr(2, 9) } as SocialProfile;
            const updatedCompany = {
                ...company,
                socialProfiles: [...(company.socialProfiles || []), newProfileObj]
            };
            setCompany(updatedCompany);
            setNewProfile({ platform: 'instagram', handle: '' });

            // API Call
            await apiService.addSocialProfile(company.companyId, profileData);
            // Reload to get server state (optional)
        } catch (err) {
            console.error('Failed to add profile:', err);
            // Revert on failure (could implement more robust rollback)
        }
    };

    const handleRemoveProfile = async (profileId: string) => {
        if (!company) return;
        if (!window.confirm('Are you sure you want to remove this profile?')) return;

        try {
            // Optimistic update
            const updatedCompany = {
                ...company,
                socialProfiles: company.socialProfiles?.filter(p => p.profileId !== profileId) || []
            };
            setCompany(updatedCompany);

            await apiService.removeSocialProfile(company.companyId, profileId);
        } catch (err) {
            console.error('Failed to remove profile:', err);
        }
    };

    const getPlatformStyle = (platform: string) => {
        const styles: Record<string, { bg: string, text: string, border: string, iconColor: string }> = {
            instagram: { bg: 'bg-pink-50', text: 'text-pink-700', border: 'hover:border-pink-200', iconColor: 'text-pink-600' },
            facebook: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'hover:border-blue-200', iconColor: 'text-blue-600' },
            x: { bg: 'bg-slate-100', text: 'text-slate-800', border: 'hover:border-slate-300', iconColor: 'text-black' },
            linkedin: { bg: 'bg-blue-50', text: 'text-blue-800', border: 'hover:border-blue-200', iconColor: 'text-blue-700' },
            tiktok: { bg: 'bg-slate-50', text: 'text-slate-800', border: 'hover:border-slate-300', iconColor: 'text-black' },
            youtube: { bg: 'bg-red-50', text: 'text-red-700', border: 'hover:border-red-200', iconColor: 'text-red-600' },
            threads: { bg: 'bg-slate-100', text: 'text-slate-800', border: 'hover:border-slate-300', iconColor: 'text-black' },
            pinterest: { bg: 'bg-red-50', text: 'text-red-700', border: 'hover:border-red-200', iconColor: 'text-red-600' },
            snapchat: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'hover:border-yellow-200', iconColor: 'text-yellow-500' },
            spotify: { bg: 'bg-green-50', text: 'text-green-700', border: 'hover:border-green-200', iconColor: 'text-green-500' },
            discord: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'hover:border-indigo-200', iconColor: 'text-indigo-600' },
            telegram: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'hover:border-sky-200', iconColor: 'text-sky-500' },
        };
        return styles[platform] || { bg: 'bg-slate-50', text: 'text-slate-700', border: 'hover:border-slate-200', iconColor: 'text-slate-500' };
    };

    const getPlatformIcon = (platform: string, size: string = "w-8 h-8") => {
        const style = getPlatformStyle(platform);
        const className = `${size} ${style.iconColor}`;

        switch (platform) {
            case 'instagram': return <FaInstagram className={className} />;
            case 'facebook': return <FaFacebook className={className} />;
            case 'x': return <FaXTwitter className={className} />;
            case 'linkedin': return <FaLinkedin className={className} />;
            case 'tiktok': return <FaTiktok className={className} />;
            case 'youtube': return <FaYoutube className={className} />;
            case 'threads': return <FaThreads className={className} />;
            case 'pinterest': return <FaPinterest className={className} />;
            case 'snapchat': return <FaSnapchatGhost className={className} />;
            case 'spotify': return <FaSpotify className={className} />;
            case 'discord': return <FaDiscord className={className} />;
            case 'telegram': return <FaTelegram className={className} />;
            default: return <Globe className={className} />;
        }
    };

    if (loading) return (
        <div className="space-y-6 animate-pulse">
            <div className="h-4 w-24 bg-slate-200 rounded"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl border border-slate-200 p-6 h-64"></div>
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 h-64"></div>
            </div>
            <div className="h-96 bg-white rounded-xl border border-slate-200"></div>
        </div>
    );
    if (!company) return <div className="p-8 text-center text-red-500">Company not found</div>;

    return (
        <div className="space-y-6">
            <button
                onClick={() => navigate('/dashboard/companies')}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Companies
            </button>

            <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Company Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="h-full"
                    >
                        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm relative group">
                            <div className="absolute top-4 right-4">
                                {isEditing ? (
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={handleSaveCompany}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        >
                                            <Save className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                                    <Building2 className="w-8 h-8" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    {isEditing ? (
                                        <div className="space-y-3">
                                            <div>
                                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Company Name</label>
                                                <input
                                                    type="text"
                                                    value={editForm.name || ''}
                                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Status</label>
                                                <select
                                                    value={editForm.status || 'active'}
                                                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value as 'active' | 'inactive' })}
                                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                                >
                                                    <option value="active">Active</option>
                                                    <option value="inactive">Inactive</option>
                                                </select>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <h1 className="text-xl font-bold text-slate-900 truncate" title={company.name}>{company.name}</h1>
                                            <span className={`inline-flex px-2 py-0.5 mt-1 rounded text-xs font-bold ${company.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                                                }`}>
                                                {company.status.toUpperCase()}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                {isEditing ? (
                                    <>
                                        <div>
                                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Email</label>
                                            <input
                                                type="email"
                                                value={editForm.email || ''}
                                                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                                placeholder="company@email.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Phone</label>
                                            <input
                                                type="text"
                                                value={editForm.phone || ''}
                                                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                                placeholder="+1 234 567 890"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Website</label>
                                            <input
                                                type="text"
                                                value={editForm.website || ''}
                                                onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                                placeholder="https://website.com"
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-center gap-3 text-slate-600">
                                            <Mail className="w-5 h-5 text-slate-400 shrink-0" />
                                            <span className="truncate">{company.email || 'No email provided'}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-600">
                                            <Phone className="w-5 h-5 text-slate-400 shrink-0" />
                                            <span className="truncate">{company.phone || 'No phone provided'}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-600">
                                            <Globe className="w-5 h-5 text-slate-400 shrink-0" />
                                            <span className="truncate text-blue-600 hover:underline cursor-pointer">{company.website || 'No website provided'}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Add Profile Only */}
                    <div className="lg:col-span-2">
                        {/* Add New Profile Section - Separate Card */}
                        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm h-full flex flex-col">
                            <div className="flex justify-between items-start mb-6 shrink-0">
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900">Add Profile</h2>
                                    <p className="text-sm text-slate-500 mt-1">Connect a new social account</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                {/* Live Preview Icon */}
                                <div className="hidden sm:block shrink-0">
                                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 text-center">Preview</div>
                                    <div className={`w-11 h-11 rounded-lg flex items-center justify-center shadow-sm border transition-all duration-300 ${getPlatformStyle(newProfile.platform).bg} ${getPlatformStyle(newProfile.platform).border}`}>
                                        {getPlatformIcon(newProfile.platform, "w-5 h-5")}
                                    </div>
                                </div>

                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-5">
                                    <div className="sm:col-span-5 relative">
                                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Platform</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Share2 className="h-4 w-4 text-slate-400" />
                                            </div>
                                            <select
                                                value={newProfile.platform}
                                                onChange={(e) => setNewProfile({ ...newProfile, platform: e.target.value })}
                                                className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none cursor-pointer font-medium hover:bg-slate-100 transition-colors text-sm"
                                            >
                                                <option value="instagram">Instagram</option>
                                                <option value="facebook">Facebook</option>
                                                <option value="x">X</option>
                                                <option value="linkedin">LinkedIn</option>
                                                <option value="tiktok">TikTok</option>
                                                <option value="youtube">YouTube</option>
                                                <option value="threads">Threads</option>
                                                <option value="pinterest">Pinterest</option>
                                                <option value="snapchat">Snapchat</option>
                                                <option value="spotify">Spotify</option>
                                                <option value="discord">Discord</option>
                                                <option value="telegram">Telegram</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-5 relative">
                                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Username</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <AtSign className="h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="username"
                                                value={newProfile.handle}
                                                onChange={(e) => setNewProfile({ ...newProfile, handle: e.target.value })}
                                                onKeyDown={(e) => e.key === 'Enter' && handleAddProfile()}
                                                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium placeholder:text-slate-400 text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2 flex items-end">
                                        <button
                                            onClick={handleAddProfile}
                                            disabled={!newProfile.handle}
                                            className="w-full py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center justify-center gap-2 shadow-sm active:scale-95 text-sm"
                                        >
                                            <Plus className="w-4 h-4" />
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Row: Social Profiles */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900 mb-6">Social Profiles</h2>

                    {/* Profiles Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {company.socialProfiles?.map((profile) => {
                            const style = getPlatformStyle(profile.platform);
                            return (
                                <motion.div
                                    key={profile.profileId}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className={`group relative p-6 rounded-2xl bg-white border border-slate-200 text-left transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 ${style.border}`}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`w-14 h-14 rounded-xl ${style.bg} flex items-center justify-center`}>
                                            {getPlatformIcon(profile.platform)}
                                        </div>
                                        <div className="flex gap-1">
                                            <a
                                                href={profile.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Visit Channel"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                            <button
                                                onClick={() => handleRemoveProfile(profile.profileId)}
                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Remove Profile"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold font-archivo text-slate-900 mb-1 truncate pr-2">
                                            {profile.handle}
                                        </h3>
                                        <p className={`text-sm font-medium ${style.text} uppercase tracking-wider`}>
                                            {profile.platform}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}

                        {(!company.socialProfiles || company.socialProfiles.length === 0) && (
                            <div className="col-span-full py-12 text-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                <div className="flex justify-center mb-2">
                                    <Globe className="w-8 h-8 opacity-20" />
                                </div>
                                <p>No social profiles added yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Analytics Section */}
            {company.socialProfiles && company.socialProfiles.length > 0 && (
                <div className="mt-8 pt-8 border-t border-slate-200">
                    <CompanyAnalytics company={company} />
                </div>
            )}
        </div>
    );
};
