var config = require('./config.js');
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: config.DBAPI_HOST, //process.env.DBAPI_HOST,
    user: config.DBAPI_USER, //process.env.DBAPI_USER,
    password: config.DBAPI_PASSWORD, //process.env.DBAPI_PASSWORD,
    database: config.DBAPI_DATABASE //process.env.DBAPI_DATABASE
  }
});
/*
  Descrption: Creates a timestamp for the current date (yyyy-mm-dd).
*/
function GetDate() {
  var date = new Date();
  var day =  '' + date.getDate();
  var month = date.getMonth() + 1;
  month = '' + month;
  var year = date.getFullYear();
  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }
  return year + "-" + month + "-" + day;
};

/*
  Not complete
  Description: Encrypts a password.
*/
function PasswordEncryption(password) {
  return password;
};

/*
  Not complete
  Description: Decrypts a password.
*/
function PasswordDecryption(password) {
  return actualPassword;
};

/* GENERAL RESOURCE QUERIES */
/*
  Description: Retrieved all products.
*/
module.exports.GetAllProducts = function() {
  var promise = new Promise(function(resolve, reject) {
    knex.select()
    .from('product')
    .then(function(rows) {
      resolve(JSON.stringify({"status" : 200, "products" : rows}));
    }).catch(function(err) {
      reject(JSON.stringify({"status" : 400, "error" : err}));
    });
  });
  return promise;
};

/*
  Description: Retrieves all promotions.
*/
module.exports.GetAllPromotions = function() {
  var promise = new Promise(function(resolve, reject){
    knex.select()
    .from('promotion')
    .then(function(rows) {
      resolve(JSON.stringify({"status" : 200, "promotions" : rows}));
    }).catch(function(err) {
      reject(JSON.stringify({"status" : 400, "error" : err}));
    });
  });
  return promise;
}

/* PRODUCT RESOURCE QUERIES (Done) */
/*
  Description: Retrieves a certain product depending on the given id.
  productID (int): The id of the product to be found.
*/
module.exports.GetProduct = function(productID) {
  var promise = new Promise(function(resolve, reject){
    knex.select()
    .from('product')
    .where({id: productID})
    .then(function(row) {
      if (row.length == 0) {
        resolve(JSON.stringify({"status" : 200, "product" : {}, "empty": true}));
      } else {
        resolve(JSON.stringify({"status" : 200, "product" : row[0], "empty": false}));
      }
    }).catch(function(err) {
      reject(JSON.stringify({"status" : 400, "error" : err}));
    });
  });

  return promise;
}

/*
  Description: Adds a new product.
  name (String): The name of the new product.
  description (String): The description of the new product.
  price (float): The price of the new product.
  image (String): The name of the image file used for this product
*/
module.exports.PostProduct = function(name, description, price, image) {
  var currentDate = GetDate();
  var promise = new Promise(function(resolve, reject){
    knex('product')
    .insert({date_created: currentDate, date_updated: currentDate, description: description, image_file: image, name: name, price: price}, 'id')
    .then(function(id) {
      resolve(JSON.stringify({"status" : 200, "id" : id[0]}));
    }).catch(function(err) {
      reject(JSON.stringify({"status" : 400, "error" : err}));
    });
  });

  return promise;
}

/*
  Description: Updates a product.
  productID (int): The id of the product to be updated.
  name (String): The new name of the product.
  description (String): The new description for the product.
  price (float): The new price of the product.
  image (float): The new image for the product.
*/
module.exports.PutProduct = function(productID, name, description, price, image) {
  var currentDate = GetDate();
  var promise = new Promise(function(resolve, reject){
    knex('product')
    .where({id: productID})
    .update({date_updated: currentDate, description: description, image_file: image, name: name, price: price})
    .then(function(count) {
      if (count >= 1) {
        resolve(JSON.stringify({"status" : 200, "success" : true}));
      } else {
        resolve(JSON.stringify({"status" : 200, "success" : false}));
      }
    }).catch(function(err) {
      reject(JSON.stringify({"status" : 400, "error" : err}));
    });
  });
  return promise;
}

/*
  Description: Deletes the product with the given id.
  productID (int): The id of the product to be deleted.
*/
module.exports.DeleteProduct = function(productID) {
  var promise = new Promise(function(resolve, reject) {
    knex('product')
    .where({id: productID})
    .del()
    .then(function(count) {
      if (count >= 1) {
        resolve(JSON.stringify({"status" : 200, "success" : true}));
      } else {
        resolve(JSON.stringify({"status" : 200, "success" : false}));
      }
    }).catch(function(err) {
      reject(JSON.stringify({"status" : 400, "error" : err}));
    });
  });

  return promise;
}

/* PROMOTION RESOURCE QUERIES (Done) */
/*
  Description: Get a given promotion.
  promotionID (int): The id of the promotion to be gotten.
*/
module.exports.GetPromotion = function(promotionID) {
    var promise = new Promise(function(resolve, reject) {
      knex.select()
      .from('promotion')
      .where({id: promotionID})
      .then(function(row) {
        if (row.length == 0) {
          resolve(JSON.stringify({"status" : 200, "promotion" : {}, "empty": true}));
        } else {
          resolve(JSON.stringify({"status" : 200, "promotion" : row[0], "empty": false}));
        }
      }).catch(function(err) {
        reject(JSON.stringify({"status" : 400, "response" : err}));
      });
    });

    return promise;
}

/*
  Description: Creates a promotion.
  name (String): The name of the new promotion.
  description (String): A descripton of the new promotion.
  banner (String): The file name containing the image for this promotion's banner.
  dashboard (String): The file name containing the image for this promotion's dashboard.
*/
module.exports.PostPromotion = function(name, description, banner, dashboard) {
  var promise = new Promise(function(resolve, reject){
    knex('promotion')
    .insert({name: name, description: description, active: 0, banner_image: banner, dashboard_image: dashboard}, 'id')
    .then(function(id) {
      resolve(JSON.stringify({"status" : 200, "id" : id[0]}));
    }).catch(function(err) {
      reject(JSON.stringify({"status" : 400, "error" : err}));
    });
  });

  return promise;
}

/*
  Description: Updates a promotion.
  promotionID (int): The id of the promotion to be updated.
  name (String): The new name of the promotion.
  description (String): The new descripton of the promotion.
  active (int): Determines if the promotions is ongoing.
  banner (String): The new file name containing the image for this promotion's banner.
  dashboard (String): The new file name containing the image for this promotion's dashboard.
*/
module.exports.PutPromotion = function(promotionID, name, description, active, banner, dashboard) {
  var promise = new Promise(function(resolve, reject){
    knex('promotion')
    .where({id: promotionID})
    .update({name: name, description: description, active: active, banner_image: banner, dashboard_image: dashboard})
    .then(function(count) {
      if (count >= 1){
        resolve(JSON.stringify({"status" : 200, "success" : true}));
      } else {
        resolve(JSON.stringify({"status" : 200, "success" : false}));
      }
    }).catch(function(err) {
      reject(JSON.stringify({"status" : 400, "error" : err}));
    });
  });

  return promise;
}

/*
  Descrption: Deletes a promotions
  promotionID (int): The id of the promotion to be deleted.
*/
module.exports.DeletePromotion = function(promotionID) {
  var promise = new Promise(function(resolve, reject) {
    knex('promotion')
    .where({id: promotionID})
    .del()
    .then(function(count) {
      if (count >= 1) {
        resolve(JSON.stringify({"status" : 200, "success" : true}));
      } else {
        resolve(JSON.stringify({"status" : 200, "success" : false}));
      }
    }).catch(function(err) {
      reject(JSON.stringify({"status" : 400, "error" : err}));
    });
  });

  return promise;
}

/* CATERGOREY RESOURCE QUIRIES */
/*
  Description: Get all categories.
*/
module.exports.GetAllCategory = function() {
  var promise = new Promise(function(resolve, reject) {
    knex.select()
    .from('category')
    .then(function(rows) {
      resolve(JSON.stringify({"status" : 200, "categories" : rows}));
    }).catch(function(err) {
      reject(JSON.stringify({"status" : 400, "response" : err}));
    });
  });

  return promise;
};

/*
  Description: Get a category.
  categoryID (int): The id of the category to get.
*/
module.exports.GetCategory = function(categoryID) {
  var promise = new Promise(function(resolve, reject) {
    knex.select()
    .from('category')
    .where({id: categoryID})
    .then(function(row) {
      if (row.length == 0) {
        resolve(JSON.stringify({"status" : 200, "category" : {}, "empty": true}));
      } else {
        resolve(JSON.stringify({"status" : 200, "category" : row[0], "empty": false}));
      }
    }).catch(function(err) {
      reject(JSON.stringify({"status" : 400, "response" : err}));
    });
  });

  return promise;
};

/*
  Descripion: Adds a new category.
  name (String): The name of the new category.
*/
module.exports.PostCategory = function(name) {
  var promise = new Promise(function(resolve, reject) {
    knex('category')
    .insert({name: name}, 'id')
    .then(function(id) {
      resolve(JSON.stringify({"status" : 200, "id" : id[0]}));
    }).catch(function(err) {
      reject(JSON.stringify({"status" : 400, "error" : err}));
    });
  });

  return promise;
};

/*
  Descripion: Updates a category.
  categoryID (int): The id for the category to update.
  name (String): The new name of the category.
*/
module.exports.PutCategory = function(categoryID, name) {
  var promise = new Promise(function(resolve, reject){
    knex('category')
    .where({id: categoryID})
    .update({name: name})
    .then(function(count) {
      if (count >= 1){
        resolve(JSON.stringify({"status" : 200, "success" : true}));
      } else {
        resolve(JSON.stringify({"status" : 200, "success" : false}));
      }
    }).catch(function(err) {
      reject(JSON.stringify({"status" : 400, "error" : err}));
    });
  });

  return promise;
};

/*
  Descripion: Deletes a category.
  categoryID (int): The id of the category to delete.
*/
module.exports.DeleteCategory = function(categoryID) {
  var promise = new Promise(function(resolve, reject) {
    knex('category')
    .where({id: categoryID})
    .del()
    .then(function(count) {
      if (count >= 1) {
        resolve(JSON.stringify({"status" : 200, "success" : true}));
      } else {
        resolve(JSON.stringify({"status" : 200, "success" : false}));
      }
    }).catch(function(err) {
      reject(JSON.stringify({"status" : 400, "error" : err}));
    });
  });

  return promise;
};

/* PRODUCTCATEGORY RESOURCE QUIRIES */
/*
  Description: Gets all products apart of a category.
  category_id (int): The id of the category that is wanted.
*/
module.exports.GetProductCategory = function(categoryID) {
  var promise = new Promise(function(resolve, reject) {
    knex.select()
    .from('productcategory')
    .join('product', 'product.id', '=', 'productcategory.product_id')
    .where({'productcategory.category_id': categoryID})
    .then(function(rows) {
      if (rows.length == 0) {
        resolve(JSON.stringify({"status" : 200, "category" : {}, "empty": true}));
      } else {
        resolve(JSON.stringify({"status" : 200, "category" : rows, "empty": false}));
      }
    }).catch(function(err) {
      reject(JSON.stringify({"status" : 400, "response" : err}));
    });
  });

  return promise;
};

/*
  Descripion: Adds a product to a category.
  category_id (int): The id of the category the product should be a part of.
  product_id (int): The id of the product to add.
*/
module.exports.PostProductCategory = function(categoryID, productID) {
  var promise = new Promise(function(resolve, reject){
    knex('productcategory')
    .insert({category_id: categoryID, product_id: productID}, 'id')
    .then(function(id) {
      resolve(JSON.stringify({"status" : 200, "id" : id[0]}));
    }).catch(function(err) {
      reject(JSON.stringify({"status" : 400, "error" : err}));
    });
  });

  return promise;
};

/*
  Descripion: Does Nothing.
*/
module.exports.PutProductCategory = function() {
};

/*
  Descripion: Deletes a product being a part of a category.
  pcID (int): The id of the ProductCategory to delete.
*/
module.exports.DeleteProductCategory = function(pcID) {
  var promise = new Promise(function(resolve, reject) {
    knex('productcategory')
    .where({id: pcID})
    .del()
    .then(function(count) {
      if (count >= 1) {
        resolve(JSON.stringify({"status" : 200, "success" : true}));
      } else {
        resolve(JSON.stringify({"status" : 200, "success" : false}));
      }
    }).catch(function(err) {
      reject(JSON.stringify({"status" : 400, "error" : err}));
    });
  });

  return promise;
};

/* USER RESOURCE QUIRIES */
/*
  Descripion: Gets a user.
  email (String): The email of the user.
  password (String): The password of the user.
*/
module.exports.GetUser = function(email, password) {
  var promise = new Promise(function(resolve, reject) {
    knex.select()
    .from('user')
    .where({email: email, password: password})
    .then(function(row) {
      if (row.length == 0) {
        resolve(JSON.stringify({"status" : 200, "user" : {}, "empty": true}));
      } else {
        resolve(JSON.stringify({"status" : 200, "user" : row[0], "empty": false}));
      }
    }).catch(function(err) {
      reject(JSON.stringify({"status" : 400, "response" : err}));
    });
  });

  return promise;
}

/*
  Description: Creates a new user.
  email (String): The email for the new user.
  first (String): The first name of th user.
  last (String): The last name of the user.
  password (String): The password for the user.
  is_admin (Boolean): Flag to indicate that the user is a admin.
*/
module.exports.PostUser = function(email, first, last, password, is_admin) {
  var type = 2;

  if (is_admin) {
    type = 1;
  }

  var promise = new Promise(function(resolve, reject){
    knex('user')
    .insert({email: email, first_name: first, last_name: last, password: password, balance: 0, ut_id: type}, 'id')
    .then(function(id) {
      resolve(JSON.stringify({"status" : 200, "id" : id[0]}));
    }).catch(function(err) {
      reject(JSON.stringify({"status" : 400, "error" : err}));
    });
  });

  return promise;
}

/*
  Description: Updates a user's information.
  userID (int): The id of the user to be updated.
  email (String): The new email of the user.
  first (String): The new first name of the user.
  last (String): The new last name of the user.
  password (String): The new password for the user.
  oldPassword (string): The old password for the user.
  balance (float): The new balance for the user.
*/
module.exports.PutUser = function(userID, email, first, last, password, oldPassword, balance) {
  var promise = new Promise(function(resolve, reject){
    knex('user')
    .where({id: userID, password: oldPassword})
    .update({email: email, first_name: first, last_name: last, password: password, balance: balance})
    .then(function(count) {
      if (count >= 1){
        resolve(JSON.stringify({"status" : 200, "success" : true}));
      } else {
        resolve(JSON.stringify({"status" : 200, "success" : false}));
      }
    }).catch(function(err) {
      reject(JSON.stringify({"status" : 400, "error" : err}));
    });
  });

  return promise;
}

/*
  Description: Deletes a user given their id.
  userID (int): The id of the user to be deleted.
*/
module.exports.DeleteUser = function(userID) {
  var promise = new Promise(function(resolve, reject) {
    knex('user')
    .where({id: userID})
    .del()
    .then(function(count) {
      if (count >= 1) {
        resolve(JSON.stringify({"status" : 200, "success" : true}));
      } else {
        resolve(JSON.stringify({"status" : 200, "success" : false}));
      }
    }).catch(function(err) {
      reject(JSON.stringify({"status" : 400, "error" : err}));
    });
  });

  return promise;
}

/* PRODUCTLIST RESOURCE QUIRIES */
/*
  Description: Get the product lists associated to the user.
  userID (int): The id of the user.
*/
module.exports.GetProductList = function(userID) {
  var promise = new Promise(function(resolve, reject) {
    knex.select()
    .from('productlist')
    .where({user_id: userID})
    .then(function(rows) {
      if (rows.length == 0) {
        resolve(JSON.stringify({"status" : 200, "productlists" : {}, "empty": true}));
      } else {
        resolve(JSON.stringify({"status" : 200, "productlists" : rows, "empty": false}));
      }
    }).catch(function(err) {
      reject(JSON.stringify({"status" : 400, "response" : err}));
    });
  });

  return promise;
}

/*
  Description: Add the purchase history, cart, wishlist for a new user.
  userID (int): The user to add theProductList too.
*/
module.exports.PostProductList = function(userID) {
  var promise = new Promise(function(resolve, reject){
    knex('productlist')
    .insert([{user_id: userID, plt_id: 1}, {user_id: userID, plt_id: 2}, {user_id: userID, plt_id: 3}])
    .then(function(rows) {
      resolve(JSON.stringify({"status" : 200, "success" : true}));
    }).catch(function(err) {
      reject(JSON.stringify({"status" : 400, "error" : err}));
    });
  });

  return promise;
}

/*
  Description: Does nothing.
*/
module.exports.PutProductList = function() {
}

/*
  Description: Deletes the ProductLists for a user.
  userID (int): The id of user to have their ProductList deleted.
*/
module.exports.DeleteProductList = function(userID) {
  var promise = new Promise(function(resolve, reject) {
    knex('ProductList')
    .where({user_id: userID})
    .del()
    .then(function(count) {
      if (count >= 1) {
        resolve(JSON.stringify({"status" : 200, "success" : true}));
      } else {
        resolve(JSON.stringify({"status" : 200, "success" : false}));
      }
    }).catch(function(err) {
      reject(JSON.stringify({"status" : 400, "error" : err}));
    });
  });

  return promise;
}

/* PRODUCTLISTPRODUCT RESOURCE QUIRIES */
/*
  Description: Gets the products on a user's Cart, Order History, or Wishlist.
  pl_id (int): The id of the ProductList to get products for.
*/
module.exports.GetProductListProduct = function(plID) {
  var promise = new Promise(function(resolve, reject){
    knex.select()
    .from('productlistproduct')
    .join('productlist', 'productlist.id', '=', 'productlistproduct.pl_id')
    .join('product', 'product.id', '=', 'productlistproduct.product_id')
    .where({'productlistproduct.pl_id': plID})
    .then(function(rows) {
      resolve(JSON.stringify({"status" : 200, "productlistproducts" : rows}));
    }).catch(function(err) {
      reject(JSON.stringify({"status" : 400, "error" : err}));
    });
  });

  return promise;
}

/*
  Descrption: Adds a new product to the product list.
  plID (int): The id of the product list that the product is going to be added to.
  productID (int): The id of the product to be added.
  purchasePrice (float): The price the product was bought for.
*/
module.exports.PostProductListProduct = function(plID, productID, purchasePrice) {
  var currentDate = GetDate();
  var promise = new Promise(function(resolve, reject) {
    knex('productlistproduct')
    .insert({date_added: currentDate, pl_id: plID, product_id: productID, purchase_price: purchasePrice}, 'id')
    .then(function(id) {
      resolve(JSON.stringify({"status" : 200, "id" : id[0]}));
    }).catch(function(err) {
      reject(JSON.stringify({"status" : 400, "error" : err}));
    });
  });

  return promise;
}

/*
  Description: Updates a product on a product list.
  plpID (int): The id of the productlistproduct being updated.
  purchasePrice (float): The new purchase price.
*/
module.exports.PutProductListProduct = function(plpID, purchasePrice) {
  var promise = new Promise(function(resolve, reject){
    knex('productlistproduct')
    .where({id: plpID})
    .update({purchase_price: purchasePrice})
    .then(function(count) {
      if (count >= 1) {
        resolve(JSON.stringify({"status" : 200, "success" : true}));
      } else {
        resolve(JSON.stringify({"status" : 200, "success" : false}));
      }
    }).catch(function(err) {
      reject(JSON.stringify({"status" : 400, "error" : err}));
    });
  });

  return promise;
}

/*
  Description: Deletes a productlistproduct entry.
  id (int): The id of the productlistproduct to be deleted.
*/
module.exports.DeleteProductListProduct = function(plpID) {
  var promise = new Promise(function(resolve, reject) {
    knex('productlistproduct')
    .where({id: plpID})
    .del()
    .then(function(count) {
      if (count >= 1) {
        resolve(JSON.stringify({"status" : 200, "success" : true}));
      } else {
        resolve(JSON.stringify({"status" : 200, "success" : false}));
      }
    }).catch(function(err) {
      reject(JSON.stringify({"status" : 400, "error" : err}));
    });
  });

  return promise;
}

/* PROMOTIONPRODUCT RESOURCE QUERIES */
/*
  Descrption: Gets a specific promotion product.
  promotionID (int): The id of the promotion you want products for.
*/
module.exports.GetPromotionProduct = function(promotionID) {
  var promise = new Promise(function(resolve, reject) {
    knex.select()
    .from('promotionproduct')
    .join('product', 'product.id', '=', 'promotionproduct.product_id')
    .where({promotion_id: promotionID})
    .then(function(row) {
      if (row.length == 0) {
        resolve(JSON.stringify({"status" : 200, "promotionproduct" : {}, "empty": true}));
      } else {
        resolve(JSON.stringify({"status" : 200, "promotionproduct" : row, "empty": false}));
      }
    }).catch(function(err) {
      reject(JSON.stringify({"status" : 400, "error" : err}));
    });
  });

  return promise;
}

/*
  Description: Creates a new promtoion product.
  promotionID (int): The id for the promotion that this is apart of.
  productID (int): The id of the product that is getting added to the promoton.
  discount (float): How much of a discount is being applied to product.
*/
module.exports.PostPromotionProduct = function(promotionID, productID, discount) {
  var promise = new Promise(function(resolve, reject){
    knex('promotionproduct')
    .insert({promotion_id: promotionID, product_id: productID, discount: discount}, 'id')
    .then(function(id) {
      resolve(JSON.stringify({"status" : 200, "id" : id[0]}));
    }).catch(function(err) {
      reject(JSON.stringify({"status" : 400, "error" : err}));
    });
  });

  return promise;
}

/*
  Description: Updates a promotion product.
  ppID (int): The id of the promotion product to be updated.
  discount (float): The amount the product is being discounted by.
*/
module.exports.PutPromotionProduct = function(ppID, discount) {
  var promise = new Promise(function(resolve, reject) {
    knex('promotionproduct')
    .where({id: ppID})
    .update({discount: discount})
    .then(function(count) {
      if (count >= 1) {
        resolve(JSON.stringify({"status" : 200, "success" : true}));
      } else {
        resolve(JSON.stringify({"status" : 200, "success" : false}));
      }
    }).catch(function(err) {
      reject(JSON.stringify({"status" : 400, "error" : err}));qq
    });
  });

  return promise;
}

/*
  Description: Deletes a promotion product.
  ppID (int): The id of the promotion product to be deleted.
*/
module.exports.DeletePromotionProduct = function(ppID) {
  var promise = new Promise(function(resolve, reject) {
    knex('promotionproduct')
    .where({id: ppID})
    .del()
    .then(function(count) {
      if (count >= 1) {
        resolve(JSON.stringify({"status" : 200, "success" : true}));
      } else {
        resolve(JSON.stringify({"status" : 200, "success" : false}));
      }
    }).catch(function(err) {
      reject(JSON.stringify({"status" : 400, "error" : err}));
    });
  });

  return promise;
}

//Make a simple query to see that connecting to the database works.
module.exports.status = function() {
  var promise = new Promise(function(resolve, reject) {
    knex.select()
    .from('knex_migrations')
    .then(function(rows) {
      if (rows.length > 0) {
        resolve(JSON.stringify({"status" : 200, "online" : true}));
      } else {
        resolve(JSON.stringify({"status" : 200, "online" : false}));
      }
    }).catch(function(err){
      reject(JSON.stringify({"status" : 400, "response" : err}));
    });
  });

  return promise;
};
