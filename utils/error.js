exports.handler = (func) => (req, res) => {
  try {
    func(req, res)
  } catch (err) {
    console.error(err)
    res.status(500)
    return { error: err }
  }
}

exports.ERROR_MSG = {
  TASK: {
    NOT_FOUND: 'Task not found!'
  }
}
