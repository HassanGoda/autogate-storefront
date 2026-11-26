import { useLocalize } from '~/services/i18n/localize';
// react
import React, { PropsWithChildren } from 'react';
// third-party
import Head from 'next/head';
import { useIntl } from 'react-intl';

interface Props extends PropsWithChildren<{}> {}

function PageTitle(props: Props) {
    const l10n = useLocalize();

    const { children } = props;
    const ar = useIntl().locale === 'ar';
    const title = typeof children === 'string' ? l10n(children) : '';
    const description = ar
        ? `${title ? title + ' | ' : ''}أوتوجيت لقطع غيار السيارات. استعرض الكتالوج واستفسر عن السعر والتوفر.`
        : `${title ? title + ' | ' : ''}AutoGate car spare parts. Browse the catalog and enquire about price and availability.`;

    return (
        <Head>
            <meta name="description" content={description} />
            <title>
                {l10n(title)}
                {l10n(title ? ' — ' : '')}{l10n("AutoGate | أوتوجيت")}</title>
        </Head>
    );
}

export default PageTitle;
