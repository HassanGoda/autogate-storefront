import { useLocalize } from '~/services/i18n/localize';
// react
import React from 'react';

function BlockMap() {
    const l10n = useLocalize();

    return (
        <div className="block block-map">
            <div className="block-map__body">
                <iframe
                    title={l10n("Google Map")}
                    src="https://maps.google.com/maps?q=Holbrook-Palmer%20Park&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
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
