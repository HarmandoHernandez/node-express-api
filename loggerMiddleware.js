const LOGGER = (req, _res, next) => {
  console.log(req.method)
  console.log(req.path)
  console.log(req.body)
  console.log('-------')
  next()
}

module.exports = LOGGER
