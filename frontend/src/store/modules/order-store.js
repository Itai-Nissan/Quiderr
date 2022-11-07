import { orderService } from '../../services/order.service.js'


// create a store instance
export const orderStore = {
  strict: true,
  state: {
    orders: null,
    filterBy: null,
    sortBy: null,
  },
  getters: {
    ordersToShow(state) {
      const orders = JSON.parse(JSON.stringify(state.orders))
      return orders
    },
  },
  mutations: {
    addOrder(state, { order }) {
      state.orders.push(order)
    },
    setOrders(state, { orders }) {
      state.orders = orders
    },
    setFilterBy(state, filterBy) {
      state.filterBy = filterBy
    },
    sortBy(state, { sortBy }) {
      state.sortBy = sortBy
    },
  },
  actions: {
    setOrderStatus(state, { order, response }) {
      let updatedOrder = order

      if (response === 'approved') {
        updatedOrder = orderService.updateOrder(order, response)
      }
      if (response === 'decline') {
        updatedOrder = orderService.remove(order._id)
      }
      return updatedOrder
    },
    onSetFilterBy(state, filterBy) {
      state.commit({ type: 'setFilterBy', filterBy })
    },
    onCreateOrder(context, { order, user }) {
      try {
        const savedOrder = orderService.saveOrder(order, user)
        context.commit({ type: 'addOrder', order: savedOrder })
        return savedOrder
      } catch (err) {
        console.log(err)
      }
    },
    getOrderById(context, { orderId }) {
      try {
        return orderService.getOrderById(orderId)
      } catch (err) {
        console.log(err)
      }
    },
    async loadOrders(context, { buyerId, sellerId }) {
      try {
        const orders = await orderService.query({ buyerId, sellerId })
        context.commit({ type: 'setOrders', orders: orders })
        return orders
      } catch (err) {
        console.log(err)
      }
    },
    async loadSocketOrders(buyerId) {
      try {
        const orders = await orderService.query(buyerId)
        console.log(orders);
        orderStore.mutations.setOrders(orders )
        return orders
      } catch (err) {
        console.log(err)
      }
    },
  },
  modules: {
    orderService,
  },
}
