<template>
  <section class="main-layout">
    <user-msg />
    <appHeader />
    <router-view />
    <appFooter />
    <!-- <join-cmp /> -->
  </section>
</template>
<script>
// import { Router/Link, RouterView } from 'vue-router'
import appHeader from './components/app.header.cmp.vue'
import appFooter from './components/app.footer.cmp.vue'
// import joinCmp from './components/join-and-signin/join.cmp.vue'
import userMsg from './components/user.msg.vue'

export default {
  name: 'app',
  data() {
    return {
      gigs: this.$store.dispatch({ type: 'loadGigs' }),
      user: this.$store.dispatch({ type: 'onGetLoggedinUser' }),
    }
  },
  created() {
  },
  components: {
    appHeader,
    appFooter,
    // joinCmp,
    userMsg,
  },
  unmounted() { },
  mounted() {
    // console.log(this.gigs)
  },
};
</script>



<style>
</style>
