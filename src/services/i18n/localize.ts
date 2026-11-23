import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import contentCatalog from './content-catalog.json';

type Entry = { en: string; ar: string };
const catalog: Record<string, Entry> = contentCatalog;
const normalize = (value: string) => value.replace(/\s+/g, ' ').trim();

// Translation changes presentation only; product IDs, slugs, form values and Redux state stay stable.
export function translateText(value: string, locale: string): string {
    const normalized = normalize(value);
    const entry = catalog[normalized];
    if (!entry) {
        if (/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
            const date = new Date(`${normalized}T12:00:00Z`);
            if (!Number.isNaN(date.getTime())) return new Intl.DateTimeFormat(locale === 'ar' ? 'ar' : 'en', {year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'}).format(date);
        }
        return value;
    }
    const translated = entry[locale === 'ar' ? 'ar' : 'en'];
    return value.replace(/\S[\s\S]*\S|\S/, translated);
}

export function translateHtml(value: string, locale: string): string {
    const entry = catalog[normalize(value)];
    if (entry) return entry[locale === 'ar' ? 'ar' : 'en'];
    // HTML is the template's own static markup, never an online translation response.
    return value.replace(/(^|>)([^<]+)(?=<|$)/g, (_, prefix, text) => prefix + translateText(text, locale));
}

export interface Localizer {
    <T>(value: T): T;
    html: (value: string) => string;
}

export function useLocalize(): Localizer {
    const { locale } = useIntl();
    return useMemo(() => {
        const localize = (<T,>(value: T): T => {
            if (typeof value === 'string') return translateText(value, locale) as unknown as T;
            if (Array.isArray(value)) return value.map((item) => localize(item)) as unknown as T;
            return value;
        }) as Localizer;
        localize.html = (value: string) => translateHtml(value, locale);
        return localize;
    }, [locale]);
}
