import React from 'react';
import { useIntl } from 'react-intl';
import { saudiRiyal } from '~/data/shopCurrencies';
import { ICurrency } from '~/interfaces/currency';

export default function CurrencyFormat({ value }: { value: number; currency?: ICurrency }) {
    const { locale } = useIntl();
    return <bdi>{new Intl.NumberFormat(locale === 'ar' ? 'ar-SA' : 'en-SA', {
        style: 'currency', currency: 'SAR',
    }).format(value * saudiRiyal.rate)}</bdi>;
}
