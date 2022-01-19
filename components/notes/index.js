const router = require('express').Router()
const Note = require('../../models/Note')
const User = require('../../models/User')

router.get('/', async (_req, res) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
  res.json(notes)
})

router.get('/:id', (req, res, next) => {
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

router.delete('/:id', (req, res, next) => {
  const id = req.params.id

  Note.findByIdAndDelete(id)
    .then(_note => {
      res.status(204).end()
    })
    .catch(err => {
      next(err)
    })
})

router.put('/:id', (req, res) => {
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

router.post('/', async (req, res, next) => {
  const { content, important = false, userId } = req.body

  const user = await User.findById(userId)

  if (!content) {
    return res.status(400).json({
      error: 'note.content is missing'
    })
  }
  const newNote = new Note({
    content: content,
    important,
    date: new Date().toISOString(),
    user: user._id
  })
  try {
    const savedNote = await newNote.save()

    user.notes = user.notes.concat(savedNote._id)
    await user.save()

    res.status(201).json(savedNote)
  } catch (error) {
    next(error)
  }
})

module.exports = router
