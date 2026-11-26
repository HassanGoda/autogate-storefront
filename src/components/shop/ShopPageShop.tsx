import { useLocalize } from '~/services/i18n/localize';
// react
import React, { useEffect, useMemo } from 'react';
// third-party
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
// application
import BlockHeader from '~/components/blocks/BlockHeader';
import BlockSpace from '~/components/blocks/BlockSpace';
import ProductsView from '~/components/shop/ProductsView';
import ShopSidebar from '~/components/shop/ShopSidebar';
import url from '~/services/url';
import { getCategoryParents } from '~/services/utils';
import { buildQuery } from '~/store/shop/shopHelpers';
import CatalogVehicleContext from '~/components/shop/CatalogVehicleContext';
import { ILink } from '~/interfaces/link';
import { SidebarProvider } from '~/services/sidebar';
import { useShop } from '~/store/shop/shopHooks';
import {
    IShopPageGridLayout,
    IShopPageLayout,
    IShopPageOffCanvasSidebar,
    IShopPageSidebarPosition,
} from '~/interfaces/pages';

interface Props {
    layout: IShopPageLayout;
    gridLayout: IShopPageGridLayout;
    sidebarPosition?: IShopPageSidebarPosition;
}

function ShopPageShop(props: Props) {
    const l10n = useLocalize();

    const {
        layout,
        gridLayout,
        sidebarPosition = 'start',
    } = props;
    const intl = useIntl();
    const router = useRouter();
    const term = router.query.filter_query;
    const isVin = typeof term === 'string' && /^[A-HJ-NPR-Z0-9]{17}$/i.test(term.trim());
    const shopState = useShop();

    // Replace current url.
    useEffect(() => {
        if (!shopState.init) {
            return;
        }

        const query = buildQuery(shopState.options, shopState.filters, { slug: router.query.slug });

        router.replace({ pathname: router.pathname, query }, undefined, { shallow: true }).then();
    }, [shopState.options, shopState.filters]);

    const hasSidebar = ['grid-3-sidebar', 'grid-4-sidebar'].includes(gridLayout);
    const offCanvasSidebar: IShopPageOffCanvasSidebar = [
        'grid-4-full',
        'grid-5-full',
        'grid-6-full',
    ].includes(gridLayout) ? 'always' : 'mobile';

    const pageHeader = useMemo(() => {
        let pageTitle = intl.formatMessage({ id: 'HEADER_SHOP' });
        const breadcrumb: ILink[] = [
            { title: intl.formatMessage({ id: 'LINK_HOME' }), url: url.home() },
            { title: intl.formatMessage({ id: 'LINK_SHOP' }), url: url.shop() },
        ];

        if (shopState.category) {
            getCategoryParents(shopState.category).forEach((parent) => {
                breadcrumb.push({ title: parent.name, url: url.category(parent) });
            });

            breadcrumb.push({ title: shopState.category.name, url: url.category(shopState.category) });

            pageTitle = shopState.category.name;
        }

        return <BlockHeader pageTitle={pageTitle} breadcrumb={breadcrumb} />;
    }, [intl, shopState.category]);

    if (shopState.categoryIsLoading || (shopState.productsListIsLoading && !shopState.productsList)) {
        return null;
    }

    const sidebar = (
        <ShopSidebar offcanvas={offCanvasSidebar} />
    );

    const blockSplitClasses = classNames('block-split', {
        'block-split--has-sidebar': hasSidebar,
    });

    return (
        <React.Fragment>
            <SidebarProvider>
                {l10n(pageHeader)}

                <div className={blockSplitClasses}>
                    {l10n(offCanvasSidebar === 'always' && sidebar)}

                    <div className="container">
                        <div className="block-split__row row no-gutters">
                            {l10n(sidebarPosition === 'start' && hasSidebar && (
                                <div className="block-split__item block-split__item-sidebar col-auto">
                                    {l10n(sidebar)}
                                </div>
                            ))}

                            <div className="block-split__item block-split__item-content col-auto flex-grow-1">
                                <div className="block">
                                    {isVin && (
                                        <p className="alert alert-info" role="status">
                                            {intl.formatMessage({ id: 'TEXT_ALERT_UNABLE_TO_FIND_VEHICLE_BY_VIN' })}
                                        </p>
                                    )}
                                    <CatalogVehicleContext />
                                    <ProductsView
                                        layout={layout}
                                        gridLayout={gridLayout}
                                        offCanvasSidebar={offCanvasSidebar}
                                    />
                                </div>
                            </div>

                            {l10n(sidebarPosition === 'end' && hasSidebar && (
                                <div className="block-split__item block-split__item-sidebar col-auto">
                                    {l10n(sidebar)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <BlockSpace layout="before-footer" />
            </SidebarProvider>
        </React.Fragment>
    );
}

export default ShopPageShop;
