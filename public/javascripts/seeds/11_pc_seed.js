
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('ProductCategory').del()
    .then(function () {
      // Inserts seed entries
      return knex('ProductCategory').insert([
        {id: 1, category_id: 1, product_id: 1},
        {id: 2, category_id: 2, product_id: 1},
        {id: 3, category_id: 3, product_id: 1},
        {id: 4, category_id: 2, product_id: 2},
        {id: 5, category_id: 1, product_id: 3},
      ]);
    });
};
