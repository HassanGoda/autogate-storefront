import { useLocalize } from '~/services/i18n/localize';
// react
import React, { useMemo } from 'react';
// third-party
import classNames from 'classnames';
import { UncontrolledTooltip } from 'reactstrap';
import { useFormContext } from 'react-hook-form';
// application
import { colorType } from '~/services/color';
import { IProductOption } from '~/interfaces/product';

interface Props extends React.HTMLAttributes<HTMLElement> {
    options: IProductOption[];
    namespace?: string;
}

function ProductForm(props: Props) {
    const l10n = useLocalize();

    const {
        options,
        namespace,
        className,
        ...rootProps
    } = props;
    const { register } = useFormContext();
    const ns = useMemo(() => (namespace ? `${namespace}.` : ''), [namespace]);

    const optionsTemplate = options.map((option, optionIdx) => (
        <div key={optionIdx} className="product-form__row">
            <div className="product-form__title">{l10n(option.name)}</div>
            <div className="product-form__control">
                {l10n(option.type === 'default' && (
                    <div className="input-radio-label">
                        <div className="input-radio-label__list">
                            {l10n(option.values.map((value, valueIdx) => (
                                <label key={valueIdx} className="input-radio-label__item">
                                    <input
                                        type="radio"
                                        className="input-radio-label__input"
                                        value={value.slug}
                                        {...register(`${ns}${option.slug}`, { required: true })}
                                    />

                                    <span className="input-radio-label__title">{l10n(value.name)}</span>
                                </label>
                            )))}
                        </div>
                    </div>
                ))}
                {l10n(option.type === 'color' && (
                    <div className="input-radio-color">
                        <div className="input-radio-color__list">
                            {l10n(option.values.map((value, valueIdx) => (
                                <React.Fragment key={valueIdx}>
                                    <label
                                        className={classNames('input-radio-color__item', {
                                            'input-radio-color__item--white': colorType(value.color) === 'white',
                                        })}
                                        id={`product-option-${optionIdx}-${valueIdx}`}
                                        style={{ color: value.color }}
                                        title={l10n(value.name)}
                                    >
                                        <input
                                            type="radio"
                                            value={value.slug}
                                            {...register(`${ns}${option.slug}`, { required: true })}
                                        />
                                        <span />
                                    </label>

                                    <UncontrolledTooltip
                                        target={`product-option-${optionIdx}-${valueIdx}`}
                                        fade={false}
                                        delay={{ show: 0, hide: 0 }}
                                    >
                                        {l10n(value.name)}
                                    </UncontrolledTooltip>
                                </React.Fragment>
                            )))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    ));

    const rootClasses = classNames('product-form', className);

    return (
        <div className={rootClasses} {...rootProps}>
            <div className="product-form__body">
                {l10n(optionsTemplate)}
            </div>
        </div>
    );
}

export default ProductForm;
