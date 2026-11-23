import React from 'react';
import { useLocalize } from '~/services/i18n/localize';
import { IVehicle } from '~/interfaces/vehicle';
import VehicleMakeLogo from './VehicleMakeLogo';
import { Car20Svg } from '~/svg';

interface Props {
    vehicle: IVehicle;
    logoOnly?: boolean;
}

export default function SelectedVehicleIdentity({ vehicle, logoOnly = false }: Props) {
    const l10n = useLocalize();
    const vehicleName = [l10n(vehicle.make), l10n(vehicle.model), vehicle.year].join(' ');

    return (
        <span className="selected-vehicle-identity" title={vehicleName}>
            <VehicleMakeLogo make={vehicle.make} />
            <span className="selected-vehicle-identity__fallback" aria-hidden="true"><Car20Svg /></span>
            {!logoOnly && (
                <span>
                    <strong>{vehicleName}</strong>
                    {vehicle.engine && <span className="selected-vehicle-identity__engine">{l10n(vehicle.engine)}</span>}
                </span>
            )}
        </span>
    );
}
