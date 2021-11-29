import React from 'react'; 
import { ActionName, PanelComponentProps,} from '../@types/action';
import { TusodrawState } from '../@types/types';
import { TusodrawElement } from '../@types/element';
import { ActionFn} from '../@types/action';



export interface Action {
    name: ActionName; 
    PanelComponent?: React.FC<PanelComponentProps>; 
    perform: ActionFn; 
    keyPriority?: number; 
    keyTest?: ( 
        event: React.KeyboardEvent | KeyboardEvent,
        appState: TusodrawState,
        elements: readonly TusodrawElement[]
    ) => boolean; 
    contextItemLabel?: string;
    contextItemPredicate?: (
      elements: readonly TusodrawElement[],
      appState: TusodrawState,
    ) => boolean;
    checked?: (appState: Readonly<TusodrawState>) => boolean;
}





export interface ActionManagerInterface {
    actions: Record<ActionName, Action>; 
    registerAction: (action: Action) => void; 
    // handleKeyDown: (event: React.KeyboardEvent | KeyboardEvent) => boolean; 
    renderAction: (name: ActionName) => React.ReactElement | null; 
    // executeAction: (action: Action) => void; 
}