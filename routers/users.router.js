const usersRouter = require('express').Router()
const {
  getUserByID
} = require('../controllers/users.controller');

const {
  handle405Errors
} = require('../errors')

usersRouter.route("/:username").get(getUserByID).all(handle405Errors)


module.exports = usersRouter;