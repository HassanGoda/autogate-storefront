import { useLocalize } from '~/services/i18n/localize';
// react
import React, { FunctionComponent } from 'react';
// third-party
import { FormattedMessage, useIntl } from 'react-intl';
// application
// data

const FooterNewsletter: FunctionComponent<React.HTMLAttributes<HTMLElement>> = () => {
    const l10n = useLocalize();

    const intl = useIntl();

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const email = new FormData(event.currentTarget as HTMLFormElement).get('email');
        window.location.href = `mailto:info@autogate-sa.com?subject=AutoGate%20newsletter&body=${encodeURIComponent(String(email || ''))}`;
    };

    return (
        <div className="footer-newsletter">
            <h5 className="footer-newsletter__title">
                <FormattedMessage id="HEADER_NEWSLETTER" />
            </h5>
            <div className="footer-newsletter__text">
                <FormattedMessage id="TEXT_NEWSLETTER_MESSAGE" />
            </div>

            <form className="footer-newsletter__form" onSubmit={handleFormSubmit}>
                <label className="sr-only" htmlFor="footer-newsletter-address">
                    <FormattedMessage id="INPUT_EMAIL_ADDRESS_LABEL" />
                </label>
                <input
                    id="footer-newsletter-address"
                    type="email" name="email" required
                    className="footer-newsletter__form-input"
                    placeholder={l10n(intl.formatMessage({ id: 'INPUT_EMAIL_ADDRESS_PLACEHOLDER' }))}
                />
                <button
                    type="submit"
                    className="footer-newsletter__form-button"
                >
                    <FormattedMessage id="BUTTON_SUBSCRIBE" />
                </button>
            </form>

        </div>
    );
};

export default FooterNewsletter;
