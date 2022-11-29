<script>
export default {
    methods: {
        onSetLike() {
            this.isLiked = !this.isLiked
            if (!this.user) return
            
            var updatedGig = JSON.parse(JSON.stringify(this.gig))

            if (this.isLiked) {
                updatedGig.likedByUsers.push(this.user._id)
            } else {
                updatedGig.likedByUsers = updatedGig.likedByUsers.filter((id) => {
                    return id !== this.user._id
                })
            }

            this.$store.dispatch({
                type: 'updateGig',
                gig: JSON.parse(JSON.stringify(updatedGig)),
            })
        },
    },
}
</script>


