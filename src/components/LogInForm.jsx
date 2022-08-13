import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';



export default function LogInForm() {
  const [open, setOpen] = React.useState(false);
  const [operation, setOperation] = React.useState('LogIn');

  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false); setOperation('LogIn')}


  const handleSwitchChange = (event) => {
    setOperation(operation === 'LogIn' ?  'SingUp' : 'LogIn')
  };

  const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  return (
    <div>
      <Button color="inherit" onClick={handleOpen}>
        <AccountCircleIcon/>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" sx={boxStyle} autoComplete="off">
          <FormGroup sx={{flexDirection: 'row', flexWrap: 'nowrap'}}>
          <Typography align='center' sx={{my:'auto', mr:2}}>Log In</Typography>
            <FormControlLabel control={<Switch onChange={handleSwitchChange} />} label='SingUp' />
          </FormGroup>
          <TextField
          id="filled-firstName"
          label="FirstName"
          variant="filled"
          sx={{display: operation === 'SingUp' ? 'flex' : 'none',
          flexGrow: 1,
          mb: 2,}}
        />
          <TextField
          id="filled-lastName"
          label="LastName"
          variant="filled"
          sx={{display: operation === 'SingUp' ? 'flex' : 'none',
          flexGrow: 1,
          mb: 2,}}
          />
          <TextField
            error={false}
            id="filled-email"
            label="Email"
            variant="filled"
            autoComplete="off"
            sx={{ display: 'flex', flexGrow: 1, mb: 2 }}
          />
          <TextField
            error={false}
            id="filled-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="filled"
            sx={{ display: 'flex', flexGrow: 1, mb: 2 }}
          />
          {operation === 'LogIn' ? <Button color="inherit" sx={{ width: '100%'}}>Log In</Button> :
          <Button color="inherit" sx={{ width: '100%'}}>Create new account</Button>}
        </Box>
      </Modal>
    </div>
  );
}
