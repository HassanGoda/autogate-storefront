import { useLocalize } from '~/services/i18n/localize';
// react
import React, { PropsWithChildren, useMemo, useState } from 'react';

type ContextData = readonly [boolean, (state: boolean) => void];

export const SidebarContext = React.createContext<ContextData>([false, () => {}]);

interface Props extends PropsWithChildren<{}> {}

export function SidebarProvider({ children }: Props) {
    const l10n = useLocalize();

    const [isOpen, setIsOpen] = useState(false);
    const value = useMemo(() => [isOpen, setIsOpen] as const, [isOpen, setIsOpen]);

    return (
        <SidebarContext.Provider value={value}>
            {l10n(children)}
        </SidebarContext.Provider>
    );
}
