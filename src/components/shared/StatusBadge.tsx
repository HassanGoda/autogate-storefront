import { useLocalize } from '~/services/i18n/localize';
// react
import React, { useRef } from 'react';
// third-party
import { UncontrolledTooltip } from 'reactstrap';
import classNames from 'classnames';
// application
import { FitSvg, NoFitSvg } from '~/svg';

export type IStatusBadgeType = 'success' | 'failure' | 'warning' | 'unknown';

export type IStatusBadgeIcon = 'success' | 'failure';

interface Props extends React.HTMLAttributes<HTMLElement> {
    type: IStatusBadgeType;
    icon?: IStatusBadgeIcon;
    text?: React.ReactNode;
    tooltip?: string;
}

function StatusBadge(props: Props) {
    const l10n = useLocalize();

    const {
        type,
        icon,
        text,
        tooltip,
        className,
    } = props;
    const tooltipRef = useRef<HTMLDivElement>(null);

    const rootClasses = classNames('status-badge', `status-badge--style--${type}`, {
        'status-badge--has-text': text !== undefined,
        'status-badge--has-icon': icon !== undefined,
    }, className);

    return (
        <div className={rootClasses}>
            <div className="status-badge__body">
                {l10n(icon !== undefined && (
                    <div className="status-badge__icon">
                        {l10n({
                            success: <FitSvg />,
                            failure: <NoFitSvg />,
                        }[icon])}
                    </div>
                ))}
                {l10n(text !== undefined && <div className="status-badge__text">{l10n(text)}</div>)}
                {l10n(tooltip !== undefined && (
                    <React.Fragment>
                        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
                        <div className="status-badge__tooltip" tabIndex={0} ref={tooltipRef} />

                        <UncontrolledTooltip target={tooltipRef} fade={false} delay={{ show: 0, hide: 0 }}>
                            {l10n(tooltip)}
                        </UncontrolledTooltip>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default StatusBadge;
