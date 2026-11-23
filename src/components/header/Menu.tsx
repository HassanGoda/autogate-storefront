import PartMenuThumbnail from '~/components/header/PartMenuThumbnail';
import { useLocalize } from '~/services/i18n/localize';
// react
import React from 'react';
// third-party
import classNames from 'classnames';
// application
import AppLink from '~/components/shared/AppLink';
import { ArrowRoundedRight6x9Svg } from '~/svg';
import { INestedLink } from '~/interfaces/link';

interface Props {
    items: INestedLink[];
    onItemClick?: () => void;
}

function Menu(props: Props) {
    const l10n = useLocalize();

    const { items, onItemClick } = props;

    return (
        <div className="menu">
            <ul className="menu__list">
                {l10n(items.map((item, index) => {
                    const submenu = item.links || [];
                    const hasSubmenu = submenu.length > 0;
                    const itemClasses = classNames('menu__item', {
                        'menu__item--has-submenu': hasSubmenu,
                    });

                    return (
                        <li className={itemClasses} key={index}>
                            <AppLink
                                className="menu__link"
                                href={item.url}
                                onClick={onItemClick}
                                {...item.customFields?.anchorProps}
                            >
                                <PartMenuThumbnail title={item.title} />
                            {l10n(item.title)}
                                {l10n(hasSubmenu && (
                                    <span className="menu__arrow">
                                        <ArrowRoundedRight6x9Svg />
                                    </span>
                                ))}
                            </AppLink>
                            {l10n(hasSubmenu && (
                                <div className="menu__submenu">
                                    <Menu items={submenu} onItemClick={onItemClick} />
                                </div>
                            ))}
                        </li>
                    );
                }))}
            </ul>
        </div>
    );
}

export default Menu;
