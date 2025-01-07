import React, { useState, useRef, useEffect, useContext } from 'react'
import DeleteButton from './DeleteButton.jsx';
import Spinner from "../icons/Spinner";
import { setOffset, autoGrow, setZIndex, bodyParser } from "../utils.js";
import custom_db from '../firebase/db_wrapper.js';
import { NoteContext } from '../context/NoteProvider.jsx';


const NoteCard = ({ note }) => {
    let mouseStartPos = { x: 0, y: 0 };

    const { setSelectedNote } = useContext(NoteContext);

    const textareaRef = useRef(null);
    const cardRef = useRef(null);

    const [ saving, setSaving ] = useState(false);
    const keyUpTimer = useRef(null);

    const body = bodyParser(note.body);
    const [ position, setPosition ] = useState(JSON.parse(note.position));
    const colors = JSON.parse(note.colors);
    

    const mouseDown = (e) => {
        if (e.target.className === 'card-header') {
            setSelectedNote(note);
            setZIndex(cardRef.current);
    
            mouseStartPos.x = e.clientX;
            mouseStartPos.y = e.clientY;
         
            document.addEventListener("mousemove", mouseMove);
            document.addEventListener("mouseup", mouseUp);
        }
    };

    const mouseMove = (e) => {
        const mouseMoveDir = {
            x: e.clientX - mouseStartPos.x,
            y: e.clientY - mouseStartPos.y
        };

        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;
        
        const newPos = setOffset(cardRef.current, mouseMoveDir);

        setPosition(newPos);
    }

    const mouseUp = () => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);

        const newPos = setOffset(cardRef.current);
        saveData('position', newPos);
        
    }

    const saveData = (key, value) => {
        const payLoad = { [key]: JSON.stringify(value) };
        try {
            custom_db.stickyNotesDB.update(note.$id, payLoad);
        } catch (error) {
            console.error(error);
        }
        setSaving(false);
    }
    
    const handleKeyUp = () => {
        setSaving(true);

        if (keyUpTimer.current) {
            clearTimeout(keyUpTimer.current);
        }

        keyUpTimer.current = setTimeout(() => {
            saveData('body', textareaRef.current.value);
        }, 2000);
    };
    useEffect(() => {
        autoGrow(textareaRef);
        setZIndex(cardRef.current);
    }, []);

    return (
        <div ref={cardRef} className='card' style={{backgroundColor: colors.colorBody, left: `${position.x}px`, top: `${position.y}px`}}>
            
            <div onMouseDown={mouseDown} onMouseUp={mouseUp} className='card-header' style={{backgroundColor: colors.colorHeader}}>
                <DeleteButton noteId={note.$id}/>
                {
                    saving && (
                        <div className='card-saving'>
                            <Spinner color={ colors.colorText }/>
                            <span style={{ color: colors.colorText }}>Saving...</span>
                        </div>
                    )
                }
            </div>
            <div className='card-body'>
                <textarea
                    onFocus={() => {
                        setZIndex(cardRef.current);
                        setSelectedNote(note);
                    }}
                    ref={textareaRef}
                    onKeyUp={handleKeyUp}
                    style={{color: colors.colorText}}
                    defaultValue={body}
                    onInput={() => {
                        autoGrow(textareaRef);
                   }}>
                </textarea>
            </div>
        </div>
    )
}

export default NoteCard;