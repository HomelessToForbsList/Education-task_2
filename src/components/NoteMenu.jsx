import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { deepPurple, indigo } from '@mui/material/colors';


export default function NoteMenu(props) {

  const options = props.hasSubNotes ? [
    'Edit',
    'Add Subnote',
    'Remove Subnotes'
  ] : ['Edit','Add Subnote',]

  const functions = [
    () => props.openSubNoteForm(props.note, 'Edit Note', props.noteId, props.isParent),
    () => props.openSubNoteForm(props.note, 'Add SubNote', props.noteId, props.isParent),
    () => { props.deleteSubNotes(props.isParent, props.noteId); props.handleClickSnackBar('success', 'SubNotes removed!') },
  ]


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  return (
    <div>
      <IconButton
        size="large"
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps
        ={{
          style: {
            backgroundColor: props.theme ? indigo[600] : deepPurple[500],
            maxWidth: 300,
            right: "20px",
            color: 'white'
          }
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={e => { functions[options.indexOf(option)](); handleClose() }}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}


