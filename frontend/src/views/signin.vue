<template>
  <form
    class="login-container form-page"
    @submit.prevent="login"
  >
    <div class="login-card flex column space-between">
      <div class="login-fields flex column space-between grow-1">
        <h3>login:</h3>
        <label> Username </label>
        <input
          ref="username"
          v-model="cred.username"
          type="text"
        >
        <label> Password </label>
        <input
          v-model="cred.password"
          type="password"
        >
      </div>
      <button class="login-btn">
        login
      </button>
      <router-link
        to="/signup"
        class="sec-btn"
      >
        Don't have an account yet?
      </router-link>
    </div>
  </form>
</template>

<script>

  export default {
    name: 'LoginPage',
    data() {
      return {
        cred: {
          username: '',
          password: '',
        },
      };
    },
    mounted() {
      this.$refs.username.focus();
    },
    methods: {
      async login() {
        console.log('you are here login signin')
        // const loggedUser = await this.$store.dispatch({type: 'login', cred: this.cred});
        this.$router.push('/');
      },
    },
  };
</script>

<style></style>
