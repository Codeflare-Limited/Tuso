
import React, { useContext } from 'react'

const TusoContainerContext = React.createContext<{
    container: HTMLDivElement | null;
    id: string | null;

}>({ container: null, id: null });


export const useTusoContainer = () => useContext(TusoContainerContext)
const IsMobileContext = React.createContext(false);

export const useIsMobile = () => useContext(IsMobileContext);