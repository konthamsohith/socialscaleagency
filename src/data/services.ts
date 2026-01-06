export interface Service {
    id: string;
    category: string;
    name: string;
    rate: number;
    min: number;
    max: number;
    status: string;
}

export const initialServices: Service[] = [
    // Instagram
    { id: '3894', category: 'Instagram', name: 'IG Reel Views - Cheap', rate: 0.7, min: 50, max: 1000000, status: 'Active' },
    { id: '3895', category: 'Instagram', name: 'IG Reel Views - Good ⚡', rate: 1.8, min: 100, max: 5000000, status: 'Active' },
    { id: '3896', category: 'Instagram', name: 'IG Reel Views - Best ⚡', rate: 2.5, min: 100, max: 10000000, status: 'Active' },
    { id: '3897', category: 'Instagram', name: 'IG Reel Views - Emergency', rate: 2.6, min: 50, max: 1000000, status: 'Active' },
    { id: '3898', category: 'Instagram', name: 'IG Post / Photo Views', rate: 2.5, min: 100, max: 500000, status: 'Active' },
    { id: '3899', category: 'Instagram', name: 'IG Reel Views [ Organic ]', rate: 12.6, min: 100, max: 20000, status: 'Active' },
    { id: '3900', category: 'Instagram', name: 'IG Likes - Real', rate: 15.0, min: 50, max: 5000, status: 'Active' },
    { id: '3901', category: 'Instagram', name: 'IG Followers - Non Drop', rate: 85.0, min: 100, max: 10000, status: 'Active' },

    // YouTube
    { id: '1023', category: 'YouTube', name: 'YouTube Views - Non-Drop', rate: 120, min: 1000, max: 50000, status: 'Active' },
    { id: '1024', category: 'YouTube', name: 'YouTube Likes', rate: 250, min: 50, max: 10000, status: 'Active' },
    { id: '1025', category: 'YouTube', name: 'YouTube Subscribers - Real', rate: 1500, min: 100, max: 5000, status: 'Active' },
    { id: '1026', category: 'YouTube', name: 'YouTube Watch Time (4000h)', rate: 4500, min: 100, max: 4000, status: 'Active' },
    { id: '1027', category: 'YouTube', name: 'YouTube Comments', rate: 800, min: 10, max: 500, status: 'Active' },

    // Facebook
    { id: '2050', category: 'Facebook', name: 'FB Page Likes', rate: 450, min: 100, max: 20000, status: 'Active' },
    { id: '2051', category: 'Facebook', name: 'FB Post Likes', rate: 150, min: 50, max: 10000, status: 'Active' },
    { id: '2052', category: 'Facebook', name: 'FB Video Views', rate: 80, min: 1000, max: 1000000, status: 'Active' },
    { id: '2053', category: 'Facebook', name: 'FB Live Stream Views', rate: 1200, min: 50, max: 5000, status: 'Active' },

    // TikTok
    { id: '5501', category: 'TikTok', name: 'TikTok Views', rate: 0.1, min: 100, max: 1000000, status: 'Active' },
    { id: '5502', category: 'TikTok', name: 'TikTok Likes', rate: 85, min: 50, max: 50000, status: 'Active' },
    { id: '5503', category: 'TikTok', name: 'TikTok Followers', rate: 250, min: 100, max: 20000, status: 'Active' },
    { id: '5504', category: 'TikTok', name: 'TikTok Shares', rate: 45, min: 100, max: 100000, status: 'Active' },

    // Spotify
    { id: '6010', category: 'Spotify', name: 'Spotify Plays (Premium)', rate: 180, min: 1000, max: 500000, status: 'Active' },
    { id: '6011', category: 'Spotify', name: 'Spotify Followers', rate: 350, min: 100, max: 50000, status: 'Active' },
    { id: '6012', category: 'Spotify', name: 'Spotify Monthly Listeners', rate: 220, min: 1000, max: 100000, status: 'Active' },

    // X - Twitter
    { id: '7020', category: 'X - Twitter', name: 'Twitter Followers', rate: 950, min: 50, max: 10000, status: 'Active' },
    { id: '7021', category: 'X - Twitter', name: 'Twitter Retweets', rate: 650, min: 20, max: 5000, status: 'Active' },
    { id: '7022', category: 'X - Twitter', name: 'Twitter Likes', rate: 450, min: 20, max: 5000, status: 'Active' },

    // Discord
    { id: '8030', category: 'Discord', name: 'Discord Server Members (Offline)', rate: 350, min: 100, max: 10000, status: 'Active' },
    { id: '8031', category: 'Discord', name: 'Discord Server Members (Online)', rate: 850, min: 50, max: 5000, status: 'Active' },
    { id: '8032', category: 'Discord', name: 'Discord Boosts (3 Months)', rate: 1200, min: 2, max: 30, status: 'Active' },

    // Threads
    { id: '9040', category: 'Threads', name: 'Threads Followers', rate: 400, min: 100, max: 20000, status: 'Active' },
    { id: '9041', category: 'Threads', name: 'Threads Likes', rate: 120, min: 50, max: 5000, status: 'Active' },
];
