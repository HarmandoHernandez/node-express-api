const { Schema, model } = require('mongoose')
// const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
  username: { type: String, unique: true },
  name: { type: String },
  passwordHash: { type: String },
  notes: [{ // Referencia a collection de notas
    type: Schema.Types.ObjectID,
    ref: 'Note',
    required: false
  }]
})

// userSchema.set('validateBeforeSave', true)

// userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHashs
  }
})

// Definicion de modelos (Collection) con referencia al esquema
const User = model('User', userSchema)

module.exports = User
