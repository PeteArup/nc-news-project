const {
  topicData,
  articleData,
  commentData,
  userData
} = require('../data/index.js');

const {
  formatDates,
  formatComments,
  makeRefObj
} = require('../utils/utils');

exports.seed = function (knex) {
  return knex.migrate.rollback().then(() => knex.migrate.latest()).then(() => {
    const topicsInsertions = knex('topics').insert(topicData);
    const usersInsertions = knex('users').insert(userData);

    return Promise.all([topicsInsertions, usersInsertions])
      .then(() => {
        const formattedArticleData = formatDates(articleData)
        return knex('articles').insert(formattedArticleData).returning('*')
      })
      .then(articleRows => {
        const articleRef = makeRefObj(articleRows);
        const formattedComments = formatComments(commentData, articleRef);
        return knex('comments').insert(formattedComments);
      });
  })
};


/* 

Your comment data is currently in the incorrect format and will violate your SQL schema. 

Keys need renaming, values need changing, and most annoyingly, your comments currently only refer to the title of the article they belong to, not the id. 

You will need to write and test the provided makeRefObj and formatComments utility functions to be able insert your comment data.
*/