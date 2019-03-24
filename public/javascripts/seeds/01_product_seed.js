
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Product').del()
    .then(function () {
      // Inserts seed entries
      return knex('Product').insert([
        {id: 1, date_created: '2018-05-20', date_updated: '2018-05-20', description: 'A simple test.', image_file: 'test_product.jpg', name: 'Test1', price: '29.99'},
        {id: 2, date_created: '2018-05-20', date_updated: '2018-05-20', description: 'Another test.', image_file: 'test_product.jpg', name: 'Test2', price: '12.99'},
        {id: 3, date_created: '2018-05-20', date_updated: '2018-05-20', description: 'The last test.', image_file: 'test_product.jpg', name: 'Test3', price: '32.99'}
      ]);
    });
};
