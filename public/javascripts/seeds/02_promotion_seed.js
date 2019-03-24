
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Promotion').del()
    .then(function () {
      // Inserts seed entries
      return knex('Promotion').insert([
        {id: 1, active: true, banner_image:'test_banner.jpg', dashboard_image: 'test_dashboard.jpg', description: 'A test dashboard that is active.', name: 'Promotion1'},
        {id: 2, active: false, banner_image:'test_banner.jpg', dashboard_image: 'test_dashboard.jpg', description: 'A test dashboard that is unactive.', name: 'Promotion2'},
        {id: 3, active: false, banner_image:'test_banner.jpg', dashboard_image: 'test_dashboard.jpg', description: 'Another test dashboard that is unactive.', name: 'Promotion3'}
      ]);
    });
};
