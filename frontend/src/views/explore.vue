<template>
  <section class="explore">
    <gig-filter />
    <gig-list
      v-if="gigs"
      :gigs="gigs"
    />
  </section>
</template>

<script>
import gigList from "../components/explore/gig.list.cmp.vue"
import gigFilter from "../components/explore/gig.filter.cmp.vue"

export default {
  name: 'ExplorePage',
  components: {
    gigList,
    gigFilter,
  },
  data() {
    return {

    };
  },
  computed: {
    gigs() {
      return this.$store.getters.gigsToShow
    },
  },
  created() {
    this.scrollToTop()
  },
  unmounted() { },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    clearFilters() {
    },
  },
}
</script>

<style>
</style>

