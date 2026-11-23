import React from 'react';
import AppImage from '~/components/shared/AppImage';
import brands from '~/data/autogate-car-brands.json';
import models from '~/data/autogate-vehicles.json';

const brandImages = new Map(brands.map((brand) => [brand.name.toLowerCase(), brand.image]));

export default function VehicleMakeLogo({ make }: { make: string }) {
    const logo = brandImages.get(make.trim().toLowerCase()) || models.find((model) => model.make === make)?.logo;
    if (!logo) return null;
    return <AppImage src={logo} alt={make} style={{ width: 36, height: 22, objectFit: 'contain', background: 'white', borderRadius: 3 }} />;
}
