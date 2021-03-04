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
* [X] Create landing page
    * [X] link to sign up page
* [X] Create sign up page
    * [X] form with username & password
    * [X] when form is submitted
        * [X] validate username
            * [X] display errors
        * [X] validate password
            * [X] display errors
        * [X] POST request to server POST /auth/signup
            * [X] display errors
            * [X] if successful sign up
                * [X] redirect to login page
* [X] Login user with POST /auth/login
    * [X] check if email in db
        * [X] compare password with hashed password in db
        * [X] create and sign a JWT
            * [X] respond with JWT
* [X] Create login page
    * [X] form with username & password
    * [X] when form is submitted
        * [X] validate username
            * [X] display errors
        * [X] validate password
            * [X] display errors
        * [X] POST request to server POST /auth/login
            * [X] display errors
            * [X] if successful login
                * [X] Store the token in localstorage
                * [X] Redirect to the "Dashboard".
* [X] If a logged in user visits the sign-up or login page, redirect them to the dashboard                
* [X] After signup, immediately login

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