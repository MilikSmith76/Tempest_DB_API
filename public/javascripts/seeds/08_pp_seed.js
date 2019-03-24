
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('PromotionProduct').del()
    .then(function () {
      // Inserts seed entries
      return knex('PromotionProduct').insert([
        {id: 1, discount: 10.00, product_id: 1 , promotion_id: 1 },
        {id: 2, discount: 0.00, product_id: 2, promotion_id: 1},
        {id: 3, discount: 0.00, product_id: 3, promotion_id: 2}
      ]);
    });
};
