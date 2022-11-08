const dbService = require('../../services/db.service')
const utilService = require('../../services/utilService.js')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
  const criteria = _buildCriteria(filterBy)
  const collection = await dbService.getCollection('order')
  let orders = await collection.find(criteria).toArray()
  orders.reverse()
  return orders
}

async function getById(orderId) {
  const collection = await dbService.getCollection('order')
  const order = collection.findOne({ _id: orderId })
  if (!order) {
    order = await collection.findOne({ _id: ObjectId(orderId) })
  }
  return order
}

async function remove(orderId) {
  const collection = await dbService.getCollection('order')
  await collection.deleteOne({ _id: ObjectId(orderId) })
  return orderId
}

async function add(order) {
  const collection = await dbService.getCollection('order')

  const { ops } = await collection.insertOne(order)
  return ops[0]
}

async function update(order) {
  var id = ObjectId(order._id)
  delete order._id
  const collection = await dbService.getCollection('order')
  await collection.updateOne({ _id: id }, { $set: { ...order } })
  order._id = id
  return order
}

async function addReview(review, orderId) {
  try {
    const collection = await dbService.getCollection('order')
    review.id = utilService.makeId()
    review.createdAt = Date.now()
    await collection.updateOne({ _id: ObjectId(orderId) }, { $push: { reviews: review } })
    return review
  } catch (err) {
    console.log(err)
    throw err
  }
}

async function addMsg(orderId, msg) {
  const order = await getById(orderId)
  order.msgs = order.msgs || []
  order.msgs.push(msg)
  update(order)
}

function _buildCriteria(filterBy) {
  const criteria = {}
  console.log('filterBy', filterBy)
  if (filterBy.title) {
    const txtCriteria = { $regex: filterBy.title, $options: 'i' }
    criteria.title = txtCriteria
  }

  if(filterBy.buyerId) {
    criteria['buyer._id'] = filterBy.buyerId
  }

  if(filterBy.sellerId) {
    criteria['seller._id'] = filterBy.sellerId
  }

  return criteria
}

module.exports = {
  remove,
  query,
  getById,
  add,
  update,
  addReview,
  addMsg
}
