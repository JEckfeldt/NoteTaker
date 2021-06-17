//purely utility file for async functions to store/get data in apiRoutes
const { json } = require('express')
const fs = require('fs')
const { join, parse } = require('path')
//used to turn fs functions into promise based functions (credit user jcw2865 on github)
const { promisify } = require('util')

const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)

//object with functions for data access
class Store {
  constructor() {
    this.lastId = 0
  }
  read() {
    return readFileAsync(join(__dirname, '../db/db.json'), 'utf8')
  }
  write(note) {
    return writeFileAsync(join(__dirname, '../db/db.json'), JSON.stringify(note))
  }
  getNotes() {
    return this.read()
      .then(notes => {
        let parsed = JSON.parse(notes)
        console.log(parsed)
        return parsed
      })
      .catch(err => console.log(err))

  }
  addNote(newNote) {
    //create new note obj
    return this.getNotes()
      .then(notes => {
        const newNoteList = [..notes, newNote]
        return this.write(newNoteList)
      })
      .catch(err => console.log(err))
  }
  deleteNotes(title) {
    return this.getNotes()
      .then(notes => {
        for (let i = 0; i < notes.length; i++) {
          if (notes[i].title === title) {
            notes.splice(i, 1)
            break
          }
        }
        this.write(notes)
      })
      .catch(err => console.log(err))
  }
}

const store = new Store()
module.exports = store