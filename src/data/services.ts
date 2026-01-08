import {
    Play,
    Share2,
    MessageCircle,
    Heart,
    Eye,
    Users,
    Vote,
    Instagram,
    Youtube,
    Facebook,
    Linkedin,
    Twitter
} from 'lucide-react';

export const networks = [
    { id: 'NET-01', title: 'Instagram', icon: Instagram },
    { id: 'NET-02', title: 'TikTok', icon: MessageCircle }, // TikTok icon isn't in Lucide standard, using MessageCircle as placeholder or verify
    { id: 'NET-03', title: 'LinkedIn', icon: Linkedin },
    { id: 'NET-04', title: 'YouTube', icon: Youtube },
    { id: 'NET-05', title: 'X (Twitter)', icon: Twitter }, // Assuming Twitter maps to X
    { id: 'NET-06', title: 'Threads', icon: MessageCircle }, // Placeholder
    { id: 'NET-07', title: 'Pinterest', icon: Share2 }, // Placeholder
    { id: 'NET-08', title: 'Discord', icon: MessageCircle }, // Placeholder
    { id: 'NET-09', title: 'Facebook', icon: Facebook },
    { id: 'NET-10', title: 'Spotify', icon: Play },
    { id: 'NET-11', title: 'Telegram', icon: MessageCircle },
    { id: 'NET-12', title: 'Quora', icon: MessageCircle },
];

export interface ServicePackage {
    id: string;
    name: string;
    price: string;
    description?: string;
}

export interface ServiceCategory {
    id: string;
    title: string;
    description: string;
    icon: any;
    color: string;
    bg: string;
    packages?: ServicePackage[];
}

export const servicesData: Record<string, ServiceCategory[]> = {
    "NET-01": [ // Instagram
        {
            id: "INST-FOLLOWERS",
            title: "Followers",
            description: "High quality followers to boost your profile",
            icon: Users,
            color: "text-blue-600",
            bg: "bg-blue-600/10",
            packages: [
                { id: "INST-FOL-1", name: "Instagram Followers [ Good Quality ] [ No Guarantee ] No Refill", price: "5" },
                { id: "INST-FOL-2", name: "Instagram Followers [ Good Quality ] [ 30D Refill ] [ Fast Speed ]", price: "6" },
                { id: "INST-FOL-3", name: "Instagram Followers [ Good Quality ] [ 90D Refill ] Fast Speed", price: "7" },
                { id: "INST-FOL-4", name: "Instagram Followers [ High Quality ] [ 365D Refill ] [ Recommended ]", price: "8" },
                { id: "INST-FOL-5", name: "Instagram Followers [ High Quality ] [ Lifetime Refill ] Low Drops", price: "10" }
            ]
        },
        {
            id: "INST-LIKES",
            title: "Likes",
            description: "Boost your post engagement instantly",
            icon: Heart,
            color: "text-pink-600",
            bg: "bg-pink-600/10",
            packages: [
                { id: "INST-LIK-1", name: "Instagram Likes [ Instant ] [ Real ]", price: "5" },
                { id: "INST-LIK-2", name: "Instagram Likes [ High Quality ] [ Split Available ]", price: "7" }
            ]
        },
        {
            id: "INST-STORY",
            title: "Story Services",
            description: "Views, Shares and Engagement for Stories",
            icon: Play,
            color: "text-pink-500",
            bg: "bg-pink-500/10",
            packages: [
                { id: "INST-STO-1", name: "Instagram Story Views [ High Speed ]", price: "45" },
                { id: "INST-STO-2", name: "Instagram Story Shares [ Global ]", price: "120" }
            ]
        },
        {
            id: "INST-VOTES",
            title: "Story Votes",
            description: "Real votes for your story polls and sliders",
            icon: Vote,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
            packages: [
                { id: "INST-VOT-1", name: "Instagram Story Poll Votes [ Option A/B ]", price: "85" },
                { id: "INST-VOT-2", name: "Instagram Story Slider Votes [ 100% ]", price: "95" }
            ]
        },
        {
            id: "INST-REPOST",
            title: "Repost",
            description: "Increase reach by having others repost your content",
            icon: Share2,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            packages: [
                { id: "INST-REP-1", name: "Instagram Content Reposts [ Organic ]", price: "350" }
            ]
        },
        {
            id: "INST-RANDOM-COMM",
            title: "Random Comments",
            description: "Natural looking comments from active accounts",
            icon: MessageCircle,
            color: "text-indigo-500",
            bg: "bg-indigo-500/10",
            packages: [
                { id: "INST-COM-1", name: "Instagram Random Comments [ Positive ]", price: "550" }
            ]
        },
        {
            id: "INST-LIVE-VIEWS",
            title: "Live Views",
            description: "Instant viewers for your Instagram Live",
            icon: Eye,
            color: "text-orange-500",
            bg: "bg-orange-500/10",
            packages: [
                { id: "INST-LIV-1", name: "Instagram Live Views [ 30 Mins ]", price: "450" },
                { id: "INST-LIV-2", name: "Instagram Live Views [ 60 Mins ]", price: "750" }
            ]
        },
        {
            id: "INST-CHANNEL-MEM",
            title: "Channel Member",
            description: "Grow your Instagram Broadcast Channel members",
            icon: Users,
            color: "text-blue-600",
            bg: "bg-blue-600/10",
            packages: [
                { id: "INST-CHN-1", name: "Instagram Broadcast Channel Members", price: "420" }
            ]
        }
    ],
    "NET-02": [ // TikTok
        {
            id: "TIK-FOLLOWERS",
            title: "Followers",
            description: "Grow your TikTok audience rapidly",
            icon: Users,
            color: "text-slate-900",
            bg: "bg-slate-900/10",
            packages: [
                { id: "TIK-FOL-1", name: "TikTok Followers [ Real Looking ] [ Fast ]", price: "210" },
                { id: "TIK-FOL-2", name: "TikTok Followers [ High Quality ] [ 30D Refill ]", price: "290" }
            ]
        },
        {
            id: "TIK-LIKES",
            title: "Likes",
            description: "Increase engagement on your videos",
            icon: Heart,
            color: "text-pink-500",
            bg: "bg-pink-500/10",
            packages: [
                { id: "TIK-LIK-1", name: "TikTok Likes [ High Quality ]", price: "140" },
                { id: "TIK-LIK-2", name: "TikTok Likes [ Real Accounts ]", price: "210" }
            ]
        },
        {
            id: "TIK-VIEWS",
            title: "Views",
            description: "Boost your video view count",
            icon: Play,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            packages: [
                { id: "TIK-VIW-1", name: "TikTok Views [ Instant ]", price: "5" },
                { id: "TIK-VIW-2", name: "TikTok Views [ High Retention ]", price: "15" }
            ]
        }
    ],
    "NET-03": [ // LinkedIn
        {
            id: "LNK-FOLLOWERS",
            title: "Followers",
            description: "Build professional authority on LinkedIn",
            icon: Users,
            color: "text-blue-700",
            bg: "bg-blue-700/10",
            packages: [
                { id: "LNK-FOL-1", name: "LinkedIn Profile Followers [ High Quality ]", price: "20" },
                { id: "LNK-FOL-2", name: "LinkedIn Company Page Followers", price: "25" }
            ]
        },
        {
            id: "LNK-LIKES",
            title: "Post Likes",
            description: "Increase your post reach and engagement",
            icon: Heart,
            color: "text-blue-600",
            bg: "bg-blue-600/10",
            packages: [
                { id: "LNK-LIK-1", name: "LinkedIn Post Likes [ Real Professionals ]", price: "10" }
            ]
        },
        {
            id: "LNK-SHARES",
            title: "Post Shares",
            description: "Amplify your content visibility",
            icon: Share2,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            packages: [
                { id: "LNK-SHR-1", name: "LinkedIn Post Shares [ Targeted ]", price: "1200" }
            ]
        }
    ],
    "NET-04": [ // YouTube
        {
            id: "YT-SUBS",
            title: "Subscribers",
            description: "Grow your channel subscriber base",
            icon: Users,
            color: "text-red-600",
            bg: "bg-red-600/10",
            packages: [
                { id: "YT-SUB-1", name: "YouTube Subscribers [ High Quality ] [ Non-Drop ]", price: "850" },
                { id: "YT-SUB-2", name: "YouTube Subscribers [ Lifetime Refill ]", price: "1200" }
            ]
        },
        {
            id: "YT-VIEWS",
            title: "Views",
            description: "Real views with high retention",
            icon: Play,
            color: "text-red-500",
            bg: "bg-red-500/10",
            packages: [
                { id: "YT-VIW-1", name: "YouTube Views [ Real ] [ High Retention ]", price: "280" },
                { id: "YT-VIW-2", name: "YouTube Views [ Google Ads Method ]", price: "550" }
            ]
        },
        {
            id: "YT-WATCH",
            title: "Watch Time",
            description: "Complete your 4000 hours watch time",
            icon: Eye,
            color: "text-red-700",
            bg: "bg-red-700/10",
            packages: [
                { id: "YT-WTC-1", name: "YouTube Watch Time [ 1000 Hours ] [ 4-15 Mins Video ]", price: "950" },
                { id: "YT-WTC-2", name: "YouTube Watch Time [ 4000 Hours Package ]", price: "3400" }
            ]
        }
    ],
    "NET-05": [ // X (Twitter)
        {
            id: "X-FOLLOWERS",
            title: "Followers",
            description: "Expand your reach on X",
            icon: Users,
            color: "text-slate-900",
            bg: "bg-slate-900/10",
            packages: [
                { id: "X-FOL-1", name: "X Followers [ Real Accounts ]", price: "320" },
                { id: "X-FOL-2", name: "X Followers [ Nitro / Recommended ]", price: "480" }
            ]
        },
        {
            id: "X-REPOSTS",
            title: "Reposts",
            description: "Get more retweets on your posts",
            icon: Share2,
            color: "text-slate-800",
            bg: "bg-slate-800/10",
            packages: [
                { id: "X-REP-1", name: "X Reposts [ retweets ] [ Fast ]", price: "240" }
            ]
        },
        {
            id: "X-LIKES",
            title: "Likes",
            description: "Boost engagement on your tweets",
            icon: Heart,
            color: "text-pink-600",
            bg: "bg-pink-600/10",
            packages: [
                { id: "X-LIK-1", name: "X Likes [ High Quality ]", price: "180" }
            ]
        }
    ],
    "NET-06": [ // Threads
        {
            id: "THR-FOL",
            title: "Followers",
            description: "Grow your Threads audience",
            icon: Users,
            color: "text-slate-900",
            bg: "bg-slate-900/10",
            packages: [
                { id: "THR-FOL-1", name: "Threads Followers [ High Quality ]", price: "240" }
            ]
        },
        {
            id: "THR-LIKES",
            title: "Likes",
            description: "Increase your post engagement",
            icon: Heart,
            color: "text-pink-500",
            bg: "bg-pink-500/10",
            packages: [
                { id: "THR-LIK-1", name: "Threads Likes [ Fast ]", price: "120" }
            ]
        }
    ],
    "NET-07": [ // Pinterest
        {
            id: "PIN-FOL",
            title: "Followers",
            description: "Grow your Pinterest profile",
            icon: Users,
            color: "text-red-600",
            bg: "bg-red-600/10",
            packages: [
                { id: "PIN-FOL-1", name: "Pinterest Followers [ Real Looking ]", price: "190" }
            ]
        },
        {
            id: "PIN-REPINS",
            title: "Repins",
            description: "Get more saves for your pins",
            icon: Share2,
            color: "text-red-500",
            bg: "bg-red-500/10",
            packages: [
                { id: "PIN-REP-1", name: "Pinterest Repins / Saves", price: "160" }
            ]
        }
    ],
    "NET-08": [ // Discord
        {
            id: "DSC-MEM",
            title: "Members",
            description: "Grow your Discord server",
            icon: Users,
            color: "text-indigo-600",
            bg: "bg-indigo-600/10",
            packages: [
                { id: "DSC-MEM-1", name: "Discord Server Members [ Offline ]", price: "150" },
                { id: "DSC-MEM-2", name: "Discord Server Members [ Online ]", price: "380" }
            ]
        },
        {
            id: "DSC-ONLINE",
            title: "Online Members",
            description: "Get active members for your server",
            icon: Users,
            color: "text-green-500",
            bg: "bg-green-500/10",
            packages: [
                { id: "DSC-ONL-1", name: "Discord Online Members [ 30 Days ]", price: "550" }
            ]
        }
    ],
    "NET-09": [ // Facebook
        {
            id: "FB-LIKES",
            title: "Page Likes",
            description: "Build your brand authority on Facebook",
            icon: Heart,
            color: "text-blue-600",
            bg: "bg-blue-600/10",
            packages: [
                { id: "FB-LIKES-1", name: "Facebook Page Likes & Followers [ High Quality ]", price: "280" }
            ]
        },
        {
            id: "FB-FOL",
            title: "Followers",
            description: "Grow your Facebook followers",
            icon: Users,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            packages: [
                { id: "FB-FOL-1", name: "Facebook Profile Followers", price: "240" }
            ]
        }
    ],
    "NET-10": [ // Spotify
        {
            id: "SPT-FOL",
            title: "Followers",
            description: "Grow your artist profile followers",
            icon: Users,
            color: "text-green-500",
            bg: "bg-green-500/10",
            packages: [
                { id: "SPT-FOL-1", name: "Spotify Artist Followers [ Non-Drop ]", price: "260" }
            ]
        },
        {
            id: "SPT-STREAMS",
            title: "Streams",
            description: "Get more plays for your tracks",
            icon: Play,
            color: "text-green-600",
            bg: "bg-green-600/10",
            packages: [
                { id: "SPT-STR-1", name: "Spotify Plays / Streams [ Global ]", price: "180" },
                { id: "SPT-STR-2", name: "Spotify Streams [ USA Targeted ]", price: "450" }
            ]
        }
    ],
    "NET-11": [ // Telegram
        {
            id: "TG-MEM",
            title: "Channel Members",
            description: "Grow your Telegram channel members",
            icon: Users,
            color: "text-sky-500",
            bg: "bg-sky-500/10",
            packages: [
                { id: "TG-MEM-1", name: "Telegram Channel Members [ High Quality ]", price: "180" }
            ]
        },
        {
            id: "TG-VIEWS",
            title: "Post Views",
            description: "Increase views for your messages",
            icon: Eye,
            color: "text-sky-600",
            bg: "bg-sky-600/10",
            packages: [
                { id: "TG-VIW-1", name: "Telegram Post Views [ Last 5 Posts ]", price: "45" }
            ]
        }
    ],
    "NET-12": [ // Quora
        {
            id: "QR-FOL",
            title: "Followers",
            description: "Grow your Quora profile reach",
            icon: Users,
            color: "text-red-700",
            bg: "bg-red-700/10",
            packages: [
                { id: "QR-FOL-1", name: "Quora Profile Followers", price: "340" }
            ]
        },
        {
            id: "QR-VOTES",
            title: "Upvotes",
            description: "Increase visibility of your answers",
            icon: Heart,
            color: "text-red-600",
            bg: "bg-red-600/10",
            packages: [
                { id: "QR-VOT-1", name: "Quora Answer Upvotes", price: "480" }
            ]
        }
    ]
};
