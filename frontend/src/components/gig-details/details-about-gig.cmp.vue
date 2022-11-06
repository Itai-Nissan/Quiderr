<template>
  <section v-if="gig" class="details-about-gig">
    <h3>About This Gig</h3>
    <p>{{ gig.description }}</p>
  </section>
</template>

<script>
export default {
  name: 'details-about-gig',
  props: { gig: Object },
  data() {
    return {}
  },
  methods: {},
  computed: {},
  created() {},
}
</script>
