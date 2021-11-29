import React from "react";


export type StackProps = {
    children: React.ReactNode, 
    gap?:number; 
    align?: "start" | "center" | "end" | "baseline";
    justifyContent?: "center" | "space-around" | "space-between";
    className?: string | boolean;
    style?:React.CSSProperties
}


