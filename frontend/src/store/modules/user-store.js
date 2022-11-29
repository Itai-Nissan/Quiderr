import { userService } from '../../services/user.service.js'

export const userStore = {
  strict: true,
  state: {
    loggedinUser: userService.getLoggedinUser(),
  },
  getters: {
    getUser(state) {
      return state.loggedinUser
    },
  },
  mutations: {
    setUser(state, { user }) {
      state.loggedinUser = user
    },
  },
  actions: {
    async setUpdateUser(context, { user }) {
      try {
        return await userService.update(user)
      } catch (err) {
        console.log(err)
      }

    },
    async getUserById(context, { userId }) {
      try {
        return await userService.getById(userId)
      } catch (err) {
        console.log(err)
      }
    },
    onGetLoggedinUser({ commit }) {
      try {
        const user = userService.getLoggedinUser()
        commit({ type: 'setUser', user })
      } catch (err) {
        console.log(err)
      }
    },
    async login({ commit }, { cred }) {
      try {
        const user = await userService.login(cred)
        commit({ type: 'setUser', user })
      } catch (err) {
        console.log(err)
      }
    },
    async signup({ commit }, { cred }) {
      try {
        const user = await userService.signup(cred)
        commit({ type: 'setUser', user })
      } catch (err) {
        console.log(err)
      }
    },
    async logout({ commit }) {
      try {
        await userService.logout()
        commit({ type: 'setUser', user: null })
      } catch (err) {
        console.log(err)
      }
    },
  },
}
