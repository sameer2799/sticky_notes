import React, { useState, useEffect, useContext } from 'react';
// import { fakeData as notes } from '../assets/fakeData.js';

import NoteCard from '../components/NoteCard.jsx';
import { NoteContext } from '../context/NoteProvider.jsx';
import Controls from '../components/Controls.jsx';

const NotePage = () => {
  const { notes } = useContext(NoteContext);
  return (
    <div>
        {notes.map((note) => (
            <NoteCard key={note.$id} note={note} />
        ))}
        <Controls />
    </div>
  )
}

export default NotePage