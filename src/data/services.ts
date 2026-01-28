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
                { id: "2279", name: "Followers [Good Quality] [30D Refill]", price: "317", minQuantity: 50, maxQuantity: 100000 },
                { id: "3703", name: "Followers [High Quality] [365D Refill]", price: "435", minQuantity: 50, maxQuantity: 100000 },
                { id: "3774", name: "Followers [High Quality] [Lifetime Refill]", price: "540", minQuantity: 50, maxQuantity: 100000 },
                { id: "4301", name: "Followers [High Quality] [365D Refill] [Recommended]", price: "522", minQuantity: 50, maxQuantity: 100000 },
                { id: "4302", name: "Followers [High Quality] [Lifetime Refill] Low Drops", price: "465", minQuantity: 50, maxQuantity: 100000 },
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
                { id: "3790", name: "HIGH Quality Likes", price: "140", minQuantity: 100, maxQuantity: 100000 },
                { id: "3200", name: "GOOD Quality Likes", price: "74", minQuantity: 50, maxQuantity: 2000000 },
                { id: "3741", name: "HQ Likes - Auto Refill 🌟", price: "122", minQuantity: 100, maxQuantity: 500000 },
                { id: "4245", name: "Foreign Quality Likes", price: "70", minQuantity: 10, maxQuantity: 100000 },
                { id: "3981", name: "MIX Indian Likes", price: "110", minQuantity: 50, maxQuantity: 100000 },
                { id: "2936", name: "REAL Indian Likes", price: "425", minQuantity: 10, maxQuantity: 50000 },
                { id: "2685", name: "REAL USA Likes", price: "688", minQuantity: 10, maxQuantity: 50000000 },
                { id: "3246", name: "Likes [Real Profiles] [USA Insights]", price: "671", minQuantity: 5, maxQuantity: 3000 },
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
                { id: "2495", name: "Story Views", price: "99", minQuantity: 100, maxQuantity: 1000000 }
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
                { id: "4252", name: "Repost [Global]", price: "2759", minQuantity: 50, maxQuantity: 100000 },
                { id: "4279", name: "Repost [Cheapest]", price: "185", minQuantity: 50, maxQuantity: 100000 }
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
                { id: "3463", name: "Comments [Mix Indian]", price: "174", minQuantity: 50, maxQuantity: 500000 },
                { id: "4219", name: "Comments [Super REAL] [Foreign Insights]", price: "13488", minQuantity: 50, maxQuantity: 100 }
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
                { id: "INST-LIV-2", name: "Instagram Live Views [ 60 Mins ]", price: "750" },
                { id: "INST-LIV-3", name: "Instagram Live Views [ 15 minutes ] [Price for 100]", price: "10.4", minQuantity: 100, maxQuantity: 100000 },
                { id: "INST-LIV-4", name: "Instagram Live Views [ 30 minutes ] [Price for 100]", price: "20.9", minQuantity: 100, maxQuantity: 100000 },
                { id: "INST-LIV-5", name: "Instagram Live Views [ 60 minutes ] [Price for 100]", price: "43", minQuantity: 100, maxQuantity: 100000 }
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
                { id: "3694", name: "Reel Views - Cheap S2", price: "2", minQuantity: 100, maxQuantity: 100000 },
                { id: "4030", name: "Reel Views - Cheap", price: "2", minQuantity: 100, maxQuantity: 100000 },
                { id: "3294", name: "Reel Views - Good", price: "4", minQuantity: 100, maxQuantity: 100000 },
                { id: "3651", name: "Reel Views - Best", price: "5", minQuantity: 100, maxQuantity: 100000 }
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
                { id: "3964", name: "Channel Member [Global]", price: "282", minQuantity: 50, maxQuantity: 1000000 },
                { id: "3971", name: "Channel Member [India]", price: "282", minQuantity: 50, maxQuantity: 1000000 }
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
                { id: "4031", name: "Story Vote [1st Option/A]", price: "535", minQuantity: 50, maxQuantity: 100000 },
                { id: "4032", name: "Story Vote [2nd Option/B]", price: "535", minQuantity: 50, maxQuantity: 100000 },
                { id: "4033", name: "Story Vote [3rd Option/C]", price: "535", minQuantity: 50, maxQuantity: 100000 },
                { id: "4034", name: "Story Vote [4th Option/D]", price: "535", minQuantity: 50, maxQuantity: 100000 },
                { id: "4035", name: "Story Vote [A] [Price for 100]", price: "277", minQuantity: 100, maxQuantity: 100000 },
                { id: "4036", name: "Story Vote [B] [Price for 100]", price: "1186", minQuantity: 100, maxQuantity: 100000 },
                { id: "4037", name: "Vote For [ 3rd Option or 'C' ] [Price for 100]", price: "54", minQuantity: 100, maxQuantity: 100000 },
                { id: "4038", name: "Vote For [ 4th Option or 'D' ] [Price for 100]", price: "54", minQuantity: 100, maxQuantity: 100000 }
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
                { id: "2779", name: "Followers [High Quality] [No Refill]", price: "240", minQuantity: 50, maxQuantity: 100000 },
                { id: "2781", name: "Followers [High Quality] [Lifetime Refill]", price: "323", minQuantity: 50, maxQuantity: 100000 },
                { id: "2782", name: "Followers [High Quality] [30D Refill]", price: "264", minQuantity: 50, maxQuantity: 100000 }
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
                { id: "2130", name: "Likes [BEST]", price: "25", minQuantity: 50, maxQuantity: 100000 }
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
                { id: "2125", name: "Video Views [S2]", price: "5", minQuantity: 100, maxQuantity: 10000000 },
                { id: "2127", name: "Video Views [Lifetime]", price: "22", minQuantity: 100, maxQuantity: 10000000 },
                { id: "2128", name: "Video Views [S1]", price: "10", minQuantity: 100, maxQuantity: 10000000 }
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
                { id: "4002", name: "Profile Followers", price: "5243", minQuantity: 50, maxQuantity: 100000 }
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
                { id: "4005", name: "Post Likes", price: "3226", minQuantity: 50, maxQuantity: 100000 }
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
                { id: "4006", name: "Post Share", price: "5243", minQuantity: 50, maxQuantity: 100000 }
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
                { id: "2292", name: "Subscribers [Slow]", price: "1700", minQuantity: 50, maxQuantity: 100000 },
                { id: "2837", name: "Subscribers [Best Service]", price: "7495", minQuantity: 50, maxQuantity: 100000 }
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
                { id: "4293", name: "100 Views [Nondrop]", price: "38", minQuantity: 100, maxQuantity: 100 },
                { id: "3032", name: "500 Views [Nondrop]", price: "154", minQuantity: 500, maxQuantity: 500 },
                { id: "3718", name: "1000 Views [Nondrop]", price: "304", minQuantity: 1000, maxQuantity: 1000 },
                { id: "4081", name: "3000 Views [Nondrop]", price: "746", minQuantity: 3000, maxQuantity: 3000 },
                { id: "3546", name: "Views with Full Watchtime + Likes", price: "8387", minQuantity: 100, maxQuantity: 100000 },
                { id: "3860", name: "Views + Likes [Real Engagement]", price: "696", minQuantity: 100, maxQuantity: 100000 },
                { id: "3985", name: "Views [Lifetime] - 2 Min", price: "249", minQuantity: 100, maxQuantity: 10000000 },
                { id: "3986", name: "Views [Lifetime] - 3 Min", price: "238", minQuantity: 100, maxQuantity: 10000000 },
                { id: "4148", name: "Views [Lifetime] - 1 Min", price: "311", minQuantity: 100, maxQuantity: 10000000 }
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
                { id: "2349", name: "Watchtime [Monetization]", price: "7610", minQuantity: 1000, maxQuantity: 100000 }
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
                { id: "3562", name: "Followers [Lifetime Refill]", price: "11838", minQuantity: 50, maxQuantity: 100000 },
                { id: "3788", name: "Followers [30 Day Refill]", price: "3998", minQuantity: 50, maxQuantity: 100000 }
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
                { id: "3909", name: "Likes", price: "1287", minQuantity: 50, maxQuantity: 100000 }
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
                { id: "3642", name: "Followers", price: "300", minQuantity: 50, maxQuantity: 100000 }
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
                { id: "3638", name: "Likes [High Quality]", price: "494", minQuantity: 50, maxQuantity: 100000 }
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
                { id: "3639", name: "Reshare [Real]", price: "1249", minQuantity: 50, maxQuantity: 100000 },
                { id: "3640", name: "Reshare [SuperFast]", price: "2196", minQuantity: 50, maxQuantity: 100000 }
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
                { id: "3641", name: "Custom Comments", price: "12114", minQuantity: 50, maxQuantity: 100 }
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
                { id: "2950", name: "Followers (MQ)", price: "2215", minQuantity: 50, maxQuantity: 100000 },
                { id: "2953", name: "Followers (HQ)", price: "5395", minQuantity: 50, maxQuantity: 100000 }
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
                { id: "2951", name: "Likes (1.5k/D)", price: "3603", minQuantity: 50, maxQuantity: 100000 }
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
                { id: "2952", name: "Repins (HQ)", price: "2636", minQuantity: 50, maxQuantity: 100000 }
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
                { id: "2085", name: "Post Likes - Mix Indian", price: "1973", minQuantity: 50, maxQuantity: 100000 },
                { id: "3251", name: "Post Likes [Lifetime Refill]", price: "373", minQuantity: 50, maxQuantity: 100000 }
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
                { id: "2517", name: "Followers + Like", price: "180", minQuantity: 50, maxQuantity: 100000 }
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
                { id: "3391", name: "Reel & Video Views [100k Pack]", price: "15", minQuantity: 100, maxQuantity: 10000000 },
                { id: "3392", name: "Reel & Video Views [3 Sec Retention]", price: "74", minQuantity: 100, maxQuantity: 10000000 },
                { id: "3394", name: "Reel & Video Views [Good Speed]", price: "20", minQuantity: 100, maxQuantity: 10000000 },
                { id: "4043", name: "Reel & Video Views [Real Quality]", price: "37", minQuantity: 100, maxQuantity: 10000000 }
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
                { id: "3339", name: "Podcast Followers", price: "85", minQuantity: 50, maxQuantity: 100000 },
                { id: "3340", name: "Artist Followers", price: "85", minQuantity: 50, maxQuantity: 100000 },
                { id: "3341", name: "Playlist Followers", price: "138", minQuantity: 50, maxQuantity: 100000 },
                { id: "3342", name: "User Followers", price: "85", minQuantity: 50, maxQuantity: 100000 },
                { id: "3343", name: "Followers [All links]", price: "82", minQuantity: 50, maxQuantity: 100000 }
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
                { id: "3794", name: "Followers", price: "2340", minQuantity: 50, maxQuantity: 100000 }
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
                { id: "3791", name: "Views", price: "442", minQuantity: 50, maxQuantity: 100000 }
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
                { id: "3792", name: "Likes", price: "2247", minQuantity: 50, maxQuantity: 100000 }
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
                { id: "3793", name: "Shares", price: "2247", minQuantity: 50, maxQuantity: 100000 }
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
                { id: "3795", name: "Upvotes", price: "5307", minQuantity: 50, maxQuantity: 100000 }
            ]
        }
    ]
};
