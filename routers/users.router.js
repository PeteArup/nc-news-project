const usersRouter = require('express').Router()
const {
  getUserByID
} = require('../controllers/users.controller');



usersRouter.get("/:username", getUserByID)


module.exports = usersRouter;