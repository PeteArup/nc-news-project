const articlesRouter = require('express').Router()
const {
  getArticleByID,
  updateVotes,
  addNewComment,
  getArticleComments
} = require('../controllers/article.controller')

articlesRouter.route("/:article_id").get(getArticleByID).patch(updateVotes)
articlesRouter.route("/:article_id/comments").post(addNewComment).get(getArticleComments)

module.exports = articlesRouter