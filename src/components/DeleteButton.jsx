import React, { useContext } from 'react';
import Trash from '../icons/Trash';
import custom_db from '../firebase/db_wrapper';
import { NoteContext } from '../context/NoteProvider';

const DeleteButton = ({ noteId }) => {
    const {setNotes } = useContext(NoteContext);

    const handleDelete = async (e) => {
        custom_db.stickyNotesDB.delete(noteId);
        setNotes((prevStates) => 
            prevStates.filter((note) => note.$id !== noteId));
    };

    return (
        <div onClick={handleDelete}>
            <Trash />
        </div>
    )
}

export default DeleteButton