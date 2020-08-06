const {
  patchVotes
} = require('../models/comments.models')


exports.updateVotes = (req, res, next) => {
  const {
    comment_id
  } = req.params
  const {
    inc_votes
  } = req.body

  patchVotes(comment_id, inc_votes).then((comment) => {
    res.status(200).send({
      comment
    })
  }).catch((err) => {
    next(err)
  })
}