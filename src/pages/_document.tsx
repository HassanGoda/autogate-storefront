// react
import React from 'react';
// third-party
import Document, {
    Head,
    Html,
    Main,
    NextScript,
} from 'next/document';
// application
import { baseUrl } from '~/services/utils';
import { getDefaultLanguage, getLanguageByLocale } from '~/services/i18n/utils';

class MyDocument extends Document {
    render() {
        const language = getLanguageByLocale(this.props.__NEXT_DATA__.locale || '') || getDefaultLanguage();
        const lang = language.locale;
        const dir = language.direction;

        // noinspection HtmlRequiredTitleElement
        return (
            <Html lang={lang} dir={dir}>
                <Head>
                    <link rel="shortcut icon" href={baseUrl('/images/favicon.webp')} />

                    {/* fonts */}
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&family=Roboto:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap" />
                </Head>
                <body>
                    <div className="site-preloader">
                        <style
                            dangerouslySetInnerHTML={{
                                __html: `
                                        #__next *,
                                        #__next *:before,
                                        #__next *:after {
                                            transition-duration: 0s !important;
                                        }

                                        body {
                                            overflow: hidden !important;
                                            overflow-y: scroll !important;
                                            height: 100% !important;
                                        }
                                    `,
                            }}
                        />
                    </div>

                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
