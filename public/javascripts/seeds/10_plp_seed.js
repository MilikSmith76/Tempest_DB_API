
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('ProductListProduct').del()
    .then(function () {
      // Inserts seed entries
      return knex('ProductListProduct').insert([
        {id: 1, date_added: '2018-05-20', pl_id: 1, product_id: 1, purchase_price: 0.00 },
        {id: 2, date_added: '2018-05-20', pl_id: 1, product_id: 2, purchase_price: 0.00 },
        {id: 3, date_added: '2018-05-20', pl_id: 1, product_id: 3, purchase_price: 0.00 }
      ]);
    });
};
