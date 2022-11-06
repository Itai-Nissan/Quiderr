const gigService = require('./gig.service.js')
const logger = require('../../services/logger.service')
const { broadcast } = require('../../services/socket.service.js')

async function getGigs(req, res) {
  
  try {
    const queryParams = req.query

    if (req.query.price) {
      const price = JSON.parse(req.query.price)
      queryParams.price = price
    }

    const gigs = await gigService.query(queryParams)
    res.json(gigs)
  } catch (err) {
    res.status(404).send(err)
  }
}

async function getGigById(req, res) {
  try {
    const gigId = req.params.id
    const gig = await gigService.getById(gigId)
    res.json(gig)
  } catch (err) {
    res.status(404).send(err)
  }
}

async function addGig(req, res) {
  const gig = req.body
  console.log(gig);
  try {
    const addedGig = await gigService.add(gig)
    broadcast({ type: 'something-changed', userId: req.session?.user._id })
    res.json(addedGig)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function updateGig(req, res) {
  try {
    const gig = req.body
    const updatedGig = await gigService.update(gig)
    res.json(updatedGig)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function removeGig(req, res) {
  try {
    const gigId = req.params.id
    const removedId = await gigService.remove(gigId)
    res.send(removedId)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function addReview(req, res) {
  const gigId = req.params.id
  const review = req.body
  try {
    const addedReview = await gigService.addReview(review, gigId)
    res.send(addedReview)
  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports = {
  getGigs,
  getGigById,
  addGig,
  updateGig,
  removeGig,
  addReview,
}
