import * as React from 'react';
import Box from '@mui/material/Box';


import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse';


import Note from './Note'



export default function NoteList(props) {

  return (
    <Box sx={{ mt: 1 }}>
        <TransitionGroup>
        {props.notes.map((item, index, array) => (
            <Collapse key={ item.text} timeout={700} sx={{mb:'10px', ml: '20px'}}>
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
              />
              <TransitionGroup>
              {item.subNotes.length ? [item].map(obj =>
              <Collapse key={obj.text} timeout={700} >
                  <NoteList
                    isParent={false}
                    notes={obj.subNotes}
                    theme={props.theme}
                    deleteNote={props.deleteNote}
                    replaceNote={props.replaceNote}
                    deleteSubNotes={props.deleteSubNotes}
                    openSubNoteForm={props.openSubNoteForm}
                    handleClickSnackBar={props.handleClickSnackBar}
                  />
                </Collapse>
              ) : null}
              </TransitionGroup>
            </Collapse>
          ))}
        </TransitionGroup>
    </Box>
  );
}
