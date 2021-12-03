import React, { useState } from "react"
import { useSketchAppContainer } from './S_Main'; 

import './ProjectName.scss'; 

type Props = {
    value: string;
    onChange: (value: string) => void;
    label: string;
    isNameEditable: boolean;
}



export const ProjectName = (props: Props) => {
    const [fileName, setFileName] = useState<string>(props.value); 
    const { id } = useSketchAppContainer()

    const handleBlur = (event: any) => {
        const value = event.target.value;
        if (value !== props.value) {
            props.onChange(value);
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if(event.key === "Enter"){
            event.preventDefault()
        }

        if(event.nativeEvent.isComposing || event.keyCode === 23){
            return 
        }

        event.currentTarget.blur(); 
       
    }
    
    return (
        <div className="ProjectName">
            <label className="ProjectName-label" htmlFor="filename">
                {`${props.label}${props.isNameEditable ? "" : ":"}`}
            </label>
            {props.isNameEditable ? (
                <input
                    className="TextInput" 
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    id={`${id}-filename`}
                    value={fileName}
                    onChange={(event) => setFileName(event.target.value)}
                />
            ): (
                <span className="TextInput TextInput--readonly" id={`${id}-filename`}>
                        {props.value}
              </span>
            )}
        </div>
    )
}