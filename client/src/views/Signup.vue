/* eslint-disable */
<template>
  <div>
    <h1>Sign Up</h1>
    <div v-if="signingUp">
      <img src="../assets/spinner.svg" >
    </div>
    <div v-if="errorMessage" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>
    <form v-if="!signingUp" @submit.prevent="signup">
      <div class="form-group">
        <label for="username">Username</label>
        <input v-model="user.username" type="text" class="form-control" id="username" aria-describedby="usernameHelp" placeholder="Enter a username" required>
        <p id="usernameHelp" class="form-text text-muted">
          Username must be longer that 2 characters and shorter than 30, can only contain alphanumeric and under_scores.
        </p>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="password">Password</label>
          <input v-model="user.password" type="password" class="form-control" id="password" aria-describedby="passwordHelp" placeholder="Password" autocomplete="off" required>
          <p id="passwordHelp" class="form-text text-muted">
            Password must be longer that 10 or more characters long.
          </p>
        </div>
        <div class="form-group col-md-6">
          <label for="confirmPassword">Confirm password</label>
          <input v-model="user.confirmPassword" type="password" class="form-control" id="confirmPassword" aria-describedby="confirmPasswordHelp" autocomplete="off" placeholder="Confirm password" required>
          <p id="confirmPasswordHelp" class="form-text text-muted">
            Please confirm your password.
          </p>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Signup</button>
    </form>
  </div>
</template>

<script>

import Joi from 'joi';

const SIGNUP_URL = 'http://localhost:5000/auth/signup';

const schema = Joi.object({
  username: Joi.string().pattern(new RegExp('^[a-zA-Z0-9_]{6,30}$')).required(),
  password: Joi.string().trim().min(6).required(),
  confirmPassword: Joi.string().trim().min(6).required(),
});

export default {
  data: () => ({
    signingUp: false,
    errorMessage: '',
    user: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  }),
  watch: {
    user: {
      handler() {
        this.errorMessage = '';
      },
      deep: true,
    },
  },
  methods: {
    signup() {
      if (this.validUser()) {
        const body = {
          username: this.user.username,
          password: this.user.password,
        };
        this.signingUp = true;
        fetch(SIGNUP_URL, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'content-type': 'application/json',
          },
        }).then((response) => {
          if (response.ok) {
            return response.json();
          }
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        }).then(() => {
          setTimeout(() => {
            this.signingUp = false;
            this.$router.push('/login');
          }, 500);
        }).catch((error) => {
          setTimeout(() => {
            this.signingUp = false;
            this.errorMessage = error.message;
          }, 500);
        });
      }
    },
    validUser() {
      if (this.user.password !== this.user.confirmPassword) {
        this.errorMessage = 'Passwords must match. 🙈';
        return false;
      }

      const result = schema.validate(this.user);
      if (result.error) {
        if (result.error.details[0].message.includes('username')) {
          this.errorMessage = 'Username is invalid. 😿';
        } else {
          this.errorMessage = 'Password is invalid. 🔐';
        }
        return false;
      }
      return true;
    },
  },
};
</script>

<style>

</style>
