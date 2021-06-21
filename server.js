const express = require('express')
const { join } = require('path')
const uid = require('uid')
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



//start app
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))