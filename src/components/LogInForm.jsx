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
import axios from 'axios';


const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  minWidth: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 3,
};


export default function LogInForm(props) {
  const [open, setOpen] = React.useState(false);
  const [operation, setOperation] = React.useState('LogIn');

  const handleSwitchChange = () => {
    setOperation(operation === 'LogIn' ? 'SingUp' : 'LogIn')
  };

  let [firstName, setFirstName] = React.useState('')
  let [lastName, setLastName] = React.useState('')
  let [email, setEmail] = React.useState('')
  let [password, setPassword] = React.useState('')

  let [firstNameFocus, setFirstNameFocus] = React.useState(false)
  let [lastNameFocus, setLastNameFocus] = React.useState(false)
  let [emailFocus, setEmailFocus] = React.useState(false)
  let [passwordFocus, setPasswordFocus] = React.useState(false)

  let [firstNameError, setFirstNameError] = React.useState('')
  let [lastNameError, setLastNameError] = React.useState('')
  let [emailError, setEmailError] = React.useState('')
  let [passwordError, setPasswordError] = React.useState('')
  let [formValid, setFormValid] = React.useState(false)

  const addFirstName = (e) => {
    setFirstName(e.target.value)
    if (e.target.value.length === 0) setFirstNameError('First Name cannot be empty')
    else setFirstNameError('')
  }

  const addLastName = (e) => {
    setLastName(e.target.value)
    if (e.target.value.length === 0) setLastNameError('Last Name cannot be empty')
    else setLastNameError('')
  }

  const addEmail = (e) => {
    setEmail(e.target.value)
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (e.target.value.length === 0) setEmailError('Email cannot be empty')
    else if (!re.test(String(e.target.value).toLocaleUpperCase()))
      setEmailError('Wrong E-mail')
    else setEmailError('')
  }

  const addPassword = (e) => {
    setPassword(e.target.value)
    if (e.target.value.length === 0) setPasswordError('Password cannot be empty')
    else setPasswordError('')
  }

  const blurFirstName = () => {
    setFirstNameFocus(false)
    if (firstName.length <= 0) setFirstNameError('First Name cannot be empty')
  }

  const focusFirstName = () => {
    setFirstNameFocus(true)
  }

  const blurLastName = () => {
    setLastNameFocus(false)
    if (lastName.length <= 0) setLastNameError('Last Name cannot be empty')
  }

  const focusLastName = () => {
    setLastNameFocus(true)
  }

  const blurEmail = (e) => {
    setEmailFocus(false)
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (email.length === 0) setEmailError('Email cannot be empty')
    else if (!re.test(String(e.target.value).toLocaleUpperCase()))
      setEmailError('Wrong E-mail')
  }

  const focusEmail = () => {
    setEmailFocus(true)
  }


  const blurPassword = () => {
    setPasswordFocus(false)
    if (password.length === 0) setPasswordError('Password cannot be empty')
  }

  const focusPassword = () => {
    setPasswordFocus(true)
  }

  React.useEffect(() => {
    if (operation === 'SingUp') {
      if ((emailError || passwordError) || (
        email.length === 0 ||
        password.length === 0 ||
        firstName.length === 0 ||
        lastName.length === 0)) setFormValid(false)
      else setFormValid(true)
    }
    else {
      if ((emailError || passwordError) || (
        email.length === 0 ||
        password.length === 0)) setFormValid(false)
      else setFormValid(true)
    }
  }, [operation, email, password, firstName, lastName, passwordError, emailError])


  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  }

  const handleLogin = (e) => {
    e.preventDefault();
    operation === 'LogIn' ?
      axios.get(`http://localhost:3001/users?id=${email}&password=${password}`)
        .then(res => {
          if (res.data.length === 0) props.handleClickSnackBar('error', 'Wrong email or password')
          else {
            props.setProfile(res.data[0])
            props.handleClickSnackBar('success', 'Logged In!')
            localStorage.setItem('accountId', res.data[0].id)
          }
        })
        .then(() => { handleClose() })
      :
      axios({
        method: 'POST',
        url: 'http://localhost:3001/users',
        data: {
          "id": email,
          "firstName": firstName,
          "lastName": lastName,
          "password": password,
          "notes": props.profileId ? [] : props.notes
        }
      })
        .then(res => {
          props.setProfile(res.data)
          props.handleClickSnackBar('success', 'Account created!')
          localStorage.setItem('accountId', res.data.id)
        })
        .then(() => { handleClose() })
        .catch(function (error) { props.handleClickSnackBar('error', 'Account already exist!') })
  }

  return (
    <div>
      <Button color="inherit" onClick={handleOpen}>
        <AccountCircleIcon />
        <Typography variant='subtitle2' sx={{ ml: 1 }} >
          LogIn / SingUp
        </Typography>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className='' component="form" sx={boxStyle} autoComplete="off" onSubmit={e => handleLogin(e)}>
          <FormGroup sx={{ flexDirection: 'row', flexWrap: 'nowrap' }}>
            <Typography align='center' sx={{ my: 'auto', mr: 2 }}>Log In</Typography>
            <FormControlLabel control={<Switch onChange={handleSwitchChange} />} label='SingUp' />
          </FormGroup>
          <TextField
            error={!firstNameFocus && Boolean(firstNameError)}
            id="filled-firstName"
            label="FirstName"
            variant="filled"
            sx={{
              display: operation === 'SingUp' ? 'flex' : 'none',
              flexGrow: 1,
              mb: 2,
            }}
            value={firstName}
            onChange={addFirstName}
            onBlur={blurFirstName}
            onFocus={focusFirstName}
            helperText={!firstNameFocus ? firstNameError : ''}
          />
          <TextField
            error={!lastNameFocus && Boolean(lastNameError)}
            id="filled-lastName"
            label="LastName"
            variant="filled"
            sx={{
              display: operation === 'SingUp' ? 'flex' : 'none',
              flexGrow: 1,
              mb: 2,
            }}
            value={lastName}
            onChange={addLastName}
            onBlur={blurLastName}
            onFocus={focusLastName}
            helperText={!lastNameFocus ? lastNameError : ''}
          />
          <TextField
            error={!emailFocus && Boolean(emailError)}
            id="filled-email"
            label="Email"
            variant="filled"
            autoComplete="off"
            sx={{ display: 'flex', flexGrow: 1, mb: 2 }}
            value={email}
            onChange={(e) => addEmail(e)}
            onBlur={blurEmail}
            onFocus={focusEmail}
            helperText={emailError}
          />
          <TextField
            error={!passwordFocus && Boolean(passwordError)}
            id="filled-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="filled"
            sx={{ display: 'flex', flexGrow: 1, mb: 2 }}
            value={password}
            onChange={(e) => addPassword(e)}
            onBlur={blurPassword}
            onFocus={focusPassword}
            helperText={!passwordFocus ? passwordError : ''}
          />
          {operation === 'LogIn' ? <Button color="inherit" sx={{ width: '100%' }} type='submitt' disabled={!formValid}>Log In</Button> :
            <Button color="inherit" sx={{ width: '100%' }} type='submitt' disabled={!formValid}>Create new account</Button>}
        </Box>
      </Modal>
    </div>
  );
}
