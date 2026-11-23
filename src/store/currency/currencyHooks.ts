import { saudiRiyal } from '~/data/shopCurrencies';
import { currencyChange } from '~/store/currency/currencyActions';
import { useAppAction } from '~/store/hooks';
export const useCurrency = () => saudiRiyal;
export const useCurrencyChange = () => useAppAction(currencyChange);
