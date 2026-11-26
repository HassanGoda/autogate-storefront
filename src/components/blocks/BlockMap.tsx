import { useLocalize } from '~/services/i18n/localize';
// react
import React from 'react';

function BlockMap({ query = "AutoGate Cars Saudi Arabia" }: { query?: string }) {
    const l10n = useLocalize();

    return (
        <div className="block block-map">
            <div className="block-map__body">
                <iframe
                    title={l10n("Google Map")}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
                    frameBorder="0"
                    scrolling="no"
                    marginHeight={0}
                    marginWidth={0}
                />
            </div>
        </div>
    );
}

export default BlockMap;
