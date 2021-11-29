
import { NonDeletedTusodrawElement, TusodrawElement } from "../@types/element"


export class Scene {
    private nonDeletedElements: NonDeletedTusodrawElement[] = []
    private elements: readonly TusodrawElement[] = [];  

    getElements(): readonly NonDeletedTusodrawElement[] {
        return this.nonDeletedElements
    }

    getElementsIncludingDeleted() {
        return this.elements
    }
}



