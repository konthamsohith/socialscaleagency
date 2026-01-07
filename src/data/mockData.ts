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
        service: "Twitter Likes",
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
    }
];
