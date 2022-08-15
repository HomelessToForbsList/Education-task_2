import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import Note from './Note'



export default function NoteList(props) {

  return (
    <Box sx={{ width: '100%', mt: 3 }}>
      <Stack spacing={2}>
        {
          props.notes.map((item,index,array) => (
            <div key={item.text + Math.random()} style={{marginLeft: '5%'}}>
            <Note
            key={item.text + Math.random()}
            isParent={props.isParent}
            note={item.text}
            noteId={item.id}
            arr={array}
            index={index}
            theme={props.theme}
            deleteNote={props.deleteNote}
            replaceNote={props.replaceNote}
            deleteSubNotes={props.deleteSubNotes}
            openSubNoteForm={props.openSubNoteForm}
            handleClickSnackBar={props.handleClickSnackBar}
            TransitionUp={props.TransitionUp}
            >
            </Note>
            {item.subNotes.length ? [item].map(obj =>
            <NoteList
            key={obj.text + +Math.random()}
            isParent={false}
            notes={obj.subNotes}
            theme={props.theme}
            deleteNote={props.deleteNote}
            replaceNote={props.replaceNote}
            deleteSubNotes={props.deleteSubNotes}
            openSubNoteForm={props.openSubNoteForm}
            handleClickSnackBar={props.handleClickSnackBar}
            TransitionUp={props.TransitionUp}
            />) : null}
            </div>
          )
        )
        }
      </Stack>
    </Box>
  );
}
