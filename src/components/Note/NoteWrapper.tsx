
import { FC, useEffect, useState } from 'react'; 
import INote from '../../interface/note.interface';
import Note from './Note'; 
import { Button, Modal, FormControl, FormLabel, Container} from '@material-ui/core'




const NoteWrapper:FC = () => {
    const [noteList, setNoteList] = useState<Array<INote>>([]);
    const [showAddNoteModal, setShowAddNoteModal] = useState(false) 
    const [newNote, setNewNote] = useState<Partial<INote>>({
        link: "", 
        text: ""
    })
     

    const handleShowAddModal = () => setShowAddNoteModal(true); 
    useEffect(() => {
        ///POPULATE ALL THE NOTE HERE
    }, [])


    const handleShowModel = () => {
        
    }
    

    return (
        //
        <div className="App">
            <Button variant="outlined" className="add-button" onClick={handleShowModel}>
                <div className="add-button-text">+</div>
            </Button>

            {/* <Modal contentEditable={showAddNoteModal}>
                <Modal>
                    <h2>Add Note</h2>
                </Modal>
       
                <Container>  
                    <FormLabel controlId="floatingTextarea" label="Text">
                        <FormControl  onChange={(event) => } => {
                            const newVal = event.currentTarget.value; 
                            setNewNote({
                                ...newNote, 
                                Text: newVal
                            })}
                            as="textarea"
                            placeholder="Your Note Today"
                            
                        }>      

                        </FormControl>
                    </FormLabel>
                </Container>
            </Modal> */}
        </div>
    )
}


export default NoteWrapper 