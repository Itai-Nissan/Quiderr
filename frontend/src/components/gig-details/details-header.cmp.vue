<template>
  <section v-if="gig" class="details-header">
    <h1 class="gig-title">{{ gig.title }}</h1>
    <div class="gig-details-owner-info">
      <img :src="gig.owner.imgUrl" />
      <h4>{{ gig.owner.fullname }}</h4>
      <h4 class="level">{{ setUserLevel() }}</h4>
      <span class="separator">|</span>
      <div v-if="gig" class="userStars">
        <el-rate
          v-model="getOwnerRate"
          disabled
          show-score
          text-color="#ff9900"
        />
      </div>
      <span>(207)</span>
      <p>5 Orders in Queue</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'details-header',
  props: { gig: Object },
  data() {
    return {}
  },
  methods: {
    setUserLevel() {
      const level = this.gig.owner.level
      if (level === 1) return 'New Seller'
      if (level <= 3) return 'Level 1'
      if (level > 3 && level < 4.5) return 'Level 2'
      if (level >= 4.5) return 'Top Rated Seller'
    },
  },
  computed: {
    getOwnerRate() {
      return Number.parseFloat(5).toFixed(1)
    },
  },
  created() {},
}
</script>

<style>
.el-rate__text {
  color: var(--el-rate-fill-color);
  font-size: larger;
  font-weight: 700;
}
</style>
