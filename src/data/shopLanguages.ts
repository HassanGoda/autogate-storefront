// application
import { ILanguage } from '~/interfaces/language';

const dataShopLanguages: ILanguage[] = [
    {
        locale: 'en',
        code: 'en',
        name: 'English',
        icon: '/images/languages/gb.webp',
        direction: 'ltr',
    },
    {
        locale: 'ar',
        code: 'ar',
        name: 'العربية',
        icon: '/images/languages/sa.webp',
        direction: 'rtl',
    },
];

export const dataShopDefaultLocale = 'en';

export default dataShopLanguages;
