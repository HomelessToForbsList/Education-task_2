import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


import { deepPurple, indigo } from '@mui/material/colors';



export default function NoteMenu(props) {

  const options = [
    'Edit',
    'Remove Subnotes',
    'Add Subnote'
  ];
  
  const functions = [
    () => props.openSubNoteForm(props.note, 'Edit Note',props.note, props.isParent),
    () => console.log('Remove subNotes'),
    () => props.openSubNoteForm(props.note, 'Add SubNote',props.note, props.isParent)
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
        ={{style:{
          backgroundColor: props.theme ? indigo[600] : deepPurple[500],
          maxWidth: 300,
          right: "20px",
          left:0,
          color: 'white'
        }}}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={e =>{functions[options.indexOf(option)](); handleClose()}}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

//={props.theme ? noteMenuBlueStyle : noteMenuPurpleStyle}
