const commentsRouter = require('express').Router()
const {
  updateVotes,
  removeComment
} = require('../controllers/comments.controller')

commentsRouter.route("/:comment_id").patch(updateVotes).delete(removeComment)

module.exports = commentsRouter;