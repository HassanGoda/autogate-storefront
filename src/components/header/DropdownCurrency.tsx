import { useIntl } from 'react-intl';
import { useLocalize } from '~/services/i18n/localize';
// react
import React, { useMemo } from 'react';
// third-party
import { FormattedMessage } from 'react-intl';
// application
import Dropdown, { IDropdownItem } from '~/components/header/Dropdown';
import { ICurrency } from '~/interfaces/currency';
import { useCurrency, useCurrencyChange } from '~/store/currency/currencyHooks';
// data
import dataShopCurrencies from '~/data/shopCurrencies';

interface Item extends IDropdownItem {
    currency: ICurrency;
}

function DropdownCurrency() {
    const l10n = useLocalize();

    const currency = useCurrency();
    const { locale } = useIntl();
    const currencyChange = useCurrencyChange();

    const handleItemClick = (item: Item) => {
        currencyChange(item.currency);
    };

    const items: Item[] = useMemo(() => (
        dataShopCurrencies.filter((item) => locale !== 'ar' || item.code === 'SAR').map(((eachCurrency) => ({
            title: `${eachCurrency.symbol} ${l10n(eachCurrency.name)}`,
            currency: eachCurrency,
        })))
    ), [l10n, locale]);

    const label = (
        <React.Fragment>
            <FormattedMessage id="TEXT_TOPBAR_CURRENCY" />
            :
        </React.Fragment>
    );

    return (
        <Dropdown
            label={label}
            title={l10n(currency.code)}
            items={items}
            onItemClick={handleItemClick}
        />
    );
}

export default DropdownCurrency;
