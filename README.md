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
* [X] Visitors can only see the homepage
    * [X] checkTokenSetUser middleware
        * [X] get token from Authorization header
            * [X] if defined ---
                * [X] verify the token with the token secret
                * [X] set req.user to be the decoded verified payload
        * [X] else - move along
    * [ ] isLoggedIn middleware
        * [ ] if req.user is set - move along
        * [ ] else - send an unathorized error message
    * [ ] redirect to login form
* [X] Logged in users can only see their page
* [ ] POST /api/v1/notes
    * [ ] must be logged in
    * [ ] logged in users can create notes
        * [ ] Title
        * [ ] Description -- markdown
        * [ ] set user_id on server with logged in users id
* [ ] Create notes form on client
    * [ ] Title
    * [ ] Description
* [ ] GET /api/v1/notes
    * [ ] must be logged in
        * [ ] logged in users can request all their notes
            * [ ] get all notes in DB with logged in users user_id
* [ ] List all notes on client
    * [ ] render description with markdown


## Administration page
* [ ] Admin page that list all users
    * [ ] admin table with user_id
    * [ ] de-activate users
* [ ] Admin can see any page on site
* [ ] Rate limiting
    * [ ] prevent brute force logins