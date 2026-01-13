import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Building2,
    Search,
    Trash2,
} from 'lucide-react';
import { apiService } from '../../services/api';
import { Company } from '../../types';

export const CompanyManagement = () => {
    const navigate = useNavigate();
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Quick Add State
    const [newCompanyName, setNewCompanyName] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        loadCompanies();
    }, []);

    const loadCompanies = async () => {
        setLoading(true);
        try {
            const response = await apiService.getCompanies();
            setCompanies(response.data || []);
        } catch (error) {
            console.error('Failed to load companies:', error);
            setCompanies([]);
        } finally {
            setLoading(false);
        }
    };


    const handleQuickCreate = async () => {
        if (!newCompanyName.trim()) return;
        setIsCreating(true);

        const newCompanyData: Partial<Company> = {
            name: newCompanyName.trim(),
            status: 'active'
        };

        try {
            const response = await apiService.createCompany(newCompanyData);
            const createdCompany = response.data;

            // Navigate to details page
            navigate(`/dashboard/companies/${createdCompany.companyId}`, { state: { company: createdCompany } });
        } catch (error) {
            console.error('Failed to create company:', error);
            alert('Failed to create company. Please try again.');
            setIsCreating(false);
        }
    };

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this company?')) {
            try {
                await apiService.deleteCompany(id);
                loadCompanies();
            } catch (error) {
                console.error('Failed to delete company:', error);
                alert('Failed to delete company. Please try again.');
            }
        }
    };

    const filteredCompanies = companies.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.billingDetails?.contactEmail && c.billingDetails.contactEmail.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-slate-900">Company Profiles</h1>
                <p className="text-slate-500">Manage companies and their social media presence</p>
            </div>

            {/* Quick Add Bar */}
            <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm ring-1 ring-blue-50/50">
                <label className="block text-sm font-medium text-slate-700 mb-2">Quick Add Company</label>
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Enter company name (e.g. New Client Inc)"
                        className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        value={newCompanyName}
                        onChange={(e) => setNewCompanyName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleQuickCreate()}
                        disabled={isCreating}
                        autoFocus
                    />
                    <button
                        onClick={handleQuickCreate}
                        disabled={!newCompanyName.trim() || isCreating}
                        className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/20 whitespace-nowrap"
                    >
                        {isCreating ? 'Creating...' : (
                            <>
                                <Plus className="w-5 h-5" />
                                Create & Manage
                            </>
                        )}
                    </button>
                </div>
                <p className="text-xs text-slate-400 mt-2 ml-1">
                    💡 Creating will instantly open the details page to add social profiles.
                </p>
            </div>

            {/* Search */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <Search className="w-5 h-5 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search existing companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-slate-900 placeholder-slate-400"
                />
            </div>

            {/* Companies List */}
            {loading ? (
                <div className="text-center py-12 text-slate-400">Loading companies...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {filteredCompanies.map((company) => (
                            <motion.div
                                key={company.companyId}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                onClick={() => navigate(`/dashboard/companies/${company.companyId}`, { state: { company } })}
                                className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer group relative overflow-hidden"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                                            <Building2 className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 line-clamp-1">{company.name}</h3>
                                            <span className={`inline-flex px-2 py-0.5 rounded text-xs font-bold ${company.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                                                }`}>
                                                {company.status.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={(e) => handleDelete(company.companyId, e)}
                                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete Company"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="space-y-2">
                                    <div className="text-sm text-slate-500 flex justify-between">
                                        <span>Profiles Connected:</span>
                                        <span className="font-medium text-slate-900">{company.socialProfilesCount || 0}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {filteredCompanies.length === 0 && !loading && (
                        <div className="col-span-full py-12 text-center text-slate-400">
                            No companies found matching "{searchTerm}"
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
