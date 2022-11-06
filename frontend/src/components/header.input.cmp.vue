<template>
  <section class="header-search-container">
    <input v-model="filter.txt" @change="setFilterBy" class="header-search-input" type="text"
      placeholder="What service you are looking for today?">
    <button class="header-search-btn">
      <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15.8906 14.6531L12.0969 10.8594C12.025 10.7875 11.9313 10.75 11.8313 10.75H11.4187C12.4031 9.60938 13 8.125 13 6.5C13 2.90937 10.0906 0 6.5 0C2.90937 0 0 2.90937 0 6.5C0 10.0906 2.90937 13 6.5 13C8.125 13 9.60938 12.4031 10.75 11.4187V11.8313C10.75 11.9313 10.7906 12.025 10.8594 12.0969L14.6531 15.8906C14.8 16.0375 15.0375 16.0375 15.1844 15.8906L15.8906 15.1844C16.0375 15.0375 16.0375 14.8 15.8906 14.6531ZM6.5 11.5C3.7375 11.5 1.5 9.2625 1.5 6.5C1.5 3.7375 3.7375 1.5 6.5 1.5C9.2625 1.5 11.5 3.7375 11.5 6.5C11.5 9.2625 9.2625 11.5 6.5 11.5Z">
        </path>
      </svg>
    </button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      searchInput: null,
      filter: {
        txt: '',
      }
    }
  },
  created() {

    // this.filter.txt = this.gigParams
    // this.setFilterBy()
  },
  unmouted(){

  },

  methods: {
    search() {
      // console.log(`/explore?search=${this.searchInput}`);
      // this.$store.dispatch({ type: 'loadGigs' }),
      //   this.$router.push(`/explore?search=${this.searchInput}`)
    },
    // setFilterBy(search = this.searchInput){
    //   console.log(this.searchInput);
    //   this.$router.push(`/explore?search=${search}`)
    // },
    setFilterBy() {
      let filter = this.filter;

      console.log('setFilterBy', filter.txt);
      this.$store.commit({
        type: 'setFilterBy',
        filterBy: JSON.parse(JSON.stringify(filter)),
      })
      this.$store.dispatch('loadGigs')
      this.$router.push(`/explore?search=${filter.txt}`)
      this.filter.txt = ''
    },

  },
}
</script>

<style>

</style>