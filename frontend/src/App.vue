<template>
  <section class="main-layout">
    <user-msg />
    <appHeader />
    <router-view />
    <appFooter />
  </section>
</template>
<script>
import appHeader from './components/app.header.cmp.vue'
import appFooter from './components/app.footer.cmp.vue'
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
    userMsg,
  },
  unmounted() { },
  mounted() {
  },
};
</script>
