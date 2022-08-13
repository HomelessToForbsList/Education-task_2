import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddSubNoteForm(props) {

  const[value, setValue] = React.useState(props.openSubNoteForm.startValue)

  React.useEffect(()=>{
    props.openSubNoteForm.title === 'Edit Note' ? setValue(props.openSubNoteForm.startValue) : setValue('')
  },[props])

  const func = props.openSubNoteForm.title === 'Add SubNote' ? props.addSubNote : props.editNote



  return (
    <div>
      <Dialog open={props.openSubNoteForm.open} onClose={props.close} fullWidth={true}>
        <DialogTitle>{props.openSubNoteForm.title}</DialogTitle>
        <DialogContent>
          {props.openSubNoteForm.title === 'Add SubNote' ?
            <DialogContentText>
            Add new SubNote to: {props.openSubNoteForm.startValue}
          </DialogContentText>
          :null
          }
          <TextField
            autoFocus
            margin="dense"
            id="filled-basic"
            label=""
            fullWidth
            variant="outlined"
            multiline
            rows={3}
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close}>Cancel</Button>
          <Button onClick={
            props.openSubNoteForm.title === 'Edit Note' ?
            e => {func(props.openSubNoteForm.noteId,props.openSubNoteForm.isParent, value);setValue(''); props.close() }
            :
            e =>{func(props.openSubNoteForm.noteId, value);setValue(''); props.close()}
            }>
          {props.openSubNoteForm.title === 'Add SubNote' ? 'Add' : 'Edit'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
