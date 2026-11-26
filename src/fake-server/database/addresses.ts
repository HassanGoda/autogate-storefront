// application
import { IAddress } from '~/interfaces/address';
import { makeIdGenerator } from '~/fake-server/utils';

export const getNextAddressId = makeIdGenerator();

export const addresses: IAddress[] = [];
