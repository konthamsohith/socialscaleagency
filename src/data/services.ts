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
    minQuantity?: number;
    maxQuantity?: number;
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
                { id: "2279", name: "Instagram Followers [Good Quality] [30D Refill]", price: "5000", minQuantity: 10, maxQuantity: 100000 },
                { id: "3703", name: "Instagram Followers [High Quality] [365D Refill]", price: "6000", minQuantity: 100, maxQuantity: 100000 },
                { id: "3774", name: "Instagram Followers [High Quality] [Lifetime Refill]", price: "7000", minQuantity: 100, maxQuantity: 200000 },
                { id: "4301", name: "Instagram Followers [ High Quality ] [ 365D Refill ] [ Recommended ]", price: "8000", minQuantity: 10, maxQuantity: 100000 },
                { id: "4302", name: "Instagram Followers [ High Quality ] [ Lifetime Refill ] Low Drops", price: "10000", minQuantity: 10, maxQuantity: 100000 }
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
                { id: "3246", name: "Instagram Likes [ Real Profiles ] [ USA Insights ]", price: "300", minQuantity: 5, maxQuantity: 3000 },
                { id: "3724", name: "Instagram Likes [ Foreign Profiles ] [ Real + Mix ]", price: "500", minQuantity: 10, maxQuantity: 1000 }
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
                { id: "2495", name: "Instagram Traffic/Views from Stories", price: "50", minQuantity: 100, maxQuantity: 1000000 }
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
                { id: "4252", name: "Instagram Repost [ Global ]", price: "1200", minQuantity: 50, maxQuantity: 100000 },
                { id: "4279", name: "Instagram Repost [ Cheapest ]", price: "800", minQuantity: 10, maxQuantity: 100000 }
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
                { id: "3463", name: "Instagram Comments [ Mix Indian ]", price: "800", minQuantity: 10, maxQuantity: 500000 },
                { id: "4219", name: "Instagram Comments [ Super REAL ] [ Foreign Insights ]", price: "6000", minQuantity: 10, maxQuantity: 100 }
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
            id: "INST-REELS-VIEWS",
            title: "Reels Views",
            description: "Increase views on your Instagram Reels",
            icon: Play,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
            packages: [
                { id: "3694", name: "IG Reel Views - Cheap S2", price: "7", minQuantity: 100, maxQuantity: 100000 },
                { id: "4030", name: "IG Reel Views - Cheap", price: "7", minQuantity: 100, maxQuantity: 100000 },
                { id: "3294", name: "IG Reel Views - Good ⚡️", price: "18", minQuantity: 100, maxQuantity: 100000 },
                { id: "3651", name: "IG Reel Views - Best ⚡️", price: "25", minQuantity: 100, maxQuantity: 100000 }
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
                { id: "3964", name: "Instagram Channel Member [ Global ]", price: "150", minQuantity: 10, maxQuantity: 1000000 },
                { id: "3971", name: "Instagram Channel Member [ India ]", price: "120", minQuantity: 10, maxQuantity: 1000000 }
            ]
        },
        {
            id: "INST-STORY-VOTES",
            title: "Story Votes",
            description: "Vote for options in your Instagram story polls",
            icon: Vote,
            color: "text-purple-600",
            bg: "bg-purple-600/10",
            packages: [
                { id: "4031", name: "Vote For [ 1st Option or 'A' ]", price: "268", minQuantity: 10, maxQuantity: 100000 },
                { id: "4032", name: "Vote For [ 2nd Option or 'B' ]", price: "268", minQuantity: 10, maxQuantity: 100000 },
                { id: "4033", name: "Vote For [ 3rd Option or 'C' ]", price: "268", minQuantity: 10, maxQuantity: 100000 },
                { id: "4034", name: "Vote For [ 4th Option or 'D' ]", price: "268", minQuantity: 10, maxQuantity: 100000 }
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
                { id: "2779", name: "TikTok Followers [ High Quality ] [ No Refill ] [ Less Drops ]", price: "210", minQuantity: 10, maxQuantity: 100000 },
                { id: "2781", name: "TikTok Followers [ High Quality ] [ Lifetime Refill ] [ Recommended ]", price: "290", minQuantity: 10, maxQuantity: 100000 },
                { id: "2782", name: "TikTok Followers [ High Quality ] [ 30D Refill ] [ Less Drops ]", price: "250", minQuantity: 10, maxQuantity: 100000 }
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
                { id: "2130", name: "TikTok Likes [⚡️ BEST ]", price: "140", minQuantity: 10, maxQuantity: 100000 }
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
                { id: "2125", name: "TikTok Video Views [ S2 ]", price: "5", minQuantity: 100, maxQuantity: 10000000 },
                { id: "2127", name: "Tiktok Video Views [ Lifetime ]", price: "15", minQuantity: 100, maxQuantity: 10000000 },
                { id: "2128", name: "TikTok Video Views [ S1 ]", price: "10", minQuantity: 100, maxQuantity: 10000000 }
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
                { id: "4002", name: "Linkedin Profile Followers", price: "20", minQuantity: 10, maxQuantity: 100000 }
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
                { id: "4005", name: "Linkedin Post Likes", price: "10", minQuantity: 10, maxQuantity: 100000 }
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
                { id: "4006", name: "Linkedin Post Share", price: "1200", minQuantity: 10, maxQuantity: 100000 }
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
                { id: "2292", name: "YouTube Subscriber [ Lifetime Guaranteed ] [ Slow speed ]⚡️", price: "850", minQuantity: 10, maxQuantity: 100000 },
                { id: "2837", name: "YouTube Subscriber [ Lifetime Guaranteed ] [ Best Service ]⚡️", price: "1200", minQuantity: 10, maxQuantity: 100000 }
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
                { id: "4293", name: "100 Views [ Nondrop ] [ Lifetime ]", price: "190", minQuantity: 100, maxQuantity: 100 },
                { id: "3032", name: "500 Views [ Nondrop ] [ Lifetime ]", price: "770", minQuantity: 500, maxQuantity: 500 },
                { id: "3718", name: "1000 Views [ Nondrop ] [ Lifetime ]", price: "1490", minQuantity: 1000, maxQuantity: 1000 },
                { id: "4081", name: "3000 Views [ Nondrop ] [ Lifetime ]", price: "3660", minQuantity: 3000, maxQuantity: 3000 },
                { id: "3546", name: "Youtube Views with Full Watchtime + Likes + Ads clicks [ worldwide - 2 Minutes ]", price: "4200", minQuantity: 100, maxQuantity: 100000 },
                { id: "3860", name: "YouTube Views + Likes [ Real Engagement ] [ Nondrop ] [ Lifetime Guarantee ]", price: "280", minQuantity: 100, maxQuantity: 100000 },
                { id: "3985", name: "YouTube Views [ Lifetime Refill ] [ Nondrop ] [ Normal Speed ] - 2 Minutes", price: "120", minQuantity: 100, maxQuantity: 10000000 },
                { id: "3986", name: "YouTube Views [ Lifetime Refill ] [ Nondrop ] [ Normal Speed ] - 3 Minutes", price: "115", minQuantity: 100, maxQuantity: 10000000 },
                { id: "4148", name: "YouTube Views [ Lifetime Refill ] [ Nondrop ] [ Normal Speed ] - 1 Minute", price: "150", minQuantity: 100, maxQuantity: 10000000 }
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
                { id: "2349", name: "YT Watchtime [ Monetization ]", price: "950", minQuantity: 1000, maxQuantity: 100000 }
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
                { id: "3562", name: "[X] Twitter Followers [ Lifetime Refill ] [ Premium ] [ Slow ]", price: "320", minQuantity: 10, maxQuantity: 100000 },
                { id: "3788", name: "[X] Twitter Followers [ Premium ] [ Stable ] [ Refill: 30 Days ]", price: "480", minQuantity: 10, maxQuantity: 100000 }
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
                { id: "3909", name: "X/Twitter Likes - working", price: "180", minQuantity: 10, maxQuantity: 100000 }
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
                { id: "3642", name: "Threads Followers [ Affordable ]", price: "150", minQuantity: 10, maxQuantity: 100000 }
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
                { id: "3638", name: "Threads Likes [ High Quality ]", price: "240", minQuantity: 10, maxQuantity: 100000 }
            ]
        },
        {
            id: "THR-RESHARES",
            title: "Reshares",
            description: "Get more reposts on your content",
            icon: Share2,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            packages: [
                { id: "3639", name: "Threads Reshare [ Real ]", price: "600", minQuantity: 10, maxQuantity: 100000 },
                { id: "3640", name: "Threads Reshare [ SuperFast ]", price: "1100", minQuantity: 10, maxQuantity: 100000 }
            ]
        },
        {
            id: "THR-COMMENTS",
            title: "Comments",
            description: "Natural looking comments from active accounts",
            icon: MessageCircle,
            color: "text-indigo-500",
            bg: "bg-indigo-500/10",
            packages: [
                { id: "3641", name: "Threads Custom Comments", price: "6000", minQuantity: 10, maxQuantity: 100 }
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
                { id: "2950", name: "Pinterest Followers ( MQ )", price: "1100", minQuantity: 10, maxQuantity: 100000 },
                { id: "2953", name: "Pinterest Followers ( HQ )", price: "2700", minQuantity: 10, maxQuantity: 100000 }
            ]
        },
        {
            id: "PIN-LIKES",
            title: "Likes",
            description: "Increase engagement on your pins",
            icon: Heart,
            color: "text-red-500",
            bg: "bg-red-500/10",
            packages: [
                { id: "2951", name: "Pinterest Likes ( 1.5k/D )", price: "1800", minQuantity: 10, maxQuantity: 100000 }
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
                { id: "2952", name: "Pinterest Repins ( HQ )", price: "1300", minQuantity: 10, maxQuantity: 100000 }
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
                { id: "2085", name: "FB Post Likes - Mix Indian", price: "970", minQuantity: 10, maxQuantity: 100000 },
                { id: "3251", name: "FB Post Likes [ Lifetime Refill ]⚡️", price: "180", minQuantity: 10, maxQuantity: 100000 }
            ]
        },
        {
            id: "FB-FOLLOWERS",
            title: "Followers + Likes",
            description: "Grow your Facebook followers with likes",
            icon: Users,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            packages: [
                { id: "2517", name: "FB Followers + Like [ Affordable] [ 30 Day Refill ] [ Good Service ]", price: "90", minQuantity: 10, maxQuantity: 100000 }
            ]
        },
        {
            id: "FB-VIEWS",
            title: "Reel & Video Views",
            description: "Increase views on your Facebook videos and reels",
            icon: Play,
            color: "text-blue-700",
            bg: "bg-blue-700/10",
            packages: [
                { id: "3391", name: "Facebook Reel & Video Views [ 100k View Pack ] [ High Quality ]", price: "8", minQuantity: 100, maxQuantity: 10000000 },
                { id: "3392", name: "Facebook Reel & Video Views [ High Quality ] [ 3 Sec Retention ]", price: "37", minQuantity: 100, maxQuantity: 10000000 },
                { id: "3394", name: "Facebook Reel & Video Views [ Real Quality ] [ Good Speed ]", price: "15", minQuantity: 100, maxQuantity: 10000000 },
                { id: "4043", name: "Facebook Reel & Video Views [ Real Quality ] [⚡️Good Speed ]", price: "10", minQuantity: 100, maxQuantity: 10000000 }
            ]
        }
    ],
    "NET-10": [ // Spotify
        {
            id: "SPT-FOLLOWERS",
            title: "Followers",
            description: "Grow your artist profile followers",
            icon: Users,
            color: "text-green-500",
            bg: "bg-green-500/10",
            packages: [
                { id: "3339", name: "Spotify Podcast Followers [ High Quality ] [ Lifetime Guaranteed ]", price: "42", minQuantity: 10, maxQuantity: 100000 },
                { id: "3340", name: "Spotify Artist Followers [ High Quality ] [ Lifetime Guaranteed ]", price: "42", minQuantity: 10, maxQuantity: 100000 },
                { id: "3341", name: "Spotify Playlist Followers [ High Quality ] [ Lifetime Guaranteed ]", price: "68", minQuantity: 10, maxQuantity: 100000 },
                { id: "3342", name: "Spotify User Followers [ High Quality ] [ Lifetime Guaranteed ]", price: "42", minQuantity: 10, maxQuantity: 100000 },
                { id: "3343", name: "Spotify Followers [ All links ] [ High Quality ] [ Lifetime Guaranteed ]", price: "40", minQuantity: 10, maxQuantity: 100000 }
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
            id: "QR-FOLLOWERS",
            title: "Followers",
            description: "Grow your Quora profile reach",
            icon: Users,
            color: "text-red-700",
            bg: "bg-red-700/10",
            packages: [
                { id: "3794", name: "Quora.com Follower [ Real - 100/Day ]", price: "1170", minQuantity: 10, maxQuantity: 100000 }
            ]
        },
        {
            id: "QR-VIEWS",
            title: "Views",
            description: "Increase visibility of your content",
            icon: Eye,
            color: "text-red-600",
            bg: "bg-red-600/10",
            packages: [
                { id: "3791", name: "Quora.com View [ Real - NonDrop ]", price: "221", minQuantity: 10, maxQuantity: 100000 }
            ]
        },
        {
            id: "QR-LIKES",
            title: "Likes",
            description: "Get more engagement on your answers",
            icon: Heart,
            color: "text-red-500",
            bg: "bg-red-500/10",
            packages: [
                { id: "3792", name: "Quora.com Likes [ Real - 100/Day ]", price: "1124", minQuantity: 10, maxQuantity: 100000 }
            ]
        },
        {
            id: "QR-SHARES",
            title: "Shares",
            description: "Amplify your content reach",
            icon: Share2,
            color: "text-red-400",
            bg: "bg-red-400/10",
            packages: [
                { id: "3793", name: "Quora.com Shares [ Real - 10-100/Day ]", price: "1124", minQuantity: 10, maxQuantity: 100000 }
            ]
        },
        {
            id: "QR-UPVOTES",
            title: "Upvotes",
            description: "Increase credibility of your answers",
            icon: Vote,
            color: "text-red-600",
            bg: "bg-red-600/10",
            packages: [
                { id: "3795", name: "Quora.com Upvotes [ speed: 1-2K/Day ]", price: "2654", minQuantity: 10, maxQuantity: 100000 }
            ]
        }
    ]
};
