import { useLocalize } from '~/services/i18n/localize';
// react
import React from 'react';
// third-party
import classNames from 'classnames';
// application
import AppLink from '~/components/shared/AppLink';
import Arrow from '~/components/shared/Arrow';
import { ILink } from '~/interfaces/link';

export interface ISectionHeaderGroup {
    name: string;
}

interface Props<T extends ISectionHeaderGroup> {
    sectionTitle?: React.ReactNode;
    arrows?: boolean;
    groups?: T[];
    currentGroup?: T;
    links?: ILink[];
    onNext?: () => void;
    onPrev?: () => void;
    onChangeGroup?: (group: T) => void;
}

function SectionHeader<T extends ISectionHeaderGroup>(props: Props<T>) {
    const l10n = useLocalize();

    const {
        sectionTitle,
        arrows = false,
        groups = [],
        links = [],
        currentGroup,
        onNext,
        onPrev,
        onChangeGroup,
    } = props;

    return (
        <div className="section-header">
            <div className="section-header__body">
                {l10n(sectionTitle && (
                    <h2 className="section-header__title">{l10n(sectionTitle)}</h2>
                ))}

                <div className="section-header__spring" />

                {l10n(groups.length === 0 && links.length > 0 && (
                    <ul className="section-header__links">
                        {l10n(links.map((link, index) => (
                            <li key={index} className="section-header__links-item">
                                <AppLink href={link.url} className="section-header__links-link">
                                    {l10n(link.title)}
                                </AppLink>
                            </li>
                        )))}
                    </ul>
                ))}

                {l10n(groups.length > 0 && (
                    <ul className="section-header__groups">
                        {l10n(groups.map((group, index) => (
                            <li key={index} className="section-header__groups-item">
                                <button
                                    type="button"
                                    className={classNames('section-header__groups-button', {
                                        'section-header__groups-button--active': group === currentGroup,
                                    })}
                                    onClick={() => onChangeGroup && onChangeGroup(group)}
                                >
                                    {l10n(group.name)}
                                </button>
                            </li>
                        )))}
                    </ul>
                ))}

                {l10n(arrows && (
                    <div className="section-header__arrows">
                        <Arrow
                            className="section-header__arrow section-header__arrow--prev"
                            direction="prev"
                            onClick={onPrev}
                        />
                        <Arrow
                            className="section-header__arrow section-header__arrow--next"
                            direction="next"
                            onClick={onNext}
                        />
                    </div>
                ))}
                <div className="section-header__divider" />
            </div>
        </div>
    );
}

export default SectionHeader;
