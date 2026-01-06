import { ArrowLeft, ChevronRight, Play, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

interface ServiceListProps {
    category: string;
    onBack: () => void;
    onSelectService: (serviceId: string) => void;
}

export const ServiceList = ({ category, onBack, onSelectService }: ServiceListProps) => {
    // Mock data based on the screenshot provided
    const services = [
        {
            id: 'reel_views_cheap',
            name: 'IG Reel Views - Cheap',
            price: '₹0.7',
            icon: <Play className="w-5 h-5 text-pink-500 fill-current" />,
            badge: null
        },
        {
            id: 'reel_views_good',
            name: 'IG Reel Views - Good ⚡',
            price: '₹1.8',
            icon: <Play className="w-5 h-5 text-pink-500 fill-current" />,
            badge: 'bolt'
        },
        {
            id: 'reel_views_best',
            name: 'IG Reel Views - Best ⚡',
            price: '₹2.5',
            icon: <Play className="w-5 h-5 text-pink-500 fill-current" />,
            badge: 'bolt'
        },
        {
            id: 'reel_views_emergency',
            name: 'IG Reel Views - Emergency',
            price: '₹2.6',
            icon: <Play className="w-5 h-5 text-pink-500 fill-current" />,
            badge: null
        },
        {
            id: 'post_photo_views',
            name: 'IG Post / Photo Views',
            price: '₹2.5',
            icon: <Users className="w-5 h-5 text-orange-500" />,
            badge: null
        },
        {
            id: 'reel_views_organic',
            name: 'IG Reel Views [ Organic ]',
            price: '₹12.6',
            icon: <div className="w-5 h-5 rounded-full overflow-hidden bg-white border border-slate-200 flex items-center justify-center text-[10px]">🇮🇳</div>,
            badge: null
        },
    ];

    return (
        <div className="w-full max-w-4xl animate-in fade-in slide-in-from-right-8 duration-500">
            {/* Header with Back Button */}
            <div className="flex items-center gap-4 mb-4">
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={onBack}
                    className="flex items-center gap-2 border border-slate-200 shadow-sm hover:bg-slate-50 text-slate-700 font-medium rounded-full px-5"
                >
                    <ArrowLeft size={16} /> Back
                </Button>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-6 font-instagram tracking-tight lowercase">
                {category}
            </h2>

            <div className="flex flex-col gap-3">
                {services.map((service, index) => (
                    <motion.button
                        key={service.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                        onClick={() => onSelectService(service.id)}
                        className="group flex items-center justify-between p-4 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-200 w-full"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center shrink-0 p-3 bg-slate-50/50 shadow-sm group-hover:bg-slate-50 transition-colors">
                                {service.icon}
                            </div>
                            <div className="flex flex-col items-start gap-1">
                                <span className="text-slate-900 font-semibold text-[15px] font-instagram leading-tight text-left">
                                    {service.name}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="flex flex-col items-end">
                                <span className="text-slate-900 font-bold text-[15px] font-instagram">{service.price}</span>
                                <span className="text-slate-400 text-[11px] font-instagram">per 1000</span>
                            </div>
                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-50 text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-600 transition-all">
                                <ChevronRight size={20} />
                            </div>
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};
