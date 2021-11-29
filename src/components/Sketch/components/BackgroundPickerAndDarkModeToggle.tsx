
import React from 'react'; 
import { TusodrawState} from '../../../@types/types';
import { ActionManager } from '../../../actions/manager';


export const BackgroundPickerAndDarkModeToggle = ({
    appState,
    setAppState,
    actionManager,
    showThemeBtn
}: {
    appState: TusodrawState; 
    actionManager: ActionManager;
    setAppState: React.Component<any, TusodrawState>["setState"]
    showThemeBtn: boolean
}) => (
    <div style={{ display: "flex" }}>
        {actionManager.renderAction('changeViewBackgroundColor')}
        {showThemeBtn && actionManager.renderAction("toggleTheme")}
    </div>
)