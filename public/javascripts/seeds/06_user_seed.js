
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('User').del()
    .then(function () {
      // Inserts seed entries
      return knex('User').insert([
        {id: 1, balance: 100.00, email: 'test1@example.com', first_name: 'Root', last_name: 'Administrator', password: '123456', ut_id: 1 },
        {id: 2, balance: 150.00, email: 'test2@example.com', first_name: 'Sebastion', last_name: 'Zack', password: '654321', ut_id: 2 },
        {id: 3, balance: 101.00, email: 'test3@example.com', first_name: 'Wendal', last_name: 'Zandrake', password: 'abcdef', ut_id: 2 }
      ]);
    });
};
