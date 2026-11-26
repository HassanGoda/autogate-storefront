import { useLocalize } from '~/services/i18n/localize';
// react
import React from 'react';
import { useIntl } from 'react-intl';
import faq from '~/data/autogate-company-faq.json';
// application
import AppLink from '~/components/shared/AppLink';
import BlockSpace from '~/components/blocks/BlockSpace';
import PageTitle from '~/components/shared/PageTitle';
import url from '~/services/url';

function Page() {
    const l10n = useLocalize();
    const isArabic = useIntl().locale === 'ar';

    return (
        <React.Fragment>
            <PageTitle>{l10n("Frequently Asked Questions")}</PageTitle>

            <BlockSpace layout="spaceship-ledge-height" />

            <div className="block faq">
                <div className="container container--max--xl">
                    <div className="faq__header">
                        <h1 className="faq__header-title">{l10n("Frequently Asked Questions")}</h1>
                    </div>

                    {faq.map(([heading, headingAr, questions]) => (
                        <div className="faq__section" key={heading as string}>
                            <h3 className="faq__section-title">{(isArabic ? headingAr : heading) as string}</h3>
                            <div className="faq__section-body">
                                {(questions as string[][]).map(([question, questionAr, answer, answerAr]) => (
                                    <div className="faq__question" key={question}>
                                        <h5 className="faq__question-title">{isArabic ? questionAr : question}</h5>
                                        <div className="faq__question-answer">
                                            <div className="typography"><p>{isArabic ? answerAr : answer}</p></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <AppLink href={url.pageContactUs()}>{l10n('Contact Us')}</AppLink>
                </div>
            </div>

            <BlockSpace layout="before-footer" />
        </React.Fragment>
    );
}

export default Page;
