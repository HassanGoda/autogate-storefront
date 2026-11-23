import { useLocalize } from '~/services/i18n/localize';
// react
import React from 'react';
// third-party
import classNames from 'classnames';
// application
import AppImage from '~/components/shared/AppImage';
import MegamenuLinks from '~/components/header/MegamenuLinks';
import { ILink } from '~/interfaces/link';
import { IMegamenu } from '~/interfaces/menu';

interface Props extends React.HTMLAttributes<HTMLElement> {
    menu: IMegamenu;
    onItemClick?: (item: ILink) => void;
}

function Megamenu(props: Props) {
    const l10n = useLocalize();

    const {
        menu,
        onItemClick,
        className,
        ...rootProps
    } = props;
    const hasImage = !!menu.image;

    const rootClasses = classNames('megamenu', className);

    return (
        <div className={rootClasses} {...rootProps}>
            {l10n(hasImage && (
                <div className="megamenu__image">
                    <AppImage className="reflect-rtl" src={menu.image} alt="" />
                </div>
            ))}
            <div className="row">
                {l10n(menu.columns.map((column, columnIndex) => {
                    const columnClasses = classNames(`col-${column.size}`);
                    const hasLinks = column.links?.length > 0;

                    return (
                        <div className={columnClasses} key={columnIndex}>
                            {l10n(hasLinks && (
                                <MegamenuLinks
                                    className="megamenu__links"
                                    links={column.links}
                                    onItemClick={onItemClick}
                                />
                            ))}
                        </div>
                    );
                }))}
            </div>
        </div>
    );
}

export default Megamenu;
