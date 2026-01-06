import { useState, useEffect } from 'react';
import { ServiceList } from './ServiceList';
import { NetworkSelector, Network, networks } from './NetworkSelector';
import { ServiceCategorySelector } from './ServiceCategorySelector';
import { ServiceDetails } from './ServiceDetails';
import { initialServices } from '../../data/services';

interface NewOrderProps {
    initialServiceId?: string | null;
}

export const NewOrder = ({ initialServiceId }: NewOrderProps) => {
    const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedService, setSelectedService] = useState<string | null>(null);

    useEffect(() => {
        if (initialServiceId) {
            const service = initialServices.find(s => s.id === initialServiceId);
            if (service) {
                const network = networks.find(n => n.name === service.category);
                if (network) {
                    setSelectedNetwork(network);
                    setSelectedCategory(service.category);
                    setSelectedService(service.id);
                }
            }
        }
    }, [initialServiceId]);

    const handleNetworkSelect = (network: Network) => {
        setSelectedNetwork(network);
        setSelectedCategory(null);
        setSelectedService(null);
    };

    const handleCategorySelect = (categoryId: string) => {
        setSelectedCategory(categoryId);
        setSelectedService(null);
    };

    return (
        <div className="w-full">
            {selectedService ? (
                <ServiceDetails
                    serviceId={selectedService}
                    onBack={() => setSelectedService(null)}
                />
            ) : selectedCategory && selectedNetwork ? (
                <ServiceList
                    category={selectedCategory}
                    onBack={() => setSelectedCategory(null)}
                    onSelectService={setSelectedService}
                />
            ) : selectedNetwork ? (
                <ServiceCategorySelector
                    network={selectedNetwork}
                    onBack={() => setSelectedNetwork(null)}
                    onSelect={handleCategorySelect}
                />
            ) : (
                <NetworkSelector onSelect={handleNetworkSelect} />
            )}
        </div>
    );
};
