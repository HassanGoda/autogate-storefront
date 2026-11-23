import { useLocalize } from '~/services/i18n/localize';
// react
import React from 'react';
import { useIntl } from 'react-intl';
// application
import AppImage from '~/components/shared/AppImage';
import AppLink from '~/components/shared/AppLink';
import { IBrand } from '~/interfaces/brand';
import url from '~/services/url';

export type IBlockBrandsLayout = 'columns-8-full' | 'columns-7-sidebar';

interface Props {
    layout: IBlockBrandsLayout;
    brands: Array<Pick<IBrand, 'name' | 'image'> & { key?: string; nameAr?: string }>;
    title?: string;
}

function BlockBrands(props: Props) {
    const l10n = useLocalize();

    const { layout, brands, title } = props;
    const { locale } = useIntl();

    return (
        <div className={`block block-brands block-brands--layout--${layout}`}>
            <div className="container">
                {title && <h2 className="h5 mb-3">{title}</h2>}
                <ul className="block-brands__list">
                    {brands.map((brand) => {
                        const name = locale === 'ar' ? brand.nameAr || l10n(brand.name) : brand.name;
                        const href = brand.key ? url.products({ filters: { filter_make: brand.key } }) : '/';

                        return (
                            <React.Fragment key={brand.key || brand.name}>
                                <li className="block-brands__item">
                                    <AppLink
                                        href={href}
                                        className={`block-brands__item-link${brand.key ? ' block-brands__item-link--directory' : ''}`}
                                    >
                                        <AppImage src={brand.image} loading="lazy" alt="" />
                                        <span className="block-brands__item-name">{name}</span>
                                    </AppLink>
                                </li>
                                <li className="block-brands__divider" role="presentation" />
                            </React.Fragment>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default React.memo(BlockBrands);
