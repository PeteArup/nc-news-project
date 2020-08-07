const express = require('express');
const {
  getTopics
} = require('../controllers/topics.controller');
const topicsRouter = express.Router()
const {
  handle405Errors
} = require('../errors')


topicsRouter.route('/').get(getTopics).all(handle405Errors)

module.exports = topicsRouter;