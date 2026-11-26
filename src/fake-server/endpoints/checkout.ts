import checkoutPayments from '~/data/checkoutPayments';
/* eslint-disable import/prefer-default-export */

// application
import { delayResponse } from '~/fake-server/utils';
import { ICheckoutData } from '~/api/base';
import { IOrder, IOrderItem, IOrderTotal } from '~/interfaces/order';
import { products } from '~/fake-server/database/products';
import {
    getNextOrderId,
    getNextOrderNumber,
    getOrderToken,
    orders,
} from '~/fake-server/database/orders';

export function checkout(data: ICheckoutData): Promise<IOrder> {
    if (!checkoutPayments.some((item) => item.name === data.payment)
        || !data.items.length
        || data.items.some((item) => !Number.isSafeInteger(item.quantity) || item.quantity < 1)) {
        return Promise.reject(new Error('Invalid demo order'));
    }

    const id = getNextOrderId();
    const items: IOrderItem[] = data.items.map((x) => {
        const product = products.find((p) => p.id === x.productId);

        if (!product || product.price <= 0 || product.stock === 'out-of-stock') {
            throw new Error('Product unavailable for checkout');
        }

        return {
            product,
            options: x.options,
            price: product.price,
            quantity: x.quantity,
            total: product.price * x.quantity,
        };
    });
    const quantity = items.reduce((acc, x) => acc + x.quantity, 0);
    const subtotal = items.reduce((acc, x) => acc + x.total, 0);
    const totals: IOrderTotal[] = [
        {
            title: 'SHIPPING',
            price: 25,
        },
        {
            title: 'TAX',
            price: subtotal * 0.15,
        },
    ];
    const total = subtotal + totals.reduce((acc, x) => acc + x.price, 0);

    const date = new Date();
    const pad = (v: number) => (`00${v}`).substr(-2);
    const createdAt = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

    const order: IOrder = {
        id,
        token: getOrderToken(id),
        number: getNextOrderNumber(),
        createdAt,
        payment: data.payment,
        status: 'PENDING',
        items,
        quantity,
        subtotal,
        totals,
        total,
        billingAddress: data.billingAddress,
        shippingAddress: data.shippingAddress,
    };

    orders.unshift(order);

    return delayResponse(Promise.resolve(order));
}
