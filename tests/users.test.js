const mongoose = require('mongoose')
const User = require('../models/User')
const { server } = require('../index')
// const bcrypt = require('bcrypt')
const { api } = require('./helpers')
// , getAllContentFromUsers, createUser, getUsers, updateUser, deleteUser

/* const initialUsers = [
  { username: 'tincidunt', name: 'tincidunt n', password: '12/25/2021' },
  { username: 'faucibus', name: 'faucibus n', password: '5/18/2021' },
  { username: 'semper', name: 'semper n', password: '2/13/2021' }
] */

const getAllContentFromUsers = async () => {
  const response = await api.get('/api/users')
  return {
    username: response.body.map((user) => user.username),
    response
  }
}

// Preparar datos de prueba en BDs
describe('Creating a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    /* const userObjects = initialUsers.map(async (user) => {
      user.password = await bcrypt.hash(user.password, 10)
      return new User(user)
    })
    const promises = userObjects.map(user => user.save())
    await Promise.all(promises) */
    /* const user = new User({ username: 'lu', name: 'email', passwordHash })
    await user.save() */
  })

  test('Works as expected creating a fresh username', async () => {
    const newUser = { username: 'faucibus', name: 'faucibus n2', password: '5/18/2021' }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const { username } = await getAllContentFromUsers()

    expect(username).toContain(newUser.username)
  })

  test('Creation fails with proper statuscoder and message if username is already taken', async () => {
    const newUser = { username: 'faucibus', name: 'faucibus n2', password: '5/18/2021' }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    console.log(result)
    // expect(result.body.error.errors.username.message).toContain('`username` to be unique')
  })
})

/*
describe('Users', () => {
  test('Users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test(`There are ${initialUsers.length} Users`, async () => {
    const { response } = await getAllContentFromUsers()
    expect(response.body).toHaveLength(initialUsers.length)
  })

  test('Check content of first User', async () => {
    const { contents } = await getAllContentFromUsers()
    expect(contents).toContain(initialUsers[0].content)
  })
})
*/

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
