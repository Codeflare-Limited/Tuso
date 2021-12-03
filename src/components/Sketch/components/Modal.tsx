
import clsx from 'clsx'; 
import React, { useRef, useState, useEffect, useLayoutEffect} from 'react';
import { createPortal } from 'react-dom'; 
import { TusodrawState } from "../../../@types/types";
import { KEYS } from '../../../keys';
import { useMobile, useSketchAppContainer } from './S_Main'


import './Modal.scss'; 


export const Modal = (props: {
    className?: string; 
    children?: React.ReactNode; 
    // maxWidth?: number;
    onCloseRequest(): void;
    labelledBy: string;
    theme?: TusodrawState["theme"]

}) => {

    const { theme="light" } = props; 
    const modalRoot = useBodyRoot(theme); 
    if (!modalRoot) {
        return null;
    }

    const handleKeydown = (event: React.KeyboardEvent) => {
        event.preventDefault(); 
        if(event.key === KEYS.ESCAPE){
            event.nativeEvent.stopPropagation();  ///the event stops here 
            props.onCloseRequest(); //the dialog is then closed 
        }
    }



    return createPortal(
        <div 
            className={clsx("Modal", props.className)}
            role="dialog"
            aria-modal="true"
            onKeyDown={handleKeydown}
            aria-labelledby={props.labelledBy}
            >
                 <div className="Modal__background" onClick={props.onCloseRequest}></div>
                 <div 
                    className="Modal__content"
                    // style={props.maxWidth}
                    tabIndex={0}
                    >
                    {props.children}
                </div>    
        </div>, 
        modalRoot
    )
}



const useBodyRoot = (theme: TusodrawState["theme"]) => {
    const [div, setDiv] = useState<HTMLDivElement | null>(null)
    const isMobile = useMobile(); 
    const isMobileRef = useRef(isMobile)
    isMobileRef.current = isMobile;

    const { container: sketchappContainer } = useSketchAppContainer()


    useLayoutEffect(() => {
        if(div){
            div.classList.toggle("excalidraw--mobile", isMobile)
        }

    }, [div, isMobile]); 



    useEffect(() => {

       const isDarkTheme =  !!sketchappContainer?.classList.contains("theme--dark") || theme === "dark"; 

       const div = document.createElement("div"); 
       div.classList.add("excalidraw", "excalidraw-modal-container");
        div.classList.toggle("excalidraw--mobile", isMobileRef.current);

        if(isDarkTheme){
            div.classList.add("theme--dark");
            div.classList.add("theme--dark-background-none");
        }

        document.appendChild(div)
        setDiv(div)

        return () => {
            document.body.removeChild(div); 
    
        }

    }, [sketchappContainer, theme])

    return div; 
}