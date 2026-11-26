import { useLocalize } from '~/services/i18n/localize';
// react
import React, { FunctionComponent } from 'react';
// third-party
import { FormattedMessage } from 'react-intl';
// data
import theme from '~/data/theme';

const FooterContacts: FunctionComponent<React.HTMLAttributes<HTMLElement>> = () => {
 const l10n = useLocalize();
 return (
    <div className="footer-contacts">
        <h5 className="footer-contacts__title">
            <FormattedMessage id="HEADER_CONTACT_US" />
        </h5>

        <div className="footer-contacts__text">
            <FormattedMessage id="TEXT_CONTACT_US_MESSAGE" />
        </div>

        <address className="footer-contacts__contacts">
            <dl>
                <dt>
                    <FormattedMessage id="TEXT_PHONE_NUMBER" />
                </dt>
                {theme.contacts.phone.map((item, index) => (
                    <dd key={index}><a href={`tel:${item}`}>{item}</a></dd>
                ))}
                <dd><a href="https://wa.me/920028300" target="_blank" rel="noopener noreferrer">{l10n('WhatsApp')}</a></dd>
            </dl>
            <dl>
                <dt>
                    <FormattedMessage id="TEXT_EMAIL_ADDRESS" />
                </dt>
                {theme.contacts.email.map((item, index) => (
                    <dd key={index}><a href={`mailto:${item}`}>{item}</a></dd>
                ))}
            </dl>
            <dl>
                <dt>
                    <FormattedMessage id="TEXT_OUR_LOCATION" />
                </dt>
                {theme.contacts.address.map((item, index) => (
                    <dd key={index}>{l10n(item)}</dd>
                ))}
            </dl>
            <dl>
                <dt>
                    <FormattedMessage id="TEXT_WORKING_HOURS" />
                </dt>
                {theme.contacts.hours.map((item, index) => (
                    <dd key={index}>{l10n(item)}</dd>
                ))}
            </dl>
        </address>
    </div>
);
};

export default FooterContacts;
