import { isDarwin } from '../keys'
import { Zoom } from "../@types/types";
import { CURSOR_TYPE } from "../constants";
import { unstable_batchedUpdates } from "react-dom";

/**
 * @param func take single paramter event
 */


 export const withBatchedUpdates = <TFunction extends ((event: any) => void) | (() => void)>(
 func: Parameters<TFunction>["length"] extends 0 | 1 ? TFunction : never,
) =>
 ((event) => {
   unstable_batchedUpdates(func as TFunction, event);
 }) as TFunction;


export const setCursor = (canvas: HTMLCanvasElement | null, cursor: string) => {
    if(canvas){
        console.log(canvas.style.cursor = cursor)

    }
}


export const resetCursor = (canvas: HTMLCanvasElement | null) => {
    if (canvas) {
      canvas.style.cursor = "";
    }
  };


export const setCursorForShape = (canvas: HTMLCanvasElement | null, shape: string,) => {
    if(!canvas){
        return; 
    }


    if(shape === 'selection'){
        resetCursor(canvas)
    
    }else {
        canvas.style.cursor = CURSOR_TYPE.CROSSHAIR;
    }

}


export const viewportCoordsToSceneCoords = ({
    clientX, clientY
}: { clientX: number, clientY: number}, {
    zoom,
    offsetLeft,
    offsetTop,
    scrollX,
    scrollY,
}: {
    zoom: Zoom, 
    offsetLeft: number;
    offsetTop: number;
    scrollX: number;
    scrollY: number;
}) => {

    const invtScale = 1 / zoom.value
    const x = (clientX - zoom.translation.x - offsetLeft) * invtScale - scrollX; 
    const y = (clientY - zoom.translation.y - offsetTop) * invtScale - scrollY; 
    
    return { x, y }
}

export const capitalizeString = (str: string) => str.charAt(0).toUpperCase() + str.slice(1); 



export const getShortcutKey = (shortcut: string) => {
    shortcut = shortcut
                .replace(/\bAlt\b/i, "Alt") //Alt key 
                .replace(/\bShift\b/i, "Shift") //Shift Key 
                .replace(/\b(Enter|Return)\b/i, "Enter") //Enter Key 
                .replace(/\bDel\b/i, "Delete"); //Delete Key

    if(isDarwin){
        return shortcut
                .replace(/\bCtrlOrCmd\b/i, "Cmd")
                .replace(/\bAlt\b/i, "Option");
    }

    return shortcut.replace(/\bCtrlOrCmd\b/i, "Ctrl"); 
}