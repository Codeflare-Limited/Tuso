
import { TusodrawElement } from "../@types/element";
import { TusodrawState, LibraryItems} from "../@types/types";



export interface ImportedDataState {
    type?:string;
    version: number; 
    source?:string; 
    elements?: readonly TusodrawElement[] | null;
    appState?: Readonly<Partial<TusodrawState>> | null; 
    scrollToContent?: boolean;
    libraryItems?: LibraryItems;
}