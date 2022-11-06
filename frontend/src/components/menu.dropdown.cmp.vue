<template>
  <section>
    <button class="dropdown-btn" @click="openMenu">
      <svg viewBox="0 0 100 80" width="40" height="40">
        <rect width="65" height="7" rx="8"></rect>
        <rect y="20" width="65" height="7" rx="8"></rect>
        <rect y="40" width="65" height="7" rx="8"></rect>
      </svg>
    </button>
    <div class="dropdown" :class="{menuOn: menuOn}">
      <button @click="goTo('/signup')" class="dropdown-join-btn">Join Quiderr</button>
      <div class="menu-dropdown-btns">
        <button @click="goTo('/login')">Sign in</button>
        <button @click="goTo('/')">Home</button>
        <button @click="goTo('/seller')">Become a Seller</button>
        <button @click="goTo('/explore')">Explore</button>
        <button>Browse Categories</button>  
      </div>
      

    </div>
    <div v-if="menuOn" @click="closeMenu" class="outside"></div>  
  </section>
</template>

<script>
export default {
  data() {
    return {
      menuOn: false,

    }
  },
  methods: {
    openMenu(){
      this.menuOn = true
    },
    closeMenu(){
      this.menuOn = false
    },
    goTo(page){
      this.menuOn = false
      this.$router.push(page)
    }
  },
}
</script>

<style>

</style>