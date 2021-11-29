
import { MobileMenuProps } from '../../../@types/types'; 
import { FixedSideContainer } from './FixxedSideContainer'
import  { Section } from './Section'
import { LibraryButton } from './LibraryButton'
import { ShapesSwitcher } from './ShapeSwitcher'
import Stack from './Stack'; 
import { BackgroundPickerAndDarkModeToggle } from './BackgroundPickerAndDarkModeToggle';
import { Island } from './Island'; 
import { LockButton } from './LockButton'; 
import {  HintViewer } from './HintViewer'; 
import { t } from '../../../i18n'
import { SCROLLBAR_COLOR, SCROLLBAR_MARGIN, SCROLLBAR_WIDTH } from '../../../scene/scrollbars';


export const MobileMenu = ({ 
appState,
  elements,
  libraryMenu,
  actionManager,
  renderJSONExportDialog,
  renderImageExportDialog,
  setAppState,
  onCollabButtonClick,
  onLockToggle,
  canvas,
  isCollaborating,
  renderCustomFooter,
  viewModeEnabled,
  showThemeBtn,
}: MobileMenuProps) => {
    const renderToolBar = () => {
        return (
            <FixedSideContainer side="top" className="App-top-bar">
                <Section heading="shapes"> 
                {(heading) => (
                    <Stack.Col gap={4} align="center">
                    <Stack.Row gap={1}>
                        <Island padding={1}>
                        {heading}
                        <Stack.Row gap={1}>
                            <ShapesSwitcher
                            canvas={canvas}
                            elementType={appState.elementType}
                            setAppState={setAppState}
                            />
                        </Stack.Row>
                        </Island>
                        <LockButton
                            checked={appState.elementLocked}
                            onChange={onLockToggle}
                            title={t("toolBar.lock")}
                        />
                        <LibraryButton appState={appState} setAppState={setAppState} />
                    </Stack.Row>
                    {libraryMenu}
                    </Stack.Col>
                )}
                </Section>
                <HintViewer appState={appState} elements={elements} />
            </FixedSideContainer>
        )
    }

    const renderAppToolbar = () => {
        if (viewModeEnabled) {
          return (
            <div className="App-toolbar-content">
              {actionManager.renderAction("toggleCanvasMenu")}
            </div>
          );
        }


        return (
            <div className="App-toolbar-content">
                {actionManager.renderAction("toggleCanvasMenu")}
                {actionManager.renderAction("toggleEditMenu")}
                {actionManager.renderAction("undo")}
                {actionManager.renderAction("redo")}
                {actionManager.renderAction(
                appState.multiElement ? "finalize" : "duplicateSelection",
                )}
                {actionManager.renderAction("deleteSelectedElements")}
            </div>
        );
      };            

    const renderCanvasActions = () => {
        if(viewModeEnabled){
            return (
                <>
                    {/* {renderJSONExportDialog()}
                    {renderImageExportDialog()} */}
                </>
            )
        }

        return (
            <>
                {actionManager.renderAction('clearCanvas')}
                {actionManager.renderAction("loadScene")}
                {/* {renderJSONExportDialog()}
                {renderImageExportDialog()} */}
                {onCollabButtonClick && (
                    //<CollabButton
                //     isCollaborating={isCollaborating}
                //     collaboratorCount={appState.collaborators.size}
                //     onClick={onCollabButtonClick}
                //     />
                //     )}
                // {
                <BackgroundPickerAndDarkModeToggle
                    actionManager={actionManager}
                    appState={appState}
                    setAppState={setAppState}
                    showThemeBtn={showThemeBtn}
                />
                )}
            </>
        );
    }

    return (  
        <>
            {!viewModeEnabled && renderToolBar()}
            <div className="App-bottom-bar" style={{
                marginBottom: SCROLLBAR_WIDTH + SCROLLBAR_MARGIN * 2, 
                marginLeft: SCROLLBAR_WIDTH + SCROLLBAR_MARGIN * 2,
                marginRight: SCROLLBAR_WIDTH + SCROLLBAR_MARGIN * 2,
            }}>
                <Island padding={2}>
                    <Section className="App-mobile-menu" heading="canvasActions">
                        <div className="panelColumn">
                            <Stack.Col gap={4}>
                                {renderCanvasActions()}
                                {renderCustomFooter?.(true, appState)}
                                {appState.collaborators.size > 0 && (
                                    <fieldset>
                                        <legend>{t("labels.collaborators")}</legend>
                                        {/* <UserList mobile>
                                            {Array.from(appState.collaborators)
                                            // Collaborator is either not initialized or is actually the current user.
                                            .filter(
                                                ([_, client]) => Object.keys(client).length !== 0,
                                            )
                                            .map(([clientId, client]) => (
                                                <React.Fragment key={clientId}>
                                                {actionManager.renderAction("goToCollaborator", {
                                                    id: clientId,
                                                })}
                                                </React.Fragment>
                                            ))}
                                        </UserList> */}
                                    </fieldset>
                                )}
                            </Stack.Col>
                        </div>
                    </Section>
                    <footer className="App-toolbar">
                        {renderToolBar()}
                        {appState.scrolledOutside && !appState.openMenu && (
                            <button 
                                className="scroll-back-to-content"
                                onClick={() => {
                                    setAppState({
                                        //...calculateScrollCenter(elements, appState, canvas)
                                    })
                                }}>
                                     {t("buttons.scrollBackToContent")}
                            </button>
                        )}
                    </footer>
                </Island>
            </div>
        </>
    )
}