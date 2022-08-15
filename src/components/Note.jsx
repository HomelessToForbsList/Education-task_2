import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';


import NoteMenu from './NoteMenu'

export default function Note(props) {

  function isFirst(arr, index) {
    if (index === 0) return true
    else return false
  }

  function isLast(arr, index) {
    if (index === arr.length - 1) return true
    else return false
  }


  return (
    <Box
      sx={{
        maxWidth: 1,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row'
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 52 }}>
        <IconButton
          size="large"
          edge={false}
          color="inherit"
          aria-label={'up' + props.note}
          disableRipple={true}
          disabled={isFirst(props.arr, props.index)}
          onClick={e => props.replaceNote(props.isParent, props.noteId, 'up')}
        >
          <ExpandLessIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          size="large"
          edge={false}
          color="inherit"
          aria-label={'down' + props.note}
          disableRipple={true}
          disabled={isLast(props.arr, props.index)}
          onClick={e => props.replaceNote(props.isParent, props.noteId, 'down')}
        >
          <ExpandMoreIcon fontSize="inherit" />
        </IconButton>
      </Box>
      <Typography variant="h5" gutterBottom component="div" mx={2} mt={2} sx={{ display: 'flex', flexGrow: 1 }}>
        {props.note}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 52 }}>
        <NoteMenu
          theme={props.theme}
          openSubNoteForm={props.openSubNoteForm}
          note={props.note}
          noteId={props.noteId}
          isParent={props.isParent}
          deleteSubNotes={props.deleteSubNotes}
          handleClickSnackBar={props.handleClickSnackBar}
          TransitionUp={props.TransitionUp}
        />
        <IconButton
          size="large"
          edge={false}
          color="inherit"
          aria-label={'delete' + props.note}
          onClick={e => props.deleteNote(props.noteId, props.isParent)}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </Box>
    </Box>
  );
}
