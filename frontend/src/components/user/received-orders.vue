<template>
  <section class="my-orders">
    <div
      v-for="receivedOrder in receivedOrders"
      :key="receivedOrder"
      class="order-item"
    >
      <div
        v-if="receivedOrder"
        class="order-main-info"
      >
        <div class="buyer-name-and-img">
          <img
            :src="receivedOrder.buyer.imgUrl"
            alt=""
          >
          <h3>{{ receivedOrder.buyer.fullname }}</h3>
        </div>
        <div class="order-price">
          Price: ${{ Number.parseFloat(receivedOrder.gig.price).toFixed(2) }}
        </div>
        <div class="order-issued-at">
          Order date: {{ receivedOrder.createdAt }}
        </div>
        <div class="order-status">
          Status: {{ receivedOrder.status }}
        </div>
      </div>
      <div
        v-if="receivedOrder"
        class="order-image"
      >
        <img
          :src="receivedOrder.gig.imgUrl[0]"
          alt=""
        >
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-icon class="el-icon--right">
              <more />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="onSetOrderStatus(receivedOrder, 'approved')">
                Aprrove
              </el-dropdown-item>
              <el-dropdown-item @click="onSetOrderStatus(receivedOrder, 'decline')">
                Decline
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </section>
</template>

<script>
import { socketService } from '../../services/socket.service'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'

export default {
  name: 'ReceivedOrders',
  data() {
    return {
      receivedOrders: null,
    }
  },
  created() {
    this.userReceivedOrders()
    socketService.on('updateUserOrders', (response) => {
      this.userReceivedOrders(response)
    })

  },
  methods: {
    async onSetOrderStatus(order, response) {
      await this.$store.dispatch({ type: 'setOrderStatus', order: order, response: response })
      this.userReceivedOrders()
      socketService.onSetOrderStatus("update-order", response)
      if(response === 'approved') showSuccessMsg('Order approved!')
      if(response === 'decline') showSuccessMsg('Order declined')
    },
    async userReceivedOrders(response) {
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

<style>

</style>
