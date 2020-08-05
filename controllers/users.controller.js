const {
  fetchUserByID
} = require('../models/user.models')

exports.getUserByID = (req, res, next) => {
  const {
    username
  } = req.params
  fetchUserByID(username).then((user) => {
    res.status(200).send({
      user
    })
  }).catch((err) => {
    next(err)
  })
}