require('dotenv').config()
require('./mongo')
const express = require('express')
const cors = require('cors')
const logger = require('./middleware/logger')
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')
// Models
const Note = require('./models/Note')

// Crear servidor
const app = express()

// Soporte request json
app.use(express.json())

// Cualquier origen pueda acceder a las apis
app.use(cors())

app.use(logger)

// Acceso a estaticos
app.use(express.static('public'))

app.get('/api/notes', (_req, res) => {
  Note.find({})
    .then(notes => {
      res.json(notes)
    })
})

app.get('/api/notes/:id', (req, res, next) => {
  const id = req.params.id

  Note.findById(id)
    .then(note => {
      if (note) {
        res.json(note)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => {
      next(err)
    })
})

app.delete('/api/notes/:id', (req, res, next) => {
  const id = req.params.id

  Note.findByIdAndDelete(id)
    .then(_note => {
      res.status(204).end()
    })
    .catch(err => {
      next(err)
    })
})

app.put('/api/notes/:id', (req, res) => {
  const { id } = req.params
  const note = req.body

  const newNoteInfo = new Note({
    _id: id,
    content: note.content,
    important: note.important
  })
  Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then(result => {
      res.json(result)
    })
})

app.post('/api/notes', (req, res) => {
  const note = req.body

  if (!note.content) {
    return res.status(400).json({
      error: 'note.content is missing'
    })
  }
  const newNote = new Note({
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  })
  // Guardar nota en BD
  newNote.save()
    .then(result => {
      res.status(201).json(result)
    })
    .catch(err => {
      res.status(404).json({
        error: err
      })
    })
})

app.use(handleErrors)
app.use(notFound)

const PORT = process.env.PORT

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
