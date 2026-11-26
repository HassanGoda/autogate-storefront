import React from 'react';
import AppImage from '~/components/shared/AppImage';
import brands from '~/data/autogate-car-brands.json';
import models from '~/data/autogate-vehicles.json';

const normalizeMake = (make: string) => make.toLowerCase().replace(/[^a-z0-9]/g, '');
const brandImages = new Map(brands.map((brand) => [normalizeMake(brand.name), brand.image]));
const aliases: Record<string, string> = { greatwall: 'greatwallmotors', mercedesbenz: 'mercedes' };

export default function VehicleMakeLogo({ make }: { make: string }) {
    const key = normalizeMake(make);
    const match = aliases[key] || key;
    const logo = brandImages.get(match) || models.find((model) => normalizeMake(model.make) === match)?.logo;
    if (!logo) return null;
    return <AppImage src={logo} alt={make} style={{ width: 36, height: 22, objectFit: 'contain', background: 'white', borderRadius: 3 }} />;
}
