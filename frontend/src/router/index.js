import { createRouter, createWebHashHistory } from 'vue-router'
import home from '../views/home.vue'
import explore from '../views/explore.vue'
import gigDetails from '../views/gig.details.vue'
import orderPage from '../views/order-page.vue'
import userProfile from '../views/user-profile.vue'
import userOrders from '../views/user-orders.vue'
import seller from '../views/seller.vue'
import signin from '../views/signin.vue'
import join from '../views/join.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
    },
    {
      path: '/explore',
      name: 'explore',
      component: explore,
    },
    {
      path: '/details/:id',
      name: 'gigDetails',
      component: gigDetails,
    },
    {
      path: '/order/:id',
      name: 'orderPage',
      component: orderPage,
    },
    {
      path: '/user-profile/:id',
      name: 'user-profile',
      component: userProfile,
    },
    {
      path: '/orders-list/:id',
      name: 'userOrders',
      component: userOrders,
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller,
    },
    {
      path: '/login',
      name: 'signin',
      component: signin,
    },
    {
      path: '/signup',
      name: 'join',
      component: join,
    },
  ],
})

router.beforeEach(() => {
  window.scrollTo(0, 0)
})

export default router
