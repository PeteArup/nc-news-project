const db = require("../db/connection")

exports.patchVotes = (comment_id, inc_votes) => {
  return db('comments')
    .where('comments.comment_id', comment_id)
    .increment('votes', inc_votes)
    .returning('*').then((comment) => {
      if (comment.length === 0) {
        return Promise.reject({
          status: 404,
          msg: 'No comment found!'
        })
      } else return comment
    })
}

exports.deleteComment = (comment_id) => {
  return db('comments').where('comment_id', comment_id).del().then((delCount) => {
    if (delCount === 0) {
      return Promise.reject({
        status: 404,
        msg: 'No comment found!'
      })
    } else {
      return delCount
    }
  })
}