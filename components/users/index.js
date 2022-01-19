const router = require('express').Router()
const User = require('../../models/User')
const bcrypt = require('bcrypt')

router.get('/', async (_req, res) => {
  const Users = await User.find({}).populate('notes', { content: 1, date: 1, important: 1, _id: 0 })
  res.json(Users)
})

router.get('/:id', (req, res, next) => {
  const id = req.params.id

  User.findById(id)
    .then(User => {
      if (User) {
        res.json(User)
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

  User.findByIdAndDelete(id)
    .then(_User => {
      res.status(204).end()
    })
    .catch(err => {
      next(err)
    })
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const { username, name, password } = req.body

  const newUserInfo = new User({
    _id: id,

    username,
    name,
    passwordHash: password
  })
  User.findByIdAndUpdate(id, newUserInfo, { new: true })
    .then(result => {
      res.json(result)
    })
})

router.post('/', async (req, res, next) => {
  try {
    const { username, name, password } = req.body

    // Pasword encriptada
    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
      username,
      name,
      passwordHash
    })

    const saveUser = await user.save()
    console.log(saveUser)

    res.status(201).json(saveUser)
  } catch (error) {
    console.log(error)

    res.status(400).json(error)
  }
})

module.exports = router
