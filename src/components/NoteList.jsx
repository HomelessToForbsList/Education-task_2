import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import Note from './Note'



export default function NoteList(props) {

  return (
    <Box sx={{ width: '100%', mt: 3 }}>
      <Stack spacing={2}>
        {
          props.notes.map((item) => (
            <div key={item.text} style={{marginLeft: '5%'}}>
            <Note
            key={item.text}
            isParent={props.isParent}
            note={item.text}
            theme={props.theme}
            deleteNote={props.deleteNote}
            openSubNoteForm={props.openSubNoteForm}>
            </Note>
            {item.subNotes.length ? [item].map(obj =>
            <NoteList
            key={obj.text}
            isParent={false}
            notes={obj.subNotes}
            theme={props.theme}
            deleteNote={props.deleteNote}
            openSubNoteForm={props.openSubNoteForm}/>) : null}
            </div>
          )
        )
        }
      </Stack>
    </Box>
  );
}
