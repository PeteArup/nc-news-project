exports.up = function (knex) {
  console.log("creating article table");
  return knex.schema.createTable('article', (articleTable) => {
    articleTable.increments('article_id');
    articleTable.string('title');
    articleTable.text('body');
    articleTable.interger('votes').defaultTo(0);
    articleTable.string('topic').references('topic.slug');
    articleTable.string('author').references('user.username');
    articleTable.interger('created_at')
  });
};

exports.down = function (knex) {
  console.log("dropping article table");
  return knex.schema.dropTable('article');
};