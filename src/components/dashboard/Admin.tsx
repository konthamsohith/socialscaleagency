import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Linkedin,
    Instagram,
    Youtube,
    ArrowRight,
    ArrowLeft,
    Facebook,
    ShoppingCart,
    Users,
    DollarSign,
    TrendingUp,
    BarChart3,
    Search,
    Filter,
    Download
} from 'lucide-react';
import { servicesData, ServiceCategory } from '../../data/services';
import { apiService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

export const TikTokIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
    </svg>
);

export const XIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 4l11.733 16h6.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
);

export const ThreadsIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path transform="translate(1.8, 1.8) scale(0.85)" d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z" />
    </svg>
);

export const PinterestIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M8 0a8 8 0 0 0-2.915 15.452c-.07-.633-.134-1.606.027-2.297.146-.625.938-3.977.938-3.977s-.239-.479-.239-1.187c0-1.113.645-1.943 1.448-1.943.682 0 1.012.512 1.012 1.127 0 .686-.437 1.712-.663 2.663-.188.796.4 1.446 1.185 1.446 1.422 0 2.515-1.5 2.515-3.664 0-1.915-1.377-3.254-3.342-3.254-2.276 0-3.612 1.707-3.612 3.471 0 .688.265 1.425.595 1.826a.24.24 0 0 1 .056.23c-.061.252-.196.796-.222.907-.035.146-.116.177-.268.107-1-.465-1.624-1.926-1.624-3.1 0-2.523 1.834-4.84 5.286-4.84 2.775 0 4.932 1.977 4.932 4.62 0 2.757-1.739 4.976-4.151 4.976-.811 0-1.573-.421-1.834-.919l-.498 1.902c-.181.695-.669 1.566-.995 2.097A8 8 0 1 0 8 0" fill="#E60023" />
    </svg>
);

export const TwitchIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
    </svg>
);

export const DiscordIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.7728-.6083 1.1582a18.3246 18.3246 0 00-3.3213-.1535 18.3255 18.3255 0 00-3.3512.1691c-.1673-.3939-.408-.8028-.621-1.1893a.077.077 0 00-.0809-.0366 19.728 19.728 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1892.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.1023.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z" />
    </svg>
);

export const SpotifyIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.669 11.538a.5.5 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686m.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858m.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288" />
    </svg>
);

export const TelegramIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#24A1DE" />
        <path fillRule="evenodd" clipRule="evenodd" d="M5.3999 12.0135L17.6534 6.75781C18.2384 6.50581 18.7304 6.94631 18.5504 7.64331L16.4854 17.3888C16.3324 18.1173 15.9184 18.2973 15.3064 17.9553L12.3029 15.7448L10.8539 17.1393C10.693 17.2941 10.5594 17.4253 10.2534 17.4253L10.4694 14.3648L16.0399 9.32431C16.2819 9.10831 15.9877 8.98831 15.6661 9.20231L8.7801 13.5358L5.8118 12.6073C5.1664 12.4058 5.1542 11.9613 5.3999 12.0135Z" fill="white" />
    </svg>
);

export const QuoraIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="#B92B27" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M8.73 12.476c-.554-1.091-1.204-2.193-2.473-2.193-.242 0-.484.04-.707.142l-.43-.863c.525-.45 1.373-.808 2.464-.808 1.697 0 2.568.818 3.26 1.86.41-.89.605-2.093.605-3.584 0-3.724-1.165-5.636-3.885-5.636-2.68 0-3.839 1.912-3.839 5.636 0 3.704 1.159 5.596 3.84 5.596.425 0 .811-.046 1.166-.15Zm.665 1.3a7 7 0 0 1-1.83.244C3.994 14.02.5 11.172.5 7.03.5 2.849 3.995 0 7.564 0c3.63 0 7.09 2.828 7.09 7.03 0 2.337-1.09 4.236-2.675 5.464.512.767 1.04 1.277 1.773 1.277.802 0 1.125-.62 1.179-1.105h1.043c.061.647-.262 3.334-3.178 3.334-1.767 0-2.7-1.024-3.4-2.224Z" />
    </svg>
);

const networks = [
    {
        id: "NET-01",
        title: "Instagram",
        description: "Growth, Engagement & Visibility",
        icon: Instagram,
        color: "text-pink-500",
        bg: "bg-pink-500/10",
        border: "group-hover:border-pink-500/50"
    },
    {
        id: "NET-02",
        title: "TikTok",
        description: "Viral Reach & Trend Amplification",
        icon: TikTokIcon,
        color: "text-slate-900",
        bg: "bg-slate-900/10",
        border: "group-hover:border-slate-900/50"
    },
    {
        id: "NET-03",
        title: "LinkedIn",
        description: "Professional Authority & Leads",
        icon: Linkedin,
        color: "text-blue-600",
        bg: "bg-blue-600/10",
        border: "group-hover:border-blue-600/50"
    },
    {
        id: "NET-04",
        title: "YouTube",
        description: "Views, Subscribers & Retention",
        icon: Youtube,
        color: "text-red-600",
        bg: "bg-red-600/10",
        border: "group-hover:border-red-600/50"
    },
    {
        id: "NET-05",
        title: "X (Twitter)",
        description: "Real-time Engagement & virality",
        icon: XIcon,
        color: "text-slate-900",
        bg: "bg-slate-100",
        border: "group-hover:border-slate-900/50"
    },
    {
        id: "NET-06",
        title: "Threads",
        description: "Conversational Growth",
        icon: ThreadsIcon,
        color: "text-slate-900",
        bg: "bg-slate-100",
        border: "group-hover:border-slate-900/50"
    },
    {
        id: "NET-07",
        title: "Pinterest",
        description: "Visual Discovery & Traffic",
        icon: PinterestIcon,
        color: "text-red-600",
        bg: "bg-red-600/10",
        border: "group-hover:border-red-600/50"
    },
    {
        id: "NET-08",
        title: "Discord",
        description: "Community Building",
        icon: DiscordIcon,
        color: "text-indigo-600",
        bg: "bg-indigo-600/10",
        border: "group-hover:border-indigo-600/50"
    },
    {
        id: "NET-09",
        title: "Facebook",
        description: "Brand Awareness & Community",
        icon: Facebook,
        color: "text-blue-600",
        bg: "bg-blue-600/10",
        border: "group-hover:border-blue-600/50"
    },
    {
        id: "NET-10",
        title: "Spotify",
        description: "Music Promotion & Streams",
        icon: SpotifyIcon,
        color: "text-green-500",
        bg: "bg-green-500/10",
        border: "group-hover:border-green-500/50"
    },
    {
        id: "NET-11",
        title: "Telegram",
        description: "Channel Growth & Members",
        icon: TelegramIcon,
        color: "text-sky-500",
        bg: "bg-sky-500/10",
        border: "group-hover:border-sky-500/50"
    },
    {
        id: "NET-12",
        title: "Quora",
        description: "Q&A Marketing & Traffic",
        icon: QuoraIcon,
        color: "text-red-700",
        bg: "bg-red-700/10",
        border: "group-hover:border-red-700/50"
    }
];

type ViewType = 'dashboard' | 'platforms' | 'categories' | 'packages';

export const Admin = () => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('q')?.toLowerCase() || '';
    const [view, setView] = useState<ViewType>('dashboard');
    const [selectedNetwork, setSelectedNetwork] = useState<typeof networks[0] | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
    const [loading, setLoading] = useState(true);
    const [adminData, setAdminData] = useState<{
        totalRevenue: number;
        totalUsers: number;
        activeOrders: number;
        netMargin: number;
        users: { id: string; name: string; email: string; spend: number; orders: number; joined: string; status: string }[];
    }>({
        totalRevenue: 0,
        totalUsers: 0,
        activeOrders: 0,
        netMargin: 0,
        users: []
    });
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (user && user.role !== 'SUPER_ADMIN' && view === 'dashboard') {
            setView('platforms');
        }
    }, [user, view]);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                setLoading(true);
                const [analyticsRes, usersRes, ordersRes] = await Promise.all([
                    apiService.getAnalyticsSummary().catch(() => ({ data: { revenue: 0, realCost: 0 } })),
                    apiService.getAllUsers(1, 100).catch(() => ({ data: { users: [], pagination: { total: 0 } } })),
                    apiService.getOrders({ status: 'active' }).catch(() => ({ data: [], pagination: { total: 0 } }))
                ]);

                const analytics = analyticsRes.data || { revenue: 0, realCost: 0 };
                const users = usersRes.data?.users || [];
                const orders = ordersRes.data || [];

                const netMargin = analytics.revenue > 0 ? ((analytics.revenue - analytics.realCost) / analytics.revenue * 100).toFixed(1) : '0';

                setAdminData({
                    totalRevenue: analytics.revenue || 0,
                    totalUsers: usersRes.data?.pagination?.total || 0,
                    activeOrders: ordersRes.pagination?.total || orders.length || 0,
                    netMargin: parseFloat(netMargin),
                    users: users.map(user => ({
                        id: user.userId,
                        name: user.name,
                        email: user.email,
                        spend: user.credits?.balance || 0,
                        orders: 0, // TODO: Calculate from orders data
                        joined: new Date(user.createdAt).toLocaleDateString(),
                        status: user.status === 'active' ? 'Active' : 'Inactive'
                    }))
                });
            } catch (error) {
                console.error('Failed to fetch admin data:', error);
                // Set default values on error
                setAdminData({
                    totalRevenue: 0,
                    totalUsers: 0,
                    activeOrders: 0,
                    netMargin: 0,
                    users: []
                });
            } finally {
                setLoading(false);
            }
        };

        if (view === 'dashboard' && user?.role === 'SUPER_ADMIN') {
            fetchAdminData();
        } else {
            setLoading(false);
        }
    }, [view]);

    const filteredNetworks = networks.filter(network =>
        network.title.toLowerCase().includes(searchQuery) ||
        network.description.toLowerCase().includes(searchQuery) ||
        network.id.toLowerCase().includes(searchQuery)
    );

    const handleSelectPlatform = (network: typeof networks[0]) => {
        setSelectedNetwork(network);
        setView('categories');
    };

    const handleSelectCategory = (category: ServiceCategory) => {
        if (category.packages && category.packages.length > 0) {
            setSelectedCategory(category);
            setView('packages');
        }
    };

    const handleBack = () => {
        if (view === 'packages') {
            setView('categories');
            setSelectedCategory(null);
        } else if (view === 'categories') {
            setView('platforms');
            setSelectedNetwork(null);
        } else if (view === 'platforms') {
            setView('dashboard');
        }
    };

    const categories = selectedNetwork ? servicesData[selectedNetwork.id] || [] : [];
    const packages = selectedCategory?.packages || [];

    const getButtonClass = (buttonType: ViewType) => view === buttonType ? 'bg-white shadow-sm text-slate-900' : 'text-slate-600 hover:text-slate-900';

    return (
        <div className="space-y-8">
            <AnimatePresence mode="wait">
                {view === 'dashboard' ? (
                    <motion.div
                        key="dashboard"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-8"
                    >
                        <div>
                            <h1 className="text-3xl font-bold font-archivo text-slate-900">
                                {user?.role === 'SUPER_ADMIN' ? 'Admin Management' : 'Service Catalog'}
                            </h1>
                            <p className="text-slate-500 mt-2">
                                {user?.role === 'SUPER_ADMIN' ? 'Oversee users, analytics, and service catalog.' : 'Browse and purchase social media growth services.'}
                            </p>
                        </div>

                        <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit">
                            {user?.role === 'SUPER_ADMIN' && (
                                <button
                                    onClick={() => setView('dashboard')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${getButtonClass('dashboard')}`}
                                >
                                    User Analytics
                                </button>
                            )}
                            <button
                                onClick={() => setView('platforms')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${getButtonClass('platforms')}`}
                            >
                                Price Management
                            </button>
                        </div>

                        {/* Stats Cards */}
                        {user?.role === 'SUPER_ADMIN' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white border border-slate-200 rounded-2xl p-6"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-3 bg-green-100 rounded-xl">
                                            <DollarSign className="w-6 h-6 text-green-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-slate-900">{loading ? '...' : `${adminData.totalRevenue.toFixed(2)} Credits`}</p>
                                        <p className="text-sm text-slate-500 mt-1">Total Revenue</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="bg-white border border-slate-200 rounded-2xl p-6"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-3 bg-blue-100 rounded-xl">
                                            <Users className="w-6 h-6 text-blue-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-slate-900">{loading ? '...' : adminData.totalUsers}</p>
                                        <p className="text-sm text-slate-500 mt-1">Total Users</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-white border border-slate-200 rounded-2xl p-6"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-3 bg-orange-100 rounded-xl">
                                            <BarChart3 className="w-6 h-6 text-orange-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-slate-900">{loading ? '...' : adminData.activeOrders}</p>
                                        <p className="text-sm text-slate-500 mt-1">Active Orders</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="bg-white border border-slate-200 rounded-2xl p-6"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-3 bg-purple-100 rounded-xl">
                                            <TrendingUp className="w-6 h-6 text-purple-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-slate-900">{loading ? '...' : `${adminData.netMargin}%`}</p>
                                        <p className="text-sm text-slate-500 mt-1">Net Margin</p>
                                    </div>
                                </motion.div>
                            </div>
                        )}

                        {/* Users Table */}
                        {user?.role === 'SUPER_ADMIN' && (
                        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                            <div className="p-6 border-b border-slate-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900">Users</h2>
                                        <p className="text-sm text-slate-500 mt-1">Manage and monitor user accounts</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                                            <input
                                                type="text"
                                                placeholder="Search users..."
                                                className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors">
                                            <Filter className="w-4 h-4" />
                                            Filters
                                        </button>
                                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                                            <Download className="w-4 h-4" />
                                            Export CSV
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">User</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Spend</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Orders</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Joined</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200">
                                        {loading ? (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                                    Loading users...
                                                </td>
                                            </tr>
                                        ) : adminData.users.length > 0 ? (
                                            adminData.users.map((user, index) => (
                                                <motion.tr
                                                    key={user.id}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                    className="hover:bg-slate-50"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600 mr-3">
                                                                {user.name.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-medium text-slate-900">{user.name}</div>
                                                                <div className="text-sm text-slate-500">{user.email}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                                                        {user.spend.toLocaleString()} Credits
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                                                        {user.orders}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                                        {user.joined}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                            {user.status}
                                                        </span>
                                                    </td>
                                                </motion.tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                                    No users found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        )}
                    </motion.div>
                ) : view === 'platforms' ? (
                    <motion.div
                        key="platforms"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-8"
                    >
                        <div>
                            <h1 className="text-3xl font-bold font-archivo text-slate-900">Select Network</h1>
                            <p className="text-slate-500 mt-2">Choose a platform to start your growth campaign.</p>
                        </div>

                        {filteredNetworks.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredNetworks.map((network, index) => (
                                    <motion.button
                                        key={network.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => handleSelectPlatform(network)}
                                        className={`group relative p-6 rounded-2xl bg-white border border-slate-200 text-left transition-all duration-300 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 ${network.border}`}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={`p-4 rounded-xl ${network.bg}`}>
                                                <network.icon className={`w-8 h-8 ${network.color}`} />
                                            </div>
                                            <div className="px-2 py-1 rounded-md bg-slate-50 border border-slate-200">
                                                <span className="text-[10px] font-mono text-slate-400">{network.id}</span>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-bold font-archivo text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                                {network.title}
                                            </h3>
                                            <p className="text-sm text-slate-500 mb-6">
                                                {network.description}
                                            </p>

                                            <div className="flex items-center text-sm font-medium text-slate-400 group-hover:text-blue-600 transition-colors">
                                                <span>Select Platform</span>
                                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
                                <p className="text-slate-500 text-lg">No platforms found matching "{searchQuery}"</p>
                                <button
                                    onClick={() => window.location.search = ''}
                                    className="mt-4 text-blue-600 font-medium hover:underline"
                                >
                                    Clear search
                                </button>
                            </div>
                        )}
                    </motion.div>
                ) : view === 'categories' ? (
                    <motion.div
                        key="categories"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleBack}
                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-500/30 hover:shadow-lg transition-all"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <div>
                                <h1 className="text-3xl font-bold font-archivo text-slate-900">{selectedNetwork?.title} Services</h1>
                                <p className="text-slate-500 mt-1">Select a category to view available packages.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categories.map((category, index) => (
                                <motion.button
                                    key={category.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => handleSelectCategory(category)}
                                    className="group relative p-6 rounded-2xl bg-white border border-slate-200 text-left transition-all duration-300 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`p-4 rounded-xl ${category.bg}`}>
                                            <category.icon className={`w-8 h-8 ${category.color}`} />
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold font-archivo text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                            {category.title}
                                        </h3>
                                        <p className="text-sm text-slate-500 mb-6">
                                            {category.description}
                                        </p>

                                        <div className="flex items-center text-sm font-medium text-slate-400 group-hover:text-blue-600 transition-colors">
                                            <span>{category.packages ? 'View Packages' : 'Coming Soon'}</span>
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="packages"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-1">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={handleBack}
                                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-500/30 transition-all duration-300"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </button>
                                <div>
                                    <h1 className="text-2xl font-bold font-archivo text-slate-900 tracking-tight">
                                        Followers <span className="text-blue-600">Packages</span>
                                    </h1>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{selectedNetwork?.title} • PRICES PER 1,000 UNITS</p>
                                    </div>
                                </div>
                            </div>

                            <div className="hidden lg:flex items-center gap-2.5">
                                <div className="p-2.5 bg-blue-50 rounded-xl">
                                    <ShoppingCart className="w-4.5 h-4.5 text-blue-600" />
                                </div>
                                <div className="leading-tight">
                                    <p className="text-[8px] font-black text-blue-400 uppercase tracking-tighter">Swift Checkout</p>
                                    <p className="text-[11px] font-bold text-slate-600">Instant Activation</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            {packages.map((pkg, index) => {
                                // Extract tags from [ bracketed ] names
                                const tags = pkg.name.match(/\[(.*?)\]/g)?.map(t => t.replace(/[\[\]]/g, '')) || [];
                                const cleanName = pkg.name.replace(/\[.*?\]/g, '').trim();

                                return (
                                    <motion.div
                                        key={pkg.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.03 }}
                                        className="group relative bg-white border border-slate-100 rounded-2xl p-5 flex flex-col lg:flex-row items-center justify-between gap-4 hover:border-blue-500/20 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
                                    >
                                        <div className="flex-1 space-y-3 w-full">
                                            <div className="flex flex-wrap items-center gap-1.5">
                                                {tags.map((tag, i) => (
                                                    <span
                                                        key={i}
                                                        className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${tag.toLowerCase().includes('refill') || tag.toLowerCase().includes('guarantee') ? 'bg-emerald-50 text-emerald-500' :
                                                            tag.toLowerCase().includes('speed') || tag.toLowerCase().includes('fast') ? 'bg-blue-50 text-blue-500' :
                                                                tag.toLowerCase().includes('recommended') ? 'bg-amber-50 text-amber-500' :
                                                                    'bg-slate-50 text-slate-400'
                                                            }`}
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                                <span className="text-[8px] font-mono text-slate-200 font-bold uppercase ml-1 opacity-0 group-hover:opacity-100 transition-opacity">{pkg.id}</span>
                                            </div>

                                            <div>
                                                <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                                                    {cleanName}
                                                </h4>
                                                <p className="text-[11px] text-slate-400 mt-1 font-medium flex items-center gap-1.5">
                                                    <span className="w-1 h-1 rounded-full bg-slate-200 group-hover:bg-blue-400 transition-colors" />
                                                    High retention, organic growth & verified delivery
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between lg:justify-end w-full lg:w-auto gap-10">
                                            <div className="text-right min-w-[100px]">
                                                <p className="text-[8px] text-slate-400 uppercase tracking-widest font-black mb-1">Value Rate</p>
                                                <div className="flex items-baseline gap-1 lg:justify-end">
                                                    <span className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{pkg.price}</span>
                                                    <span className="text-[10px] font-bold text-slate-400">Credits</span>
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    // Strip non-serializable icon components from network
                                                    const networkSerial = selectedNetwork ? { ...selectedNetwork, icon: undefined } : undefined;
                                                    navigate('/dashboard/place-order', { state: { package: pkg, network: networkSerial } });
                                                }}
                                                className="flex items-center gap-2.5 px-7 py-3.5 bg-[#0F172A] hover:bg-blue-600 text-white rounded-[18px] font-black text-xs transition-all duration-300 shadow-md active:scale-95 whitespace-nowrap"
                                            >
                                                <ShoppingCart className="w-4 h-4" />
                                                Order Now
                                            </button>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Order Modal */}
            <AnimatePresence>
                {/* Order Modal Removed - Replaced by Place Order Page */}
            </AnimatePresence>

            {/* Success Notification */}
            {/* Success Notification Removed - Replaced by Place Order Page */}
        </div>
    );
};
