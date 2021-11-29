import React from 'react'


function Picker<T>({ 
            options, 
            value, 
            label, 
            onChange,    
            onClose}: { 
                label: string; 
                value: T, 
                options: { value: T; text: string; icon: JSX.Element, keyBinding: string} []; 
                onChange: (value: T) => void; 
                onClose: () => void;  
        
        }) {    

            return (
                <div className={`picker`}>

                </div>
            )
    
}
   

export default Picker