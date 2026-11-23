import { useLocalize } from '~/services/i18n/localize';
// react
import React from 'react';
// application
import AppImage from '~/components/shared/AppImage';
import BlockReviews from '~/components/blocks/BlockReviews';
import BlockSpace from '~/components/blocks/BlockSpace';
import BlockTeammates from '~/components/blocks/BlockTeammates';
import Decor from '~/components/shared/Decor';
import PageTitle from '~/components/shared/PageTitle';
import { baseUrl } from '~/services/utils';

function Page() {
    const l10n = useLocalize();

    return (
        <React.Fragment>
            <PageTitle>{l10n("About Us")}</PageTitle>

            <div className="about">
                <div className="about__body">
                    <div className="about__image">
                        <div
                            className="about__image-bg"
                            style={{
                                backgroundImage: `url(${baseUrl('/images/about.jpg')})`,
                            }}
                        />
                        <Decor className="about__image-decor" type="bottom" />
                    </div>

                    <div className="about__card">
                        <div className="about__card-title">{l10n("About Us")}</div>
                        <div className="about__card-text">{l10n("AutoGate brings together vehicle parts and search tools to help you find parts by name, number, or vehicle.")}</div>
                        <div className="about__card-author">{l10n("Ryan Ford, CEO AutoGate")}</div>
                        <div className="about__card-signature">
                            <AppImage src="/images/signature.jpg" width="160" height="55" />
                        </div>
                    </div>

                    <div className="about__indicators">
                        <div className="about__indicators-body">
                            <div className="about__indicators-item">
                                <div className="about__indicators-item-value">350</div>
                                <div className="about__indicators-item-title">{l10n("Stores around the world")}</div>
                            </div>
                            <div className="about__indicators-item">
                                <div className="about__indicators-item-value">80 000</div>
                                <div className="about__indicators-item-title">{l10n("Original auto parts")}</div>
                            </div>
                            <div className="about__indicators-item">
                                <div className="about__indicators-item-value">5 000</div>
                                <div className="about__indicators-item-title">{l10n("Satisfied customers")}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BlockSpace layout="divider-xl" />

            <BlockTeammates />

            <BlockSpace layout="divider-xl" />

            <BlockReviews />

            <BlockSpace layout="before-footer" />
        </React.Fragment>
    );
}

export default Page;
