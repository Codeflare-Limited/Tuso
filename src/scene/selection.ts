import { NonDeletedTusodrawElement } from "../@types/element";
import { TusodrawState } from "../@types/types";



export const getSelectedElements = (elements: readonly NonDeletedTusodrawElement[], appState: TusodrawState) => 
               elements.filter((element) => appState.selectedElementIds[element.id])


