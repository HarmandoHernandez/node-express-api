const logger = require('./loggerMiddleware')
const express = require('express')
const cors = require('cors')
const app = express()

// Soporte request json
app.use(express.json())

// Cualquier origen puede acceder a cualquier origen
app.use(cors())

app.use(logger)
let notes = [
  {
    id: 1,
    content: 'Me tengo que suscribir a @midudev en Youtube',
    date: new Date(),
    important: false
  },
  {
    id: 2,
    content: 'Tengo que estudiar las clases del Fullstack Bootcampo',
    date: new Date(),
    important: true
  },
  {
    id: 3,
    content: 'Repasar los retos de JS de midudev',
    date: new Date(),
    important: true
  }
]

app.get('/', (_req, res) => {
  res.send('<h1> Hello World! </h1>')
})

app.get('/api/notes', (_req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)

  if (id < 0) res.status(404).end()

  const note = notes.find(note => note.id === id)
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  if (id < 0) res.status(404).end()

  const note = notes.find(note => note.id === id)
  if (note) {
    notes = notes.filter(note => note.id !== id)
    console.log(notes)
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.post('/api/notes', (req, res) => {
  const note = req.body

  if (!note.content) {
    return res.status(400).json({
      error: 'note.content is missing'
    })
  }

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }
  notes.push(newNote)
  res.status(201).json(newNote)
})

app.use((_req, res) => {
  res.status(404).json({
    error: 'Not Found'
  })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
