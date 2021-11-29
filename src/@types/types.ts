import { ForwardedRef, ForwardRefRenderFunction } from 'react'
import { Point as RoughPoint } from 'roughjs/bin/geometry'
import {  SHAPES } from '../shapes'
import type App from '../components/Sketch/components/S_Main';
import { ActionManager } from '../actions/manager';

import { 
    NonDeleted,
    TusodrawElement,
    NonDeletedTusodrawElement, 
    TusodrawLinearElement, 
    Arrowhead, 
    PointerType,
    GroupId, 
    FontFamilyValues, 
    TextAlign, 
    ChartType
} from './element'

import { SuggestedBinding } from './binding'
import { LinearElementEditor  } from '../element/LinearElement';
import { Language } from '../interface/Language';
import { ImportedDataState } from '../interface/Data';
import { Spreadsheet } from '../interface/Spreadsheet'

      
  
export type Point = Readonly<RoughPoint>;
export type LibraryItem = readonly NonDeleted<TusodrawElement>[];
export type LibraryItems = readonly LibraryItem[];

  
export type ExportOpts = {
    saveFileToDisk?: boolean;
    onExportToBackend?: (
      exportedElements: readonly NonDeletedTusodrawElement[],
      appState: TusodrawState,
      canvas: HTMLCanvasElement | null,
    ) => void;
    renderCustomUI?: (
      exportedElements: readonly NonDeletedTusodrawElement[],
      appState: TusodrawState,
      canvas: HTMLCanvasElement | null,
    ) => JSX.Element;
};


export type MobileMenuProps = {
  appState: TusodrawState; 
  actionManager: ActionManager; 
  renderJSONExportDialog: () => React.ReactNode;
  renderImageExportDialog: () => React.ReactNode;
  setAppState: React.Component<any, TusodrawState>["setState"];
  elements: readonly NonDeletedTusodrawElement[];
  libraryMenu: JSX.Element | null;
  onCollabButtonClick?: () => void;
  onLockToggle: () => void;
  canvas: HTMLCanvasElement | null;
  isCollaborating: boolean;
  renderCustomFooter?: (isMobile: boolean, appState: TusodrawState) => JSX.Element;
  viewModeEnabled: boolean;
  showThemeBtn: boolean;
}




type CanvasActions = {
    changeViewBackgroundColor?: boolean;
    clearCanvas?: boolean;
    export?: false | ExportOpts;
    loadScene?: boolean;
    saveToActiveFile?: boolean;
    theme?: boolean;
    saveAsImage?: boolean;
};
  

type Collaborator = {
  pointer?: {
    x: number, 
    y: number
  };

  button?: "up" | "down"; 
  selectedElementIds?: TusodrawState['selectedElementIds'];
  username?: string; 
  // userState?: UserIdleState;
  color?: {
    background: string, 
    stroke: string
  }
}


export type UIOptions = {
    canvasActions?: CanvasActions;
};


export type PointerCoords = Readonly<{
  x: number;
  y: number;
}>



export type Gesture = {
  pointers: Map<number, PointerCoords>, 
  lastCenter: { x: number, y: number } | null; 
  initialDistance: number | null; 
  initialScale: number | null;
}


// export declare class GestureEvent extends UIEvent {
//   readonly rotation: number;
//   readonly scale: number;
// }

export interface TusodrawProps {
    onChange?: (
      elements: readonly TusodrawElement[],
      appState:TusodrawState,  
    ) => void;
    initialData?: ImportedDataState | null | Promise<ImportedDataState | null>;
    tusodrawRef?: ForwardedRef<TusodrawAPIRefValue>; //FORWARDREF
    onCollabButtonClick?: () => void;  
    isCollaborating?: boolean;
    onPointerUpdate?: (payload: {
      pointer: { x: number; y: number };
      button: "down" | "up";
      pointersMap: Gesture["pointers"];
    }) => void;
    // onPaste?: (
    //   data: ClipboardData,
    //   event: ClipboardEvent | null,
    // ) => Promise<boolean> | boolean;
    renderTopRightUI?: (isMobile: boolean, appState: TusodrawState) => JSX.Element;
    renderFooter?: (isMobile: boolean, appState: TusodrawState) => JSX.Element;
    langCode?: Language["code"];
    viewModeEnabled?: boolean;
    zenModeEnabled?: boolean;
    gridModeEnabled?: boolean;
    libraryReturnUrl?: string;
    theme?: "dark" | "light";
    name?: string;
    renderCustomStats?: (
      elements: readonly NonDeletedTusodrawElement[],
      appState: TusodrawState,
    ) => JSX.Element;
    UIOptions?: UIOptions;
    detectScroll?: boolean;
    handleKeyboardGlobally?: boolean;
    onLibraryChange?: (libraryItems: LibraryItems) => void | Promise<any>;
    autoFocus?: boolean;
}

export type ResolvablePromise<T> = Promise<T> & {
  resolve: [T] extends [undefined] ? (value?: T) => void : (value:T) => void; 
  reject: (error: Error) => void; 
}

export type TusodrawAPIRefValue =
    | TusodrawImperativeAPI
    | {
        readyPromise?:ResolvablePromise<TusodrawImperativeAPI>
        ready: false
    }




export type TusodrawImperativeAPI = {
  updateScene: InstanceType<typeof App>["updateScene"]; 
  resetScene: InstanceType<typeof App>["resetScene"];
  getSceneElementsIncludingDeleted: InstanceType<typeof App>["getSceneElementsIncludingDeleted"];
  history: {
    clear: InstanceType<typeof App>["resetHistory"];
  };

  getAppState: () => InstanceType<typeof App>["state"];
  // scrollToContent: InstanceType<typeof App>["scrollToContent"];
  // getSceneElements: InstanceType<typeof App>["getSceneElements"];
  // refresh: InstanceType<typeof App>["refresh"];
  // importLibrary: InstanceType<typeof App>["importLibraryFromUrl"];
  // setToastMessage: InstanceType<typeof App>["setToastMessage"];
  // readyPromise: ResolvablePromise<TusodrawImperativeAPI>;
  ready: true;
  id: string;
};


export type TusodrawState = {
    isLoading: boolean;
    errorMessage: string | null;
    draggingElement: NonDeletedTusodrawElement | null;
    resizingElement: NonDeletedTusodrawElement | null;
    multiElement: NonDeleted<TusodrawLinearElement> | null;
    selectionElement: NonDeletedTusodrawElement | null;
    isBindingEnabled: boolean;
    startBoundElement: NonDeleted<TusodrawLinearElement> | null;
    suggestedBindings: SuggestedBinding[]; 
    // element being edited, but not necessarily added to elements array yet
    // (e.g. text element when typing into the input)
    editingElement: NonDeletedTusodrawElement | null;
    editingLinearElement: LinearElementEditor | null;
    elementType: typeof SHAPES[number]["value"];
    elementLocked: boolean;
    exportBackground: boolean;
    exportEmbedScene: boolean;
    exportWithDarkMode: boolean;
    exportScale: number;
    currentItemStrokeColor: string;
    currentItemBackgroundColor: string;
    currentItemFillStyle: TusodrawElement["fillStyle"];
    currentItemStrokeWidth: number;
    currentItemStrokeStyle: TusodrawElement["strokeStyle"];
    currentItemRoughness: number;
    currentItemOpacity: number;
    currentItemFontFamily: FontFamilyValues;
    currentItemFontSize: number;
    currentItemTextAlign: TextAlign;
    currentItemStrokeSharpness: TusodrawElement["strokeSharpness"];
    currentItemStartArrowhead: Arrowhead | null;
    currentItemEndArrowhead: Arrowhead | null;
    currentItemLinearStrokeSharpness: TusodrawElement["strokeSharpness"];
    viewBackgroundColor: string;
    scrollX: number;
    scrollY: number;
    cursorButton: "up" | "down";
    scrolledOutside: boolean;
    name: string;
    isResizing: boolean;
    isRotating: boolean;
    zoom: Zoom;
    openMenu: "canvas" | "shape" | null;
    openPopup:
      | "canvasColorPicker"
      | "backgroundColorPicker"
      | "strokeColorPicker"
      | null;
    lastPointerDownWith: PointerType;
    selectedElementIds: { [id: string]: boolean };
    previousSelectedElementIds: { [id: string]: boolean };
    shouldCacheIgnoreZoom: boolean;
    showHelpDialog: boolean;
    toastMessage: string | null;
    zenModeEnabled: boolean;
    theme: "light" | "dark";
    gridSize: number | null;
    viewModeEnabled: boolean;
  
    /** top-most selected groups (i.e. does not include nested groups) */
    selectedGroupIds: { [groupId: string]: boolean };
    /** group being edited when you drill down to its constituent element
      (e.g. when you double-click on a group's element) */
    editingGroupId: GroupId | null;
    width: number;
    height: number;
    offsetTop: number;
    offsetLeft: number;
  
    isLibraryOpen: boolean;
    fileHandle: import("browser-fs-access").FileSystemHandle | null;
    collaborators: Map<string, Collaborator>;
    showStats: boolean;
    // currentChartType: ChartType; 
    // pasteDialog:
    //   | {
    //       shown: false;
    //       data: null;
    //     }
    //   | {
    //       shown: true;  
    //       data: Spreadsheet;
    //     };
}

export type NormalizedZoomValue = number;
// export type NormalizedZoomValue = number & { _brand: "normalizedZoom" };


export type Zoom = {
    value: NormalizedZoomValue,
    translation: Readonly <{
        x: number, 
        y: number
    }>
} 



export type AppProps = TusodrawProps & {
    UIOptions: {
        canvasActions: Required<CanvasActions> & { export: ExportOpts };
    };
    
    detectScroll: boolean;
    handleKeyboardGlobally: boolean;
}