
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('ProductList').del()
    .then(function () {
      // Inserts seed entries
      return knex('ProductList').insert([
        {id: 1, plt_id: 1, user_id: 1},
        {id: 2, plt_id: 2, user_id: 1},
        {id: 3, plt_id: 3, user_id: 1},
        {id: 4, plt_id: 1, user_id: 2},
        {id: 5, plt_id: 2, user_id: 2},
        {id: 6, plt_id: 3, user_id: 2},
        {id: 7, plt_id: 1, user_id: 3},
        {id: 8, plt_id: 2, user_id: 3},
        {id: 9, plt_id: 3, user_id: 3}
      ]);
    });
};
