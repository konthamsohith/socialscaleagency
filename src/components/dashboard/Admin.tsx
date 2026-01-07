import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Linkedin,
    Instagram,
    Youtube,
    ArrowRight,
    ArrowLeft,
    Facebook,
    ShoppingCart
} from 'lucide-react';
import { servicesData, ServiceCategory } from '../../data/services';

const TikTokIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
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

const XIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 4l11.733 16h6.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
);

const ThreadsIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path transform="translate(1.8, 1.8) scale(0.85)" d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z" />
    </svg>
);

const PinterestIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" transform="translate(1.8, 1.8) scale(0.85)" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.571-.992 3.996-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.649 0-5.788 2.723-5.788 5.543 0 1.096.423 2.272.952 2.91.106.126.12.237.09.429-.099.414-.336 1.349-.382 1.536-.06.244-.266.295-.615.15-2.296-.95-3.731-3.93-3.731-6.326 0-5.152 3.75-9.873 10.835-9.873 5.689 0 9.468 4.09 9.468 8.448 0 5.037-2.834 9.087-6.769 9.087-1.322 0-2.564-.688-2.986-1.503l-.813 3.092c-.296 1.125-1.1 2.534-1.64 3.39 1.232.368 2.559.567 3.941.567 6.618 0 12-5.381 12-12C24.016 5.367 18.636 0 12.017 0z" />
    </svg>
);

const DiscordIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.7728-.6083 1.1582a18.3246 18.3246 0 00-3.3213-.1535 18.3255 18.3255 0 00-3.3512.1691c-.1673-.3939-.408-.8028-.621-1.1893a.077.077 0 00-.0809-.0366 19.728 19.728 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1892.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.1023.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z" />
    </svg>
);

const SpotifyIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.669 11.538a.5.5 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686m.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858m.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288" />
    </svg>
);

const TelegramIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.4-1.08.39-.35-.01-1.02-.2-1.52-.35-.62-.18-1.1-.28-1.05-.59.02-.15.22-.3.61-.45 2.4-1.04 4.01-1.73 4.83-2.06 2.33-.94 2.82-1.11 3.12-1.11.08 0 .28.01.4.09.11.08.15.19.16.27.02.1.03.22.01.33z" />
    </svg>
);

const QuoraIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M13.52 16.7c-3.07-.45-6.62-1.74-6.62-5.91C6.9 7.42 9.07 4.96 12 4.96c2.93 0 5.1 2.46 5.1 5.83 0 3.37-2.17 5.83-5.1 5.83-.87 0-1.68-.22-2.38-.58-.33 1.14 1.1 2.22 2.5 1.83.69-.19 1.13.16 1.48.74-1.22 1.44-4.82 2.37-5.97 1.48-.68-.53-1.33-2.26.15-2.84.4-.16.92-.26 1.42-.31 1.25-.13 2.84 0 4.32-.24zm-1.5-2.58c1.64 0 2.89-1.51 2.89-3.32 0-1.82-1.25-3.32-2.89-3.32-1.64 0-2.89 1.5-2.89 3.32 0 1.81 1.25 3.32 2.89 3.32z" />
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

export const Admin = () => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('q')?.toLowerCase() || '';
    const [view, setView] = useState<'platforms' | 'categories' | 'packages'>('platforms');
    const [selectedNetwork, setSelectedNetwork] = useState<typeof networks[0] | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);

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
        }
    };

    const categories = selectedNetwork ? servicesData[selectedNetwork.id] || [] : [];
    const packages = selectedCategory?.packages || [];

    return (
        <div className="space-y-8">
            <AnimatePresence mode="wait">
                {view === 'platforms' ? (
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
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
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
                                <h1 className="text-3xl font-bold font-archivo text-slate-900">{selectedCategory?.title} Packages</h1>
                                <p className="text-slate-500 mt-1">Prices are per 1000 units.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {packages.map((pkg, index) => (
                                <motion.div
                                    key={pkg.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group bg-white border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all"
                                >
                                    <div className="flex-1">
                                        <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                            {pkg.name}
                                        </h4>
                                        <p className="text-sm text-slate-500 mt-1">High retention, organic growth</p>
                                    </div>
                                    <div className="flex items-center gap-8">
                                        <div className="text-right">
                                            <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Price per 1k</p>
                                            <p className="text-2xl font-archivo font-bold text-blue-600">{pkg.price}</p>
                                        </div>
                                        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                                            <ShoppingCart className="w-4 h-4" />
                                            Order Now
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
