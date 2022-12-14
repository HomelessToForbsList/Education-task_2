import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';



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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        mt: '10px',
        flex: '1 1 600px',
        borderRadius: 1
      }}
    >
      <Box className='note' sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Typography variant="h5" gutterBottom component="div" mx={4} my='auto' sx={{ display: 'flex', flexGrow: 3, minWidth: '200px', maxWidth: '500px' }}>
          {props.note}
        </Typography>
        <Box className='btn_box' sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          {props.counter !== 0 &&
            <Box sx={{ position: 'relative' }}>
              <IconButton
                size="large"
                edge={false}
                color="inherit"
                aria-label={'visibility' + props.note}
                disableRipple={true}
                onClick={e => props.changeVisibility(props.index)}
              >
                {props.visibleSubNotes[props.index] ?
                  <VisibilityOffIcon fontSize="inherit" /> :
                  <VisibilityIcon fontSize="inherit" />}
              </IconButton>
              {!props.visibleSubNotes[props.index] &&
                <Box sx={{ position: 'absolute', top: 7, right: 7, mx: 0, width: '17px', height: '17px', borderRadius: '50%', backgroundColor: 'primary.main', display: 'flex', justifyContent: 'center' }}>
                  <Typography variant="caption" gutterBottom component="div" my='auto' sx={{ color: '#fff', lineHeight: 'normal' }} >
                    {props.counter}
                  </Typography>
                </Box>}
            </Box>
          }
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

          <NoteMenu
            theme={props.theme}
            openSubNoteForm={props.openSubNoteForm}
            note={props.note}
            noteId={props.noteId}
            isParent={props.isParent}
            deleteSubNotes={props.deleteSubNotes}
            handleClickSnackBar={props.handleClickSnackBar}
            hasSubNotes={Boolean(props.arr[props.index].subNotes.length)}
          />
          <IconButton
            size="large"
            edge={false}
            color="inherit"
            aria-label={'delete' + props.note}
            onClick={handleClickOpen}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Box>
      </Box>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete this note?"}
          </DialogTitle>
          <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', px: '16px' }}>
            <Button onClick={handleClose} >Disagree</Button>
            <Button variant="contained" onClick={e => props.deleteNote(props.noteId, props.isParent)} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  );
}

