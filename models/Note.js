// Definicion de esquemas
const { Schema, model } = require('mongoose')

const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean
})

// Configurar el formato de respuesta
noteSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Definicion de modelos (Collection) con referencia al esquema
const Note = model('Note', noteSchema)

module.exports = Note
