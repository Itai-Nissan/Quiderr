<template>
  <section>
    <div class="user-profile">
      <div v-if="user">
        <div class="the-profile">
          <div class="user-info-stats">
            <div class="info-header">
              <form @submit.prevent=onSetUserImg() action="">
                <label for='imgupload'> <input v-on:click="onSetUserImg()" type="file" id="imgupload"
                    style="display:none" />
                  <el-icon v-if="!user.imgUrl" color="" size="50px">
                    <User />
                  </el-icon>
                  <img v-if="user.imgUrl" class="user-img" :src="user.imgUrl" />
                </label>
              </form>
              <!-- <form @submit.prevent=onSetUserImg(text) id="upload"> -->
              <!-- <form @change="onSetUserImg(e)" id="upload"> -->
              <!-- <label for="upload">File to upload</label> -->
              <!-- <input type="file" id="upload" accept="image/*"> -->
              <!-- <input type="text" @input="onSetUserImg(e)" id="upload"> -->
              <!-- <input :value="text"> -->
              <!-- </form> -->

              <!-- <div class="edit-btn">
                <el-icon class="">
                  <Edit />
                </el-icon>
              </div> -->
            </div>
            <h2>{{ user.username }}</h2>
            <div v-if="user.isSeller" class="profile-stars">
              <!-- <el-rate v-model="getUserLevel" disabled show-score text-color="#ff9900" /> -->
            </div>
            <p v-if="user.isSeller">Level {{ user.level }} seller</p>
            <p>
              <el-icon>
                <Location />
              </el-icon> From: {{ user.country }}
            </p>
            <p>
              <el-icon>
                <UserFilled />
              </el-icon> Member since: {{ memberSince }}
            </p>
          </div>
          <section class="user-description">
            <div :class="{ active: isDescription }">
              <header class="description-header">
                <h4>Description</h4>
                <div title="edit description" @click="onEditDescription" class="edit-btn">
                  <el-icon class="">
                    <Edit />
                  </el-icon>
                </div>
              </header>
              <section v-if="isDescription" class="static">
                <div v-if="user.description" class="user-description-text">
                  {{ user.description }}
                </div>
                <div v-if="!user.description" class="user-description-text">
                  You are welcome to write somthing about yourself
                </div>
              </section>
              <section v-if="!isDescription" class="static">
                <textarea ref="input" @input="onSetUserDescription($event.target.value)" v-if="user.description"
                  class="user-description-text">{{ user.description }}</textarea>
                <textarea ref="input" :value="value" @input="onSetUserDescription($event.target.value)"
                  v-if="!user.description" class="user-description-text">
                  You are welcome to write somthing about yourself
                </textarea>
              </section>
            </div>
          </section>
        </div>
        <div class="display-tabs">
          <div class="tab-btns">
            <button v-if="this.loggedInUser.isSeller" @click="openTab('gigsTab')"
              :class="{ selectedTab: activeTab === 'gigsTab' }">
              Gigs
            </button>
            <button v-if="loggedInUser && user._id === loggedInUser._id" @click="openTab('myOrders')"
              :class="{ selectedTab: activeTab === 'myOrders' }">
              My Orders
            </button>
            <button v-if="
              loggedInUser &&
              user._id === loggedInUser._id &&
              this.loggedInUser.isSeller
            " @click="openTab('receivedOrders')" :class="{ selectedTab: activeTab === 'receivedOrders' }">
              Received Orders
            </button>
            <button v-if="this.loggedInUser.isSeller" @click="openTab('reviewsTab')"
              :class="{ selectedTab: activeTab === 'reviewsTab' }">
              Reviews
            </button>
          </div>
          <component :is="activeTab" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import gigsTab from '../components/user/gigs-tab.vue'
import myOrders from '../components/user/my-orders-tab.vue'
import receivedOrders from '../components/user/received-orders.vue'
import reviewsTab from '../components/user/reviews-tab.vue'

export default {
  name: 'user-details',
  data() {
    return {
      orders: null,
      gigs: null,
      user: null,
      activeTab: 'gigsTab',
      loggedInUser: null,
      isDescription: true,
    }
  },
  created() {
    this.userPage()
    this.getLoggedInUser()

    if (this.loggedInUser && !this.loggedInUser.isSeller) {
      this.activeTab = 'myOrders'
    }
    // console.log(this.loggedInUser);
  },
  methods: {
    onSetUserDescription(value) {
      this.user.description = value
      this.$store.dispatch({ type: 'setUpdateUser', user: this.user })
    },
    onEditDescription() {
      this.isDescription = !this.isDescription
    },
    onSetUserImg(e) {
      console.log('img', e);
    },
    getLoggedInUser() {
      this.loggedInUser = this.$store.getters.getUser
    },
    async userPage() {
      const userId = this.$route.params.id
      this.user = await this.$store.dispatch({ type: 'getUserById', userId })
    },
    openTab(tab) {
      this.activeTab = tab
    },
  },
  computed: {
    memberSince() {
      return new Date(this.user.memberSince * 1000).toLocaleTimeString();
    },
    userParamsId() {
      return this.$route.params.id
    },
    getUserLevel() {
      return Number.parseFloat(this.user.level).toFixed(1)
    },
  },
  components: {
    gigsTab,
    myOrders,
    receivedOrders,
    reviewsTab,
  },
}
</script>
