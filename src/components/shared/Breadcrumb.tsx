import { useLocalize } from '~/services/i18n/localize';
// react
import React from 'react';
// third-party
import classNames from 'classnames';
// application
import AppLink from '~/components/shared/AppLink';
import { ILink } from '~/interfaces/link';

interface Props extends React.HTMLAttributes<HTMLElement> {
    items: ILink[];
    withPageTitle?: boolean;
    afterHeader?: boolean;
}

function Breadcrumb(props: Props) {
    const l10n = useLocalize();

    const {
        className,
        items,
        withPageTitle = false,
        afterHeader = true,
    } = props;

    const rootClasses = classNames('breadcrumb', className);

    return (
        <div className={rootClasses} aria-label={l10n("breadcrumb")}>
            <ol className="breadcrumb__list">
                {l10n(afterHeader && <li className="breadcrumb__spaceship-safe-area" role="presentation" />)}

                {l10n(items.map((item, index) => {
                    const isFirst = index === 0;
                    const isLast = index === items.length - 1;

                    const itemClasses = classNames('breadcrumb__item', {
                        'breadcrumb__item--first': isFirst,
                        'breadcrumb__item--last': isLast,
                        'breadcrumb__item--parent': !isLast,
                        'breadcrumb__item--current': isLast,
                    });

                    return (
                        <li key={index} className={itemClasses} aria-current={isLast ? 'page' : undefined}>
                            {l10n(isLast && <span className="breadcrumb__item-link">{l10n(item.title)}</span>)}
                            {l10n(!isLast && (
                                <AppLink href={item.url} className="breadcrumb__item-link">
                                    {l10n(item.title)}
                                </AppLink>
                            ))}
                        </li>
                    );
                }))}

                {l10n(withPageTitle && <li className="breadcrumb__title-safe-area" role="presentation" />)}
            </ol>
        </div>
    );
}

export default Breadcrumb;
