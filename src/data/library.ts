

import { LibraryItem, LibraryItems } from '../@types/types';
import type SketchMain from '../components/Sketch/components/S_Main'


class Library {
    private libraryCache: LibraryItem | null = null
    private app: SketchMain;

    constructor(app: SketchMain) {
        this.app = app
    }


    reserLibrary = async () => {
        await this.app.props.onLibraryChange?.([])
        this.libraryCache = []; //set it to an empty array
    }

    saveLibrary = async (items: LibraryItems) => {
        const prevLibraryItems = this.libraryCache;
        try {
            const serializedItems = JSON.stringify(items);
             // cache optimistically so that the app has access to the latest
            // immediately
            this.libraryCache = JSON.parse(serializedItems);
        } catch (error) {
            this.libraryCache = prevLibraryItems;
            throw error;
        }
    }
}


export default Library; 