
import React, { useContext } from 'react'; 
import clsx from "clsx";
import { nanoid } from "nanoid";  
    
import { t } from '../../../i18n'
import { ActionResult } from '../../../@types/action';
import { RoughCanvas } from "roughjs/bin/canvas";
import rough from "roughjs/bin/rough";
import { AppProps, TusodrawImperativeAPI, TusodrawState, Gesture } from '../../../@types/types';
import LayerUI from './LayerUI';            
import LibraryMenuItems from './LibraryMenuItems'   
import Library from '../../../data/library';
import { Scene } from '../../../scene/scene';   
import { getDefaultAppState } from '../../../@types/appState';
import { ActionManager } from '../../../actions/manager';
import { DEFAULT_UI_OPTIONS } from '../../../constants';
import { TusodrawFreeDrawElement } from '../../../@types/element';
import { EVENTS, CURSOR_TYPE} from '../../../constants';
import { setCursor, viewportCoordsToSceneCoords, withBatchedUpdates } from '../../../utils/util';
import { getCenter } from '../../../utils/gesture';
import { getNewZoom, getNormalizedZoom } from '../../../scene/zoom';



const isMobileContext = React.createContext(false); 
export const useMobile = () => useContext(isMobileContext); 



const SketchAppContainerContext = React.createContext<{
    container: HTMLDivElement | null;
    id: string | null;
  }>({ container: null, id: null });



export const useSketchAppContainer = () => useContext(SketchAppContainerContext)
let invalidateContextMenu = false;


const gesture: Gesture = {
    pointers: new Map(), 
    lastCenter: null, 
    initialDistance: null, 
    initialScale: null
}


// gesture.pointers

class SketchMain extends React.Component<AppProps, TusodrawState> {
    canvas: HTMLCanvasElement | null = null;
    unmounted: boolean = false; 
    isMobile = false; 
    detachIsMobileMqHandler?: () => void
    actionManager: ActionManager; 
    rc: RoughCanvas | null = null; 


    private sketchContainerRef = React.createRef<HTMLDivElement>();
    
    private id: string; 
    public library: Library     
    private scene: Scene 
    private TusodrawContainerRef = React.createRef<HTMLDivElement>();
    public static defaultProps: Partial<AppProps>  = {  
        UIOptions: DEFAULT_UI_OPTIONS   
    } 

    private sketchContainerValue: {
        container: HTMLDivElement | null;
        id: string;
    };



    constructor(props: AppProps){
        super(props)
        const defaultAppState = getDefaultAppState()

        const {
            tusodrawRef,
            viewModeEnabled = false,
            zenModeEnabled = false,
            gridModeEnabled = false,
            theme = defaultAppState.theme,
            name = defaultAppState.name,
            
        } = props
        
       
        this.state = { 
            ...defaultAppState, 
            theme, 
            isLoading: true, 
            ...this.getCanvasOffsets,
            viewModeEnabled,
            zenModeEnabled, 
            name, 
            gridSize: gridModeEnabled ? 5 : null,
            width: window.innerWidth, 
            height: window.innerHeight,
            ...this.getCanvasOffsets(), 
        }
  

        const api: TusodrawImperativeAPI = {
            updateScene: this.updateScene,
            resetScene: this.resetScene,
            getSceneElementsIncludingDeleted: this.getSceneElementsIncludingDeleted,
            history: {
                clear: this.resetHistory
            },

            getAppState: () => this.state, 
            // readyPromise,
            ready: true,
            // readyPromise,
            id: "1"

        } as const; 
           
        // if(typeof tusodrawRef === "function"){
        //     tusodrawRef(api)

        // }else {
        //     tusodrawRef.current = api; 
        // }
        

        this.id = nanoid() //REPLACE THIS WITH NANOID
        this.actionManager = new ActionManager(
            this.syncActionResult, 
            () => this.state, 
            () => this.scene.getElementsIncludingDeleted(), 
            this
        ); 

        // this.actionManager.registerAction(actions)

        this.library = new Library(this)
        this.scene = new Scene()
        this.sketchContainerValue = {
            container: this.sketchContainerRef.current, 
            id: this.id

        }
    }    
    
    private syncActionResult = withBatchedUpdates((actionResult: ActionResult) => {

    })

    private updateScene()  {

    }

    private resetScene = () => {

    }

    public resetHistory = () => {

    }   


    onTapStart = (event: TouchEvent) => {
        event.preventDefault(); 
        console.log('starting')
    }

    private handleCanvasRef = (canvas: HTMLCanvasElement) => {
        if(canvas != null){
            this.canvas = canvas; 
            this.rc = rough.canvas(this.canvas); 
            this.canvas.addEventListener(EVENTS.TOUCH_START, this.onTapStart); 

        }else {
            this.canvas?.addEventListener(EVENTS.TOUCH_END, this.onTapEnd)
        }
    }

    private onTapEnd = (event: TouchEvent) => {

    }

    private handleCanvasContextMenu = (event: React.PointerEvent<HTMLCanvasElement>) => {
        event.preventDefault(); 


    }   

    private renderCanvas() {
        const canvasScale = window.devicePixelRatio; 
        const {
            width:canvasDOMWidth, 
            height: canvasDOMHeight, 
            viewModeEnabled
        } = this.state

        const canvasWidth = canvasDOMHeight * canvasScale; 
    

        return (
            <canvas 
                className="excalidraw__canvas"
                style={{
                    width: canvasDOMWidth, 
                    height: canvasDOMHeight, 
                    cursor: CURSOR_TYPE.GRAB
                }}
                width={canvasDOMWidth}
                height={canvasDOMHeight}
                ref={this.handleCanvasRef}
                onContextMenu={this.handleCanvasContextMenu}
                onTouchMove={this.handleTouchMove}
                onPointerMove={this.handleCanvasPointerMove}
            >
                 {t("labels.drawingCanvas")}
            </canvas>
        )

    }

    private savePointer = (x:number, y:number, button: "up" | "down") => {
        if(!x || !y){
            return 
        }


        console.log(x, y, button)
        const pointer = viewportCoordsToSceneCoords({ clientX: x, clientY:y}, this.state)

        if(isNaN(pointer.x) || isNaN(pointer.y)){
            //sometimes the pointer goes off the screen 
        }


        this.props.onPointerUpdate?.({
            pointer, 
            button, 
            pointersMap: gesture.pointers
        })   
    }

    private handleCanvasPointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
        console.log(event)
        this.savePointer(event.clientX, event.clientY, this.state.cursorButton) //fit in state
       
        const initialScale = gesture.initialScale;
        const center = getCenter(gesture.pointers)  
        // const deltaX = center.x - gesture.lastCenter.x;
        // const deltaY = center.y - gesture.lastCenter.y;
        // console.log(deltaX, deltaY)
        gesture.lastCenter = center;
        console.log(initialScale)

        this.setState(({ zoom, scrollX, scrollY, offsetLeft, offsetTop }) => ({
            scrollX: scrollX,
            scrollY: scrollY,
            zoom: getNewZoom(
              getNormalizedZoom(600),
              zoom,
              { left: offsetLeft, top: offsetTop },
              center,
            ),

            shouldCacheIgnoreZoom: true,
        }));

        const scenePointer = viewportCoordsToSceneCoords(event, this.state)
        console.log(scenePointer)
        setCursor(this.canvas, CURSOR_TYPE.POINTER)
    }

    private handleTouchMove = (event: React.TouchEvent<HTMLCanvasElement>) => {
        invalidateContextMenu = true;
    }


    public getSceneElementsIncludingDeleted = () => {

    }

    private getCanvasOffsets(): Pick<TusodrawState, "offsetTop" | "offsetLeft"> {
        if(this.TusodrawContainerRef?.current){
            const tusodrawContainer = this.TusodrawContainerRef.current
            const { top, left } = tusodrawContainer.getBoundingClientRect()

            return {
                offsetLeft: left, 
                offsetTop: top
            }
        }
        
        
        return {
            offsetLeft: 0, 
            offsetTop: 0
        }
    }


    public render() {
        const { zenModeEnabled, viewModeEnabled } = this.state;
        const {
            onCollabButtonClick,
            renderTopRightUI,
            renderFooter,
            renderCustomStats,
        } = this.props
   
        return (    
            <div className={clsx("excalidraw excalidraw-container", {
                "excalidraw--view-mode": viewModeEnabled,
                "excalidraw--mobile": this.isMobile,
            })} tabIndex={0} ref={this.TusodrawContainerRef}>
                <SketchAppContainerContext.Provider value={this.sketchContainerValue}>
                    <isMobileContext.Provider value={this.isMobile}>
                        <LayerUI 
                            canvas={this.canvas} 
                            appState={this.state}
                            setAppState={this.setAppState}
                            actionManager={this.actionManager}
                            
                            onInsertElements={(element) => {
                                // this.addElementsFromPasteOrLibrary({
                                //     elements,
                                //     position: "center",
                                //   })
                            }}

                            zenModeEnabled={zenModeEnabled}
                            renderCustomFooter={renderFooter}
                            UIOptions={this.props.UIOptions}
                            focusContainer={this.focusContainer}
                            renderTopRightUI={renderTopRightUI}
                            id={this.id}
                            library={this.library}
                            viewModeEnabled={viewModeEnabled}
                            showExitZenModeBtn={
                                typeof this.props?.zenModeEnabled === "undefined" &&  zenModeEnabled
                            }
                            showThemeBtn={
                                typeof this.props?.theme === "undefined" &&
                                this.props.UIOptions.canvasActions.theme
                            }

                            libraryReturnUrl={this.props.libraryReturnUrl}
                            isCollaborating={this.props.isCollaborating || false}
                            onLockToggle={this.toggleLock}
                            toggleZenMode={this.toggleZenMode}
                            onCollabButtonClick={onCollabButtonClick}
                            elements={this.scene.getElements()}
                        />
                    </isMobileContext.Provider>
                   
                    <div className="excalidraw-textEditorContainer" />
                    <div className="excalidraw-contextMenuContainer" />

                    <main>{this.renderCanvas()}</main>
                </SketchAppContainerContext.Provider>   
                
            </div>
        )
    }

    setAppState = (obj: any) => {
        this.setState(obj)
    }

    toggleLock = () => {
        this.setState((prevState) => {
            
        })
    }

    focusContainer = () => {
        
    }

    toggleZenMode = () => {

    }
}




// declare global {
//     interface Window {
//         h: {
//             elements: readonly TusodrawFreeDrawElement[];
//             state: TusodrawState;
//             setState: React.Component<any, TusodrawState>["setState"];
//             app: InstanceType<typeof SketchMain>;
//             history: History
//         }
//     }
// }

export default SketchMain