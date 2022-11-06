<template>
  <section @click="goToCategorie">
    <div class="categorie-btn">{{stylisedName}}</div>
  </section>
</template>

<script>
export default {
    props: {
        categorie: String,
    },
    methods: {
        goToCategorie(){
            this.$router.push(`/explore?search=${this.categorie}`)
        }
    },
    computed: {
        stylisedName(){
            return this.categorie
        }
    }
}
</script>