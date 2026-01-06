import { useState } from 'react';
import { Search, Edit2, Plus } from 'lucide-react';
import { Button } from '../ui/Button';
import { Switch } from '../ui/Switch';
import { ServiceModal } from './ServiceModal';
import { initialServices } from '../../data/services';

export const Admin = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<any>(null);

    // Mock Data for Admin Pricing
    const [services, setServices] = useState(initialServices);

    const handleSaveService = (serviceData: any) => {
        if (editingService) {
            // Update existing
            setServices(services.map(s => s.id === editingService.id ? { ...serviceData, id: editingService.id } : s));
        } else {
            // Add new
            setServices([{ ...serviceData, id: Math.floor(Math.random() * 10000).toString() }, ...services]);
        }
        setIsModalOpen(false);
        setEditingService(null);
    };

    const handleEditClick = (service: any) => {
        setEditingService(service);
        setIsModalOpen(true);
    };

    const handleToggleStatus = (id: string) => {
        setServices(services.map(service =>
            service.id === id
                ? { ...service, status: service.status === 'Active' ? 'Inactive' : 'Active' }
                : service
        ));
    };

    const filteredServices = services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.id.includes(searchTerm)
    );

    // Group services by category
    const groupedServices = filteredServices.reduce((acc, service) => {
        if (!acc[service.category]) {
            acc[service.category] = [];
        }
        acc[service.category].push(service);
        return acc;
    }, {} as Record<string, typeof services>);

    const categories = Object.keys(groupedServices);

    return (
        <div className="w-full animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 font-instagram tracking-tight">Admin Dashboard</h1>
                    <p className="text-slate-500 mt-1">Manage services, pricing, and system settings.</p>
                </div>
                <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                        setEditingService(null);
                        setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 bg-electric-purple text-white shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform"
                >
                    <Plus size={16} /> Add New Service
                </Button>
            </div>

            {/* Pricing / Services Manager */}
            <div className="space-y-6">
                <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900 pl-2">Service Pricing</h2>
                    <div className="relative w-full sm:w-72">
                        <input
                            type="text"
                            placeholder="Search services..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-electric-purple/20 focus:border-electric-purple transition-all"
                        />
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                </div>

                {categories.map((category) => (
                    <div key={category} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center gap-3">
                            <span className="text-lg font-bold text-slate-800">{category}</span>
                            <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-500 text-xs font-medium border border-slate-200 shadow-sm">
                                {groupedServices[category].length} services
                            </span>
                        </div>

                        <div className="overflow-x-auto">
                            <div className="min-w-[800px]">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-slate-100 text-slate-500">
                                            <th className="py-3 px-6 font-semibold w-24">ID</th>
                                            <th className="py-3 px-6 font-semibold">Service Name</th>
                                            <th className="py-3 px-6 font-semibold w-32">Rate (₹)</th>
                                            <th className="py-3 px-6 font-semibold w-40">Min / Max</th>
                                            <th className="py-3 px-6 font-semibold w-24">Status</th>
                                            <th className="py-3 px-6 font-semibold w-20 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {groupedServices[category].map((service) => (
                                            <tr key={service.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                                                <td className="py-4 px-6 font-mono text-slate-500">{service.id}</td>
                                                <td className="py-4 px-6 font-medium text-slate-900">{service.name}</td>
                                                <td className="py-4 px-6 font-bold text-slate-900">₹{service.rate}</td>
                                                <td className="py-4 px-6 text-slate-500 text-xs">
                                                    {service.min.toLocaleString()} / {service.max.toLocaleString()}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <Switch
                                                            checked={service.status === 'Active'}
                                                            onCheckedChange={() => handleToggleStatus(service.id)}
                                                        />
                                                        <span className={`text-xs font-medium w-14 ${service.status === 'Active' ? 'text-emerald-700' : 'text-slate-400'}`}>
                                                            {service.status}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <button
                                                        onClick={() => handleEditClick(service)}
                                                        className="p-2 text-slate-400 hover:text-electric-purple hover:bg-electric-purple/5 rounded-lg transition-colors"
                                                    >
                                                        <Edit2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <ServiceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveService}
                initialData={editingService}
            />
        </div>
    );
};
