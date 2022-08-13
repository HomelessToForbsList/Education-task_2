import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deepPurple, indigo } from '@mui/material/colors';

import { Container } from '@mui/material';
import Box from '@mui/material/Box';

import Header from './components/Header'
import AddForm from './components/AddForm'
import NoteList from './components/NoteList'
import AddSubNoteForm from './components/AddSubNoteForm'

import { search } from './functions/functionSearch'
import { remove } from './functions/functionRemove'
import { push } from './functions/functionPush'
import { edit } from './functions/functionEdit'



function App() {

  const [profile, setProfile] = useState({
    "id": null,
    "firstName": "",
    "lastName": "",
    "Password": "",
    "notes": []
  })

  const [theme, setTheme] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:3001/users/taras.frbslist@gmail.com')
      .then(res => setProfile(res.data))
  }, [])

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


  function deleteNote(note, isParent) {
    let noteList = profile.notes
    const coordinates = search(noteList, note)
    if (isParent) { noteList = noteList.filter(el => el.text !== note) }
    else { noteList = remove(noteList, coordinates, note) }
    axios({
      method: "PATCH",
      url: 'http://localhost:3001/users/taras.frbslist@gmail.com',
      data: {
        notes: noteList,
      }
    })
      .then(axios.get('http://localhost:3001/users/taras.frbslist@gmail.com'))
      .then(res => setProfile(res.data))
  }

  function addNote(note) {
    profile.notes.push({ text: note, subNotes: [] })
    const obj = profile
    axios({
      method: "PATCH",
      url: 'http://localhost:3001/users/taras.frbslist@gmail.com',
      data: {
        notes: obj.notes,
      }
    })
      .then(axios.get('http://localhost:3001/users/taras.frbslist@gmail.com'))
      .then(res => setProfile(res.data))
  }

  function addSubNote(note, subnote) {
    let noteList = profile.notes
    const coordinates = search(noteList, note)
    noteList = push(noteList, coordinates, subnote)
    axios({
      method: "PATCH",
      url: 'http://localhost:3001/users/taras.frbslist@gmail.com',
      data: {
        notes: noteList,
      }
    })
      .then(axios.get('http://localhost:3001/users/taras.frbslist@gmail.com'))
      .then(res => setProfile(res.data))
  }


  function editNote(prevNote, isParent, newNote) {
    let noteList = profile.notes
    const coordinates = search(noteList, prevNote)
    if (isParent) {
      const index = noteList.findIndex(el => el.text === prevNote)
      noteList[index].text = newNote
    }
    else {
      noteList = edit(noteList, coordinates, prevNote, newNote)
    }
    axios({
      method: "PATCH",
      url: 'http://localhost:3001/users/taras.frbslist@gmail.com',
      data: {
        notes: noteList,
      }
    })
      .then(axios.get('http://localhost:3001/users/taras.frbslist@gmail.com'))
      .then(res => setProfile(res.data))
  }


  return (
    <ThemeProvider theme={!theme ? purpleTheme : deepBlueTheme}>
      <Header changeTheme={setTheme} theme={theme} />
      <Container maxWidth={false} disableGutters={true}>
        <Box sx={{ bgcolor: 'secondary.main', height: '100vh', py: 1, px: 5, my: 0, mx: 'auto' }}>
          <AddForm addNote={addNote} />
          <NoteList
            key={1}
            isParent={true}
            notes={profile.notes}
            theme={theme}
            deleteNote={deleteNote}
            openSubNoteForm={handleClickOpenSubNoteForm} />
          <AddSubNoteForm
            openSubNoteForm={openSubNoteForm}
            close={handleClickCloseSubNoteForm}
            addSubNote={addSubNote}
            editNote={editNote}
          />
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App;
