import { createStore } from 'vuex'
import { gigStore } from './modules/gig-store.js'
import { userStore } from './modules/user-store.js'
import { orderStore } from './modules/order-store.js'

// create a store instance
export const store = createStore({
    strict: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        userStore,
        gigStore,
        orderStore
    },
})

// export default store
