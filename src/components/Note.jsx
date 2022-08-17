import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Badge from '@mui/material/Badge';



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
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        mt: '10px',
        flex: '1 1 600px',
        borderRadius: 1
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
      <Typography variant="h5" gutterBottom component="div" mx={2} my='auto' sx={{ display: 'flex', flexGrow: 1 }}>
        {props.note}
      </Typography>
      <Badge 
        color='success'
        badgeContent={props.counter}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}>
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
            setVisibleSubNotes={props.setVisibleSubNotes}
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
      </Badge>
    </Box>
  );
}
