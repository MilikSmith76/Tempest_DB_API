
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('UserType').del()
    .then(function () {
      // Inserts seed entries
      return knex('UserType').insert([
        {id: 1, name: 'Administrator'},
        {id: 2, name: 'Customer'}
      ]);
    });
};
