
import { AppProps, TusodrawProps } from '../../@types/types';
import SketchMain from '../../components/Sketch/components/S_Main';
import { DEFAULT_UI_OPTIONS } from '../../constants'
import { InitializeSketches } from '../../components/Sketch/components/InitializeSketches';
import { defaultLang } from "../../i18n";



const SketchProps = (props: TusodrawProps) => {

    const {
        name,
        onChange, 
        initialData, 
        langCode = defaultLang.code, 
        onPointerUpdate, 
        theme, 
        autoFocus = false, 
        detectScroll = true, 
        libraryReturnUrl, 
        zenModeEnabled, 
        viewModeEnabled, 
        isCollaborating,
        gridModeEnabled,
        renderFooter, 
        renderCustomStats,
        handleKeyboardGlobally = false, 
        onCollabButtonClick, 
        onLibraryChange, 
        renderTopRightUI
    } = props

    const canvasAction = props.UIOptions?.canvasActions; 
    const UIOptions: AppProps["UIOptions"] = {
        canvasActions: {
            ...DEFAULT_UI_OPTIONS.canvasActions,
            ...canvasAction
        }
    }


    
    return (

        <InitializeSketches langCode={langCode}>
            <SketchMain   
                onChange={onChange}
                initialData={initialData}
                detectScroll={detectScroll}
                handleKeyboardGlobally={handleKeyboardGlobally}
                autoFocus={autoFocus}
                theme={theme}
                UIOptions={UIOptions}
                langCode={langCode}
                viewModeEnabled={viewModeEnabled}
                zenModeEnabled={zenModeEnabled}
                gridModeEnabled={gridModeEnabled}
                name={name}
                renderCustomStats={renderCustomStats}
                renderFooter={renderFooter}
                onCollabButtonClick={onCollabButtonClick}
                onLibraryChange={onLibraryChange}
                libraryReturnUrl={libraryReturnUrl}
                onPointerUpdate={onPointerUpdate}
                isCollaborating={isCollaborating}
                renderTopRightUI={renderTopRightUI}
            />
        </InitializeSketches>
        
    )
}



export default SketchProps; 