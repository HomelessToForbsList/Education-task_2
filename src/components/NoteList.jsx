import * as React from 'react';
import Box from '@mui/material/Box';



import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse';


import Note from './Note'



export default function NoteList(props) {

  const arr =[]

  for(let i =0 ; i < props.notes.length; i++){
    arr.push(true)
  }

  const [visibleSubNotes, setVisibleSubNotes] = React.useState(arr)

  function changeVisibility(index){
    visibleSubNotes[index] = !visibleSubNotes[index]
    const newArr = visibleSubNotes.concat()
    setVisibleSubNotes(newArr)
  }


  return (
    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <TransitionGroup>
        {props.notes.map((item, index, array) => (
            <Collapse className='notelist' key={ item.id} timeout={500} sx={{ ml: '20px',display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
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
                visibleSubNotes={visibleSubNotes}
                changeVisibility={changeVisibility}
              />
              <TransitionGroup>
              {item.subNotes.length && visibleSubNotes[index]  ? [item].map(obj =>
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
