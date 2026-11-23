import AppImage from '~/components/shared/AppImage';
// react
import React from 'react';

function MobileLogo() {
    return (
        <div className="mobile-logo">
            {/* mobile-logo */}
            <span className="autogate-brand"><AppImage src="/images/autogate/logo-icon.svg" alt="" /><span className="autogate-brand__names"><bdi lang="ar" dir="rtl">أوتوجيت</bdi><AppImage className="autogate-brand__wordmark" src="/images/autogate/logo-text.svg" alt="AutoGate" /></span></span>
            {/* mobile-logo / end */}
        </div>
    );
}

export default MobileLogo;
