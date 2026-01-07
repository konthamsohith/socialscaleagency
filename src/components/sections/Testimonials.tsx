import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Play } from 'lucide-react';

const reviews = [
    {
        id: 1,
        type: 'text',
        name: "Patrick Nawrocki",
        role: "UX Manager at Superhabits",
        image: "https://i.pravatar.cc/150?u=patrick",
        content: "The lovely team at SocialScale has provided our startup with significant leverage. Their work is exceptionally professional, and they are always attentive to our needs.",
        signature: "Patrick Nawrocki"
    },
    {
        id: 2,
        type: 'video',
        name: "Pri Patel",
        role: "Product Designer at Lightdash",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
        video: "/videos/testimonial2.mp4",
        signature: "Pri Patel"
    },
    {
        id: 3,
        type: 'text',
        name: "Rob West",
        role: "CEO of Kingdom Advisors",
        image: "https://i.pravatar.cc/150?u=rob",
        content: "SocialScale has greatly exceeded our expectations. The communication is always excellent, the turnaround is extremely quick, and the strategies are spot on!",
        signature: "Rob West"
    },
    {
        id: 4,
        type: 'text',
        name: "Dom Tyler",
        role: "CEO of Kinsta",
        image: "https://i.pravatar.cc/150?u=dom",
        content: "The level of leverage provided was professional, attentive, and valuable. Their turnaround times are impressively fast!",
        signature: "Dom Tyler"
    },
    {
        id: 5,
        type: 'video',
        name: "Sarah Jenks",
        role: "Founder at SmartGrowth",
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600",
        video: "/videos/testimonial1.mp4",
        signature: "Sarah Jenks"
    }
];

const ReviewCard = ({ review }: { review: typeof reviews[0] }) => (
    <div className="w-[350px] md:w-[450px] bg-white rounded-[32px] p-8 md:p-10 flex flex-col h-[500px] shadow-sm border border-slate-100 mx-4 shrink-0 transition-transform duration-300 hover:scale-[1.02] whitespace-normal">
        <div className="mb-6">
            <img src={review.image} alt={review.name} className="w-14 h-14 rounded-full object-cover" />
        </div>
        <p className="font-archivo font-medium text-xl md:text-2xl text-[#3D3D3D] leading-[22px] mb-auto">
            "{review.content}"
        </p>
        <div className="mt-8">
            <div className="font-cursive text-3xl text-slate-900 mb-2 transform -rotate-2">{review.signature}</div>
            <div className="text-sm text-slate-400 font-medium uppercase tracking-wide">{review.role}</div>
        </div>
    </div>
);

const VideoCard = ({ review, onPlay, onPause }: { review: any, onPlay: () => void, onPause: () => void }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    const togglePlayback = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                setIsPlaying(false);
                onPause();
            } else {
                videoRef.current.play();
                setIsPlaying(true);
                onPlay();
            }
        }
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0.1;
        }
    };

    return (
        <div
            onClick={togglePlayback}
            className="relative w-[350px] md:w-[450px] h-[500px] rounded-[32px] overflow-hidden mx-4 shrink-0 group cursor-pointer whitespace-normal border border-slate-100 shadow-sm"
        >
            <video
                ref={videoRef}
                src={review.video}
                onLoadedMetadata={handleLoadedMetadata}
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                preload="auto"
                playsInline
                loop
                muted={isMuted}
            />

            {/* Play Button Overlay */}
            {!isPlaying && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40 transition-transform group-hover:scale-110">
                        <Play size={40} className="text-white ml-2" fill="currentColor" />
                    </div>
                </div>
            )}

            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0'}`} />

            {/* Volume Control */}
            {isPlaying && (
                <div
                    onClick={toggleMute}
                    className="absolute top-6 right-6 z-20 transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-black/40 backdrop-blur-md p-2 rounded-full hover:bg-black/60"
                >
                    {isMuted ? (
                        <VolumeX className="text-white w-5 h-5" />
                    ) : (
                        <Volume2 className="text-white w-5 h-5" />
                    )}
                </div>
            )}

            <div className="absolute bottom-0 left-0 w-full p-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none">
                <div className="font-cursive text-3xl text-white mb-1 transform -rotate-2">{review.signature}</div>
                <div className="text-sm text-white/90 font-medium uppercase tracking-wide">{review.role}</div>
            </div>
        </div>
    );
};

export const Testimonials = () => {
    const [isMarqueePaused, setIsMarqueePaused] = useState(false);

    // Duplicate reviews to create a seamless loop
    const marqueeReviews = [...reviews, ...reviews, ...reviews, ...reviews];

    return (
        <section id="reviews" className="py-24 bg-[#FAFAFA] overflow-hidden">
            <style>
                {`@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600&display=swap');
                  .font-cursive { font-family: 'Caveat', cursive; }
                  @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                  }
                  .animate-marquee {
                    animation: marquee 60s linear infinite;
                  }
                  .paused {
                    animation-play-state: paused;
                  }
                `}
            </style>

            <div className="max-w-[1920px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-7xl mx-auto px-6 mb-16 md:mb-24 text-center"
                >
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-[#0037FF]">
                            <path d="M12 0C13.5 7.5 16.5 10.5 24 12C16.5 13.5 13.5 16.5 12 24C10.5 16.5 7.5 13.5 0 12C7.5 10.5 10.5 7.5 12 0Z" />
                        </svg>
                        <span className="font-archivo font-normal text-[14px] leading-[17px] text-black uppercase">Testimonials</span>
                    </div>
                    <h2 className="font-archivo font-semibold text-[56px] leading-[62px] text-black max-w-4xl mx-auto">
                        Don't take our word for it!<br />
                        <span className="text-black">Hear it from our partners.</span>
                    </h2>
                </motion.div>

                {/* Marquee Container */}
                <div className="relative w-full overflow-hidden">
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none" />

                    <div className={`flex w-max animate-marquee will-change-transform ${isMarqueePaused ? 'paused' : ''}`}>
                        {marqueeReviews.map((review, index) => (
                            review.type === 'video'
                                ? <VideoCard
                                    key={`${review.id}-${index}`}
                                    review={review}
                                    onPlay={() => setIsMarqueePaused(true)}
                                    onPause={() => setIsMarqueePaused(false)}
                                />
                                : <ReviewCard key={`${review.id}-${index}`} review={review} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
