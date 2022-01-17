const mongoose = require('mongoose')
const Note = require('../models/Note')
const { server } = require('../index')
const { initialNotes, api, getAllContentFromNotes, createNote, getNotes, updateNote, deleteNote } = require('./helpers')

// Preparar datos de prueba en BDs
beforeEach(async () => {
  await Note.deleteMany({})

  initialNotes.forEach(async function (note) {
    const noteM = new Note(note)
    await noteM.save()
  })
})

describe('Notes', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test(`There are ${initialNotes.length} notes`, async () => {
    const { response } = await getAllContentFromNotes()
    expect(response.body).toHaveLength(initialNotes.length)
  })

  test('Check content of first note', async () => {
    const { contents } = await getAllContentFromNotes()
    expect(contents).toContain(initialNotes[0].content)
  })

  test('Note can be added', async () => {
    const newNote = {
      content: 'new note',
      important: true
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const { contents } = await getAllContentFromNotes()
    expect(contents).toContain(newNote.content)
  })

  test('Note without content can\'t be added', async () => {
    const newNote = {
      important: true
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(400)
  })

  test('Note complete flow', async () => {
    const newNote = {
      content: 'This is a note',
      important: true,
      date: '2/24/2021'
    }

    createNote(newNote)
    const contentNotes = await getNotes()
    expect(contentNotes).toContain(newNote.content)
    newNote.important = false
    updateNote(newNote)
    deleteNote({ content: newNote.content })
  })
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
