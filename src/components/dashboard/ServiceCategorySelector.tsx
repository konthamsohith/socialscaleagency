import { ArrowLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Network } from './NetworkSelector';
import { Button } from '../ui/Button';

interface ServiceCategorySelectorProps {
    network: Network;
    onBack: () => void;
    onSelect: (categoryId: string) => void;
}

const categoriesByNetwork: Record<string, { name: string; id: string }[]> = {
    'Instagram': [
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
    ],
    'YouTube': [
        { name: 'Views', id: 'yt_views' },
        { name: 'Likes/Dislikes', id: 'yt_likes' },
        { name: 'Subscribers', id: 'yt_subscribers' },
        { name: 'Watch Time', id: 'yt_watchtime' },
        { name: 'Comments', id: 'yt_comments' },
        { name: 'Live Stream', id: 'yt_live' },
        { name: 'Shares', id: 'yt_shares' },
        { name: 'Shorts', id: 'yt_shorts' },
    ],
    'Facebook': [
        { name: 'Page Likes/Followers', id: 'fb_page_likes' },
        { name: 'Post Likes', id: 'fb_post_likes' },
        { name: 'Video Views', id: 'fb_views' },
        { name: 'Live Stream', id: 'fb_live' },
        { name: 'Comments', id: 'fb_comments' },
        { name: 'Share/Members', id: 'fb_shares' },
        { name: 'Profile Followers', id: 'fb_followers' },
        { name: 'Reviews', id: 'fb_reviews' },
    ],
    'TikTok': [
        { name: 'Views', id: 'tt_views' },
        { name: 'Likes', id: 'tt_likes' },
        { name: 'Followers', id: 'tt_followers' },
        { name: 'Comments', id: 'tt_comments' },
        { name: 'Shares/Saves', id: 'tt_shares' },
        { name: 'Live Stream', id: 'tt_live' },
    ],
    'Threads': [
        { name: 'Followers', id: 'th_followers' },
        { name: 'Likes', id: 'th_likes' },
        { name: 'Reposts', id: 'th_reposts' },
    ],
    'Spotify': [
        { name: 'Plays', id: 'sp_plays' },
        { name: 'Followers', id: 'sp_followers' },
        { name: 'Saves', id: 'sp_saves' },
        { name: 'Monthly Listeners', id: 'sp_listeners' },
    ],
    'X - Twitter': [
        { name: 'Followers', id: 'tw_followers' },
        { name: 'Retweets', id: 'tw_retweets' },
        { name: 'Likes', id: 'tw_likes' },
        { name: 'Views/Impressions', id: 'tw_views' },
        { name: 'Votes', id: 'tw_votes' },
        { name: 'Space Listeners', id: 'tw_space' },
    ],
    'Discord': [
        { name: 'Server Members', id: 'ds_members' },
        { name: 'Friend Requests', id: 'ds_requests' },
        { name: 'Direct Messages', id: 'ds_dms' },
        { name: 'Boosts', id: 'ds_boosts' },
    ],
};

export const ServiceCategorySelector = ({ network, onBack, onSelect }: ServiceCategorySelectorProps) => {
    const currentCategories = categoriesByNetwork[network.name] || [];

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
                {network.name}
            </h2>

            <div className="flex flex-col gap-3">
                {currentCategories.map((category, index) => (
                    <motion.button
                        key={category.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                        onClick={() => onSelect(category.id)}
                        className="group flex items-center justify-between p-4 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-200 w-full"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-full ${network.color} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                                <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
                                    <path d={network.path} />
                                </svg>
                            </div>
                            <span className="text-slate-800 font-medium text-lg font-instagram">
                                {network.name} : {category.name}
                            </span>
                        </div>

                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-50 text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-600 transition-all">
                            <ChevronRight size={20} />
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};
