import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import AppImage from '~/components/shared/AppImage';
import PageTitle from '~/components/shared/PageTitle';
import vehicles from '~/data/autogate-vehicles.json';
import market from '~/data/saudi-vehicle-catalog.json';
import workbook from '~/data/saudi-vehicle-details.json';
import brands from '~/data/autogate-car-brands.json';
import { translateText } from '~/services/i18n/localize';

interface IVehicleCatalogItem {
    id: string;
    displayName?: string;
    manufacturer?: string;
    make: string;
    model: string;
    makeAr?: string;
    logo?: string | null;
    image?: string | null;
    modelAr?: string;
    bodyAr?: string | null;
    imageYear?: number | null;
    approximateYears?: string | null;
    specs?: typeof workbook[number]['engineDetails'];
}

export default function VehicleCatalog() {
    const { locale } = useIntl();
    const router = useRouter();
    const makeFromUrl = router.query.make;
    useEffect(() => {
        if (typeof makeFromUrl === 'string') setManufacturer(makeFromUrl);
    }, [makeFromUrl]);
    const ar = locale === 'ar';
    const [query, setQuery] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const keyOf = (make: string, model: string) => `${make} · ${model}`;
    const workbookByModel = new Map(workbook.map((row) => [keyOf(row.make, row.model), row]));
    const models = new Map([...market, ...workbook].map(({ make, model }) => [keyOf(make, model), { make, model }]));
    const items: IVehicleCatalogItem[] = Array.from(models, ([id, { make, model }]) => {
        const reference = vehicles.find((vehicle) => vehicle.make.toLowerCase() === make.toLowerCase());
        const brand = brands.find((row) => row.name.toLowerCase() === make.toLowerCase());
        const detail = workbookByModel.get(id);
        return {
            id, make, model, displayName: `${make} ${model}`,
            makeAr: detail?.makeAr || brand?.nameAr || reference?.makeAr || translateText(make, 'ar'),
            modelAr: detail?.modelAr, bodyAr: detail?.bodyAr,
            approximateYears: detail?.approximateYears,
            logo: brand?.image || reference?.logo,
            image: detail?.image,
            imageYear: detail?.imageYear,
            specs: detail?.engineDetails,
        };
    });
    const title = ar ? 'كتالوج السيارات' : 'Vehicle Catalog';
    const label = (vehicle: IVehicleCatalogItem) => ar ? vehicle.makeAr : vehicle.make;
    const makes = Array.from(new Map(items.map((vehicle) => [vehicle.make, label(vehicle)])).entries())
        .sort((a, b) => (a[1] || '').localeCompare(b[1] || '', locale));
    const visible = items.filter((vehicle) =>
        (!manufacturer || vehicle.make.toLowerCase() === manufacturer.toLowerCase())
        && [vehicle.displayName, vehicle.makeAr, vehicle.make, vehicle.modelAr, translateText(vehicle.model, locale)].some(
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
                            {typeof vehicle.image === 'string' && vehicle.image && <AppImage src={vehicle.image} alt={`${vehicle.make} ${vehicle.model} ${vehicle.imageYear || ''}`.trim()} loading="lazy" className="card-img-top" />}
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-center mb-3" style={{ minHeight: 56 }}>
                                    {vehicle.logo ? (
                                        <AppImage src={vehicle.logo} alt={label(vehicle) || ''} loading="lazy" width={80} height={52} style={{ objectFit: 'contain' }} />
                                    ) : <span className="badge badge-light p-2">{label(vehicle)}</span>}
                                </div>
                                <p className="mb-1">{label(vehicle)}</p>
                                <h2 className="h6 mb-0"><bdi>{ar ? vehicle.modelAr || vehicle.model : vehicle.model}</bdi></h2>
                                {vehicle.bodyAr && <p className="small mt-2 mb-1">{ar ? vehicle.bodyAr : ({ سيدان: 'Sedan', هاتشباك: 'Hatchback', بيك_أب: 'Pickup' } as Record<string, string>)[vehicle.bodyAr.replace(/ /g, '_')] || vehicle.bodyAr}</p>}
                                {vehicle.approximateYears && <p className="small mb-1">{ar ? 'السنوات التقريبية' : 'Approximate years'} · <bdi>{vehicle.approximateYears}</bdi></p>}
                                {!!vehicle.specs?.length && <details className="small mt-2">
                                    <summary>{ar ? 'مواصفات المحركات' : 'Engine specifications'}</summary>
                                    <ul className="list-unstyled mb-0">
                                        {vehicle.specs.map((spec, index) => (
                                            <li className="mt-2" key={index}>
                                                <bdi>{ar ? spec.description : [spec.liters ? `${spec.liters} L` : null, spec.layout, spec.fuel === 'بنزين' ? 'Petrol' : spec.fuel === 'ديزل' ? 'Diesel' : spec.fuel === 'هايبرد' ? 'Hybrid' : spec.fuel].filter(Boolean).join(' · ')}</bdi>
                                                <br /><bdi>{spec.fromYear}–{spec.toYear}</bdi>
                                                {spec.hp ? ` · ${spec.hp} ${ar ? 'حصان' : 'hp'}` : ''}
                                                {spec.torqueNm ? ` · ${spec.torqueNm} Nm` : ''}
                                                {spec.transmission && <span> · {ar ? spec.transmission : spec.transmission.includes('أوتوماتيك') ? 'Automatic' : spec.transmission.includes('يدوي') ? 'Manual' : spec.transmission}</span>}
                                                {spec.drivetrain && <span> · {ar ? spec.drivetrain : ({ أمامي: 'FWD', خلفي: 'RWD', رباعي: '4WD' } as Record<string, string>)[spec.drivetrain] || spec.drivetrain}</span>}
                                                {spec.confidence !== 'مرتفع' && <span> · {ar ? 'يحتاج تحققًا' : 'Needs verification'}</span>}
                                            </li>
                                        ))}
                                    </ul>
                                </details>}
                            </div>
                        </article>
                    </div>
                ))}
            </div>
        </main>
    );
}
