exports.up = function (knex) {
  console.log("creating topic table");
  return knex.schema.createTable('topic', (topicTable) => {
    topicTable.string('slug').unique();
    topicTable.string('description');
  });
};

exports.down = function (knex) {
  console.log("dropping topic table");
  return knex.schema.dropTable('topic');
};