require('dotenv').config()
require('./mongo')
const express = require('express')
const cors = require('cors')
// const logger = require('./middleware/logger')
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')
const apiNotes = require('./components/notes/index')
const apiUsers = require('./components/users/index')
// Crear servidor
const app = express()
// Soporte request json
app.use(express.json())
// Cualquier origen pueda acceder a las apis
app.use(cors())
// app.use(logger)

// Acceso a estaticos
app.use(express.static('public'))

app.use('/api/users', apiUsers)
app.use('/api/notes', apiNotes)

app.use(handleErrors)
app.use(notFound)

const PORT = process.env.PORT

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
