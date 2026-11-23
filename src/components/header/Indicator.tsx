import { useLocalize } from '~/services/i18n/localize';
// react
import React, {
    PropsWithChildren,
    useMemo,
    useRef,
    useState,
} from 'react';
// third-party
import classNames from 'classnames';
// application
import AppLink, { IAppLinkHref } from '~/components/shared/AppLink';
import { useGlobalMousedown } from '~/services/hooks';

type Trigger = 'none' | 'click' | 'hover';

export interface IIndicatorController {
    close: () => void;
}

interface Props extends PropsWithChildren<{}> {
    icon: React.ReactNode;
    href?: IAppLinkHref;
    label?: React.ReactNode;
    value?: React.ReactNode;
    counter?: number;
    trigger?: Trigger;
    controllerRef?: React.MutableRefObject<IIndicatorController | null>;
}

function Indicator(props: Props) {
    const l10n = useLocalize();

    const {
        icon,
        href,
        label,
        value,
        counter,
        trigger = 'none',
        children,
        controllerRef,
    } = props;
    const hasLabel = label !== undefined && label !== null;
    const hasValue = value !== undefined && value !== null;
    const buttonType = href !== undefined ? 'link' : 'button';
    const showCounter = counter !== undefined && counter !== null;
    const [isOpen, setIsOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);

    const controller = useMemo<IIndicatorController>(() => ({
        close: () => setIsOpen(false),
    }), [setIsOpen]);

    if (controllerRef) {
        controllerRef.current = controller;
    }

    useGlobalMousedown((event) => {
        if (rootRef.current && !rootRef.current.contains(event.target as HTMLElement)) {
            setIsOpen(false);
        }
    }, [setIsOpen, rootRef]);

    const handleButtonClick = (event: React.MouseEvent) => {
        if (trigger === 'click') {
            event.preventDefault();

            setIsOpen((prevState) => !prevState);
        }
    };

    const buttonContent = (
        <React.Fragment>
            <span className="indicator__icon">
                {l10n(icon)}
                {l10n(showCounter && <span className="indicator__counter">{l10n(counter)}</span>)}
            </span>

            {l10n(hasLabel && <span className="indicator__title">{l10n(label)}</span>)}
            {l10n(hasValue && <span className="indicator__value">{l10n(value)}</span>)}
        </React.Fragment>
    );

    const rootClasses = classNames('indicator', `indicator--trigger--${trigger}`, {
        'indicator--open': isOpen,
    });

    return (
        <div className={rootClasses} ref={rootRef}>
            {l10n(buttonType === 'button' && (
                <button className="indicator__button" type="button" onClick={handleButtonClick}>
                    {l10n(buttonContent)}
                </button>
            ))}
            {l10n(buttonType === 'link' && (
                <AppLink href={href} className="indicator__button" onClick={handleButtonClick}>
                    {l10n(buttonContent)}
                </AppLink>
            ))}
            <div className="indicator__content">
                {l10n(children)}
            </div>
        </div>
    );
}

export default Indicator;
