import React, { useState } from 'react';
import { isArrowKey, KEYS } from "../../../keys"; 
import Picker from './Picker'; 

import './IconPicker.scss' ; 



export function IconPicker<T>({
    value,
    label,
    options,
    onChange,
    group = "",
  }: {
    label: string;
    value: T;
    options: { value: T; text: string; icon: JSX.Element; keyBinding: string }[];
    onChange: (value: T) => void;
    group?: string;
  }) {

    return (
        <label className={"picker-container"}>
            
        </label>
    )
}