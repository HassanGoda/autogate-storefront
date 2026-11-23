import { useLocalize } from '~/services/i18n/localize';
// react
import React from 'react';
// application
import RadioButton from '~/components/shared/RadioButton';
import { IRadioFilter, IRadioFilterValue } from '~/interfaces/filter';

interface Props {
    options: IRadioFilter;
    value: IRadioFilterValue;
    onChangeValue?: (event: { filter: IRadioFilter, value: IRadioFilterValue }) => void;
}

function FilterRadio(props: Props) {
    const l10n = useLocalize();

    const { options, value, onChangeValue } = props;

    const updateValue = (newValue: IRadioFilterValue) => {
        if (onChangeValue) {
            onChangeValue({ filter: options, value: newValue });
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked && event.target.value !== value) {
            updateValue(event.target.value);
        }
    };

    return (
        <div className="filter-list">
            <div className="filter-list__list">
                {l10n(options.items.map((item) => (
                    <label key={item.slug} className="filter-list__item">
                        <RadioButton
                            className="filter-list__input"
                            name={options.slug}
                            value={item.slug}
                            checked={value === item.slug}
                            disabled={item.count === 0}
                            onChange={handleChange}
                        />

                        <span className="filter-list__title">{l10n(item.name)}</span>
                        {l10n(item.count !== 0 && (
                            <span className="filter-list__counter">{l10n(item.count)}</span>
                        ))}
                    </label>
                )))}
            </div>
        </div>
    );
}

export default FilterRadio;
