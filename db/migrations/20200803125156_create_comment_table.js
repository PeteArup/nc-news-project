exports.up = function (knex) {
  console.log("creating comment table");
  return knex.schema.createTable('comment', (commentTable) => {
    commentTable.increments('comment_id');
    commentTable.string('author').reference('user.username');
    commentTable.interger('article_id').references('article.article_id');
    commentTable.interger('votes').defaultTo(0);
    articleTable.interger('created_at');
    articleTable.text('body');
  });
}

exports.down = function (knex) {
  console.log("dropping comment table");
  return knex.schema.dropTable('comment');
};