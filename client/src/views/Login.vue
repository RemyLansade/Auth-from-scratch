<template>
    <section>
        <h1>Login</h1>
        <div v-if="logginIn">
            <img src="../assets/spinner.svg" >
        </div>
        <div v-if="errorMessage" class="alert alert-danger" role="alert">
            {{ errorMessage }}
        </div>
        <form v-if="!logginIn" @submit.prevent="login">
            <div class="form-group">
                <label for="username">Username</label>
                <input v-model="user.username" type="text" class="form-control" id="username" placeholder="Enter your username" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input v-model="user.password" type="password" class="form-control" id="password" placeholder="Enter your password" autocomplete="on" required>
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
    </section>
</template>

<script>

import Joi from 'joi';

const LOGIN_URL = 'http://localhost:5000/auth/login';

const schema = Joi.object({
  username: Joi.string().pattern(new RegExp('^[a-zA-Z0-9_]{6,30}$')).required(),
  password: Joi.string().trim().min(6).required(),
});

export default {
  data: () => ({
    logginIn: false,
    errorMessage: '',
    user: {
      username: '',
      password: '',
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
    login() {
      if (this.validUser()) {
        const body = {
          username: this.user.username,
          password: this.user.password,
        };
        this.logginIn = true;
        fetch(LOGIN_URL, {
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
        }).then((result) => {
          // Stock le token en local storage
          localStorage.setItem('token', result.token);
          setTimeout(() => {
            this.logginIn = false;
            this.$router.push('/dashboard');
          }, 500);
        }).catch((error) => {
          setTimeout(() => {
            this.logginIn = false;
            this.errorMessage = error.message;
          }, 500);
        });
      }
    },
    validUser() {
      const result = schema.validate(this.user);
      if (!result.error) {
        return true;
      }
      if (result.error.details[0].message.includes('username')) {
        this.errorMessage = 'Username is invalid. 😿';
      } else {
        this.errorMessage = 'Password is invalid. 🔐';
      }
      return false;
    },
  },
};
</script>

<style>

</style>
