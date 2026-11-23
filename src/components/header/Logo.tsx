import AppImage from '~/components/shared/AppImage';
// react
import React from 'react';
// third-party
import { FormattedMessage } from 'react-intl';
// application
import AppLink from '~/components/shared/AppLink';
import url from '~/services/url';

interface Props extends React.HTMLAttributes<HTMLElement> {}

function Logo(props: Props) {
    return (
        <div {...props}>
            <AppLink href={url.home()} className="logo">
                <div className="logo__slogan">
                    <FormattedMessage id="TEXT_SLOGAN" />
                </div>
                <div className="logo__image">
                    {/* logo */}
                    <span className="autogate-brand"><AppImage src="/images/autogate/logo-icon.svg" alt="" /><span className="autogate-brand__names"><bdi lang="ar" dir="rtl">أوتوجيت</bdi><AppImage className="autogate-brand__wordmark" src="/images/autogate/logo-text.svg" alt="AutoGate" /></span></span>
                    {/* logo / end */}
                </div>
            </AppLink>
        </div>
    );
}

export default Logo;
