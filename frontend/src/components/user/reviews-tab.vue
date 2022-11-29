<template>
  <section class="details-reviews-pack">
    <div
      v-for="(review, index) in reviews"
      :key="review"
      class="review-container"
    >
      <img
        class="reviewer-img"
        :src="review[index].by.imgUrl"
      >
      <div class="reviewer-info">
        <span>{{ review[index].by.fullname }}</span>
      </div>
      <div class="reviewer-location">
        <img
          class="country-flag"
          :src="review[index].by.flag"
        >
        <span class="country-name">{{ review[index].by.country }}</span>
      </div>
      <div class="review-txt">
        <p>{{ review[index].by.review }}</p>
      </div>
      <div class="review-at profile">
        <p>{{ review[index].by.reviewedAt }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      gigs: null,
      reviews: null,
    }
  },
  created() {
    this.userGigs()
  },
  methods: {
    async userGigs() {
      const userId = this.$route.params.id
      this.gigs = await this.$store.dispatch({ type: 'loadUserGigs', userId })
      this.reviews = this.gigs.map((gig) => gig.owner.reviews)
    },
  },
}
</script>

<style></style>
