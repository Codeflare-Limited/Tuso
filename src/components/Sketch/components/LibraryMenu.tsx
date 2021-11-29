
import {
    useCallback, 
    useRef, 
    useState
} from 'react'

import { Island } from './Island';
import { ToolButton } from "./ToolButton";
import Stack from './Stack'
import { useIsMobile } from '../../../context/container'
import LibraryUnit from './LibraryUnit'
import LibraryMenuItems from "./LibraryMenuItems";
import { LibraryItem, LibraryItems, TusodrawProps, TusodrawState} from '../../../@types/types';
import Library from '../../../data/library'
import { t } from '../../../i18n'


const LibraryMenu = ({ 
    onClickOutside,
    onInsertShape,
    pendingElements,
    onAddToLibrary,
    theme,   
    setAppState,
    libraryReturnUrl,
    focusContainer,
    library,
    id,
}: {
    pendingElements: LibraryItem;
    onClickOutside: (event: MouseEvent) => void;
    onInsertShape: (elements: LibraryItem) => void;
    onAddToLibrary: () => void;
    theme: TusodrawState["theme"];
    setAppState: React.Component<any, TusodrawState>["setState"];
    libraryReturnUrl: TusodrawProps["libraryReturnUrl"];
    focusContainer: () => void;
    library: Library;
    id: string;
}) => {     

    const ref = useRef<HTMLDivElement | null>(null); 
    const [ libraryItems, setLibraryItems ] = useState<LibraryItems>([]);
    const [loadingState, setIsLoading] = useState<"preloading" | "loading" | "ready">("preloading")


    const addToLibrary = useCallback( async (element: LibraryItem) => {

    }, [])

    const removeFromLibrary = useCallback( async (indexToRemove) => {

    }, [])   
  
    return (
            <LibraryMenuItems
                libraryItems={libraryItems}
                onRemoveFromLibrary={removeFromLibrary}
                onAddToLibrary={addToLibrary}
                onInsertShape={onInsertShape}
                pendingElements={pendingElements}
                setAppState={setAppState}
                setLibraryItems={setLibraryItems}
                libraryReturnUrl={libraryReturnUrl}
                focusContainer={focusContainer}
                library={library}
                theme={theme}
                id={id}
              />
  
        )   
}

export default LibraryMenu