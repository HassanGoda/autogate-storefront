import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useCurrentVehicle } from '~/services/current-vehicle';
import SelectedVehicleIdentity from '~/components/shared/SelectedVehicleIdentity';

export default function CatalogVehicleContext() {
    const [vehicle] = useCurrentVehicle();

    if (!vehicle) {
        return null;
    }

    return (
        <div className="catalog-vehicle-context">
            <SelectedVehicleIdentity vehicle={vehicle} />
            {vehicle.fitmentUnverified && (
                <p className="mb-0 mt-1"><FormattedMessage id="TEXT_VEHICLE_GENERIC_RESULTS" /></p>
            )}
        </div>
    );
}
