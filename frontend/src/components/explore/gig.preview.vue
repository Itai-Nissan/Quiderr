<template>
  <section class="gig-preview-container flex space-between" @click="showGigDetails">
    <li>
      <div class="gig-preview-info">
        <vueper-slides :touchable="false">
          <template #arrow-right>
            <img src="../../assets/imgs/next.png" />
          </template>
          <template #arrow-left>
            <img src="../../assets/imgs/prev.png" />
          </template>

          <vueper-slide @click="onMoveToDetails" class="card-vuper-explore" :image="img" v-for="(img, i) in gig.imgUrl"
            :key="i" />
        </vueper-slides>

        <div class="gig-info">
          <div class="gig-owner-info">
            <img v-if="gig.owner.imgUrl" :src="gig.owner.imgUrl" alt="gig-img" />
            <div class="owner-name">
              <a @click="moveToUser">{{ gig.owner.fullname }}</a>
              <p @click="onMoveToDetails">Top rated seller</p>
            </div>
          </div>
          <div class="gig-preview-title" @click="onMoveToDetails">
            <p>{{ gig.title }}</p>
            <div class="gig-rating">
              <img src="../../../images/icons/rate_star.png" alt="" />
              <p style="color: ##ffbe5b">
                <!-- {{ Number.parseFloat(gig.owner.rate) - 0.2 }} -->
                {{ Number.parseFloat(gig.owner.rate).toFixed(1) }}
              </p>
              <span class="review-number">({{ gig.price * 6 + 1 }})</span>
            </div>
          </div>
          <div class="price-like-wrapper">
            <div class="price-like-container">
              <div v-bind:class="{
                'liked-heart': isLiked,
                'gray-heart': !isLiked,
              }">
                <svg @click="onSetLike" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14.4469 1.95625C12.7344 0.496875 10.1875 0.759375 8.61561 2.38125L7.99999 3.01562L7.38436 2.38125C5.81561 0.759375 3.26561 0.496875 1.55311 1.95625C-0.409388 3.63125 -0.512513 6.6375 1.24374 8.45312L7.29061 14.6969C7.68124 15.1 8.31561 15.1 8.70624 14.6969L14.7531 8.45312C16.5125 6.6375 16.4094 3.63125 14.4469 1.95625Z">
                  </path>
                </svg>
              </div>
              <div class="gig-preview-price" @click="onMoveToDetails">
                <h5>STARTING AT</h5>
                <h3>${{ gig.price }}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="gig-preview-btns flex column space-between"></div>
    </li>
  </section>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import { userService } from '../../services/user.service.js'

export default {
  components: { VueperSlides, VueperSlide },
  props: {
    gig: Object,
  },
  data() {
    return {
      isLiked: false,
      user: null,
      pics: [
        '../../../images/gigs/logo-design/logo-preview-41.jpg',
        '../../../images/gigs/logo-design/logo-preview-42.jpg',
        '../../../images/gigs/logo-design/logo-preview-43.jpg',
        '../../../images/gigs/logo-design/logo-preview-44.jpg',
      ],
    }
  },
  computed: {
    getImgCorrUrl() {
      return this.gig.imgUrl.map((img) => this.getImgUrl(img))
    },
  },
  created() {
    this.user = this.$store.getters.getUser
    if (this.user) {
      if (this.gig.likedByUsers.includes(this.user._id)) {
        this.isLiked = true
      }
    }
  },
  methods: {
    getImgUrl(file) {
      const fileStr = file.substring(file.indexOf('/images'))
      const imgUrl = new URL(`../../assets${fileStr}`, import.meta.url).href
      return imgUrl
    },
    /////////////////////////////////////////////////////////////////////
    onSetLike() {
      if (!this.user) return

      this.isLiked = !this.isLiked
      var updatedGig = JSON.parse(JSON.stringify(this.gig))

      if (this.isLiked) {
        updatedGig.likedByUsers.push(this.user._id)
      } else {
        updatedGig.likedByUsers = updatedGig.likedByUsers.filter((id) => {
          return id !== this.user._id
        })
      }
      this.$store.dispatch({
        type: 'updateGig',
        gig: JSON.parse(JSON.stringify(updatedGig)),
      })
    },
    //////////////////////////////////////////////////////////////////////
    moveToUser() {
      this.$router.push(`/user-profile/${this.gig.owner._id}`)
    },
    onMoveToDetails() {
      this.$router.push(`/details/${this.gig._id}`)
    },
    updateGig() {
      this.$store.dispatch({
        type: 'updateGig',
        gig: this.gig,
      })
    },
  },
}
</script>
