const db = require("../db/connection")

exports.fetchUserByID = (username) => {
  return db.select('*').from('users').where('username', username).then((user) => {
    if (user.length === 0) {
      return Promise.reject({
        status: 404,
        msg: 'No user found!'
      })
    } else return user[0]
  })
}