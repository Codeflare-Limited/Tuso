

import { AppProps, TusodrawProps } from '../../../@types/types';
import { DEFAULT_UI_OPTIONS } from '../../../constants'
import SketchMain from './S_Main';

import { defaultLang } from "../../../i18n";
import { InitializeSketches } from './InitializeSketches';
  
  
const SketchApp = (props: TusodrawProps) => {

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



export default SketchApp; 