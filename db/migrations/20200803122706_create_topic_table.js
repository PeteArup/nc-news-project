exports.up = function (knex) {
  // console.log("creating topics table");
  return knex.schema.createTable('topics', (topicTable) => {
    topicTable.string('slug').unique();
    topicTable.string('description');
  });
};

exports.down = function (knex) {
  // console.log("dropping topics table");
  return knex.schema.dropTable('topics');
};