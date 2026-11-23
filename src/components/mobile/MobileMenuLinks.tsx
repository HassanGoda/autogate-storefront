import PartMenuThumbnail from '~/components/header/PartMenuThumbnail';
import { useLocalize } from '~/services/i18n/localize';
// react
import React from 'react';
// third-party
import classNames from 'classnames';
// application
import AppImage from '~/components/shared/AppImage';
import AppLink from '~/components/shared/AppLink';
import MobileMenuPanelController from '~/components/mobile/MobileMenuPanelController';
import { ArrowRoundedRight7x11Svg } from '~/svg';
import { IMobileMenuLink } from '~/interfaces/mobile-menu-link';

interface Props {
    items?: IMobileMenuLink[];
    onItemClick?: (item: IMobileMenuLink) => void;
}

function MobileMenuLinks(props: Props) {
    const l10n = useLocalize();

    const { items = [], onItemClick } = props;

    const onInnerItemClick = (event: React.MouseEvent, item: IMobileMenuLink) => {
        const hasSubmenu = item.submenu && item.submenu.length > 0;

        if (hasSubmenu) {
            event.preventDefault();
        }

        if (onItemClick) {
            onItemClick(item);
        }
    };

    return (
        <div className="mobile-menu__links">
            <ul>
                {l10n(items.map((item, itemIdx) => {
                    const hasSubmenu = item.submenu && item.submenu.length > 0;
                    const highlighted = item.customFields?.highlight === true;

                    const content = (
                        <React.Fragment>
                            {l10n(item.image !== undefined && (
                                <div className="mobile-menu__links-image">
                                    <AppImage src={item.image} />
                                </div>
                            ))}
                            <PartMenuThumbnail title={item.title} />
                            {l10n(item.title)}
                            {l10n(hasSubmenu && <ArrowRoundedRight7x11Svg />)}
                        </React.Fragment>
                    );

                    const renderLink = (onItemClickInner: (event: React.MouseEvent, item: IMobileMenuLink) => void) => (
                        <React.Fragment>
                            {l10n(item.url !== undefined && (
                                <AppLink
                                    href={item.url}
                                    anchor={hasSubmenu}
                                    className={classNames({ highlight: highlighted })}
                                    onClick={(event) => onItemClickInner(event, item)}
                                    {...item.customFields?.anchorProps}
                                >
                                    {l10n(content)}
                                </AppLink>
                            ))}

                            {l10n(item.url === undefined && (
                                <button
                                    type="button"
                                    className={classNames({ highlight: highlighted })}
                                    onClick={(event) => onItemClickInner(event, item)}
                                >
                                    {l10n(content)}
                                </button>
                            ))}
                        </React.Fragment>
                    );

                    return (
                        <li key={itemIdx}>
                            {l10n(hasSubmenu && (
                                <MobileMenuPanelController
                                    label={item.title}
                                    content={<MobileMenuLinks items={item.submenu} onItemClick={onItemClick} />}
                                >
                                    {(open) => renderLink(
                                        (event, item) => {
                                            open();
                                            onInnerItemClick(event, item);
                                        },
                                    )}
                                </MobileMenuPanelController>
                            ))}

                            {l10n(!hasSubmenu && renderLink(onInnerItemClick))}
                        </li>
                    );
                }))}
            </ul>
        </div>
    );
}

export default MobileMenuLinks;
