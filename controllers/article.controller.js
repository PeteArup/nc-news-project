const {
  fetchArticleByID,
  patchVotes,
  postNewComment,
  fetchArticleComments,
  fetchArticles,
  fetchUser,
  fetchTopic
} = require('../models/article.model')
const topicsRouter = require('../routers/topics.router')


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

exports.getArticles = (req, res, next) => {
  const {
    sort_by,
    order,
    author,
    topic
  } = req.query

  //const columnsToGet = [sort_by, order, author, topic];


  if (author !== undefined) {
    fetchUser(author).then((user) => {
      if (user.length !== 0) {
        fetchArticles(sort_by, order, author, topic).then((articles) => {
          res.status(200).send({
            articles
          })
        }).catch((err) => {
          next(err)
        })
      } else res.status(404).send({
        msg: "Not found!"
      })
    })
  } else if (topic !== undefined) {
    fetchTopic(topic).then((item) => {
      if (item.length !== 0) {
        fetchArticles(sort_by, order, author, topic).then((articles) => {
          res.status(200).send({
            articles
          })
        }).catch((err) => {
          next(err)
        })
      } else res.status(404).send({
        msg: "Not found!"
      })
    })
  } else
    fetchArticles(sort_by, order, author, topic).then((articles) => {
      res.status(200).send({
        articles
      })
    }).catch((err) => {
      next(err)
    })
}