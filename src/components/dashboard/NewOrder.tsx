import { useState } from 'react';
import { ServiceList } from './ServiceList';
import { NetworkSelector, Network } from './NetworkSelector';
import { ServiceCategorySelector } from './ServiceCategorySelector';
import { ServiceDetails } from './ServiceDetails';

export const NewOrder = () => {
    const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedService, setSelectedService] = useState<string | null>(null);

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
