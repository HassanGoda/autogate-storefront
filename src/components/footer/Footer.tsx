import { useLocalize } from '~/services/i18n/localize';
// react
import React from 'react';
// third-party
import { FormattedMessage } from 'react-intl';
// application
import AppImage from '~/components/shared/AppImage';
import AppLink from '~/components/shared/AppLink';
import Decor from '~/components/shared/Decor';
import FooterContacts from '~/components/footer/FooterContacts';
import FooterLinks from '~/components/footer/FooterLinks';
import FooterNewsletter from '~/components/footer/FooterNewsletter';
// data

export function Footer() {
    const l10n = useLocalize();

    return (
        <div className="site-footer">
            <Decor className="site-footer__decor" type="bottom" />
            <div className="site-footer__widgets">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-xl-4">
                            <FooterContacts className="site-footer__widget" />
                        </div>
                        <div className="col-6 col-md-3 col-xl-2">
                            <FooterLinks
                                className="site-footer__widget"
                                header={<FormattedMessage id="HEADER_INFORMATION" />}
                                links={[
                                    { title: <FormattedMessage id="LINK_ABOUT_US" />, url: "/about-us" },
                                    { title: <FormattedMessage id="LINK_DELIVERY_INFORMATION" />, url: "/terms#delivery" },
                                    { title: <FormattedMessage id="LINK_PRIVACY_POLICY" />, url: "/terms#privacy" },
                                    { title: <FormattedMessage id="LINK_BRANDS" />, url: "/vehicle-catalog" },
                                    { title: <FormattedMessage id="LINK_CONTACT_US" />, url: "/contact-us" },
                                    { title: <FormattedMessage id="LINK_RETURNS" />, url: "/terms#returns" },
                                    { title: <FormattedMessage id="LINK_SITE_MAP" />, url: "/terms#site-map" },
                                ]}
                            />
                        </div>
                        <div className="col-6 col-md-3 col-xl-2">
                            <FooterLinks
                                className="site-footer__widget"
                                header={<FormattedMessage id="HEADER_MY_ACCOUNT" />}
                                links={[
                                    { title: <FormattedMessage id="LINK_STORE_LOCATION" />, url: "/contact-us#branches" },
                                    { title: <FormattedMessage id="LINK_ORDER_HISTORY" />, url: "/account/orders" },
                                    { title: <FormattedMessage id="LINK_WISH_LIST" />, url: "/wishlist" },
                                    { title: <FormattedMessage id="LINK_NEWSLETTER" />, url: "/#newsletter" },
                                    { title: <FormattedMessage id="LINK_SHOP" />, url: "/catalog/products" },
                                    { title: <FormattedMessage id="LINK_CONTACT_US" />, url: "/contact-us" },
                                ]}
                            />
                        </div>
                        <div className="col-12 col-md-6 col-xl-4" id="newsletter">
                            <FooterNewsletter className="site-footer__widget" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="site-footer__bottom">
                <div className="container">
                    <div className="site-footer__bottom-row">
                        <div className="site-footer__copyright">
                            © أوتوجيت | AutoGate
                        </div>
                        <div className="site-footer__payments">
                            <AppLink href="/" className="autogate-brand" aria-label="أوتوجيت | AutoGate">
                                <AppImage src="/images/autogate/logo-icon.svg" alt="" />
                                <span className="autogate-brand__names">
                                    <bdi lang="ar" dir="rtl">أوتوجيت</bdi>
                                    <AppImage className="autogate-brand__wordmark" src="/images/autogate/logo-text.svg" alt="AutoGate" />
                                </span>
                            </AppLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(Footer);
