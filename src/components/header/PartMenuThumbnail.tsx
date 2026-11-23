import React from 'react';
import AppImage from '~/components/shared/AppImage';

const photos: Record<string, string> = {
    'Headlights & Lighting': 'autogate-parts/ag-headlight-assembly.jpg',
    Headlights: 'products/product-3-1.jpg',
    'Tail Lights': 'products/product-11-1.jpg',
    'Body Parts': 'autogate-parts/ag-car-door-handle.jpg',
    'Door Handles': 'autogate-parts/ag-car-door-handle.jpg',
    'Interior Parts': 'autogate-parts/ag-car-floor-mats.jpg',
    'Floor Mats': 'autogate-parts/ag-car-floor-mats.jpg',
    'Tires & Wheels': 'products/product-4-1.jpg',
    'Wheel disks': 'products/product-4-1.jpg',
    Tires: 'products/product-14-1.jpg',
    'Brakes & Suspension': 'autogate-parts/ag-brake-pad-set.jpg',
    'Brake Discs': 'products/product-2-1.jpg',
    'Brake Pad Sets': 'autogate-parts/ag-brake-pad-set.jpg',
    'Brake Kits': 'products/product-2-1.jpg',
    'Air Suspension': 'products/product-20-1.jpg',
    Suspension: 'autogate-parts/ag-shock-absorber.jpg',
    'Engine & Drivetrain': 'products/product-7-1.jpg',
    Transmission: 'products/product-9-1.jpg',
    'Air Filters': 'autogate-parts/ag-air-filter.jpg',
    'Oil Filters': 'autogate-parts/ag-engine-oil-filter.jpg',
    'Spark Plugs': 'autogate-parts/ag-spark-plugs-set.jpg',
    Exhaust: 'products/product-5-1.jpg',
    Clutches: 'products/product-8-1.jpg',
    'Motor Oil': 'products/product-6-1.jpg',
    'Oils & Lubricants': 'products/product-6-1.jpg',
};

export default function PartMenuThumbnail({ title }: { title: React.ReactNode }) {
    const photo = typeof title === 'string' ? photos[title] : undefined;
    return photo ? <AppImage className="part-menu-thumbnail" src={'/images/' + photo} alt="" width={24} height={24} /> : null;
}
