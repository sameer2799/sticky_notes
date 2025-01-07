import React, { useContext } from "react";
import { NoteContext } from "../context/NoteProvider.jsx";
import custom_db from "../firebase/db_wrapper";

const Color = ({ color }) => {
    const { notes, setNotes, selectedNote } = useContext(NoteContext);
    
    const changeColor = () => {
        
        try {
            const currentNoteIndex = notes.findIndex(
                (note) => note.$id === selectedNote.$id
            );

            const updatedNote = {
                ...notes[currentNoteIndex],
                colors: JSON.stringify(color),
            };

            const newNotes = [...notes];
            newNotes[currentNoteIndex] = updatedNote;
            setNotes(newNotes);

            custom_db.stickyNotesDB.update(selectedNote.$id, { colors: JSON.stringify(color) } );

        } catch (error) {
            alert("Select a note first");
        }
    };
 
    return (
        <div
            onClick={changeColor}
            className="color"
            style={{ backgroundColor: color.colorHeader }}
        ></div>
    );
};

export default Color;