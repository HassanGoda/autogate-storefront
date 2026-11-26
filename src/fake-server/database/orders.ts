import { IOrder } from '~/interfaces/order';
import { makeIdGenerator } from '~/fake-server/utils';

export const getNextOrderId = makeIdGenerator();

export function getOrderToken(orderId: number): string {
    const token = 'b84486c31644eac99f6909a6e8c19109';

    return token.slice(0, token.length - orderId.toString().length) + orderId.toString();
}

export const orders: IOrder[] = [];

export function getNextOrderNumber(): string {
    return (orders.reduce((prev, curr) => Math.max(prev, parseFloat(curr.number)), 0) + 1).toString();
}
