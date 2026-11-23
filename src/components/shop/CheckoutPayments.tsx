import checkoutPayments from '~/data/checkoutPayments';
import { useLocalize } from '~/services/i18n/localize';
// react
import React from 'react';
// third-party
import { useFormContext } from 'react-hook-form';
import { useIntl } from 'react-intl';
// application
import Collapse from '~/components/shared/Collapse';
import RadioButton from '~/components/shared/RadioButton';

function CheckoutPayments() {
    const l10n = useLocalize();

    const intl = useIntl();
    const { register, watch } = useFormContext();
    const currentPayment = watch('payment');
    const ar = intl.locale === 'ar';
    const payments = checkoutPayments.map((method) => ({
        name: method.name,
        label: ar ? method.ar : method.en,
        description: method.name === 'cash'
            ? (ar ? 'محاكاة طلب بالدفع عند الاستلام.' : 'Simulated cash-on-delivery order.')
            : (ar ? 'تُسجّل الوسيلة في الطلب التجريبي دون خصم أي مبلغ.' : 'The method is recorded in the demo order. No money is charged.'),
    }));

    const { ref: paymentRadioRef, ...paymentRadioProps } = register('payment', { required: true });

    return (
        <div className="checkout__payment-methods payment-methods">
            <ul className="payment-methods__list">
                {l10n(payments.map((payment, paymentIndex) => (
                    <Collapse<HTMLLIElement, HTMLDivElement>
                        key={paymentIndex}
                        open={currentPayment === payment.name}
                        toggleClass="payment-methods__item--active"
                        render={({ setItemRef, setContentRef }) => (
                            <li className="payment-methods__item" ref={setItemRef}>
                                <label className="payment-methods__item-header">
                                    <RadioButton
                                        value={payment.name}
                                        className="payment-methods__item-radio"
                                        inputRef={paymentRadioRef}
                                        {...paymentRadioProps}
                                    />
                                    <span className="payment-methods__item-title">
                                        {l10n(payment.label)}
                                    </span>
                                </label>
                                <div className="payment-methods__item-container" ref={setContentRef}>
                                    <div className="payment-methods__item-details text-muted">
                                        {l10n(payment.description)}
                                    </div>
                                </div>
                            </li>
                        )}
                    />
                )))}
            </ul>
        </div>
    );
}

export default CheckoutPayments;
