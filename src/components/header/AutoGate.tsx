// react
import React from 'react';
// third-party
import { FormattedMessage } from 'react-intl';
// application
import AppLink from '~/components/shared/AppLink';
import url from '~/services/url';

interface Props extends React.HTMLAttributes<HTMLElement> {}

function AutoGate(props: Props) {
    return (
        <div {...props}>
            <AppLink href={url.home()} className="logo">
                <div className="logo__slogan">
                    <FormattedMessage id="TEXT_SLOGAN" />
                </div>
                <div className="logo__image">
                    <svg xmlns="http://www.w3.org/2000/svg" width="168" height="26" viewBox="0 0 168 26" role="img" aria-label="AUTOGATE" style={{ display: 'block', direction: 'ltr' }}>
                        <text x="0" y="21" fontFamily="Arial, Helvetica, sans-serif" fontSize="22" fontWeight="900" letterSpacing="0.5">
                            <tspan className="logo__part-primary">AUTO</tspan>
                            <tspan className="logo__part-secondary">GATE</tspan>
                        </text>
                    </svg>
                </div>
            </AppLink>
        </div>
    );
}

export { AutoGate };
export default AutoGate;
