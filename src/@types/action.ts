
import { TusodrawState, AppProps } from "./types";
import { TusodrawElement } from "./element";
import { ToolButtonSize } from "./toolButton";
import Library from "../data/library";




export type PanelComponentProps = {
    elements: readonly TusodrawElement[]; 
    appState: TusodrawState; 
    updateData: (formData?: any) => void; 
    appProps: AppProps; 
    data?: Partial<{ id: string; size: ToolButtonSize }>
}


export type AppApi = {
    canvas: HTMLCanvasElement |null; 
    focusContainer(): void; 
    library: Library
}


export type ActionResult = 
    | {
        elements?: readonly TusodrawElement[] | null; 
        appState?: Pick<TusodrawState, "offsetTop" | "offsetLeft" | "width" | "height"> | null; //MarkOptional
        commitToHistory: boolean;
        syncHistory?: boolean;
    }

    | false



export type ActionFn = (
    elements: readonly TusodrawElement[], 
    appState: Readonly<TusodrawState>, 
    formData: any, 
    app: AppApi

) => ActionResult | Promise<ActionResult>

export type UpdaterFn = (res: ActionResult) => void;


export type ActionName = 
    | "copy"
    | "cut"
    | "paste"
    | "copyAsPng"
    | "copyAsSvg"
    | "sendBackward"
    | "bringForward"
    | "sendToBack"
    | "bringToFront"
    | "copyStyles"
    | "selectAll"
    | "pasteStyles"
    | "gridMode"
    | "zenMode"
    | "stats"
    | "changeStrokeColor"
    | "changeBackgroundColor"
    | "changeFillStyle"
    | "changeStrokeWidth"
    | "changeStrokeShape"
    | "changeSloppiness"
    | "changeStrokeStyle"
    | "changeArrowhead"
    | "changeOpacity"
    | "changeFontSize"
    | "toggleCanvasMenu"
    | "toggleEditMenu"
    | "undo"
    | "redo"
    | "finalize"
    | "changeProjectName"
    | "changeExportBackground"
    | "changeExportEmbedScene"
    | "changeExportScale"
    | "saveToActiveFile"
    | "saveFileToDisk"
    | "loadScene"
    | "duplicateSelection"
    | "deleteSelectedElements"
    | "changeViewBackgroundColor"
    | "clearCanvas"
    | "zoomIn"
    | "zoomOut"
    | "resetZoom"
    | "zoomToFit"
    | "zoomToSelection"
    | "changeFontFamily"
    | "changeTextAlign"
    | "toggleFullScreen"
    | "toggleShortcuts"
    | "group"
    | "ungroup"
    | "goToCollaborator"
    | "addToLibrary"
    | "changeSharpness"
    | "alignTop"
    | "alignBottom"
    | "alignLeft"
    | "alignRight"
    | "alignVerticallyCentered"
    | "alignHorizontallyCentered"
    | "distributeHorizontally"
    | "distributeVertically"
    | "flipHorizontal"
    | "flipVertical"
    | "viewMode"
    | "exportWithDarkMode"
    | "toggleTheme";
