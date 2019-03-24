//Product table
function ProductTable(product){
  product.increments('id');
  // product.json('categories');
  product.timestamp('date_created');
  product.timestamp('date_updated');
  product.string('description').notNullable();
  //product.json('discount');
  product.string('image_file').notNullable();
  product.string('name').notNullable();
  product.float('price').notNullable();
  //product.json('purchases');
  //product.json('views');
  product.unique('name');
};

//Promotion table
function PromotionTable(promotion) {
  promotion.increments('id');
  promotion.boolean('active').notNullable().defaultTo(false);
  promotion.string('banner_image').notNullable();
  promotion.string('dashboard_image').notNullable();
  promotion.string('description').notNullable();
  promotion.string('name').notNullable();
};

//Category table
function CategoryTable(category) {
  category.increments('id');
  category.string('name').notNullable();
  category.unique('name');
};

//ProductCategory table
function ProductCategoryTable(pc) {
  pc.increments('id');
  pc.integer('category_id').unsigned().references('id').inTable('category').onDelete('CASCADE');
  pc.integer('product_id').unsigned().references('id').inTable('product').onDelete('CASCADE');
}

//ProductListType table
function ProductListTypeTable(plt) {
  plt.increments('id');
  plt.string('name').notNullable();
  plt.unique('name');
};

//UserType table
function UserTypeTable(ut) {
  ut.increments('id');
  ut.string('name').notNullable();
  ut.unique('name');
};

//User table
function UserTable(user) {
  user.increments('id');
  user.float('balance');
  user.string('email').notNullable();
  user.string('first_name').notNullable();
  user.string('last_name').notNullable();
  user.string('password').notNullable();
  user.integer('ut_id').unsigned().references('id').inTable('UserType').onDelete('CASCADE');
  user.unique('email');
};

//PromotionProduct table
function PromotionProductTable(pp) {
  pp.increments('id');
  pp.float('discount');
  pp.integer('product_id').unsigned().references('id').inTable('Product').onDelete('CASCADE');
  pp.integer('promotion_id').unsigned().references('id').inTable('Promotion').onDelete('CASCADE');
};

//ProductList table
function ProductListTable(pl) {
  pl.increments('id');
  pl.integer('plt_id').unsigned().references('id').inTable('ProductListType').onDelete('CASCADE');
  pl.integer('user_id').unsigned().references('id').inTable('User').onDelete('CASCADE');
};

//ProductListProduct table
function ProductListProductTable(plp) {
  plp.increments('id');
  plp.timestamp('date_added');
  plp.integer('pl_id').unsigned().references('id').inTable('ProductList').onDelete('CASCADE');
  plp.integer('product_id').unsigned().references('id').inTable('Product').onDelete('CASCADE');
  plp.float('purchase_price');
};

exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('Product', ProductTable)
    .createTable('Promotion', PromotionTable)
    .createTable('Category', CategoryTable)
    .createTable('ProductCategory', ProductCategoryTable)
    .createTable('ProductListType', ProductListTypeTable)
    .createTable('UserType', UserTypeTable)
    .createTable('User', UserTable)
    .createTable('PromotionProduct', PromotionProductTable)
    .createTable('ProductList', ProductListTable)
    .createTable('ProductListProduct', ProductListProductTable);
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('ProductListProduct')
    .dropTableIfExists('ProductList')
    .dropTableIfExists('PromotionProduct')
    .dropTableIfExists('User')
    .dropTableIfExists('UserType')
    .dropTableIfExists('ProductListType')
    .dropTableIfExists('ProductCategory')
    .dropTableIfExists('Category')
    .dropTableIfExists('Promotion')
    .dropTableIfExists('Product');
};
