
import {
    NonDeletedTusodrawElement, 
    NonDeleted, 
    PointBinding, 
    TusodrawBindableElement,
    TusodrawElement, 
    TusodrawLinearElement
} from './element'



export type SuggestedBinding = 
    | NonDeleted<TusodrawElement>
    | SuggestedPointBinding;


    
export type SuggestedPointBinding = [
    | NonDeleted<TusodrawLinearElement>, 
    "start" | "end" | "both", 
    NonDeleted<TusodrawBindableElement>    
]
    