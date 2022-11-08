import io from 'socket.io-client'
import { userService } from './user.service'
import { orderService } from './order.service'
import { orderStore } from '../store/modules/order-store'

export const SOCKET_EVENT_ADD_MSG = 'chat-add-msg'
export const SOCKET_EMIT_SEND_MSG = 'chat-send-msg'
export const SOCKET_EMIT_SET_TOPIC = 'chat-set-topic'
export const SOCKET_EMIT_USER_WATCH = 'user-watch'
export const SOCKET_EVENT_USER_UPDATED = 'user-updated'
export const SOCKET_EVENT_ORDER_ADDED = 'order-added'
export const SOCKET_EVENT_ORDER_ABOUT_YOU = 'order-about-you'

const SOCKET_EMIT_LOGIN = 'set-user-socket'
const SOCKET_EMIT_LOGOUT = 'unset-user-socket'
const SOCKET_EMIT_UPDATE_ORDERS = 'update-orders'
// const SOCKET_EMIT_DELETE_ORDER = 'delete-order'

const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'

export const socketService = createSocketService()
// export const socketService = createDummySocketService()

// for debugging from console
// window.socketService = socketService

socketService.setup()


function createSocketService() {
  var socket = null
  const socketService = {
    setup() {
      socket = io(baseUrl)

      const user = userService.getLoggedinUser()
      // if (user) this.login(user._id)

      socket.on('updateUserOrders', ((response) => {
        const userId = user._id
      }))
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
    },
    off(eventName, cb = null) {
      if (!socket) return;
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName, data) {
      data = JSON.parse(JSON.stringify(data))
      socket.emit(eventName, data)
    },
    onSetOrderStatus(type, response) {
      socket.emit(SOCKET_EMIT_UPDATE_ORDERS, response)
    },
    // login(userId) {
    //   socket.emit(SOCKET_EMIT_LOGIN, userId)
    // },
    // logout() {
    //   socket.emit(SOCKET_EMIT_LOGOUT)
    // },
    terminate() {
      socket = null
    },

  }
  return socketService
}

// eslint-disable-next-line
function createDummySocketService() {
  var listenersMap = {}
  const socketService = {
    listenersMap,
    setup() {
      listenersMap = {}
    },
    terminate() {
      this.setup()
    },
    login() {
    },
    logout() {
    },
    on(eventName, cb) {
      listenersMap[eventName] = [...(listenersMap[eventName]) || [], cb]
    },
    off(eventName, cb) {
      if (!listenersMap[eventName]) return
      if (!cb) delete listenersMap[eventName]
      else listenersMap[eventName] = listenersMap[eventName].filter(l => l !== cb)
    },
    emit(eventName, data) {
      if (!listenersMap[eventName]) return
      listenersMap[eventName].forEach(listener => {
        listener(data)
      })
    },
    debugMsg() {
      this.emit(SOCKET_EVENT_ADD_MSG, { from: 'Someone', txt: 'Aha it worked!' })
    },
  }
  window.listenersMap = listenersMap;
  return socketService
}
