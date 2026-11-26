import { useLocalize } from '~/services/i18n/localize';
// react
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
// application
import AppImage from '~/components/shared/AppImage';
import AppLink from '~/components/shared/AppLink';
import { IBrand } from '~/interfaces/brand';

export type IBlockBrandsLayout = 'columns-8-full' | 'columns-7-sidebar';

interface Props {
    layout: IBlockBrandsLayout;
    brands: Array<Pick<IBrand, 'name' | 'image'> & { key?: string; nameAr?: string }>;
    title?: string;
    initialLimit?: number;
}

function BlockBrands(props: Props) {
    const l10n = useLocalize();

    const { layout, brands, title, initialLimit } = props;
    const [expanded, setExpanded] = useState(false);
    const visible = initialLimit && !expanded ? brands.slice(0, initialLimit) : brands;
    const { locale } = useIntl();

    return (
        <div className={`block block-brands block-brands--layout--${layout}`}>
            <div className="container">
                {title && <h2 className="h5 mb-3">{title}</h2>}
                <ul className="block-brands__list">
                    {visible.map((brand) => {
                        const name = locale === 'ar' ? brand.nameAr || l10n(brand.name) : brand.name;
                        const href = brand.key ? `/vehicle-catalog?make=${encodeURIComponent(brand.name)}` : '/';

                        return (
                            <React.Fragment key={brand.key || brand.name}>
                                <li className="block-brands__item">
                                    <AppLink
                                        href={href}
                                        className={`block-brands__item-link${brand.key ? ' block-brands__item-link--directory' : ''}`}
                                    >
                                        {brand.image && <AppImage src={brand.image} loading="lazy" alt="" />}
                                        <span className="block-brands__item-name">{name}</span>
                                    </AppLink>
                                </li>
                                <li className="block-brands__divider" role="presentation" />
                            </React.Fragment>
                        );
                    })}
                </ul>
                {initialLimit && brands.length > initialLimit && (
                    <button type="button" className="btn btn-secondary btn-sm mt-3" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
                        {expanded ? (locale === 'ar' ? 'عرض أقل' : 'Show less') : (locale === 'ar' ? 'عرض الكل' : 'Show all')}
                    </button>
                )}
            </div>
        </div>
    );
}

export default React.memo(BlockBrands);
