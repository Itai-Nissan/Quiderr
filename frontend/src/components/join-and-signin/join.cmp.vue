<template>
    <form @submit.prevent="login" v-if="isOn" class="join-container form-page">
        <div class="login-card flex column space-between">
            <div class="login-fields flex column space-between grow-1">
                <h3>login</h3>
                <label> Username </label>
                <input ref="username" v-model="cred.username" type="text" />
                <label> Password </label>
                <input v-model="cred.password" type="password" />
            </div>
            <button class="login-btn">login</button>
        </div>
        <router-link to="/signup" class="sec-btn">Don't have an account yet?</router-link>
    </form>
</template>

<script>
// import { socketService } from '../services/socket.service.js'

export default {
    name: 'login-page',
    data() {
        return {
            cred: {
                username: '',
                password: '',
            },
            isOn: false,
        }
    },
    methods: {
        openModal() {
            console.log('its on');
            this.isOn = true
        },
        closeModal() {
            this.isOn = false
        },
        async login() {
            await this.$store.dispatch({ type: 'login', cred: this.cred });
            socketService.emit("set-user-socket", this.$store.getters.getUser._id)
            this.$emit('closeModal')

            this.$router.push('/')
        },
    },
    mounted() {
        // this.$refs.username.focus();
    },
};
</script>

<style>
</style>


<!-- 
<template>
  <section v-if="isOn" class="join-container">
    <div class="join-modal">

    </div>
    <div @click="closeModal()" class="outside"></div>
  </section>
</template>

<script>
export default {
    data() {
        return {
            isOn: true,
        }
    },
    methods: {
        openModal(){
            this.isOn = true
        },
        closeModal(){
            this.isOn = false
        }
    },
}
</script>

<style>

</style> -->
