import { FC, FocusEvent, useState } from 'react'; 
import INote from '../../interface/note.interface';
import { Button } from '@material-ui/core'


type Props = {
    note: INote, 
    onNoteUpdate: (note: INote) => void; 
    onNoteDelete: (note: INote) => void; 
}; 


const Note: FC<Props> = ({ note, onNoteUpdate, onNoteDelete}) => {
    const [isFocused, setIsFocused ] = useState(false); 


    const noteTextUpdated = (event: FocusEvent<HTMLDivElement>) => {
        setIsFocused(false); 
        const newTextValue = event.currentTarget.textContent; 
        if(newTextValue == note.text){
            return 
        }

        console.log('note text changed...'); 
        const updateNoteObject: INote = {
            ...note, 
            text: newTextValue || " "
        }; 

        onNoteUpdate(updateNoteObject);
     }

    return (
        <div className={isFocused ? "note note--focused": "note"}>
            <Button className="btn-close" onClick={() => onNoteDelete(note)}>
                
            </Button>

            <div onBlur={noteTextUpdated} onFocus={() => setIsFocused(true)}>

            </div>

            <div className="note__link">
                <a href={note.link}></a>
            </div>

            {/* <button onClick={() => {
                onNoteDelete(note); 
                }} type="button" className="btn-close" aria-label="Close">

            </button>

            <div onBlur={noteTextUpdated} onFocus={() => setIsFocused(true)} contentEditable={true} 
                    suppressContentEditableWarning={true} className={note.text}>
               <h3>Hello</h3>
            </div>
            <div className="note__link">
                <a href={note.link}>link</a>
            </div> */}
        </div>
    )
}


export default Note; 