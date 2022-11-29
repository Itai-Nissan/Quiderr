<template>
  <section>
    <div class="user-profile">
      <div v-if="user">
        <div class="the-profile">
          <div class="user-info-stats">
            <div class="info-header">
              <form action="" @submit.prevent="onSetUserImg()">
                <label for="imgupload"> <input id="imgupload" type="file" style="display:none" @click="onSetUserImg()">
                  <el-icon v-if="!user.imgUrl" color="" size="50px">
                    <User />
                  </el-icon>
                  <img v-if="user.imgUrl" class="user-img" :src="user.imgUrl">
                </label>
              </form>
            </div>
            <h2>{{ user.username }}</h2>
            <div v-if="user.isSeller" class="profile-stars" />
            <p v-if="user.isSeller">
              Seller
            </p>
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
                <div v-if="loggedInUser && user._id === loggedInUser._id" title="edit description" class="edit-btn"
                  @click="onEditDescription">
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
                <textarea v-if="user.description" ref="input" class="user-description-text"
                  @input="onSetUserDescription($event.target.value)">{{ user.description }}</textarea>
                <textarea v-if="!user.description" ref="input" :value="value" class="user-description-text"
                  @input="onSetUserDescription($event.target.value)">You are welcome to write somthing about yourself</textarea>
              </section>
            </div>
          </section>
        </div>
        <div class="display-tabs">
          <div class="tab-btns">
            <button v-if="loggedInUser.isSeller" :class="{ selectedTab: activeTab === 'gigsTab' }"
              @click="openTab('gigsTab')">
              My Gigs
            </button>
            <button v-if="loggedInUser && user._id === loggedInUser._id"
              :class="{ selectedTab: activeTab === 'myOrders' }" @click="openTab('myOrders')">
              My Orders
            </button>
            <button v-if="
              loggedInUser &&
              user._id === loggedInUser._id &&
              loggedInUser.isSeller
            " :class="{ selectedTab: activeTab === 'receivedOrders' }" @click="openTab('receivedOrders')">
              Received Orders
            </button>
            <button v-if="loggedInUser.isSeller" :class="{ selectedTab: activeTab === 'reviewsTab' }"
              @click="openTab('reviewsTab')">
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
  name: 'UserDetails',
  components: {
    gigsTab,
    myOrders,
    receivedOrders,
    reviewsTab,
  },
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
  computed: {
    memberSince() {
      return this.user.memberSince
    },
    userParamsId() {
      return this.$route.params.id
    },
    getUserLevel() {
      return Number.parseFloat(this.user.level).toFixed(1)
    },
  },
  created() {
    this.userPage()
    this.getLoggedInUser()

    if (this.loggedInUser && !this.loggedInUser.isSeller) {
      this.activeTab = 'myOrders'
    }
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
}
</script>
