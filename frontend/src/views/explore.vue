<template>
  <section class="explore">
    <gig-filter />
    <gig-list v-if="gigs" :gigs="gigs"></gig-list>
  </section>
</template>

<script>
import gigList from "../components/explore/gig.list.cmp.vue"
import gigFilter from "../components/explore/gig.filter.cmp.vue"

export default {
  name: 'explore',
  data() {
    return {

    };
  },
  created() {
    this.scrollToTop()
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    clearFilters() {
    },
  },
  computed: {
    gigs() {
      return this.$store.getters.gigsToShow
    },
  },
  components: {
    gigList,
    gigFilter,
  },
  unmounted() { },
}
</script>

<style>
</style>

