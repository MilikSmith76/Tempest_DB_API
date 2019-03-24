# Tempest DB API

A RESTful API for my web application called Tempest. Take HTTP requests then returns JSON responses.

## Scripts

Scripts that can be run by using "npm run {script_name}" to perform certain actions.

* start / devstart: Starts the application
* migrate: Creates the tables needed for the application in the database
* migraterollback: Drops the tables created for this application in the database
* dataseed: Creates a few records in the database

## Resources

* category
* product
* productcategory
* productlist
* productlistproduct
* promotion
* promotionproduct
* user

## Category

Manages category resources.

Route: domain:3000/api/category/

### GET

Gets All categories or gets a specific category.

Request Parameters:
* id: The id of the category to be retrieved (If not present in the request, then all categories are retrieved)

### POST

Creates a new category.

Request Body:
* name: The name of the category

### PUT

Updates an existing category.

Request Body:
* category_id: The id of the category to be updated
* name: The new name of the category

### DELETE

Deletes an existing category.

Request Body:
* category_id: The id of the category to be deleted

## Product

Manages product resources.

Route: domain:3000/api/product/

### GET

Gets all products or a specific product.

Request Parameters:
* product_id: The id of the product to be retrieved (If not present in the request, then all products are retrieved)

### POST

Creates a product.

Request Body:
* name: The name of the product
* description: The description of the product
* price: The price of the product
* image: The file name of the image for the product

### PUT

Updates a product.

Request Body:
* product_id: The id of the product to be updated
* name: The new name of the product
* description: The new description of the product
* image: The new file name of the image for the product
* price: the new price of the product

### DELETE

Deletes a product.

Request Body:
* product_id: The id of the product to be deleted

## ProductCategory

Manages relation to product and category.

Route: domain:3000/api/productcategory/

### GET

Gets all products apart of a category.

Request Parameters:
* category_id: The id of the category of products to retrieve

### POST

Adds a product to a category.

Request Body:
* category_id: The id of the category to have a product added to it
* product_id: The id of the product to be added

### DELETE

Removes a product from a category.

Request Body:
* pc_id: The id of the relation between product and category to be removed

## ProductList

Manages product list (Order history, Wish list, Cart) resources of a user.

Route: domain/api/productlist/

### GET

Gets all product lists for a user.

Request Parameters:
* user_id: The id of the user to be retrieved

### POST

Creates product lists for a new user.

Request Body:
* user_id: The id of the user to create the new product lists for


### DELETE

Deletes the product lists for a user.

Request Body:
* user_id: The id of the user to have their product lists deleted

## ProductListProduct

Manages products in product lists.

Route: domain/api/productlistproduct/

### GET

Gets all products in a product list.

Request Parameters:
* pl_id: The id of the product list to retrieve products for

### POST

Adds a new product to a product list.

Request Body:
* pl_id: The id of the product list having a product added to it
* product_id: The id of the product to be added
* purchase_price: The amount the product was purchased for

### PUT

Updates a product in a product list.

Request Body:
* plp_id: The id of the product list and product relationship
* purchase_price: The amount the product was purchased for

### DELETE

Deletes a product from a product list.

Request Body:
* plp_id: The id of the product list and product relationship

## Promotion

Manages promotion resources.

Route: domain/api/promotion/

### GET

Gets all promotions or gets a specific promotion.

Request Parameters:
* promotion_id: The id of the promotion to be retrieved (If not present in the request, then all promotion are retrieved)

### POST

Creates a new promotion.

Request Body:
* name: The name of the promotion
* description: The description of the promotion
* banner: The file name of the banner image
* dashboard: The file name of the dashboard image

### PUT

Updates an existing promotion.

Request Body:
* promotion_id: The id of the promotion to be updated.
* name: The name of the promotion
* description: The description of the promotion
* Active: A flag indicating whether the promotion is active
* banner: The file name of the banner image
* dashboard: The file name of the dashboard image

### DELETE

Deletes an existing promotion.

Request Body:
* promotion_id: The id of the promotion to be deleted

## PromotionProduct

Manages products in promotions.

Route: domain/api/promotionproduct/

### GET

Gets all products in a promotion.

Request Parameters:
* promotion_id: The id of the promotion to get products for

### POST

Adds a new product to a promotion.

Request Body:
* promotion_id: The id of the promotion to add products to.
* product_id: The id of the product that is going to be added
* discount: The discount for the product

### PUT

Updates the product and promotion relationship information.

Request Body:
* pp_id: The id of the promotion and product relationship to be updated
* discount: the new discount of the product

### DELETE

Deletes a product from a promotion.

Request Body:
* pp_id: The id of the promotion product to be deleted

## User

Manages user resources.

Route: domain/api/user/

### GET

Gets an user.

Request Body:
* email: the email of the user.
* password: The password of the user

### POST

Creates a new user.

Request Body:
* email: The email of the user
* first: The first name of the user
* last: The last name of the user
* password: The password of the user
* is_admin: A flag to determine whether the user is an admin user

### PUT

Updates an user.

Request Body:
* user_id: The id of the user to be updated
* email: The new email of the user
* first: The new first name of the user
* last: The new last name of the user
* password: The new password of the user
* old_password: The old password of the user
* balance: The new balance for the user

### DELETE

Deletes an existing user.

Request Body:
* user_id: The id of the user to be deleted
