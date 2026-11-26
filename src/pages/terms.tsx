import { useLocalize } from '~/services/i18n/localize';
// react
import React from 'react';
// application
import BlockSpace from '~/components/blocks/BlockSpace';
import PageTitle from '~/components/shared/PageTitle';
import Terms from '~/components/shared/Terms';

function Page() {
    const l10n = useLocalize();

    return (
        <React.Fragment>
            <PageTitle>{l10n("Terms And Conditions")}</PageTitle>

            <BlockSpace layout="spaceship-ledge-height" />

            <div className="block">
                <div className="container">
                    <div className="document">
                        <div className="document__header">
                            <h1 className="document__title">{l10n("Terms And Conditions")}</h1>
                        </div>
                        <div className="document__content card">
                            <div className="typography">
                                <Terms />

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BlockSpace layout="before-footer" />
        </React.Fragment>
    );
}

export default Page;
