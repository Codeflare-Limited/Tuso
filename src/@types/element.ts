
import { FONT_FAMILY } from "../constants";
import { Point } from "./types";

export type FillStyle = "hachure" | "cross-hatch" | "solid";
export type StrokeStyle = "solid" | "dashed" | "dotted";
export type StrokeSharpness = "round" | "sharp";
export type GroupId = string;
export type PointerType = "mouse" | "pen" | "touch";
export type Arrowhead = "arrow" | "bar" | "dot";
export type FontFamilyKeys = keyof typeof FONT_FAMILY;
export type FontFamilyValues = typeof FONT_FAMILY[FontFamilyKeys];
export type TextAlign = "left" | "center" | "right";
export type VerticalAlign = "top" | "middle";
export type ChartType = "bar" | "line";



type _TusodrawElementBase = Readonly<{
    id: string;
    x: number;
    y: number;
    strokeColor: string;
    backgroundColor: string;
    fillStyle: FillStyle;
    strokeWidth: number;
    strokeStyle: StrokeStyle;
    strokeSharpness: StrokeSharpness;  
    roughness: number;
    opacity: number;
    width: number;
    height: number;
    angle: number;
    seed: number;
    version: number;
    versionNonce: number;
    isDeleted: boolean;
    groupIds: readonly GroupId[];
    boundElementIds: readonly TusodrawLinearElement["id"][] | null;
}>



export type TusodrawLinearElement = _TusodrawElementBase & Readonly<{
    type: "line" | "arrow";
    points: readonly Point[];
    lastCommittedPoint: Point | null;
    startBinding: PointBinding | null;
    endBinding: PointBinding | null;
    startArrowhead: Arrowhead | null;
    endArrowhead: Arrowhead | null;
}>




export type TusodrawSelectionElement = _TusodrawElementBase & {
    type: "selection";
}



export type TusodrawRectangleElement = _TusodrawElementBase & {
    type: "rectangle";
};


export type TusodrawDiamondElement = _TusodrawElementBase & {
    type: "diamond";
};

export type TusodrawEllipseElement = _TusodrawElementBase & {
    type: "ellipse";
};



export type TusodrawTextElement = _TusodrawElementBase & Readonly<{
        type: "text";
        fontSize: number;
        fontFamily: FontFamilyValues;
        text: string;
        baseline: number;
        textAlign: TextAlign;
        verticalAlign: VerticalAlign;
}>;


export type TusodrawBindableElement = 
    | TusodrawRectangleElement 
    | TusodrawDiamondElement
    | TusodrawEllipseElement 
    | TusodrawTextElement 




export type PointBinding = {
    elementId: TusodrawBindableElement["id"];
    focus: number;
    gap: number;
};


export type TusoGenericElement = 
    | TusodrawSelectionElement
    | TusodrawRectangleElement
    | TusodrawDiamondElement
    | TusodrawEllipseElement





export type TusodrawElement = 
        | TusoGenericElement
        | TusodrawTextElement
        | TusodrawLinearElement
        | TusodrawFreeDrawElement
        

export type NonDeleted<TElement extends TusodrawElement> = TElement & {
    isDeleted: false;
  };


  
export type NonDeletedTusodrawElement = NonDeleted<TusodrawElement>;



export type TusodrawFreeDrawElement = _TusodrawElementBase & 
    Readonly<{
        type: "freedraw";
        points: readonly Point[];
        pressures: readonly number[];
        simulatePressure: boolean;
        lastCommittedPoint: Point | null;
}>;