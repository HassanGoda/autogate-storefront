import VehicleModelOptions from '~/components/shared/VehicleModelOptions';
import { useLocalize } from '~/services/i18n/localize';
// react
import React from 'react';
// third-party
import classNames from 'classnames';
// application
import useVehicleForm from '~/services/forms/vehicle';
import { IVehicle } from '~/interfaces/vehicle';

interface Props extends React.HTMLAttributes<HTMLElement> {
    onVehicleChange?: (event: IVehicle | null) => void;
}

function VehicleSelect(props: Props) {
    const l10n = useLocalize();

    const { onVehicleChange, className, ...rootProps } = props;
    const rootClasses = classNames('vehicle-select', className);
    const form = useVehicleForm({
        onChange: onVehicleChange,
    });

    return (
        <div className={rootClasses} {...rootProps}>
            <div className="vehicle-select__list">
                {l10n(form.items.map((item, itemIdx) => {
                    const options = item.options as Array<number | string | IVehicle>;

                    return (
                        <div
                            key={itemIdx}
                            className={classNames('vehicle-select__item', {
                                'vehicle-select__item--loading': item.loading,
                            })}
                        >
                            {(item.key === 'model' || item.key === 'brand') ? (
                                <VehicleModelOptions brands={item.key === 'brand'} make={form.items[1].value} value={item.value}
                                    options={options.map((option) => form.serializeOption(option, item))}
                                    placeholder={l10n(item.placeholder)} disabled={item.disabled}
                                    onChange={(value) => form.onItemValueChange(itemIdx, value)} />
                            ) : (
                                <select
                                className="vehicle-select__item-control"
                                aria-label={l10n(item.label)}
                                name={item.key}
                                value={item.value}
                                disabled={item.disabled}
                                onChange={(e) => form.onItemValueChange(itemIdx, e.target.value)}
                            >
                                <option value="none">{l10n(item.placeholder)}</option>
                                {l10n(options.map((option, optionIdx) => (
                                    <option key={optionIdx} value={form.serializeOption(option, item)}>
                                        {l10n(form.serializeOption(option, item))}
                                    </option>
                                )))}
                            </select>
                            )}

                            <div className="vehicle-select__item-loader" />
                        </div>
                    );
                }))}
            </div>
        </div>
    );
}

export default VehicleSelect;
