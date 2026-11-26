// react
import React from 'react';
// third-party
import { useIntl } from 'react-intl';
// application
import PageTitle from '~/components/shared/PageTitle';
import BlockFinder from '~/components/blocks/BlockFinder';
import BlockFeatures from '~/components/blocks/BlockFeatures';
import BlockBrands from '~/components/blocks/BlockBrands';
import BlockSpace from '~/components/blocks/BlockSpace';
import carBrands from '~/data/autogate-car-brands.json';

function Page() {
    const intl = useIntl();

    return (
        <React.Fragment>
            <PageTitle>{intl.formatMessage({ id: 'TEXT_SLOGAN' })}</PageTitle>

            {/* 1. صندوق البحث الرئيسي عن السيارة */}
            <BlockFinder />

            {/* 2. شريط المزايا المدمج لتعزيز الثقة (شحن، ضمان، دعم) */}
            <BlockFeatures layout="top-strip" />
            <BlockSpace layout="divider-nl" />

            {/* 3. شعارات علامات السيارات لتسهيل التصفح المباشر (يمكنك حذف هذا القسم إذا أردت البحث فقط) */}
            <BlockBrands
                layout="columns-8-full"
                brands={carBrands
                    .filter((brand) => brand.featuredVisible)
                    .sort((a, b) => a.displayOrder - b.displayOrder)}
                initialLimit={12}
                title={intl.formatMessage({ id: 'HEADER_CAR_BRANDS' })}
            />

            <BlockSpace layout="before-footer" />
        </React.Fragment>
    );
}

export default Page;
