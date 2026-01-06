import { useState } from 'react';
import { NetworkSelector, Network } from './NetworkSelector';
import { ServiceCategorySelector } from './ServiceCategorySelector';

export const NewOrder = () => {
    const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(null);

    return (
        <div className="w-full">
            {selectedNetwork ? (
                <ServiceCategorySelector
                    network={selectedNetwork}
                    onBack={() => setSelectedNetwork(null)}
                />
            ) : (
                <NetworkSelector onSelect={setSelectedNetwork} />
            )}
        </div>
    );
};
