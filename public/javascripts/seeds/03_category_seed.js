
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Category').del()
    .then(function () {
      // Inserts seed entries
      return knex('Category').insert([
        {id: 1, name: 'Category1'},
        {id: 2, name: 'Category2'},
        {id: 3, name: 'Category3'}
      ]);
    });
};
