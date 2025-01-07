import { useRef } from "react";
import Plus from "../icons/Plus";
import { useContext } from "react";
import { NoteContext } from "../context/NoteProvider";
import custom_db from "../firebase/db_wrapper";
import colors from "../assets/colors";


const AddButton = () => {
    const startingPosition = useRef(10);
    const { setNotes } = useContext(NoteContext);

    const addNote = () => {
        const newNote = {
            body: "",
            position: JSON.stringify({ x: startingPosition.current, y: startingPosition.current }),
            colors: JSON.stringify(colors[0]),
        };

        const response = custom_db.stickyNotesDB.add(newNote);
        
        response.then((data) => {
            setNotes((prevNotes) => [...prevNotes, data]);
        });
        startingPosition.current += 20;
    };



    return (
        <div id="add-btn" onClick={addNote}>
            <Plus />
        </div>
    );
};

export default AddButton;