import { useLocalize } from '~/services/i18n/localize';
// react
import React, { PropsWithChildren, useContext } from 'react';
// application
import { ArrowRoundedLeft7x11Svg } from '~/svg';
import { MobileMenuLevelContext } from '~/services/mobile-menu';

interface Props extends PropsWithChildren<{}> {
    label: React.ReactNode;
    onCloseCurrentPanel?: () => void;
}

function MobileMenuPanel(props: Props) {
    const l10n = useLocalize();

    const {
        label,
        onCloseCurrentPanel,
        children,
    } = props;
    const level = useContext(MobileMenuLevelContext);

    return (
        <div
            className="mobile-menu__panel"
            style={{
                transform: `translateX(${level * 100}%)`,
            }}
        >
            <div className="mobile-menu__panel-header">
                {l10n(level > 0 && (
                    <button className="mobile-menu__panel-back" type="button" onClick={onCloseCurrentPanel}>
                        <ArrowRoundedLeft7x11Svg />
                    </button>
                ))}
                <div className="mobile-menu__panel-title">{l10n(label)}</div>
            </div>
            <div className="mobile-menu__panel-body">
                <MobileMenuLevelContext.Provider value={level + 1}>
                    {l10n(children)}
                </MobileMenuLevelContext.Provider>
            </div>
        </div>
    );
}

export default MobileMenuPanel;
