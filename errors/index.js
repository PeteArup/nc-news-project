exports.handlePathErrors = (req, res, next) => {
  res.status(404).send({
    msg: 'Path not found, try again.'
  })
}

exports.handleCustomErrors = (err, req, res, next) => {
  if ('status' in err) {
    res.status(err.status).send({
      msg: err.msg
    })
  } else next(err)
}

exports.handlePSQLErrors = (err, req, res, next) => {
  if (err.code === '22P02') {
    res.status(400).send({
      msg: 'Bad Request!!'
    })
  } else if (err.code === '23503') {
    res.status(404).send({
      msg: 'Not found!'
    })
  } else next(err)
}