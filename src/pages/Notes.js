import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { Container } from '@mui/system'
import NoteCard from '../components/NoteCard'

export default function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/notes')
      .then(res => res.json())
      .then(data => setNotes(data))
  }, [])

  const handleDelete = async (id) => {
    await fetch('http://localhost:8000/notes/' + id, {
      method: 'DELETE'
    })
    const newNotes = notes.filter(note => note.id != id)
    setNotes(newNotes)
  }

  return (
    <Container>
      <Grid container spacing={3}>
        {notes.map(note => (
          <Grid item xs={12} md={6} lg={4} key={note.id}>
            <NoteCard note={note} handleDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

/* <Grid container>
        <Grid item md={3} xs={12} sm={6}>
          <Paper>1</Paper>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item md={3} xs={12} sm={6}>
          <Paper>2</Paper>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item md={3} xs={12} sm={6}>
          <Paper>3</Paper>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item md={3} xs={12} sm={6}>
          <Paper>4</Paper>
        </Grid>
      </Grid> */



//npm start
//in new terminal
// npm install -g json-server
// npx json-server --watch data/db.json --port 8000
