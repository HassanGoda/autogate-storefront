import PageTitle from '~/components/shared/PageTitle';
import companyStories from '~/data/autogate-company-stories.json';
import { useLocalize } from '~/services/i18n/localize';
// react
import React, { useMemo } from 'react';
// third-party
import { useIntl } from 'react-intl';
// application
import BlockBanners from '~/components/blocks/BlockBanners';
import catalog from '~/data/autogate-catalog.json';
import BlockBrands from '~/components/blocks/BlockBrands';
import carBrands from '~/data/autogate-car-brands.json';
import BlockFeatures from '~/components/blocks/BlockFeatures';
import BlockFinder from '~/components/blocks/BlockFinder';
import BlockPosts from '~/components/blocks/BlockPosts';
import BlockProductsCarousel from '~/components/blocks/BlockProductsCarousel';
import BlockProductsColumns from '~/components/blocks/BlockProductsColumns';
import BlockSale from '~/components/blocks/BlockSale';
import BlockSpace from '~/components/blocks/BlockSpace';
import BlockZone from '~/components/blocks/BlockZone';
import url from '~/services/url';
import { shopApi } from '~/api';
import { useDeferredData, useProductColumns, useProductTabs } from '~/services/hooks';

function Page() {
    const l10n = useLocalize();

    const intl = useIntl();

    /**
     * Featured products.
     */
    const featuredProducts = useProductTabs(
        useMemo(() => [
            { id: 1, name: 'All', categorySlug: null },
            { id: 2, name: 'Brakes', categorySlug: 'brakes' },
            { id: 3, name: 'Filters', categorySlug: 'filters' },
            { id: 4, name: 'Lighting', categorySlug: 'lighting' },
            { id: 5, name: 'Motor Oil', categorySlug: 'motor-oil' },
        ], []),
        async (tab) => {
            const products = await shopApi.getFeaturedProducts(null, catalog.products.length);
            const match: Record<string, RegExp> = { brakes: /brake/, filters: /filter/, lighting: /headlight/, 'motor-oil': /motor-oil/ };
            const filter = tab.categorySlug ? match[tab.categorySlug] : undefined;
            return (filter ? products.filter((product) => filter.test(product.slug)) : products).slice(0, 8);
        },
    );

    const blockSale = useDeferredData(() => shopApi.getFeaturedProducts(null, 8), []);

    const blockZones = useMemo(() => [
        {
            image: '/images/autogate-parts/ag-suspension.webp',
            mobileImage: '/images/autogate-parts/ag-suspension.webp',
            categorySlug: 'ag-suspension',
        },
        {
            image: '/images/autogate-parts/ag-body-parts.webp',
            mobileImage: '/images/autogate-parts/ag-body-parts.webp',
            categorySlug: 'ag-body-parts',
        },
        {
            image: '/images/autogate-parts/ag-engine-parts.webp',
            mobileImage: '/images/autogate-parts/ag-engine-parts.webp',
            categorySlug: 'ag-engine-parts',
        },
    ], []);

    const newArrivals = useDeferredData(() => shopApi.getLatestProducts(12), []);
    const newArrivalsLinks = useMemo(() => [
        { title: 'Suspension', url: '/catalog/ag-suspension/products' },
        { title: 'Engine Parts', url: '/catalog/ag-engine-parts/products' },
        { title: 'Electrical', url: '/catalog/ag-electrical/products' },
        { title: 'Show All', url: url.products() },
    ], []);

    const partsBrands = useDeferredData(() => shopApi.getBrands({ limit: 16 }), []);
    /**
     * Product columns.
     */
    const columns = useProductColumns(
        useMemo(() => [
            {
                title: 'Engine Parts',
                source: () => shopApi.getFeaturedProducts('ag-engine-parts', 3),
            },
            {
                title: 'Featured Products',
                source: () => shopApi.getFeaturedProducts(null, 3),
            },
            {
                title: 'Body Parts',
                source: () => shopApi.getFeaturedProducts('ag-body-parts', 3),
            },
        ], []),
    );

    return (
        <React.Fragment>
            <PageTitle>{intl.formatMessage({ id: 'TEXT_SLOGAN' })}</PageTitle>
            <BlockFinder />
            <BlockFeatures layout="top-strip" />
            <BlockSpace layout="divider-nl" />
            <BlockProductsCarousel
                blockTitle={intl.formatMessage({ id: 'HEADER_FEATURED_PRODUCTS' })}
                layout="grid-5"
                loading={featuredProducts.isLoading}
                products={featuredProducts.data}
                groups={featuredProducts.tabs}
                currentGroup={featuredProducts.tabs.find((x) => x.current)}
                onChangeGroup={featuredProducts.handleTabChange}
            />
            <BlockSpace layout="divider-nl" />
            <BlockSale
                products={blockSale.data}
                loading={blockSale.isLoading}
            />
            <BlockSpace layout="divider-lg" />

            {l10n(blockZones.map((blockZone, blockZoneIdx) => (
                <React.Fragment key={blockZoneIdx}>
                    <BlockZone
                        image={blockZone.image}
                        mobileImage={blockZone.mobileImage}
                        categorySlug={blockZone.categorySlug}
                    />
                    {l10n(blockZoneIdx < blockZones.length - 1 && (
                        <BlockSpace layout="divider-sm" />
                    ))}
                </React.Fragment>
            )))}

            <BlockSpace layout="divider-nl" />
            <BlockBanners />
            <BlockSpace layout="divider-nl" />
            <BlockProductsCarousel
                blockTitle={intl.formatMessage({ id: 'HEADER_NEW_ARRIVALS' })}
                layout="horizontal"
                rows={2}
                loading={newArrivals.isLoading}
                products={newArrivals.data}
                links={newArrivalsLinks}
            />
            <BlockSpace layout="divider-nl" />
            <div id="company-updates" />
            <BlockPosts
                blockTitle={intl.formatMessage({ id: 'HEADER_COMPANY_UPDATES' })}
                layout="grid"
                loading={false}
                posts={companyStories}
            />
            <BlockSpace layout="divider-nl" />
            <BlockBrands layout="columns-8-full" brands={partsBrands.data || []} />
            <BlockSpace layout="divider-nl" className="d-xl-block d-none" />
            <BlockProductsColumns columns={columns} />
            <BlockSpace layout="divider-nl" />
            <BlockBrands
                layout="columns-8-full"
                brands={carBrands.filter((brand) => brand.featuredVisible).sort((a, b) => a.displayOrder - b.displayOrder)}
                initialLimit={12}
                title={intl.formatMessage({ id: 'HEADER_CAR_BRANDS' })}
            />
            <BlockSpace layout="before-footer" />
        </React.Fragment>
    );
}

export default Page;
