
import {
    PlusCircle,
    ShoppingCart,
    Layers,
    User,
    LifeBuoy
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
    active: string;
    setActive: (item: string) => void;
}

export const Sidebar = ({ active, setActive }: SidebarProps) => {

    const menuItems = [
        { name: 'New order', icon: PlusCircle },
        { name: 'My orders', icon: ShoppingCart },
        { name: 'Mass order', icon: Layers },
        { name: 'Profile', icon: User },
        { name: 'Support', icon: LifeBuoy },
    ];

    return (
        <div className="w-64 min-h-screen bg-white/80 backdrop-blur-xl border-r border-slate-200/60 flex flex-col p-4 fixed left-0 top-0 z-40">
            <div className="flex items-center gap-2 mb-10 px-2 mt-2">
                <img src="/logo.png" alt="SocialScale Logo" className="w-8 h-8 object-contain" />
                <span className="text-slate-900 font-archivo font-bold text-xl tracking-tight">SocialScale</span>
            </div>

            <div className="flex flex-col gap-2 flex-1">
                {menuItems.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => setActive(item.name)}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium font-sans",
                            active === item.name
                                ? "bg-electric-purple text-white shadow-[0_4px_20px_-5px_rgba(0,55,255,0.3)]"
                                : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/80"
                        )}
                    >
                        <item.icon size={18} />
                        {item.name}
                    </button>
                ))}
            </div>

            <div className="mt-auto px-2">
                {/* Footer or extra links can go here */}
            </div>
        </div>
    );
};
