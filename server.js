const express = require('express')
const path = require('path')
const fs = require('fs')
const uid = require('uid')
const app = express()


app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


let notes = require('./db/db.json')

//HTML ROUTES
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'))
})


// API ROUTES
//get notes
app.get('/api/notes', (req, res) => {
  res.json(notes)
})

//add new note
app.post('/api/notes', (req, res) => {
  const note = {
    id: uid.uid(),
    ...req.body
  }
  notes.push(note)

  fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes), err => {
    if (err) { console.log(err) }
    console.log('file written')
  })

  res.json(notes)
})

// delete by ID
app.delete('/api/notes/:id', (req, res) => {
  notes = notes.filter(note =>
    note.id !== req.params.id
  )

  fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes), err => {
    if (err) { console.log(err) }
    console.log('file written')
  })

  res.json(notes)
})

//start app
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))