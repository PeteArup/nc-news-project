const db = require("../db/connection")

exports.fetchArticleByID = (article_id) => {
  return db
    .select('articles.*')
    .from('articles')
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id')
    .count('comments.article_id', {
      as: 'comment_count'
    })
    .where('articles.article_id', article_id)
    .then((article) => {
      if (article.length === 0) {
        return Promise.reject({
          status: 404,
          msg: 'No article found!'
        })
      } else return article.map((selectedArticle) => {
        const newObj = {
          ...selectedArticle
        }
        newObj.comment_count = parseInt(selectedArticle.comment_count)
        return newObj
      })
    })
}

exports.patchVotes = (article_id, inc_votes) => {
  return db('articles')
    .where('articles.article_id', article_id)
    .increment('votes', inc_votes)
    .returning('*').then((article) => {
      if (article.length === 0) {
        return Promise.reject({
          status: 404,
          msg: 'No article found!'
        })
      } else return article
    })
}

exports.postNewComment = (params, comment) => {
  const {
    article_id
  } = params
  const {
    username,
    body
  } = comment

  // console.log(article_id, '<---ID')
  // console.log(username, '<---UN')
  // console.log(body, '<---Body')

  if (typeof body != "string") {
    return Promise.reject({
      status: 400,
      msg: 'Bad Request!!'
    })
  } else {
    const newComment = {
      author: username,
      article_id: article_id,
      body: body
    }
    return db("comments")
      .insert(newComment).returning("body")
  }
}

exports.fetchArticleComments = (params, sort_by = 'created_at', order = 'desc') => {
  const {
    article_id
  } = params

  const columnsToReturn = ['comment_id', 'author', 'votes', 'created_at', 'body']

  return db.select(columnsToReturn).from('comments').where({
    article_id: article_id
  }).orderBy(sort_by, order).returning("*").then((result) => {
    if (result.length === 0) {
      return Promise.reject({
        status: 404,
        msg: 'Not found!'
      })
    } else return result
  })

}