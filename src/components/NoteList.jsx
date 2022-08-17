import * as React from 'react';
import Box from '@mui/material/Box';


import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse';


import Note from './Note'



export default function NoteList(props) {

  const [visibleSubNotes, setVisibleSubNotes] = React.useState(false)


  // setTimeout(() => {
  //   setVisible(true)
  // }, 3000);

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <TransitionGroup>
        {props.notes.map((item, index, array) => (
            <Collapse key={ item.id} timeout={500} sx={{ ml: '20px',display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <Note
                key={item.text + Math.random()}
                isParent={props.isParent}
                counter={item.subNotes.length}
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
                setVisibleSubNotes={setVisibleSubNotes}
              />
              <TransitionGroup>
              {item.subNotes.length && visibleSubNotes ? [item].map(obj =>
              <Collapse  key={obj.id} timeout={500} >
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
