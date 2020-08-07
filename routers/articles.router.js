const articlesRouter = require('express').Router()
const {
  getArticleByID,
  updateVotes,
  addNewComment,
  getArticleComments,
  getArticles
} = require('../controllers/article.controller')

const {
  handle405Errors
} = require('../errors')

articlesRouter.route("/:article_id").get(getArticleByID).patch(updateVotes).all(handle405Errors)
articlesRouter.route("/:article_id/comments").post(addNewComment).get(getArticleComments).all(handle405Errors)
articlesRouter.route('/').get(getArticles).all(handle405Errors)

module.exports = articlesRouter