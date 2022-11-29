// const asyncLocalStorage = require('./als.service')
const logger = require('./logger.service')
const orderService = require('../api/order/order.service')
var gIo = null

function connectSockets(http, session) {
  gIo = require('socket.io')(http, {
    cors: {
      origin: '*',
    },
  })

  gIo.on('connection', (socket) => {
    console.log('New socket', socket.id)

    socket.userId = socket.id

    socket.on('disconnect', (socket) => {
      console.log('Someone disconnected')
    })

    socket.on('user-watch', (userId) => {
      socket.join('watching:' + userId)
    })

    socket.on('set-user-socket', (userId) => {
      logger.debug(`Setting (${socket.id}) socket.userId = ${userId}`)
      socket.userId = userId
    })

    //for fun delete order in other browsers
    socket.on('update-orders', (response) => {
      // const updateOrder = orderService.getById(orderId)
      socket.broadcast.emit('updateUserOrders', response)
    })

    socket.on('unset-user-socket', () => {
      delete socket.userId
    })
  })
}

function emitTo({ type, data, label }) {
  if (label) gIo.to('watching:' + label).emit(type, data)
  else gIo.emit(type, data)
}

async function emitToUser({ type, data, userId }) {
  logger.debug('Emiting to user socket: ' + userId)
  const socket = await _getUserSocket(userId)
  if (socket) socket.emit(type, data)
  else {
    console.log('User socket not found')
    _printSockets()
  }
}

// Send to all sockets BUT not the current socket
async function broadcast({ type, data, userId }) {
  console.log('BROADCASTING', JSON.stringify(arguments))
  const excludedSocket = await _getUserSocket(userId)
  if (!excludedSocket) {
    logger.debug('Shouldnt happen, socket not found')
    _printSockets()
    return
  }
  logger.debug('broadcast to all but user: ', userId)
  excludedSocket.broadcast.emit(type, data)
}

async function _getUserSocket(userId) {
  const sockets = await _getAllSockets()
  const socket = sockets.find((s) => s.userId == userId)
  return socket
}
async function _getAllSockets() {
  // return all Socket instances
  const sockets = await gIo.fetchSockets()
  return sockets
}

async function _printSockets() {
  const sockets = await _getAllSockets()
  console.log(`Sockets: (count: ${sockets.length}):`)
  sockets.forEach(_printSocket)
}

function _printSocket(socket) {
  console.log(`Socket - socketId: ${socket.id} userId: ${socket.userId}`)
}

module.exports = {
  connectSockets,
  emitTo,
  emitToUser,
  broadcast,
}
