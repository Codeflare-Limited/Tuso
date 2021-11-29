
import { TusodrawProps, 
    TusodrawState, 
    AppProps
} from '../../src/@types/types';


import Library from '../data/library';
import { Language } from './Language';

import { 
    NonDeletedTusodrawElement, 

} from '../../src/@types/element';

import { ActionManager} from '../actions/manager';



export interface LayerUIProps  {
    actionManager: ActionManager;
    appState: TusodrawState;
    canvas: HTMLCanvasElement | null;
    setAppState: React.Component<any, TusodrawState>["setState"];
    elements: readonly NonDeletedTusodrawElement[];
    onCollabButtonClick?: () => void;
    onLockToggle: () => void;
    onInsertElements: (elements: readonly NonDeletedTusodrawElement[]) => void;
    zenModeEnabled: boolean;
    showExitZenModeBtn: boolean;
    showThemeBtn: boolean;
    toggleZenMode: () => void;
    // langCode: Language["code"];
    isCollaborating: boolean;
    renderTopRightUI?: (isMobile: boolean, appState: TusodrawState) => JSX.Element;
    renderCustomFooter?: (isMobile: boolean, appState: TusodrawState) => JSX.Element;
    viewModeEnabled: boolean;
    libraryReturnUrl: TusodrawProps["libraryReturnUrl"];
    UIOptions: AppProps["UIOptions"];
    focusContainer: () => void;
    library: Library;
    id: string;
    // pendingElements: readonly NonDeletedTusodrawElement[]
    
}