// react
import React, { useEffect, useState } from 'react';
// third-party
import { useRouter } from 'next/router';
// application
import ShopPageOrderSuccess from '~/components/shop/ShopPageOrderSuccess';
import { accountApi } from '~/api';
import { IOrder } from '~/interfaces/order';
import SitePageNotFound from '~/components/site/SitePageNotFound';

function Page() {
    const router = useRouter();
    const [order, setOrder] = useState<IOrder | null>(null);
    const [unavailableToken, setUnavailableToken] = useState<string>();
    const { token } = router.query;

    useEffect(() => {
        let canceled = false;

        if ((typeof token === 'string')) {
            accountApi.getOrderByToken(token).then((result) => {
                if (canceled) {
                    return;
                }

                setOrder(result);
            }, () => {
                if (!canceled) {
                    setUnavailableToken(token);
                }
            });
        } else {
            setOrder(null);
        }

        return () => {
            canceled = true;
        };
    }, [token]);

    if (unavailableToken && unavailableToken === token) {
        return <SitePageNotFound />;
    }

    if (!order || order.token !== token) {
        return null;
    }

    return <ShopPageOrderSuccess order={order} />;
}

export default Page;
