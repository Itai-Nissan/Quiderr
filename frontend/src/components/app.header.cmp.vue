<template>
  <section class="main-header" :class="{ atHome: checkIfHome }">
    <div class="header" :class="{ atTop: MHTransparent }">
      <div>
        <div class="drop-logo-input">
          <menu-dropdown-cmp />
          <div class="logo-and-input">
            <h1 class="logo" @click="home">
              quiderr<span>.</span>
            </h1>
            <header-input-cmp v-show="!SHTransparent" />
          </div>
        </div>
        <nav class="header-nav" :class="{ logged: user }">
          <router-link class="explore-link" to="/explore">
            Explore
          </router-link>
          <button v-if="user" class="user-btn">
            <div class="user-nav-link-container" @click="userModalOpen = !userModalOpen">
              <div class="user-nav-img">
                <img v-if="user.imgUrl" :src="user.imgUrl" alt="">
                <el-icon v-else color="white" size="20px">
                  <UserFilled />
                </el-icon>
              </div>
            </div>
            <div v-if="userModalOpen" class="dropdown-user-menu">
              <router-link
v-if="user" class="profile-link" :to="`/user-profile/${user._id}`"
                @click="userModalOpen = false">
                Profile
              </router-link>
              <button v-if="user" @click="logout">
                Logout
              </button>
            </div>
          </button>
          <router-link v-if="!user" to="/login">
            Sign in
          </router-link>
          <router-link v-if="!user" class="join-btn" to="/signup">
            Join
          </router-link>
        </nav>
      </div>
    </div>
    <div class="categories-menu" :class="{ atTop: SHTransparent }">
      <div>
        <categorie-btn-cmp v-for="categorie in categories" :key="categorie" :categorie="categorie" />
      </div>
    </div>
  </section>
</template>

<script>
import CategorieBtnCmp from "./home-page/categorie.btn.cmp.vue";
import HeaderInputCmp from "./header.input.cmp.vue";
import MenuDropdownCmp from './menu.dropdown.cmp.vue';

export default {
  name: 'AppHeader',
  components: {
    CategorieBtnCmp, HeaderInputCmp,
    MenuDropdownCmp,
  },
  data() {
    return {
      MHTransparent: true,
      SHTransparent: true,
      isHome: false,
      categories: [
        "Graphics & Design",
        "Digital Marketing",
        "Writing & Translation",
        "Video & Animation",
        "Music & Audio",
        "Programming & Tech",
        "Business",
        "Lifestyle"
      ],
      userModalOpen: false,
    };
  },
  computed: {
    checkIfHome() {
      return this.$route.name === "home";
    },
    user() {
      return this.$store.getters.getUser
    },
  },
  watch: {
    $route(to) {
      if (to.name !== "home") {
        this.isHome = false;
        //if not at home don't make header transparent:
        this.MHTransparent = false;
        this.SHTransparent = false;
      }
      else {
        this.isHome = true;
        this.MHTransparent = true;
        this.SHTransparent = true;
      }
    }
  },
  created() {
    //on loading check if we're at the home page:
    if (this.checkIfHome)
      this.isHome = true;
    //check if is on top:
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    // closeModal() {
    //     this.isOn = false
    // },
    // showModal() {
    //     if (this.isOn) {
    //         this.isOn = false
    //     }
    //     else this.isOn = true
    //     let element = this.$refs.modal.$el
    //     $(element).modal('show')

    // },
    logout() {
      this.userModalOpen = false
      this.$store.dispatch("logout")
      this.home()
    },
    home() {
      this.$router.push("/");
    },
    handleScroll() {
      if (!this.checkIfHome) {
        return;
      }
      if (window.scrollY > 0)
        this.MHTransparent = false;
      else
        this.MHTransparent = true;
      if (window.scrollY > 220)
        this.SHTransparent = false;
      else
        this.SHTransparent = true;
    }
  }
}
</script>

<style>
/* .login-modal {
    position: absolute;
    left: 500px;
    background-color: aliceblue;
    padding: 3em;
} */
</style>