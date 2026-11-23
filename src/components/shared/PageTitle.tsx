import { useLocalize } from '~/services/i18n/localize';
// react
import React, { PropsWithChildren } from 'react';
// third-party
import Head from 'next/head';

interface Props extends PropsWithChildren<{}> {}

function PageTitle(props: Props) {
    const l10n = useLocalize();

    const { children } = props;
    const title = children || '';

    return (
        <Head>
            <title>
                {l10n(title)}
                {l10n(title ? ' — ' : '')}{l10n("AutoGate | أوتوجيت")}</title>
        </Head>
    );
}

export default PageTitle;
