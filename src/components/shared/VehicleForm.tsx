import VehicleModelOptions from '~/components/shared/VehicleModelOptions';
import { useLocalize } from '~/services/i18n/localize';
// react
import React, { useRef, useState } from 'react';
// third-party
import classNames from 'classnames';
import { FormattedMessage, useIntl } from 'react-intl';
// application
import useVehicleForm from '~/services/forms/vehicle';
import { IVehicle } from '~/interfaces/vehicle';
import { vehicleApi } from '~/api';

type Location = 'search' | 'account' | 'modal';

interface Props {
    location: Location;
    onVehicleChange?: (event: IVehicle | null) => void;
}

function VehicleForm(props: Props) {
    const l10n = useLocalize();

    const { location, onVehicleChange = () => {} } = props;
    const intl = useIntl();
    const internalValue = useRef<IVehicle | null>(null);

    const cancelVinRequest = useRef(() => {});
    const [vinIsLoading, setVinIsLoading] = useState(false);
    const [vinError, setVinError] = useState<unknown | null>(null);

    const [vehicleByFilters, setVehicleByFilters] = useState<IVehicle | null>(null);
    const [vehicleByVin, setVehicleByVin] = useState<IVehicle | null>(null);

    const updateValue = (args: { vehicleByVin?: IVehicle | null, vehicleByFilters?: IVehicle | null }) => {
        const value = { vehicleByVin, vehicleByFilters, ...args };
        const vehicle = value.vehicleByVin || value.vehicleByFilters;

        if (vehicle !== internalValue.current) {
            internalValue.current = vehicle;

            onVehicleChange(vehicle);
        }
    };

    const vehicleForm = useVehicleForm({
        onChange: (vehicle) => {
            setVehicleByFilters(vehicle);

            updateValue({ vehicleByFilters: vehicle });
        },
    });

    const handleVinChange = (event: React.FormEvent<HTMLInputElement>) => {
        let canceled = false;

        cancelVinRequest.current();
        cancelVinRequest.current = () => {
            canceled = true;
        };

        const value = event.currentTarget.value.trim();

        setVinIsLoading(value !== '');

        if (value === '') {
            setVehicleByVin(null);
            setVinError(null);

            updateValue({ vehicleByVin: null });
        }

        setTimeout(async () => {
            if (value === '' || canceled) {
                return;
            }

            try {
                const vehicle = await vehicleApi.getVehicleByVin(value);

                if (canceled) {
                    return;
                }

                setVehicleByVin(vehicle);
                setVinError(null);
                updateValue({ vehicleByVin: vehicle });
            } catch (error) {
                if (canceled) {
                    return;
                }

                setVehicleByVin(null);
                setVinError(error);
                updateValue({ vehicleByVin: null });
            }

            setVinIsLoading(false);
        }, 350);
    };

    const rootClasses = classNames('vehicle-form', `vehicle-form--layout--${location}`);

    return (
        <div className={rootClasses}>
            {l10n(vehicleForm.items.map((item, itemIdx) => {
                const options = item.options as Array<number | string | IVehicle>;

                return (
                    <div
                        key={itemIdx}
                        className={classNames('vehicle-form__item', 'vehicle-form__item--select', {
                            'vehicle-form__item--loading': item.loading,
                        })}
                    >
                        {(item.key === 'model' || item.key === 'brand') ? (
                                <VehicleModelOptions brands={item.key === 'brand'} make={vehicleForm.items[1].value} value={item.value}
                                    options={options.map((option) => vehicleForm.serializeOption(option, item))}
                                    placeholder={l10n(item.placeholder)} disabled={item.disabled}
                                    onChange={(value) => vehicleForm.onItemValueChange(itemIdx, value)} />
                            ) : (
                                <select
                            className="form-control"
                            aria-label={l10n(item.label)}
                            name={item.key}
                            value={item.value}
                            disabled={item.disabled}
                            onChange={(e) => vehicleForm.onItemValueChange(itemIdx, e.target.value)}
                        >
                            <option value="none">{l10n(item.placeholder)}</option>
                            {l10n(options.map((option, optionIdx) => (
                                <option key={optionIdx} value={vehicleForm.serializeOption(option, item)}>
                                    {l10n(vehicleForm.serializeOption(option, item))}
                                </option>
                            )))}
                        </select>
                            )}

                            <div className="vehicle-form__loader" />
                    </div>
                );
            }))}
            <div className="vehicle-form__divider">
                <FormattedMessage id="TEXT_OR" />
            </div>
            <div className={classNames('vehicle-form__item', { 'vehicle-form__item--loading': vinIsLoading })}>
                <div className="vehicle-form__item-input">
                    <input
                        type="text"
                        className="form-control"
                        name="vin"
                        aria-label={l10n(intl.formatMessage({ id: 'INPUT_VIN_LABEL' }))}
                        placeholder={l10n(intl.formatMessage({ id: 'INPUT_VIN_PLACEHOLDER' }))}
                        onInput={handleVinChange}
                    />
                            <div className="vehicle-form__loader" />
                </div>
                {l10n((vehicleByVin || vinError !== null) && (
                    <div className="vehicle-form__item-alert">
                        {l10n(vehicleByVin && (
                            <div className="alert alert-sm alert-primary my-0">
                                <FormattedMessage
                                    id="TEXT_ALERT_VEHICLE_FOUND"
                                    values={{ ...vehicleByVin }}
                                />
                            </div>
                        ))}
                        {l10n(vinError !== null && (
                            <div className="alert alert-sm alert-danger my-0">
                                <FormattedMessage id="TEXT_ALERT_UNABLE_TO_FIND_VEHICLE_BY_VIN" />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default VehicleForm;
