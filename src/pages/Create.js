import React, { useState } from 'react'
import { Container, Typography, TextField, Radio, RadioGroup, Button, FormControlLabel, FormControl, FormLabel } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { makeStyles } from '@mui/styles' 
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  }
})

export default function Create() {
  const classes = useStyles()
  const history = useHistory()

  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')

  const [titleError, setTitleError] = useState(false)
  const [detailsError, setDetailsError] = useState(false)

  const [category, setCategory] = useState('todos')

  const handleSubmit = (e) => {
    e.preventDefault()

    setTitleError(false)
    setDetailsError(false)

    if(details == '') {
      setTitleError(true)
    }

    if(title == '') {
      setDetailsError(true)
    }

    if (title && details) {
      fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({title, details, category})
      })
      .then(() => history.push('/'))
    }
  }

  return (
    <Container>
      <Typography
        variant= "h6"
        color= "textSecondary"
        component= "h2"
        gutterBottom
      >
        Create a New Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit= {handleSubmit}>
        <TextField 
          onChange = {(e) => setTitle(e.target.value)}
          className= {classes.field}
          label = "Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error = {titleError}
        />

        <TextField 
          onChange = {(e) => setDetails(e.target.value)}
          className= {classes.field}
          label = "Details"
          variant="outlined"
          color="secondary"
          fullWidth
          multiline
          rows={4}
          required
          error = {detailsError}
        />

        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
            <FormControlLabel value="money" control={<Radio />} label="Money" />
            <FormControlLabel value="todos" control={<Radio />} label="Todos" />
            <FormControlLabel value="reminders" control={<Radio />} label="Reminders" />
            <FormControlLabel value="work" control={<Radio />} label="Work" />
          </RadioGroup>
        </FormControl>

        <Button 
          type="submit"
          color="secondary"
          variant="contained"
          endIcon= {<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  )
}
