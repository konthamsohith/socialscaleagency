import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { NewOrder } from './NewOrder';
import { Profile } from './Profile';
import { MyOrders } from './MyOrders';
import { MassOrder } from './MassOrder';
import { Support } from './Support';

export const DashboardLayout = () => {
    const [activePage, setActivePage] = useState('New order');

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-electric-purple/30 relative overflow-hidden">
            <style>{`
                .brand-bg {
                    background: radial-gradient(circle at 50% 100%, #ffffff 0%, #ebf8ff 40%, #bfdbfe 100%);
                }
            `}</style>

            {/* Background Gradients from Hero (adapted for light mode) */}
            <div className="absolute inset-0 brand-bg -z-10" />
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-electric-purple/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

            <Sidebar active={activePage} setActive={setActivePage} />
            <main className="pl-64 relative z-10">
                <div className="max-w-7xl mx-auto p-8">
                    <Topbar />
                    <div className="mt-8">
                        {activePage === 'Profile' ? (
                            <Profile />
                        ) : activePage === 'My orders' ? (
                            <MyOrders />
                        ) : activePage === 'Mass order' ? (
                            <MassOrder />
                        ) : activePage === 'Support' ? (
                            <Support />
                        ) : (
                            <NewOrder />
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};


