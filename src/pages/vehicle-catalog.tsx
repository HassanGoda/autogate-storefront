import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import AppImage from '~/components/shared/AppImage';
import PageTitle from '~/components/shared/PageTitle';
import vehicles from '~/data/autogate-vehicles.json';

interface IVehicleCatalogItem {
    id: string;
    displayName?: string;
    manufacturer?: string;
    make: string;
    model: string;
    makeAr?: string;
    logo?: string | null;
    image?: string | null;
}

export default function VehicleCatalog() {
    const { locale } = useIntl();
    const ar = locale === 'ar';
    const [query, setQuery] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const items = vehicles as IVehicleCatalogItem[];
    const title = ar ? 'كتالوج السيارات' : 'Vehicle Catalog';
    const label = (vehicle: IVehicleCatalogItem) => ar ? vehicle.makeAr : vehicle.make;
    const makes = Array.from(new Map(items.map((vehicle) => [vehicle.make, label(vehicle)])).entries())
        .sort((a, b) => (a[1] || '').localeCompare(b[1] || '', locale));
    const visible = items.filter((vehicle) =>
        (!manufacturer || vehicle.make === manufacturer)
        && [vehicle.displayName, vehicle.makeAr, vehicle.make].some(
            (value) => value?.toLowerCase().includes(query.trim().toLowerCase()),
        ),
    );

    return (
        <main className="container py-5">
            <PageTitle>{title}</PageTitle>
            <h1>{title}</h1>
            <div className="row my-4">
                <div className="col-md-8 mb-2">
                    <label htmlFor="vehicle-query">{ar ? 'البحث بالعلامة أو الطراز' : 'Search by manufacturer or model'}</label>
                    <input id="vehicle-query" className="form-control" value={query} onChange={(event) => setQuery(event.target.value)} />
                </div>
                <div className="col-md-4 mb-2">
                    <label htmlFor="vehicle-make">{ar ? 'الشركة المصنّعة' : 'Manufacturer'}</label>
                    <select id="vehicle-make" className="form-control" value={manufacturer} onChange={(event) => setManufacturer(event.target.value)}>
                        <option value="">{ar ? 'جميع الشركات' : 'All manufacturers'}</option>
                        {makes.map(([make, name]) => make && <option key={make} value={make}>{name}</option>)}
                    </select>
                </div>
            </div>
            <p role="status">{ar ? 'النتائج' : 'Results'} · {visible.length} / {items.length}</p>
            {!visible.length && <p>{ar ? 'لا توجد سيارات مطابقة.' : 'No matching vehicles.'}</p>}
            <div className="row">
                {visible.map((vehicle) => (
                    <div key={vehicle.id} className="col-6 col-md-4 col-lg-3 mb-4">
                        <article className="card h-100 text-center">
                            {typeof vehicle.image === 'string' && vehicle.image && <AppImage src={vehicle.image} alt={vehicle.model} className="card-img-top" />}
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-center mb-3" style={{ minHeight: 56 }}>
                                    {vehicle.logo ? (
                                        <AppImage src={vehicle.logo} alt={label(vehicle) || ''} loading="lazy" width={80} height={52} style={{ objectFit: 'contain' }} />
                                    ) : <span className="badge badge-light p-2">{label(vehicle)}</span>}
                                </div>
                                <p className="mb-1">{label(vehicle)}</p>
                                <h2 className="h6 mb-0"><bdi>{vehicle.model.trim()}</bdi></h2>
                            </div>
                        </article>
                    </div>
                ))}
            </div>
        </main>
    );
}
