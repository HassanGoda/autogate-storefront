import { useLocalize } from '~/services/i18n/localize';
// react
import React, { PropsWithChildren } from 'react';
// third-party
import classNames from 'classnames';
import { ToastContainer } from 'react-toastify';
import { useDirection } from '~/services/i18n/hooks';
// application
import Footer from '~/components/footer/Footer';
import Header from '~/components/header/Header';
import MobileHeader from '~/components/mobile/MobileHeader';
import MobileMenu from '~/components/mobile/MobileMenu';
import Quickview from '~/components/shared/Quickview';
import { useOptions } from '~/store/options/optionsHooks';

interface Props extends PropsWithChildren<{}>{ }

function Layout(props: Props) {
    const l10n = useLocalize();
    const direction = useDirection();

    const { children } = props;
    const { desktopHeaderLayout, desktopHeaderScheme, mobileHeaderVariant } = useOptions();
    const desktopVariantClass = `${desktopHeaderLayout}-${desktopHeaderScheme}`;
    const mobileVariantClass = `mobile-${mobileHeaderVariant}`;

    const classes = classNames(
        'site',
        `site--desktop-header--${desktopVariantClass}`,
        `site--mobile-header--${mobileVariantClass}`,
    );

    return (
        <div className={classes}>
            <ToastContainer autoClose={5000} hideProgressBar rtl={direction === 'rtl'}
                closeButton={({ closeToast }) => (
                    <button className="Toastify__close-button" type="button" onClick={closeToast} aria-label={l10n('Close')}>×</button>
                )}
            />

            <div className="site__container">
                <header className="site__mobile-header">
                    <MobileHeader />
                </header>

                <header className="site__header">
                    <Header />
                </header>

                <div className="site__body">
                    {l10n(children)}
                </div>

                <footer className="site__footer">
                    <Footer />
                </footer>
            </div>

            <MobileMenu />

            <Quickview />
        </div>
    );
}

export default Layout;
