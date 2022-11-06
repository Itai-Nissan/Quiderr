<template>
  <form @submit.prevent="signup" class="signup-container form-page">
    <div class="signup-card flex column space-between">
      <div class="signup-fields flex column space-between grow-1">
        <h3>Signup:</h3>
        <label> Full Name </label>
        <input ref="fullname" v-model="cred.fullname" type="text" />
        <label> Username </label>
        <input v-model="cred.username" type="text" />
        <label> Password </label>
        <input v-model="cred.password" type="password" />
      </div>
      <button class="signup-btn">signup</button>
      <router-link to="/login" class="sec-btn">Already signed up?</router-link>
    </div>
    
  </form>
</template>

<script>
export default {
  name: 'signup-page',
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
  methods: {
    async signup() {
     await this.$store.dispatch({type: 'signup', cred: this.cred});
     this.$router.push('/')
    },
  },
    mounted() {
    this.$refs.fullname.focus()
  }
};
</script>

<style>
</style>