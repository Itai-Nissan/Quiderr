<template>
    <section>
        <div class="gigs-display">
            <gig-preview v-for="gig in gigs" :key="gig._id" :gig="gig" />
        </div>
    </section>
</template>

<script>
import gigPreview from "../../components/explore/gig.preview.vue";

export default {
    name: 'gigsTab',
    data() {
        return {
            gigs: null,
        }
    },
    methods: {
        async userGigs() {
            const userId = this.$route.params.id
            this.gigs = await this.$store.dispatch({ type: 'loadUserGigs', userId })
            console.log(this.gigs);
        },
    },
    components: {
        gigPreview,
    },
    created() {
        this.userGigs()
    },
}
</script>

<style>

</style>