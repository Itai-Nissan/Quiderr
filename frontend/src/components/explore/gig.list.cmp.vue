<template>
  <section class="gig-list-container main-layout">
    <ul class="gig-list">
      <gig-preview v-for="gig in gigs" :key="gig._id" :gig="gig" />
    </ul>
  </section>
</template>

<script>
import gigPreview from "../explore/gig.preview.vue"

export default {
  props: {
    gigs: Array,
  },
  data() {
    return {
      // gigParams: this.$route.query.search,
    }
  },
  created() {

  },
  components: {
    gigPreview,
  },
  methods: {
    toAddGig() {
      console.log('hi');
      //   this.$router.push("/gig/edit")
    },
  },
}
</script>
<style>
</style>
