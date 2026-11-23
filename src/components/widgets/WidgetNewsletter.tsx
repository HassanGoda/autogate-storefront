import { useLocalize } from '~/services/i18n/localize';
// react
import React from 'react';

function WidgetNewsletter() {
    const l10n = useLocalize();

    return (
        <div className="widget widget-newsletter">
            <div className="widget-newsletter__title">
                <h4>{l10n("Newsletter")}</h4>
            </div>
            <div className="widget-newsletter__form">
                <form action="">
                    <div className="widget-newsletter__text">{l10n("Enter your email address below to subscribe to our newsletter and keep up to date with the latest news, discounts and special offers.")}</div>
                    <input type="text" className="widget-newsletter__email" placeholder={l10n("Email Address...")} />
                    <button type="button" className="widget-newsletter__button">{l10n("Subscribe")}</button>
                </form>
            </div>
        </div>
    );
}

export default WidgetNewsletter;
