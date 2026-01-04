import { Globe, MoreHorizontal, ThumbsUp, MessageSquare, Repeat, Send, LucideIcon } from 'lucide-react';

interface SocialProfileCardProps {
    name: string;
    followers: string;
    platformIcon: LucideIcon;
    platformColor: string;
    iconClassName?: string;
}

export const SocialProfileCard = ({
    name,
    followers,
    platformIcon: Icon,
    platformColor,
    iconClassName = "text-white fill-white"
}: SocialProfileCardProps) => {
    return (
        <div className="w-[300px] bg-white rounded-xl shadow-lg border border-slate-200 font-sans overflow-hidden">
            {/* Header */}
            <div className="p-3 flex gap-3 items-start">
                <div className={`w-10 h-10 ${platformColor} rounded-md flex items-center justify-center shrink-0`}>
                    <Icon className={iconClassName} size={20} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-semibold text-slate-900 text-sm leading-tight truncate">{name}</h3>
                            <p className="text-[10px] text-slate-500">{followers} followers</p>
                            <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-0.5">
                                <span>2d • Edited • </span> <Globe size={10} />
                            </div>
                        </div>
                        <button className="text-slate-400 hover:text-slate-600">
                            <MoreHorizontal size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Post Content */}
            <div className="px-3 pb-2">
                <p className="text-xs text-slate-700 leading-relaxed mb-3">
                    If you've been looking for <span className="text-blue-600 font-semibold">#freemockups</span> then you need to visit goodmockups website. We have <span className="text-blue-600 font-semibold">#thebest</span> collection!
                </p>
            </div>

            {/* Media Attachment */}
            <div className="bg-[#0A66C2] h-40 flex items-center justify-center relative overflow-hidden group">
                <div className="flex items-center gap-1">
                    <span className="font-bold text-white text-2xl tracking-tight">Linked</span>
                    <div className="bg-white rounded-md px-1 py-0"><Icon className="text-[#0A66C2] fill-[#0A66C2]" size={20} /></div>
                </div>
            </div>
            <div className="bg-slate-50 px-3 py-2 border-b border-slate-100">
                <div className="text-[10px] font-medium text-slate-900">Created and prepared by socialscale.ai</div>
                <div className="text-[9px] text-slate-500">socialscale.ai • 1 min read</div>
            </div>

            {/* Stats */}
            <div className="px-3 py-2 flex items-center justify-between border-b border-slate-100">
                <div className="flex items-center gap-1">
                    <div className="flex -space-x-1">
                        <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center ring-2 ring-white z-20">
                            <ThumbsUp size={8} className="text-white fill-white" />
                        </div>
                        <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center ring-2 ring-white z-10">
                            <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-white text-white"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                        </div>
                        <div className="w-4 h-4 rounded-full bg-orange-400 flex items-center justify-center ring-2 ring-white z-0">
                            <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-white text-white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-2h-2v2zm0-4h2V7h-2v6z" /></svg>
                        </div>
                    </div>
                    <span className="text-[10px] text-slate-500 hover:text-blue-600 cursor-pointer ml-1">325</span>
                </div>
                <div className="text-[10px] text-slate-500 hover:text-blue-600 cursor-pointer">
                    103 comments • 34 reposts
                </div>
            </div>

            {/* Actions */}
            <div className="px-2 py-1 flex justify-between items-center">
                <button className="flex items-center gap-1.5 px-2 py-2 hover:bg-slate-50 rounded-md transition-colors group">
                    <ThumbsUp size={16} className="text-slate-500 group-hover:text-blue-600" />
                    <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-700">Like</span>
                </button>
                <button className="flex items-center gap-1.5 px-2 py-2 hover:bg-slate-50 rounded-md transition-colors group">
                    <MessageSquare size={16} className="text-slate-500 group-hover:text-blue-600" />
                    <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-700">Comment</span>
                </button>
                <button className="flex items-center gap-1.5 px-2 py-2 hover:bg-slate-50 rounded-md transition-colors group">
                    <Repeat size={16} className="text-slate-500 group-hover:text-blue-600" />
                    <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-700">Repost</span>
                </button>
                <button className="flex items-center gap-1.5 px-2 py-2 hover:bg-slate-50 rounded-md transition-colors group">
                    <Send size={16} className="text-slate-500 group-hover:text-blue-600" />
                    <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-700">Send</span>
                </button>
            </div>
        </div>
    );
};
