const express = require('express')
const router = express.Router()
const Note = require('../../models/Note')

router.get('/api/notes', async (_req, res) => {
  const notes = await Note.find({})
  res.json(notes)
})

router.get('/api/notes/:id', (req, res, next) => {
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

router.delete('/api/notes/:id', (req, res, next) => {
  const id = req.params.id

  Note.findByIdAndDelete(id)
    .then(_note => {
      res.status(204).end()
    })
    .catch(err => {
      next(err)
    })
})

router.put('/api/notes/:id', (req, res) => {
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

router.post('/api/notes', async (req, res, next) => {
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
  /*  newNote.save()
      .then(result => {
        res.status(201).json(result)
      })
      .catch(err => {
        res.status(404).json({
          error: err
        })
      }) */

  try {
    const saveNote = await newNote.save()
    res.status(201).json(saveNote)
  } catch (error) {
    next(error)
  }
})

module.exports = router
