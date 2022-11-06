const dbService = require('../../services/db.service')
const utilService = require('../../services/utilService.js')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
  const { query, order } = _buildCriteria(filterBy, filterBy.sortBy)

  const collection = await dbService.getCollection('gig')
  
  const gigs = await collection
    .find(query)
    .sort(order)
    .toArray()

  return gigs
}

async function getById(gigId) {
  const collection = await dbService.getCollection('gig')
  const gig = collection.findOne({ _id: ObjectId(gigId) })
  return gig
}

async function remove(gigId) {
  const collection = await dbService.getCollection('gig')
  await collection.deleteOne({ _id: ObjectId(gigId) })
  return gigId
}

async function add(gig) {
  const collection = await dbService.getCollection('gig')
  const { ops } = await collection.insertOne(gig)
  return ops[0]
}
async function update(gig) {
  var id = ObjectId(gig._id)
  delete gig._id
  const collection = await dbService.getCollection('gig')
  await collection.updateOne({ _id: id }, { $set: { ...gig } })
  gig._id = id
  return gig
}

async function addReview(review, gigId) {
  try {
    const collection = await dbService.getCollection('gig')
    review.id = utilService.makeId()
    review.createdAt = Date.now()
    await collection.updateOne({ _id: ObjectId(gigId) }, { $push: { reviews: review } })
    return review
  } catch (err) {
    console.log(err)
    throw err
  }
}

async function addMsg(gigId, msg) {
  const gig = await getById(gigId)
  gig.msgs = gig.msgs || []
  gig.msgs.push(msg)
  update(gig)
}

function _buildCriteria(filterBy, sortBy) {
  const { txt, userId, delivery, price } = filterBy
  
  let query = {}
  let order = {}

  if (txt) {
    const txtCriteria = { $regex: txt, $options: 'i' }
    query.$or = [
      { title: txtCriteria },
      { description: txtCriteria },
      { ['owner.fullname']: txtCriteria },
      { ['tags']: txtCriteria },
    ]
  }

  if (userId) {
    query['owner._id'] = userId
  }

  const deliveryTime = parseInt(delivery)
  if (!isNaN(deliveryTime)) {
    query.delivery = { $lte: deliveryTime }
  }

  if (price) {

    const p = {}  
    if (price.min >= 0) {
      p.$gte = price.min
    }

    if (price.max) {
      p.$lte = price.max
    }

    if (price.min || price.max) {
      query.price = p
    }
  }

  if (sortBy) {
    order = { [sortBy]: 1 }
  }

  return { query, order }
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