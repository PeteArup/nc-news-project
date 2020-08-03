exports.up = function (knex) {
  console.log("creating user table");
  return knex.schema.createTable('user', (userTable) => {
    userTable.string('username').primary().unique();
    userTable.string('avatar_url');
    userTable.string('name');
  });
};

exports.down = function (knex) {
  console.log("dropping user table");
  return knex.schema.dropTable('user');
};