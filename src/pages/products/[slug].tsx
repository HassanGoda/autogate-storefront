// react
import React from 'react';
// third-party
import { GetServerSideProps } from 'next';
// application
import ShopPageProduct from '~/components/shop/ShopPageProduct';
import { IProduct } from '~/interfaces/product';
import { shopApi } from '~/api';
import SitePageNotFound from '~/components/site/SitePageNotFound';

interface Props {
    product: IProduct | null;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
    const slug = typeof params?.slug === 'string' ? params?.slug : null;

    if (!slug) return { notFound: true };

    try {
        const product = await shopApi.getProductBySlug(slug);
        return product ? { props: { product } } : { notFound: true };
    } catch (error) {
        if (error instanceof Error && error.message === 'Page Not Found') return { notFound: true };
        throw error;
    }
};

function Page(props: Props) {
    const { product } = props;

    if (product === null) {
        return <SitePageNotFound />;
    }

    return (
        <ShopPageProduct
            product={product}
            layout="full"
        />
    );
}

export default Page;
