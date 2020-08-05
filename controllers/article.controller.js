const {
  fetchArticleByID,
  patchVotes
} = require('../models/article.model')


exports.getArticleByID = (req, res, next) => {
  const {
    article_id
  } = req.params
  fetchArticleByID(article_id).then((article) => {
    res.status(200).send({
      article
    })
  }).catch((err) => {
    next(err)
  })
}

exports.updateVotes = (req, res, next) => {
  const {
    article_id
  } = req.params
  const {
    inc_votes
  } = req.body
  patchVotes(article_id, inc_votes).then((article) => {
    res.status(200).send({
      article
    })
  }).catch((err) => {
    next(err)
  })
}