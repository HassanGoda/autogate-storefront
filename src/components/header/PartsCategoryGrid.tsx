import React from 'react';
import { useIntl } from 'react-intl';
import AppImage from '~/components/shared/AppImage';
import AppLink from '~/components/shared/AppLink';

const sections = [
    ['المحرك وناقل الحركة', 'Engine & transmission', 'ag-engine-parts', 'autogate-parts/ag-engine-parts.jpg'],
    ['الفرامل', 'Brakes', '?filter_query=brake', 'autogate-parts/ag-brake-pad-set.jpg'],
    ['المساعدات والتعليق', 'Suspension', 'ag-suspension', 'autogate-parts/ag-shock-absorber.jpg'],
    ['الشمعات والإضاءة', 'Lighting', '?filter_query=headlight', 'autogate-parts/ag-headlight-assembly.jpg'],
    ['الكهرباء والبطارية', 'Electrical & batteries', 'ag-electrical', 'autogate-parts/ag-car-battery.jpg'],
    ['البواجي', 'Spark plugs', '?filter_query=spark%20plug', 'autogate-parts/ag-spark-plugs-set.jpg'],
    ['قطع الهيكل والأبواب', 'Body & doors', 'ag-body-parts', 'autogate-parts/ag-car-door-handle.jpg'],
    ['المرايا الجانبية', 'Side mirrors', '?filter_query=mirror', 'products/product-18-1.jpg'],
    ['الإطارات', 'Tires', '?filter_query=tire', 'products/product-14-1.jpg'],
    ['الزيوت والفلاتر', 'Oil & filters', '?filter_query=oil', 'autogate-parts/ag-engine-oil-filter.jpg'],
    ['الإكسسوارات', 'Accessories', 'ag-accessories', 'autogate-parts/ag-phone-mount.jpg'],
];

export default function PartsCategoryGrid({ onSelect }: { onSelect: () => void }) {
    const ar = useIntl().locale === 'ar';
    return (
        <div className="autogate-parts-panel">
            <ul className="autogate-parts-panel__grid">
                {sections.map(([arabic, english, target, image]) => (
                    <li key={target}>
                        <AppLink href={target.startsWith('?') ? '/catalog/products' + target : '/catalog/' + target + '/products'} onClick={onSelect}>
                            <AppImage src={'/images/' + image} alt="" width={42} height={42} />
                            <span>{ar ? arabic : english}</span>
                        </AppLink>
                    </li>
                ))}
            </ul>
            <AppLink href="/catalog/products" onClick={onSelect} className="autogate-parts-panel__all">
                {ar ? 'عرض جميع قطع الغيار' : 'Browse all spare parts'}
            </AppLink>
        </div>
    );
}
