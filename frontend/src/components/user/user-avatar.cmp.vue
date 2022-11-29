<template>
  <el-avatar
    :size="50"
    :src="circleUrl"
  />
  <pre>{{ user }}</pre>
</template>

<script>
export default {
  name: 'UserAvatar',
  data() {
    return {
      user: this.$store.getters.getUser,
    }
  },
  computed: {
    defaultAvatar() {
      const name = this.$store.getters.getUser.username
      return name.charAt(0).toUpperCase() + name.slice(1)
    },
  },
  created() {},
  methods: {},
}
</script>
