import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PaletteIcon from '@mui/icons-material/Palette';
import LogoutIcon from '@mui/icons-material/Logout';

import LogInForm from './LogInForm'

export default function Header(props) {

  const defaultProfile = {
    "id": null,
    "firstName": "",
    "lastName": "",
    "password": "",
    "notes": []
  }



  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={e => props.changeTheme(!props.theme)}
          >
            <PaletteIcon/>
          </IconButton>
          <Typography  component="div" sx={{ flexGrow: 1 }}>
            Change Theme
          </Typography>
          <Typography  component="h2" sx={{ flexGrow: 1 }}>
            Hello, {props.firstName ?  props.firstName : 'friend'}!
          </Typography>
          <Button color="inherit" onClick={e => {props.setProfile(defaultProfile); localStorage.removeItem('accountId')}}><LogoutIcon/></Button>
          <LogInForm 
          setProfile={props.setProfile}
          notes={props.notes}
          profileId={props.profileId}
          handleClickSnackBar={props.handleClickSnackBar}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
