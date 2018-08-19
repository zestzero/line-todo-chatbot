exports.apiErrorHandler = (req, res, next) => {
  try {
    next()
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal error!')
  }
}
