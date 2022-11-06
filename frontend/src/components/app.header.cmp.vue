<template>
    <section class="main-header" :class="{ atHome: checkIfHome }">
        <div class="header" :class="{ atTop: MHTransparent }">

            <div>
                <div class="drop-logo-input">
                    <menu-dropdown-cmp></menu-dropdown-cmp>
                    <div class="logo-and-input">
                        <h1 class="logo" @click="home">quiderr<span>.</span></h1>
                        <header-input-cmp v-show="!SHTransparent" />
                    </div>
                </div>

                <nav class="header-nav" :class="{ logged: user }">
                    <router-link class="explore-link" to="/explore">Explore</router-link>
                    <!-- <router-link to="/seller">Become a seller</router-link> -->
                    <!-- <router-link v-if="user" :to="`/user-profile/${user._id}`">
                        <div class="user-nav-link-container">
                            <div class="user-nav-img">
                                <img :src="user.imgUrl" alt="">

                            </div>
                        </div>
                    </router-link> -->
                    <button class="user-btn" v-if="user">
                        <div @click="userModalOpen = !userModalOpen" class="user-nav-link-container">
                            <div class="user-nav-img">
                                <img v-if="user.imgUrl" :src="user.imgUrl" alt="">
                                <el-icon color="white" size="20px" v-else><UserFilled /></el-icon>
                                <!-- <el-icon color="white" size="20px" v-else><User /></el-icon> -->
                            </div>
                        </div>
                        <div v-if="userModalOpen" class="dropdown-user-menu">
                            <router-link class="profile-link" @click="userModalOpen = false" v-if="user"
                                :to="`/user-profile/${user._id}`">Profile</router-link>
                            <button v-if="user" @click="logout">Logout</button>
                        </div>
                    </button>

                    <!-- ********************* -->
                    <!-- <div v-if="!user" class="">
                        <join @closeModal="closeModal" class="login-modal" v-if="isOn" ref="modal"></join>
                        <button class="btn btn-info" @click="showModal">Sign in</button>
                    </div> -->
                    <!-- ************ -->

                    <router-link v-if="!user" to="/login">Sign in</router-link>
                    <router-link v-if="!user" class="join-btn" to="/signup">Join</router-link>
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
import menuDropdownCmpVue from "./menu.dropdown.cmp.vue";
import MenuDropdownCmp from './menu.dropdown.cmp.vue';

export default {
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
    },
    created() {
        //on loading check if we're at the home page:
        if (this.checkIfHome)
            this.isHome = true;
        //check if is on top:
        window.addEventListener("scroll", this.handleScroll);
    },
    watch: {
        $route(to, from) {
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
    components: {
        CategorieBtnCmp, HeaderInputCmp,
        MenuDropdownCmp,
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