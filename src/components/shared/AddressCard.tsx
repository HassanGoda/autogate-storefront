import { useLocalize } from '~/services/i18n/localize';
// react
import React from 'react';
// third-party
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
// application
import { IAddressData } from '~/interfaces/address';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    address: IAddressData;
    label?: React.ReactNode;
    featured?: boolean;
    loading?: boolean;
    footer?: React.ReactNode;
}

function AddressCard(props: Props) {
    const l10n = useLocalize();

    const {
        address,
        label,
        featured = false,
        loading = false,
        className,
        footer,
        ...rootProps
    } = props;

    const rootClasses = classNames('card', 'address-card', className, {
        'card--loading': loading,
        'address-card--featured': featured,
    });

    return (
        <div className={rootClasses} {...rootProps}>
            <div className="card__loader" />
            {l10n(label && (
                <div className="address-card__badge tag-badge tag-badge--theme">{l10n(label)}</div>
            ))}

            <div className="address-card__body">
                <div className="address-card__name">
                    {l10n(`${address.firstName} ${address.lastName}`)}
                </div>
                <div className="address-card__row">
                    <FormattedMessage id={`COUNTRY_NAME_${address.country}`} />
                    <br />
                    {l10n(`${address.postcode}, ${l10n(address.city)}`)}
                    <br />
                    {l10n(`${l10n(address.address1)} ${l10n(address.address2)}`)}
                </div>
                <div className="address-card__row">
                    <div className="address-card__row-title">
                        <FormattedMessage id="TEXT_PHONE_NUMBER" />
                    </div>
                    <div className="address-card__row-content">{l10n(address.phone)}</div>
                </div>
                <div className="address-card__row">
                    <div className="address-card__row-title">
                        <FormattedMessage id="TEXT_EMAIL_ADDRESS" />
                    </div>
                    <div className="address-card__row-content">{l10n(address.email)}</div>
                </div>

                {l10n(footer && (
                    <div className="address-card__footer">
                        {l10n(footer)}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AddressCard;
