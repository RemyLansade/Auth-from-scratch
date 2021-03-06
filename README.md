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
    * [X] isLoggedIn middleware
        * [X] if req.user is set - move along
        * [X] else - send an unathorized error message
    * [X] redirect to login form
* [X] Logged in users can only see their page
* [X] Create notes form on client
    * [X] Title
    * [X] Description
* [X] POST /api/v1/notes
    * [X] must be logged in
    * [X] logged in users can create notes
        * [X] Title
        * [X] Description -- markdown
        * [X] set user_id on server with logged in users id
* [X] GET /api/v1/notes
    * [X] must be logged in
        * [X] logged in users can request all their notes
            * [X] get all notes in DB with logged in users user_id
* [X] List all notes on client
    * [X] render description with markdown
* [ ] User can mark notes in public
    * [ ] Notes show up on profile


## Administration page
* [ ] Admin page that list all users
    * [ ] admin table with user_id
    * [ ] de-activate users
* [ ] Admin can see any page on site
* [ ] Rate limiting
    * [ ] prevent brute force logins
    * [ ] lock out account after too many attempts
* [ ] Password strength meter
* [ ] ReCaptcha
* [ ] Forgot password
    * [ ] password reset with email
    * [ ] password reset by answering security questions
* [ ] Testing...
