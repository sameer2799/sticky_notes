import { useState, useEffect, createContext } from "react";
import Spinner from "../icons/Spinner";
import custom_db from "../firebase/db_wrapper";



export const NoteContext = createContext();

const NoteProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    
    const init = async () => {
        const nots = await custom_db.stickyNotesDB.list();
    
        setNotes(nots);
        setLoading(false);
    };

    const contextData = { notes, setNotes, selectedNote, setSelectedNote };
    
    useEffect(() => {
        init();
    }, []);
    
    return (
        <NoteContext.Provider value={contextData}>
            {loading ? 
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <Spinner />
                </div>
                 : children}
        </NoteContext.Provider>
    );
};

export default NoteProvider;