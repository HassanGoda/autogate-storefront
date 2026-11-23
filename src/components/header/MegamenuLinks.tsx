import PartMenuThumbnail from '~/components/header/PartMenuThumbnail';
import { useLocalize } from '~/services/i18n/localize';
// react
import React from 'react';
// third-party
import classNames from 'classnames';
// application
import AppLink from '~/components/shared/AppLink';
import { ILink, INestedLink } from '~/interfaces/link';

interface Props extends React.HTMLAttributes<HTMLElement> {
    links: INestedLink[];
    level?: number;
    onItemClick?: (item: ILink) => void;
}

function MegamenuLinks(props: Props) {
    const l10n = useLocalize();

    const {
        links,
        level = 0,
        onItemClick,
        className,
        ...rootProps
    } = props;

    const rootClasses = classNames('megamenu-links', className, {
        'megamenu-links--root': level === 0,
    });

    return (
        <ul className={rootClasses} {...rootProps}>
            {l10n(links.map((link, linkIndex) => {
                const subLinks = link.links || [];
                const hasSubLinks = subLinks.length > 0;
                const linkClasses = classNames('megamenu-links__item', {
                    'megamenu-links__item--has-submenu': link.links,
                });

                return (
                    <li className={linkClasses} key={linkIndex}>
                        <AppLink
                            className="megamenu-links__item-link"
                            href={link.url}
                            onClick={() => onItemClick && onItemClick(link)}
                            {...link.customFields?.anchorProps}
                        >
                            <PartMenuThumbnail title={link.title} />
                            {l10n(link.title)}
                        </AppLink>
                        {l10n(hasSubLinks && (
                            <MegamenuLinks links={subLinks} level={level + 1} />
                        ))}
                    </li>
                );
            }))}
        </ul>
    );
}

export default React.memo(MegamenuLinks);
