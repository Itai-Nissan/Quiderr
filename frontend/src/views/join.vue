<template>
  <form
    class="signup-container form-page"
    @submit.prevent="signup"
  >
    <div class="signup-card flex column space-between">
      <div class="signup-fields flex column space-between grow-1">
        <h3>Signup:</h3>
        <label> Full Name </label>
        <input
          ref="fullname"
          v-model="cred.fullname"
          type="text"
        >
        <label> Username </label>
        <input
          v-model="cred.username"
          type="text"
        >
        <label> Password </label>
        <input
          v-model="cred.password"
          type="password"
        >
      </div>
      <button class="signup-btn">
        signup
      </button>
      <router-link
        to="/login"
        class="sec-btn"
      >
        Already signed up?
      </router-link>
    </div>
  </form>
</template>

<script>
export default {
  name: 'SignupPage',
  data() {
    return {
      cred: {
        fullname: '',
        username: '',
        password: '',
        imgUrl:'',
        level: 1,
        isSeller: false,
        isAdmin: false,
        description: 'new user',
        reviews: null,
      },
    };
  },
    mounted() {
    this.$refs.fullname.focus()
  },
  methods: {
    async signup() {
      console.log('you are here signup');

     await this.$store.dispatch({type: 'signup', cred: this.cred})
     this.$router.push('/')
    },
  }
};
</script>

<style>
</style>