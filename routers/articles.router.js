const articlesRouter = require('express').Router()
const {
  getArticleByID,
  updateVotes
} = require('../controllers/article.controller')

articlesRouter.route("/:article_id").get(getArticleByID).patch(updateVotes)

module.exports = articlesRouter