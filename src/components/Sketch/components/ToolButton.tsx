
import React, {} from 'react'
import clsx from "clsx";
import { ToolButtonProps} from '../../../@types/toolButton'
import { Button, TextField } from '@material-ui/core';
import { useTusoContainer } from '../../../context/container';







export const ToolButton = React.forwardRef((props:ToolButtonProps, ref) => {
    const { id: tusoId } = useTusoContainer()
    const innerRef = React.useRef(null);
    const sizeCn = `ToolIcon_size_${props.size}`;
    React.useImperativeHandle(ref, () => innerRef.current);

    if(props.type === "button" || props.type === "icon"){
        return (
            <button
                className={clsx( )}  
                data-testid={props["data-testid"]} 
                hidden={props.hidden}
                title={props.title}
                // aria-label={props["aria-label"]}
                onClick={props.onClick} 
                ref={innerRef}
                >
                    {(props.icon || props.label) && (
                        <div className="ToolIcon__icon" aria-hidden="true">
                            {props.icon || props.label}
                            {props.keyBindingLabel && (
                            <span className="ToolIcon__keybinding">
                                {props.keyBindingLabel}
                            </span>
                            )}
                        </div>

                    )}

                    {props.showAriaLabel && (
                        <h2>Hello</h2>
                    // <div className="ToolIcon__label">{props["aria-label"]}</div>
                    )}
                     {props.children}
                </button>
        )
    }

    return (
        <label className={clsx("ToolIcon", props.className)} title={props.title}>
            <input 
                className={`ToolIcon_type_radio ${sizeCn}`}
                type="radio"
                name={props.name}
                // aria-label={props["aria-label"]}
                aria-keyshortcuts={props["aria-keyshortcuts"]}
                data-testid={props["data-testid"]}
                id={`${tusoId}-${props.id}`}
                onChange={props.onChange}
                checked={props.checked}
                ref={innerRef}
            />
             <div className="ToolIcon__icon">
                {props.icon}
                {props.keyBindingLabel && (
                <span className="ToolIcon__keybinding">{props.keyBindingLabel}</span>
                )}
            </div>
        </label>
    )
})

ToolButton.defaultProps = {
    visible: true,
    className: "",
    size: "medium",
}