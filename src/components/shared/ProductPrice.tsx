import React from 'react';
import { FormattedMessage } from 'react-intl';
import CurrencyFormat from './CurrencyFormat';

export default function ProductPrice({ value }: { value: number }) {
    return value > 0 ? <CurrencyFormat value={value} /> : <FormattedMessage id="TEXT_PRICE_ON_REQUEST" />;
}
