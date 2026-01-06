import { ArrowLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Network } from './NetworkSelector';
import { Button } from '../ui/Button';

interface ServiceCategorySelectorProps {
    network: Network;
    onBack: () => void;
}

const categories = [
    { name: 'Views', id: 'views' },
    { name: 'Likes', id: 'likes' },
    { name: 'Followers', id: 'followers' },
    { name: 'Followers Pack', id: 'followers_pack' },
    { name: 'Indian Services', id: 'indian_services' },
    { name: 'Foreign Services', id: 'foreign_services' },
    { name: 'Reach / Share / Saves', id: 'reach' },
    { name: 'Story services', id: 'story' },
    { name: 'Story Votes', id: 'story_votes' },
    { name: 'Repost', id: 'repost' },
    { name: 'Random Comments', id: 'random_comments' },
    { name: 'Custom Comments', id: 'custom_comments' },
    { name: 'Comment Likes', id: 'comment_likes' },
    { name: 'Live Views', id: 'live_views' },
    { name: 'Channel Member', id: 'channel_member' },
];

export const ServiceCategorySelector = ({ network, onBack }: ServiceCategorySelectorProps) => {
    return (
        <div className="w-full max-w-4xl animate-in fade-in slide-in-from-right-8 duration-500">
            {/* Header with Back Button */}
            <div className="flex items-center gap-4 mb-8">
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={onBack}
                    className="flex items-center gap-2"
                >
                    <ArrowLeft size={16} /> Back
                </Button>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-6 font-archivo tracking-tight">
                {network.name}
            </h2>

            <div className="flex flex-col gap-3">
                {categories.map((category, index) => (
                    <motion.button
                        key={category.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="group flex items-center justify-between p-4 rounded-xl bg-white/60 border border-slate-200/60 hover:bg-white hover:shadow-lg hover:shadow-blue-500/5 hover:border-electric-purple/30 transition-all duration-300 backdrop-blur-sm"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full ${network.color} flex items-center justify-center shadow-md scale-90 group-hover:scale-100 transition-transform duration-300`}>
                                <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                                    <path d={network.path} />
                                </svg>
                            </div>
                            <span className="text-slate-800 font-medium text-lg group-hover:text-electric-purple transition-colors font-sans">
                                {network.name} : {category.name}
                            </span>
                        </div>

                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 group-hover:bg-electric-purple/10 text-slate-400 group-hover:text-electric-purple transition-all">
                            <ChevronRight size={20} />
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};
