const commentsRouter = require('express').Router()
const {
  updateVotes
} = require('../controllers/comments.controller')

commentsRouter.patch("/:comment_id", updateVotes)

module.exports = commentsRouter;