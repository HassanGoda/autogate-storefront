import { useLocalize } from '~/services/i18n/localize';
// react
import React from 'react';
// third-party
import classNames from 'classnames';
// application
import { ArrowRoundedLeft7x11Svg, ArrowRoundedRight7x11Svg } from '~/svg';

type Direction = 'next' | 'prev';

interface Props extends React.HTMLAttributes<HTMLElement> {
    direction: Direction;
}

function Arrow(props: Props) {
    const l10n = useLocalize();

    const { direction, className, ...rootProps } = props;
    const rootClasses = classNames('arrow', `arrow--direction--${direction}`, className);

    return (
        <div className={rootClasses} {...rootProps}>
            <button className="arrow__button" type="button">
                {l10n(direction === 'prev' && (
                    <ArrowRoundedLeft7x11Svg />
                ))}
                {l10n(direction === 'next' && (
                    <ArrowRoundedRight7x11Svg />
                ))}
            </button>
        </div>
    );
}

export default Arrow;
