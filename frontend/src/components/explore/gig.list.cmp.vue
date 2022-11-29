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
  name: 'GigList',
  components: {
    gigPreview,
  },
  props: {
    gigs: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
    }
  },
  created() {

  },
  methods: {
    toAddGig() {
      console.log('hi');
    },
  },
}
</script>
<style>

</style>
