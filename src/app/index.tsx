
import { useCallback, useState } from 'react'
import { useCallbackRefState } from '../components/Sketch/hooks/useCallbackRefState';
import { TusodrawImperativeAPI, TusodrawState } from '../@types/types';
import { TusodrawElement } from '../@types/element'
import SketchProps, { } from "../packages/sketch";



const PlusLinkJSX = (
    <p style={{ direction: "ltr", unicodeBidi: "embed" }}>
      Introducing Excalidraw+
      <br />
      <a
        href="https://plus.excalidraw.com/?utm_source=excalidraw&utm_medium=banner&utm_campaign=launch"
        target="_blank"
        rel="noreferrer"
      >
        Try out now!
      </a>
    </p>
  );



const SketchWrapper = () => {
    const [sketchApi, tusoCallbackApi] = useCallbackRefState<TusodrawImperativeAPI>()
    const [errorMessage, setErrorMessage] = useState("");


    const onChange = (elements: readonly TusodrawElement[], appState:TusodrawState) => {

    }

    const renderFooter = useCallback((isMobile: boolean) => {
        if(isMobile){
            const isTinyDevice = window.innerWidth < 362;
            return (
                <div style={{
                    display: "flex",
                    flexDirection: isTinyDevice ? "column" : "row",
                  }}>
                      <fieldset>
                        <legend>{("labels.language")}</legend>
                      </fieldset>
                      <div
                        style={{
                            width: "24ch",
                            fontSize: "0.7em",
                            textAlign: "center",
                            marginTop: isTinyDevice ? 16 : undefined,
                            marginLeft: "auto",
                            marginRight: isTinyDevice ? "auto" : undefined,
                            padding: "4px 2px",
                            border: "1px dashed #aaa",
                            borderRadius: 12,
                        }}
                        >
                        {PlusLinkJSX}
                    </div>
                </div>
            )
        }
    }, [])


    return (
        <>
            <SketchProps
                // tusodrawRef={tusoCallbackApi}
                onChange={onChange}
                UIOptions={{
                    canvasActions: {
                        export: {
                            renderCustomUI: (elements, appState) => {
                                return (
                                    <h1>Hello People</h1>
                                )
                            }
                        }
                    }
                }}

                // renderFooter={renderFooter}
                detectScroll={false}
                autoFocus={true}
            />
        </>
    )
}




const SketchApp = () => {
    return (
        <SketchWrapper/>
    )
}

export default SketchApp; 