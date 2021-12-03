import React, { useRef, useLayoutEffect, useEffect } from "react"
import { unstable_batchedUpdates } from "react-dom";




type PopOverProps = {
    top?:number; 
    left?:number; 
    children?: React.ReactNode; 
    onCloseRequest?(event: PointerEvent): void; 
    fitInViewPort?: boolean; 
}




export const PopOver = ({
    top, 
    left, 
    children, 
    onCloseRequest, 
    fitInViewPort
}: PopOverProps) => {
    const popoverRef = useRef<HTMLDivElement>(null); 

    useLayoutEffect(() => {
        if(fitInViewPort && popoverRef.current){
            const element = popoverRef.current
            const { x, y, width, height } = element.getBoundingClientRect()
            const viewPortWidth = window.innerWidth;
            if(x + width > viewPortWidth ){
                element.style.left = `${viewPortWidth - width}px`; 
            }


            const viewPortHeight = window.innerHeight;
            if(y + height > viewPortHeight){
                element.style.top = `${viewPortHeight - height}px`;
            }  
        }
        
    }, [fitInViewPort])



    useEffect(() => {
        if(onCloseRequest){
            const handler = (event: PointerEvent) => {
                if(!popoverRef?.current?.contains(event.target as Node)){
                    unstable_batchedUpdates(() => onCloseRequest(event)); 
                }
            }

            document.addEventListener('pointerdown', handler, false)
            return () => document.removeEventListener("pointerdown", handler, false )
        }

    }, [onCloseRequest])

    return (
       <div className="popover" style={{ top, left }} ref={popoverRef}>
            {children}
        </div>
    )
}