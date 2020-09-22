# WishList4U API

## Use

The WishList4U API was built for use with wishlist4u-client ([repo](https://github.com/jyip01/wishlist4u-client)/[live app](https://wishlist4u-client.vercel.app/))).


### Base URL

The base URL for the Recommend4U API can be accessed [here](https://fierce-plains-04234.herokuapp.com/api)

### Endpoints

#### Auth Endpoints

* POST /auth/login - Used for user login on WishList4U client. In request body, required to pass 'username' and 'password'. Will respond with 400 status code if no user exists in wishlist_users table. If user exists, will create and send jwt.

#### Lists Endpoints

* POST /lists - Used to add a list to the wishlist_lists table. In request body, required to pass 'list_title' and 'list_description'. Will respond with 400 status code if any of the required fields are missing. If all fields are provided, will respond with 201 status code and the added request.
* GET /lists - No required or optional list data fields. Will return a serialized list of all requests in the recommend_requests table.
* GET /lists/:list_id - Required to pass list_id in the query string. Used to return the list that matches the corresponding list_id.
* DELETE /lists/:list_id - Used to delete a list specified in the query string. Required to pass list_id in the query string. Will respond with 204 status code and delete the request that has matching list_id.
* GET /lists/:list_id/wishes - Used to return wishes from a specified list. Required to pass list_id in the query string. Will return a serialized list of wishes for the list whose list_id was passed in the query string. 

#### Wishes Endpoints

* POST /wishes - Used to add a wish to the wishlist_wishes table. In request body, required to pass 'list_id', 'wish_title', and 'wish_url'. Will respond with 400 status code if any of the required fields are missing. If all fields are provided, will respond with 201 status code and the added wish.
* GET /wishes/:wish_id - Required to pass wish_id in the query string. Used to return the list that matches the corresponding wish_id.
* DELETE /wishes/:wish_id - Used to delete a wish specified in the query string. Required to pass wish_id in the query string. Will respond with 204 status code and delete the wish that has matching wish_id.
* PATCH /wishes/:wish_id - Used to update the wish specified in the query string. Required to pass wish_id in the query string. In request body, must pass at least one of 'list_id', 'wish_title', and 'wish_url'. Will respond with 400 status code if none of the fields are passed. If at least one of the fields are provided, will respond with 204 status code and will update the wish's field(s) and return the updated wish.

#### Users Endpoints

* POST /users - Used to add a user to the recommend_users table. In request body, required to pass 'preferred_name', 'user_name', and 'password'. Will respond with 400 status code if any of the required fields are missing. If all fields are provided, will respond with 201 status code and the added user.

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## WishList4U Project

### Live App 

A live version of the app can be accessed [here](https://wishlist4u-client.vercel.app/). 

To demo WishList4U, log in with: 
* User Name: Test_User
* Password: P@ssword1

## Summary
WishList4U is a web application that allows users to create wishlists for themselves. For example, you can create a list for your birthday or for your children's birthday and continue to add until the day comes. The goal of WishList4U is to make it easy to keep track of your wants or needs. 

### Technologies Used

#### Front End: 
* ReactJS
* jQuery
* HTML
* CSS

#### Back End: 
* Node.js
* Express
* PostgreSQL

#### APIs:
* WishList4U API