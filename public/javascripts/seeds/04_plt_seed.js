
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('ProductListType').del()
    .then(function () {
      // Inserts seed entries
      return knex('ProductListType').insert([
        {id: 1, name: 'Cart'},
        {id: 2, name: 'Wishlist'},
        {id: 3, name: 'OrderHistory'}
      ]);
    });
};
