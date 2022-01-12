module.exports = (error, _req, res, _next) => {
  console.error(error.name)
  if (error.name === 'CastError') {
    res.status(400).send({
      error: 'id used is malformed'
    })
  } else {
    res.status(500).end()
  }
}
