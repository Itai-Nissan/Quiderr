<template>
  <section v-if="gig" class="details-about-gig">
    <h3>About This Gig</h3>
    <p>{{ gig.description }}</p>
  </section>
</template>

<script>
export default {
  name: 'DetailsAboutGig',
  props: {
    gig: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {},
  created() { },
  methods: {},
}
</script>
