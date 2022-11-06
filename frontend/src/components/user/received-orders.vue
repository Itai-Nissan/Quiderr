<template>
  <section class="my-orders">
    <div
      v-for="receivedOrder in receivedOrders"
      :key="receivedOrder"
      class="order-item"
    >
      <div class="order-main-info">
        <div class="buyer-name-and-img">
          <img :src="receivedOrder.buyer.imgUrl" alt="" />
          <h3>{{ receivedOrder.buyer.fullname }}</h3>
        </div>
        <div class="order-price">
          Price: ${{ Number.parseFloat(receivedOrder.gig.price).toFixed(2) }}
        </div>
        <div class="order-issued-at">
          Order date: {{ receivedOrder.createdAt }}
        </div>
        <div class="order-status">Status: {{ receivedOrder.status }}</div>
      </div>
      <div class="order-image">
        <img :src="receivedOrder.gig.imgUrl[0]" alt="" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'receivedOrders',
  data() {
    return {
      receivedOrders: null,
    }
  },
  created() {
    this.userReceivedOrders()
  },
  methods: {
    async userReceivedOrders() {
      const userId = this.$route.params.id
      this.receivedOrders = await this.$store.dispatch({
        type: 'loadOrders',
        sellerId: userId,
      })
    },
    components: {},
  },
}
</script>

<style></style>
