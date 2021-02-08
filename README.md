# Auth-from-scratch
Realization of an application from scratch by following the videos of w3cj on its YouTube channel Coding Garden: https://www.youtube.com/channel/UCLNgu_OupwoeESgtab33CCw

Add JWT-based authentification to a Node/Express/Mongo app.

## Authentification
* [X] Create server
* [ ] Add auth router
* [ ] Create user with POST /auth/signup
    * [ ] validate required fields
    * [ ] check if email is unique
    * [ ] hash password with bcrypt
    * [ ] insert into db
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