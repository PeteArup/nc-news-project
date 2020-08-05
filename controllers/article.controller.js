const {
  fetchArticleByID,
  patchVotes,
  postNewComment,
  fetchArticleComments
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

exports.addNewComment = (req, res, next) => {
  postNewComment(req.params, req.body).then((comment) => {
    res.status(201).send({
      comment
    })
  }).catch((err) => {
    next(err)
  })
}

exports.getArticleComments = (req, res, next) => {

  const {
    sort_by,
    order
  } = req.query



  fetchArticleComments(req.params, sort_by, order).then((comments) => {
    res.status(200).send({
      comments
    })
  }).catch((err) => {
    next(err)
  })
}