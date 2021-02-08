# Auth-from-scratch
Realization of an application from scratch by following the videos of w3cj on its YouTube channel Coding Garden: https://www.youtube.com/channel/UCLNgu_OupwoeESgtab33CCw

Add JWT-based authentification to a Node/Express/Mongo app.

## Authentification
* [ ] Create server
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