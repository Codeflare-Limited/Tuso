
import React from "react";

export type ToolButtonSize = "small" | "medium";

export type ToolButtonBaseProps =  {
    icon?: React.ReactNode;
    // "aria-label": string;
    "aria-keyshortcuts"?: string;
    "data-testid"?: string;
    label?: string;
    title?: string;
    name?: string;
    id?: string;
    size?: ToolButtonSize;
    keyBindingLabel?: string;
    showAriaLabel?: boolean;
    hidden?: boolean;
    visible?: boolean;
    selected?: boolean;
    className?: string;
} 





export type ToolButtonProps =
    | (ToolButtonBaseProps & {
        type: "button";
        children?: React.ReactNode;
        onClick?(): void;
    })
    | (ToolButtonBaseProps & {
        type: "icon";
        children?: React.ReactNode;
        onClick?(): void;
    })
    | (ToolButtonBaseProps & {
        type: "radio";
        checked: boolean;
        onChange?(): void;
  });