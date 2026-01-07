export interface Order {
    id: string;
    service: string;
    platform: 'instagram' | 'youtube' | 'twitter' | 'facebook' | 'linkedin' | 'tiktok' | 'pinterest' | 'threads' | 'spotify' | 'telegram' | 'discord' | 'quora';
    link: string;
    quantity: number;
    price: number;
    date: string;
    status: 'completed' | 'processing' | 'pending' | 'canceled' | 'partial';
}

export const mockOrders: Order[] = [
    {
        id: "ORD-7829-XJ",
        service: "Instagram Followers - Premium",
        platform: "instagram",
        link: "https://instagram.com/design_daily",
        quantity: 5000,
        price: 49.99,
        date: "2024-03-10",
        status: "completed"
    },
    {
        id: "ORD-9921-MC",
        service: "YouTube Views - High Retention",
        platform: "youtube",
        link: "https://youtu.be/dQw4w9WgXcQ",
        quantity: 10000,
        price: 89.50,
        date: "2024-03-12",
        status: "processing"
    },
    {
        id: "ORD-3321-KL",
        service: "X Likes",
        platform: "twitter",
        link: "https://twitter.com/user/status/123...",
        quantity: 1000,
        price: 12.00,
        date: "2024-03-14",
        status: "pending"
    },
    {
        id: "ORD-1102-PP",
        service: "Facebook Page Likes",
        platform: "facebook",
        link: "https://facebook.com/mybrand",
        quantity: 500,
        price: 25.00,
        date: "2024-03-08",
        status: "canceled"
    },
    {
        id: "ORD-5541-AB",
        service: "LinkedIn Connections",
        platform: "linkedin",
        link: "https://linkedin.com/in/user",
        quantity: 200,
        price: 35.00,
        date: "2024-03-15",
        status: "processing"
    },
    {
        id: "ORD-7771-ZZ",
        service: "Spotify Streams",
        platform: "spotify",
        link: "https://open.spotify.com/track/...",
        quantity: 5000,
        price: 19.99,
        date: "2024-03-01",
        status: "completed"
    },
    {
        id: "ORD-8821-QQ",
        service: "TikTok Views",
        platform: "tiktok",
        link: "https://tiktok.com/@video",
        quantity: 2500,
        price: 15.00,
        date: "2024-02-28",
        status: "completed"
    },
    {
        id: "ORD-9932-WW",
        service: "Pinterest Pins",
        platform: "pinterest",
        link: "https://pinterest.com/pin/...",
        quantity: 100,
        price: 8.50,
        date: "2024-02-27",
        status: "pending"
    },
    {
        id: "ORD-1234-AA",
        service: "Instagram Likes",
        platform: "instagram",
        link: "https://instagram.com/p/...",
        quantity: 500,
        price: 5.00,
        date: "2024-02-25",
        status: "completed"
    },
    {
        id: "ORD-5678-BB",
        service: "YouTube Subscribers",
        platform: "youtube",
        link: "https://youtube.com/channel/...",
        quantity: 1000,
        price: 150.00,
        date: "2024-02-20",
        status: "processing"
    },
    {
        id: "ORD-9012-CC",
        service: "X Followers",
        platform: "twitter",
        link: "https://twitter.com/profile",
        quantity: 2000,
        price: 45.00,
        date: "2024-02-18",
        status: "completed"
    },
    {
        id: "ORD-3456-DD",
        service: "Facebook Post Likes",
        platform: "facebook",
        link: "https://facebook.com/post/...",
        quantity: 300,
        price: 10.00,
        date: "2024-02-15",
        status: "completed"
    }
];
