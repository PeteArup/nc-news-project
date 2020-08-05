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