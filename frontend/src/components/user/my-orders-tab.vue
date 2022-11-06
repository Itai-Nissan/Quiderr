<template>
  <section class="my-orders">
    <div v-for="order in orders" :key="order" class="order-item">
      <div class="order-main-info">
        <div class="seller-name-and-img">
          <img :src="order.seller.imgUrl" />
          <h3>{{ order.seller.fullname }}</h3>
        </div>
        <div class="order-price">
          Price: ${{ Number.parseFloat(order.gig.price).toFixed(2) }}
        </div>
        <div class="order-issued-at">Order date: {{ order.createdAt }}</div>
        <div class="order-status">Status: {{ order.status }}</div>
      </div>
      <div class="order-image"><img :src="order.gig.imgUrl[0]" alt="" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'myOrders',
  data() {
    return {
      orders: null,
    }
  },
  created() {
    this.userOrders()
  },
  methods: {
    async userOrders() {
      const userId = this.$route.params.id
      this.orders = await this.$store.dispatch({
        type: 'loadOrders',
        buyerId: userId,
      })
    },
  },
  components: {},
}
</script>

<style>

</style>
