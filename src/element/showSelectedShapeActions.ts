import { NonDeletedTusodrawElement } from "../@types/element";
import { TusodrawState } from "../@types/types";
import { getSelectedElements } from "../scene/selection";



export const showSelectedShapeActions = 
        (appState: TusodrawState, elements: readonly NonDeletedTusodrawElement[]) => Boolean(
            !appState.viewModeEnabled &&
              (appState.editingElement ||
                getSelectedElements(elements, appState).length ||
                appState.elementType !== "selection"),
);
