
import { useIsMobile } from '../../../context/container';
import { ToolButton } from './ToolButton';
import Stack from './Stack';
import LibraryUnit from './LibraryUnit';
import { LibraryItems, LibraryItem,  TusodrawProps, TusodrawState} from '../../../@types/types';
import Library from '../../../data/library'
import { load, trash, exportFile } from './icons' 
import { t } from '../../../i18n'



const LibraryMenuItems = ({
    libraryItems,
    onRemoveFromLibrary,
    onAddToLibrary,
    onInsertShape,
    pendingElements,
    theme,
    setAppState,
    setLibraryItems,
    libraryReturnUrl,
    focusContainer,
    library,
    id,
}: {
    libraryItems: LibraryItems;
    pendingElements: LibraryItem;
    onRemoveFromLibrary: (index: number) => void;
    onInsertShape: (elements: LibraryItem) => void;
    onAddToLibrary: (elements: LibraryItem) => void;
    theme: TusodrawState["theme"];
    setAppState: React.Component<any, TusodrawState>["setState"];
    setLibraryItems: (library: LibraryItems) => void;
    libraryReturnUrl: TusodrawProps["libraryReturnUrl"];
    focusContainer: () => void;
    library: Library;
    id: string;
}) => {

    const isMobile = useIsMobile()
    const numCells = libraryItems.length + (pendingElements.length  > 0 ? 1 : 0); //
    const CELLS_PER_ROW = isMobile ? 4 : 6;
    const numRows = Math.max(1, Math.ceil(numCells / CELLS_PER_ROW));
    const rows = [];
    let addedPendingElements = false;

    const referrer = "heloapp"

    rows.push(
        <div className="layer-ui__library-header" key="library-header">
          <ToolButton
            key="import"
            type="button"
            title={("buttons.load")} //missing t
            aria-label={t("buttons.load")}
            icon={load}
            onClick={() => {
              // importLibraryFromJSON(library)
              //   .then(() => {
              //     // Close and then open to get the libraries updated
              //     setAppState({ isLibraryOpen: false });
              //     setAppState({ isLibraryOpen: true });
              //   })
              //   .catch(muteFSAbortError)
              //   .catch((error) => {
              //     setAppState({ errorMessage: error.message });
              //   });
            }}
          />
         
            <>
              <ToolButton
                key="export"
                type="button"
                title={t("buttons.export")}
                aria-label={t("buttons.export")}
                icon={exportFile}
                onClick={() => {
                  // saveLibraryAsJSON(library)
                  //   .catch(muteFSAbortError)
                  //   .catch((error) => {
                  //     setAppState({ errorMessage: error.message });
                  //   });
                }}   
              />
              <ToolButton
                key="reset"
                type="button"
                title={t("buttons.resetLibrary")}
                aria-label={t("buttons.resetLibrary")}
                icon={trash}
                onClick={() => {
                  if (window.confirm(t("alerts.resetLibrary"))) {
                    // library.resetLibrary();
                    setLibraryItems([]);
                    focusContainer();
                  }
                }}
              />
            </>
          <a
            href={`https://libraries.excalidraw.com?target=${
              window.name || "_blank"
            }&referrer=${referrer}&useHash=true&token=${id}&theme=${theme}`}
            target="_excalidraw_libraries"
          >
            {t("labels.libraries")}   
          </a>
        </div>
    );

    
    for (let row = 0; row < numRows; row++) {
        const y = CELLS_PER_ROW * row;
        const children = [];
        for (let x = 0; x < CELLS_PER_ROW; x++) {
        const shouldAddPendingElements: boolean =
            10 > 0 &&
            !addedPendingElements &&
            y + x >= libraryItems.length;
        addedPendingElements = addedPendingElements || shouldAddPendingElements;

        children.push(
            <Stack.Col key={x}>
                <LibraryUnit 
                    elements={libraryItems[y + x]}
                    pendingElements={
                      shouldAddPendingElements ? pendingElements : undefined
                    }
                    onRemoveFromLibrary={onRemoveFromLibrary.bind(null, y + x)}
                    onClick={
                        shouldAddPendingElements
                            ? onAddToLibrary.bind(null, pendingElements)
                              : onInsertShape.bind(null, libraryItems[y + x])
                    }
                /> 
            </Stack.Col>,
        );
    }

        rows.push(
          <Stack.Row align="center" gap={1} key={row}>
              {children}
          </Stack.Row>,
        );
    }

    return (
      <Stack.Col align="start" gap={1} className="layer-ui__library-items">
          {rows}
      </Stack.Col>
    )
    
}

export default LibraryMenuItems; 