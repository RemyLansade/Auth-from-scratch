# Auth-from-scratch
Realization of an application from scratch by following the videos of w3cj on its YouTube channel Coding Garden: https://www.youtube.com/playlist?list=PLM_i0obccy3tfAersmDaq7-WFqvooNOXf

Add JWT-based authentification to a Node/Express/Mongo app.

## Authentification
* [X] Create server
* [X] Add auth router
* [X] Create user with POST /auth/signup
    * [X] validate required fields
    * [X] check if username is unique
    * [X] hash password with bcrypt
    * [X] insert into db
* [ ] Create landing page
    * [ ] link to sign up page
* [ ] Create sign up page
    * [ ] form with username & password
    * [ ] when form is submitted
        * [ ] validate username
            * [ ] display errors
        * [ ] validate password
            * [ ] display errors
        * [ ] POST request to the server
            * [ ] display errors
            * [ ] if successful sign up
                * [ ] redirect to login page
* [ ] Login user with POST /auth/login
    * [ ] check if email in db
        * [ ] compare password with hashed password in db
        * [ ] create and sign a JWT
            * [ ] respond with JWT
* [ ] Create login form, show errors, redirect
    * [ ] validate required fields
* [ ] Create sign up form, show errors, redirect
    * [ ] validate required fields

## Authorization
* [ ] Visitors can only see the homepage
    * [ ] isLoggedIn middleware
        * [ ] validate JWT in header
            * [ ] set req.user to be JWT payload
        * [ ] send an unauthorized error message
    * [ ] redirect to login form
* [ ] Logged in users can only see their page
    * [ ] allowAccess middleware
        * [ ] id in url must match id in req.user
        * [ ] send an unauthorized error message
    * [ ] redirect to user page if they visit the homepage
        * [ ] set user_id in localStorage after login/signup
* [ ] Add GET /auth/logout to clear user_id cookie
    * [ ] redirect to login page

## Administration page
* [ ] Admin page that list all users
    * [ ] admin table with user_id
    * [ ] de-activate users
* [ ] Admin can see any page on site
* [ ] Rate limiting
    * [ ] prevent brute force logins