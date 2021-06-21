const express = require('express')
const { join } = require('path')
const { uid } = require('uid')
const fs = require('fs')
const app = express()

//data parsing
app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

let notes = require('./db/db.json')

//HTML ROUTES

//get notes
app.get('/notes', (req, res) => {
  res.sendFile(join(__dirname, './public/notes.html'))
})

//catch all case
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, './public/index.html'))
})

//API ROUTES

//get api json
app.get('/api/notes', (req, res) => {
  res.json(notes)
})

//add new note
app.post('api/notes', (req, res) => {
  //make new note with uid
  const newNote = {
    id: uid(),
    ...req.body
  }
  //add to notes
  notes.push(newNote)

  //write notes to db.json
  fs.writeFile(join(__dirname, './db/db.json'), JSON.stringify(notes), err => {
    if(err) {console.log(err)}
  })

  res.json(notes)
})

//delete with ID
app.delete('/api/notes/:id', (req, res) => {
  //filter notes by id
  notes = notes.filter(note => note.id !== req.params.id)

  //write notes to db.json
  fs.writeFile(join(__dirname, './db/db.json'), JSON.stringify(notes), err => {
    if (err) { console.log(err) }
  })

  res.json(notes)
})

//start app
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))