<template>
  <el-avatar :size="50" :src="circleUrl" />
  <pre>{{ this.user }}</pre>
</template>

<script>
export default {
  name: 'user-avatar',
  data() {
    return {
      user: this.$store.getters.getUser,
    }
  },
  created() {},
  methods: {},
  computed: {
    defaultAvatar() {
      const name = this.$store.getters.getUser.username
      return name.charAt(0).toUpperCase() + name.slice(1)
    },
  },
}
</script>
