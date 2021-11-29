import { useCallback } from "react";
import clsx from 'clsx'; 


import LibraryMenu from "./LibraryMenu";
import Stack from "./Stack";
import { LayerUIProps } from "../../../interface/LayerUIProps";
import { getSelectedElements } from "../../../scene/selection";
import { useMobile } from "./S_Main";
import { t } from '../../../i18n'
import { CLASSES } from "../../../constants";
import './layerUI.scss'    
import LibraryUnit from "./LibraryUnit";
import LibraryMenuItems from "./LibraryMenuItems";
import { showSelectedShapeActions } from "../../../element/showSelectedShapeActions";
import { HintViewer } from "./HintViewer";
import { FixedSideContainer } from "./FixxedSideContainer";
import { Section } from './Section'
import { Island } from "./Island";
import { LockButton } from './LockButton'  ; 
import { LibraryButton } from "./LibraryButton";  
import { ShapesSwitcher } from './ShapeSwitcher'
import { MobileMenu } from "./MobileMenu";
import { BackgroundPickerAndDarkModeToggle } from "./BackgroundPickerAndDarkModeToggle";
import { LoadingMessage } from "./LoadingMessage";



const LayerUI = ({ 
    actionManager,
    appState,
    setAppState,
    canvas,
    elements,
    onCollabButtonClick,
    onLockToggle,
    onInsertElements,
    zenModeEnabled,
    showExitZenModeBtn,
    showThemeBtn,
    toggleZenMode,
    isCollaborating,
    renderTopRightUI,
    renderCustomFooter,
    viewModeEnabled,
    libraryReturnUrl,   
    UIOptions,
    focusContainer,
    library,   
    id,}: LayerUIProps) => {    

        const isMobile = useMobile()
        const deselectItems = useCallback(() => {
            setAppState({
                selectedElementIds: {}, //SELECT ITEMS BY ELEMENT
                selectedGroupIds: {}   //SELECT GROUP ITEMS BY IDS
            })
        }, [setAppState])

         
        const closeLibrary = useCallback ((event) => {
            setAppState({ isLibraryOpen: false })

        }, [setAppState])   

        const renderJSONExportDialog = () => {
            return (
                <h2>Render JSONEXPORT DIALOG</h2>
            )
        }

        const renderImageExportDialog = () => {
            return (
                <h2>RENDER IMAGE EXPORT DIALOG</h2>
            )
            
        }

        const Separator = () => {
            return <div style={{ width: ".625em" }} />;
        };

        const renderViewModeCanvasActions = () => {
            return (
                <Section 
                    heading="canvasActions"
                    className={clsx("zen-mode-transition", {
                    "transition-left": zenModeEnabled,
                    })}>
                        <Island padding={2} style={{ zIndex: 1 }}>
                            <Stack.Col gap={4}>
                                <Stack.Row gap={1} justifyContent="space-between">
                                {/* {renderJSONExportDialog()}
                                {renderImageExportDialog()} */}
                                </Stack.Row>
                            </Stack.Col>
                        </Island>
                </Section>
            )
        }


        const renderCanvasActions = () => {
            <Section heading="canvasActions"
                className={clsx("zen-mode-transition", {
              "transition-left": zenModeEnabled,
            })}>

                <Island padding={2} style={{ zIndex: 1 }}>
                    <Stack.Col gap={4}>
                        <Stack.Row gap={1} justifyContent="space-between">
                        {actionManager.renderAction("clearCanvas")}
                        <Separator />
                        {actionManager.renderAction("loadScene")}
                        {renderJSONExportDialog()}
                        {renderImageExportDialog()}
                        <Separator />

                        {/* {onCollabButtonClick && (
                            <CollabButton
                                isCollaborating={isCollaborating}
                                collaboratorCount={appState.collaborators.size}
                                onClick={onCollabButtonClick}
                            />
                        )} */}
                        </Stack.Row>
                        <BackgroundPickerAndDarkModeToggle
                            actionManager={actionManager}
                            appState={appState}
                            setAppState={setAppState}
                            showThemeBtn={showThemeBtn}
                        />
                        {appState.fileHandle && (
                            <>{actionManager.renderAction("saveToActiveFile")}</>
                        )}
                    </Stack.Col>
                </Island>
            </Section>
        }

        const renderSelectedShapeActions = () => {
            <Section 
                heading="selectedShapeActions"
                className={clsx("zen-mode-transition", {
                "transition-left": zenModeEnabled,
                })}>
                    <Island className={CLASSES.SHAPE_ACTIONS_MENU} padding={2} style={{
                        maxHeight: `${appState.height - (appState.fileHandle ? 248 : 200)}px}`
                    }}>
                         {/* <SelectedShapeActions
                            appState={appState}
                            elements={elements}
                            renderAction={actionManager.renderAction}
                            elementType={appState.elementType}
                        /> */}
                    </Island>
            </Section>
        }
     
        const renderFixedSideContainer = () => {
            const shouldRenderSelectedShapeActions = showSelectedShapeActions(appState, elements)
            return (
                <FixedSideContainer side="top">
                    <div className="App-menu App-menu_top">
                        <Stack.Col gap={4} className={clsx({ "disable-pointerEvents": zenModeEnabled })}>
                         {viewModeEnabled
                            ? renderViewModeCanvasActions()
                            : renderCanvasActions()}
                            {shouldRenderSelectedShapeActions && renderSelectedShapeActions()}
                        </Stack.Col>

                        <Section heading="shapes">
                            {(heading) => (
                                <Stack.Col gap={4} align="start">
                                <Stack.Row gap={1}>
                                    <LockButton
                                        zenModeEnabled={zenModeEnabled}
                                        checked={appState.elementLocked}
                                        onChange={onLockToggle}
                                        title={t("toolBar.lock")}
                                    />
                                    <Island
                                        padding={1}
                                        className={clsx({ "zen-mode": zenModeEnabled })}
                                    >
                                    <HintViewer appState={appState} elements={elements} />
                                    {heading}
                                    <Stack.Row gap={1}>
                                        <ShapesSwitcher
                                        canvas={canvas}
                                        elementType={appState.elementType}
                                        setAppState={setAppState}
                                    />
                                    </Stack.Row>
                                    </Island>
                                    <LibraryButton
                                    appState={appState}
                                    setAppState={setAppState}
                                    />
                                </Stack.Row>
                                {libraryMenu}
                                </Stack.Col>
                            )}
                        </Section>
                    </div>
                </FixedSideContainer>
            )
        }

        const renderBottomAppMenu = () => {
            return (
                <footer role="contentinfo" className="layer-ui__wrapper__footer App-menu App-menu_bottom"> 
                    <div className={clsx("layer-ui__wrapper__footer-left zen-mode-transition",{
                        "layer-ui__wrapper__footer-left--transition-left": zenModeEnabled,},
                        )}>
                            <Stack.Col gap={2}>
                                <Section heading="canvasActions">
                                    <Island padding={1}>

                                    </Island>
                                    {!viewModeEnabled && (
                                        <div className={clsx("undo-redo-buttons zen-mode-transition", {
                                        "layer-ui__wrapper__footer-left--transition-bottom": zenModeEnabled,
                                        })}>
                                        {/* {actionManager.renderAction("undo", { size: "small" })}
                                            {actionManager.renderAction("redo", { size: "small" })} */}
                                        </div>
                                    )}
                                </Section>
                            </Stack.Col>
                    </div>
                    <div className={clsx("layer-ui__wrapper__footer-center zen-mode-transition",{
                        "layer-ui__wrapper__footer-left--transition-bottom": zenModeEnabled,},)}>
                        {renderCustomFooter?.(false, appState)}
                    </div>
                    <div className={clsx("layer-ui__wrapper__footer-right zen-mode-transition",{
                        "transition-right disable-pointerEvents": zenModeEnabled,},)}>
                            {/* {actionManager.renderAction("toggleShortcuts")} */}
                    </div>
                    <button className={clsx("disable-zen-mode", {"disable-zen-mode--visible": showExitZenModeBtn,
                            })} onClick={toggleZenMode}>
                            {t("buttons.exitZenMode")}
                    </button>
                </footer>
            )
        }

        const libraryMenu = appState.isLibraryOpen ? (
            <LibraryMenu  
                pendingElements={getSelectedElements(elements, appState)}  
                onClickOutside={closeLibrary}
                onInsertShape={onInsertElements}   
                onAddToLibrary={deselectItems}
                setAppState={setAppState}
                libraryReturnUrl={libraryReturnUrl}
                focusContainer={focusContainer}
                library={library}
                theme={appState.theme}
                id={id}
            />
        ) : null; 

        const dialogs = (
            <>
                {appState.isLoading && <LoadingMessage />}
                {/* {appState.errorMessage && (
                    <ErrorDialog
                    message={appState.errorMessage}
                    onClose={() => setAppState({ errorMessage: null })}
                    />
                )}
                {appState.showHelpDialog && (
                    <HelpDialog
                    onClose={() => {
                        setAppState({ showHelpDialog: false });
                    }}
                    />
                )}
                {appState.pasteDialog.shown && (
                    <PasteChartDialog
                    setAppState={setAppState}
                    appState={appState}
                    onInsertChart={onInsertElements}
                    onClose={() =>
                        setAppState({
                        pasteDialog: { shown: false, data: null },
                        })
                    }
                    />
                )} */}

            </>
        )

    return isMobile ? (
        <>
            {dialogs}
            <MobileMenu
                appState={appState}
                elements={elements}
                actionManager={actionManager}
                canvas={canvas}
                isCollaborating={isCollaborating}
                libraryMenu={libraryMenu}
                onLockToggle={onLockToggle}
                setAppState={setAppState}
                showThemeBtn={showThemeBtn}
                renderCustomFooter={renderCustomFooter}
                viewModeEnabled={viewModeEnabled}
                renderImageExportDialog={renderImageExportDialog}
                renderJSONExportDialog={renderJSONExportDialog}
            />
        </>
    ) : (
        <div className={clsx("layer-ui__wrapper", {
            "disable-pointerEvents": 
            appState.draggingElement || 
            appState.resizingElement || (appState.editingElement && (appState.editingElement))
        })}>
               {renderFixedSideContainer()}
               {renderBottomAppMenu()}
               {appState.scrolledOutside && (
                   <button 
                        className="scroll-back-to-content" 
                        onClick={() => {
                            setAppState({
                                //...calculateScrollCenter(elements, appState, canvas)
                            })
                        }}
                    >
                        {t("buttons.scrollBackToContent")}
                    </button>
               )}
               
        </div>
    )
}


export default LayerUI; 