import { useLocalize } from '~/services/i18n/localize';
// react
import React from 'react';
// application
import AppLink from '~/components/shared/AppLink';
import BlockSpace from '~/components/blocks/BlockSpace';
import PageTitle from '~/components/shared/PageTitle';
import url from '~/services/url';

function Page() {
    const l10n = useLocalize();

    return (
        <React.Fragment>
            <PageTitle>{l10n("Frequently Asked Questions")}</PageTitle>

            <BlockSpace layout="spaceship-ledge-height" />

            <div className="block faq">
                <div className="container container--max--xl">
                    <div className="faq__header">
                        <h1 className="faq__header-title">{l10n("Frequently Asked Questions")}</h1>
                    </div>

                    <div className="faq__section">
                        <h3 className="faq__section-title">{l10n("Shipping Information")}</h3>
                        <div className="faq__section-body">

                            <div className="faq__question">
                                <h5 className="faq__question-title">{l10n("What shipping methods are available?")}</h5>
                                <div className="faq__question-answer">
                                    <div className="typography">
                                        <p>{l10n("Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.")}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="faq__question">
                                <h5 className="faq__question-title">{l10n("Do you ship internationally?")}</h5>
                                <div className="faq__question-answer">
                                    <div className="typography">
                                        <p>{l10n("Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.")}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="faq__question">
                                <h5 className="faq__question-title">{l10n("How might I obtain an estimated date of delivery?")}</h5>
                                <div className="faq__question-answer">
                                    <div className="typography">
                                        <p>{l10n("Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.")}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="faq__question">
                                <h5 className="faq__question-title">{l10n("Can I split my order to ship to different locations?")}</h5>
                                <div className="faq__question-answer">
                                    <div className="typography">
                                        <p>{l10n("Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="faq__section">
                        <h3 className="faq__section-title">{l10n("Payment Information")}</h3>
                        <div className="faq__section-body">
                            <div className="faq__question">
                                <h5 className="faq__question-title">{l10n("What payments methods are available?")}</h5>
                                <div className="faq__question-answer">
                                    <div className="typography">
                                        <p>{l10n("Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.")}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="faq__question">
                                <h5 className="faq__question-title">{l10n("Can I split my payment?")}</h5>
                                <div className="faq__question-answer">
                                    <div className="typography">
                                        <p>{l10n("Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="faq__section">
                        <h3 className="faq__section-title">{l10n("Orders and Returns")}</h3>
                        <div className="faq__section-body">
                            <div className="faq__question">
                                <h5 className="faq__question-title">{l10n("How do I return or exchange an item?")}</h5>
                                <div className="faq__question-answer">
                                    <div className="typography">
                                        <p>{l10n("Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.")}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="faq__question">
                                <h5 className="faq__question-title">{l10n("How do I cancel an order?")}</h5>
                                <div className="faq__question-answer">
                                    <div className="typography">
                                        <p>{l10n("Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="faq__footer">
                        <div className="faq__footer-title">{l10n("Still Have A Questions?")}</div>
                        <div className="faq__footer-subtitle">{l10n("We will be happy to answer any questions you may have.")}</div>
                        <AppLink href={url.pageContactUs()} className="btn btn-primary">{l10n("Contact Us")}</AppLink>
                    </div>
                </div>
            </div>

            <BlockSpace layout="before-footer" />
        </React.Fragment>
    );
}

export default Page;
