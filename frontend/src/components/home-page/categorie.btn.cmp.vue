<template>
  <section @click="goToCategorie">
    <div class="categorie-btn">
      {{ stylisedName }}
    </div>
  </section>
</template>

<script>
export default {
    props: {
        categorie: String,
    },
    computed: {
        stylisedName(){
            return this.categorie
        }
    },
    methods: {
        goToCategorie(){
            this.$router.push(`/explore?search=${this.categorie}`)
        }
    }
}
</script>