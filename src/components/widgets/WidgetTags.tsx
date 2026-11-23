import { useLocalize } from '~/services/i18n/localize';
// react
import React from 'react';
// application
import AppLink from '~/components/shared/AppLink';

interface Props {
    widgetTitle?: React.ReactNode;
}

function WidgetTags(props: Props) {
    const l10n = useLocalize();

    const { widgetTitle } = props;

    return (
        <div className="card widget widget-tags">
            {l10n(widgetTitle && (
                <div className="widget__header">
                    <h4>{l10n(widgetTitle)}</h4>
                </div>
            ))}
            <div className="widget-tags__body tags">
                <div className="tags__list">
                    <AppLink href="/">{l10n("Promotion")}</AppLink>
                    <AppLink href="/">{l10n("Power Tool")}</AppLink>
                    <AppLink href="/">{l10n("New Arrivals")}</AppLink>
                    <AppLink href="/">{l10n("Screwdriver")}</AppLink>
                    <AppLink href="/">{l10n("Wrench")}</AppLink>
                    <AppLink href="/">{l10n("Mounts")}</AppLink>
                    <AppLink href="/">{l10n("Electrodes")}</AppLink>
                    <AppLink href="/">{l10n("Chainsaws")}</AppLink>
                    <AppLink href="/">{l10n("Manometers")}</AppLink>
                    <AppLink href="/">{l10n("Nails")}</AppLink>
                    <AppLink href="/">{l10n("Air Guns")}</AppLink>
                    <AppLink href="/">{l10n("Cutting Discs")}</AppLink>
                </div>
            </div>
        </div>
    );
}

export default WidgetTags;
