import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



export default function AddForm(props) {

  const [value, setValue] = React.useState('')


  return (
    <Box
      component="form"
      sx={{ width: 1 / 2, my: 5, mx: 'auto', display: 'flex', flexWrap: 'nowrap', gap: 2 }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Add new note" variant="outlined" sx={{ display: 'flex', flexGrow: 1, minWidth: 200 }} value={value} onChange={e => { setValue(e.target.value) }} />
      <Button variant="contained" sx={{ height: 56, fontSize: 30 }} onClick={e => { props.addNote(value); setValue('') }}>+</Button>
    </Box>
  );
}
