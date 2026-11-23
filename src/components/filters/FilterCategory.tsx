import { useLocalize } from '~/services/i18n/localize';
// react
import React from 'react';
// third-party
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
// application
import AppLink from '~/components/shared/AppLink';
import url from '~/services/url';
import { ArrowRoundedLeft6x9Svg } from '~/svg';
import { getCategoryParents } from '~/services/utils';
import { ICategoryFilter } from '~/interfaces/filter';

interface Props {
    options: ICategoryFilter;
}

function FilterCategory(props: Props) {
    const l10n = useLocalize();

    const { options } = props;

    return (
        <div className="filter-category">
            <ul className="filter-category__list">
                {l10n(options.value && (
                    <li className="filter-category__item filter-category__item--parent">
                        <span className="filter-category__arrow">
                            <ArrowRoundedLeft6x9Svg />
                        </span>
                        <AppLink href={url.products()}>
                            <FormattedMessage id="LINK_ALL_PRODUCTS" />
                        </AppLink>
                    </li>
                ))}
                {l10n(options.items.map((item) => (
                    <React.Fragment key={item.id}>
                        {l10n(getCategoryParents(item).map((parent) => (
                            <li key={parent.id} className="filter-category__item filter-category__item--parent">
                                <span className="filter-category__arrow">
                                    <ArrowRoundedLeft6x9Svg />
                                </span>
                                <AppLink href={url.category(parent)}>
                                    {l10n(parent.name)}
                                </AppLink>
                            </li>
                        )))}
                        <li
                            className={classNames('filter-category__item', {
                                'filter-category__item--current': options.value,
                            })}
                        >
                            <AppLink href={url.category(item)}>
                                {l10n(item.name)}
                            </AppLink>
                        </li>
                        {l10n(item.children?.map((child) => (
                            <li key={child.id} className="filter-category__item filter-category__item--child">
                                <AppLink href={url.category(child)}>{l10n(child.name)}</AppLink>
                            </li>
                        )))}
                    </React.Fragment>
                )))}
            </ul>
        </div>
    );
}

export default FilterCategory;
