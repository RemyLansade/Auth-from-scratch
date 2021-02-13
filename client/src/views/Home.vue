<template>
  <div class="home text-center">
    <div class="jumbotron">
      <h1 class="display-3">Authentification for Newbs</h1>
      <p class="lead">Learning Auth is cool! 🔐🎉</p>
      <hr class="my-4">
      <p>Join us to learn more about authentication.</p>
      <p class="lead">
        <router-link class="btn btn-primary btn-lg" :to="{name:'Signup'}" role="button">Sign up</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>
