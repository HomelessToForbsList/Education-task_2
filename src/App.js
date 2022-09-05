import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deepPurple, indigo } from '@mui/material/colors';

import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';


import Header from './components/Header'
import AddForm from './components/AddForm'
import NoteList from './components/NoteList'
import AddSubNoteForm from './components/AddSubNoteForm'

import { search } from './functions/functionSearch'
import { remove } from './functions/functionRemove'
import { push } from './functions/functionPush'
import { edit } from './functions/functionEdit'
import { changeArr } from './functions/functionChangeArr'
import { move } from './functions/functionMove'
import { deleteList } from './functions/functionDeleteList'







function App() {

  const [profile, setProfile] = useState({
    "id": null,
    "firstName": "",
    "lastName": "",
    "password": "",
    "notes": []
  })



  React.useEffect(() => {
    const user = localStorage.getItem('accountId')
    if (user) {
      axios.get(`http://localhost:3001/users?id=${user}`)
        .then(res => { setProfile(res.data[0]) })
    }
    const selectedTheme = localStorage.getItem('theme')
    if (selectedTheme) setTheme(selectedTheme === 'false' ? false : true)
  }, [])

  const [theme, setTheme] = useState(false)


  const purpleTheme = createTheme({
    palette: {
      primary: { main: deepPurple[500] },
      secondary: { main: deepPurple[100] }
    },
  })

  const deepBlueTheme = createTheme({
    palette: {
      primary: { main: indigo[500] },
      secondary: { main: indigo[100] }
    },
  })

  const [openSubNoteForm, setOpenSubNoteForm] = React.useState({
    open: false,
    startValue: '',
    title: '',
    noteId: '',
    isParent: false
  });

  const handleClickOpenSubNoteForm = (value, title, noteId, isParent) => {
    setOpenSubNoteForm(
      {
        open: true,
        startValue: value,
        title: title,
        noteId: noteId,
        isParent: isParent
      }
    );
  };

  const handleClickCloseSubNoteForm = () => {
    setOpenSubNoteForm(
      {
        open: false,
        startValue: '',
        title: '',
        noteId: '',
      }
    );
  };

  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [situationAlert, setSituationAlert] = React.useState({ severity: 'success', message: '' })

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClickSnackBar = (severity, message) => {
    setSituationAlert({ severity: severity, message: message })
    setOpenSnackBar(true);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
  };



  function deleteNote(noteId, isParent) {
    let noteList = profile.notes
    const coordinates = search(noteList, noteId)
    if (isParent) { noteList = noteList.filter(el => el.id !== noteId) }
    else { noteList = remove(noteList, coordinates, noteId) }
    if (!profile.id) {
      const obj = {
        "id": null,
        "firstName": "",
        "lastName": "",
        "password": "",
        "notes": noteList
      }
      setProfile(obj)
    }
    else {
      axios({
        method: "PATCH",
        url: `http://localhost:3001/users/${profile.id}`,
        data: {
          notes: noteList,
        }
      })
        .then(res => setProfile(res.data))
    }
  }



  function addNote(note) {
    if (note.length === 0) handleClickSnackBar('warning', 'Type something to add note!')
    else {
      profile.notes.push({ id: Date.now(), text: note, subNotes: [] })
      if (!profile.id) {
        const obj = {
          "id": null,
          "firstName": "",
          "lastName": "",
          "password": "",
          "notes": profile.notes
        }
        setProfile(obj)
      }
      else {
        axios({
          method: "PATCH",
          url: `http://localhost:3001/users/${profile.id}`,
          data: {
            notes: profile.notes,
          }
        })
          .then(res => setProfile(res.data))
      }
    }
  }

  function addSubNote(noteId, subnote) {
    let noteList = profile.notes
    const coordinates = search(noteList, noteId)
    noteList = push(noteList, coordinates, subnote)
    if (!profile.id) {
      const obj = {
        "id": null,
        "firstName": "",
        "lastName": "",
        "password": "",
        "notes": noteList
      }
      setProfile(obj)
    }
    else {
      axios({
        method: "PATCH",
        url: `http://localhost:3001/users/${profile.id}`,
        data: {
          notes: noteList,
        }
      })
        .then(res => setProfile(res.data))
    }
  }


  function editNote(noteId, isParent, newNote) {
    let noteList = profile.notes
    const coordinates = search(noteList, noteId)
    if (isParent) {
      const index = noteList.findIndex(el => el.id === noteId)
      noteList[index].text = newNote
    }
    else {
      noteList = edit(noteList, coordinates, noteId, newNote)
    }
    if (!profile.id) {
      const obj = {
        "id": null,
        "firstName": "",
        "lastName": "",
        "password": "",
        "notes": noteList
      }
      setProfile(obj)
    }
    else {
      axios({
        method: "PATCH",
        url: `http://localhost:3001/users/${profile.id}`,
        data: {
          notes: noteList,
        }
      })
        .then(res => setProfile(res.data))
    }
  }


  function replaceNote(isParent, noteId, direction) {
    let noteList = profile.notes
    if (isParent) {
      const index = noteList.findIndex(el => el.id === noteId)
      noteList = changeArr(noteList, index, direction)
    }
    else {
      const coordinates = search(noteList, noteId)
      noteList = move(noteList, coordinates, direction)
    }
    if (!profile.id) {
      const obj = {
        "id": null,
        "firstName": "",
        "lastName": "",
        "password": "",
        "notes": noteList
      }
      setProfile(obj)
    }
    else {
      axios({
        method: "PATCH",
        url: `http://localhost:3001/users/${profile.id}`,
        data: {
          notes: noteList,
        }
      })
        .then(res => setProfile(res.data))
    }
  }

  function deleteSubNotes(isParent, noteId) {
    let noteList = profile.notes
    if (isParent) {
      const index = noteList.findIndex(el => el.id === noteId)
      noteList[index].subNotes = []
    }
    else {
      const coordinates = search(noteList, noteId)
      noteList = deleteList(noteList, coordinates)
    }
    if (!profile.id) {
      const obj = {
        "id": null,
        "firstName": "",
        "lastName": "",
        "password": "",
        "notes": noteList
      }
      setProfile(obj)
    }
    else {
      axios({
        method: "PATCH",
        url: `http://localhost:3001/users/${profile.id}`,
        data: {
          notes: noteList,
        }
      })
        .then(res => setProfile(res.data))
    }
  }



  return (
    <ThemeProvider theme={!theme ? purpleTheme : deepBlueTheme}>
      <Container maxWidth='lg' disableGutters={true}>
        <Header
          changeTheme={setTheme}
          theme={theme}
          setProfile={setProfile}
          notes={profile.notes}
          firstName={profile.firstName}
          profileId={profile.id}
          handleClickSnackBar={handleClickSnackBar}
        />
        {profile.id ?
          <Box sx={{ bgcolor: 'secondary.main', height: '100vh', py: 1, px: 5, my: 0, mx: 'auto' }}>
            <AddForm addNote={addNote} />
            <NoteList
              isParent={true}
              notes={profile.notes}
              theme={theme}
              deleteNote={deleteNote}
              replaceNote={replaceNote}
              deleteSubNotes={deleteSubNotes}
              openSubNoteForm={handleClickOpenSubNoteForm}
              handleClickSnackBar={handleClickSnackBar}
            />
            <AddSubNoteForm
              openSubNoteForm={openSubNoteForm}
              close={handleClickCloseSubNoteForm}
              addSubNote={addSubNote}
              editNote={editNote}
            />
          </Box>
          :
          <Box sx={{ bgcolor: 'secondary.main', height: 'calc(100vh - 80px)', py: 1, px: 5, my: 0, mx: 'auto', display: 'flex', alignItems: 'center' }}>
            <Typography variant="h2" my='auto' align='center' sx={{ flexGrow: 1, color: '#fff' }}>
              Please sing up or log in to add notes
            </Typography>
          </Box>
        }
        <Snackbar open={openSnackBar} autoHideDuration={2000} onClose={handleCloseSnackBar}>
          <Alert onClose={handleCloseSnackBar} severity={situationAlert.severity} sx={{ width: '100%' }}>
            {situationAlert.message}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  )
}

export default App;
