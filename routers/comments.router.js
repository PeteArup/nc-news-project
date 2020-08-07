const commentsRouter = require('express').Router()
const {
  updateVotes,
  removeComment
} = require('../controllers/comments.controller')

const {
  handle405Errors
} = require('../errors')

commentsRouter.route("/:comment_id").patch(updateVotes).delete(removeComment).all(handle405Errors)

module.exports = commentsRouter;