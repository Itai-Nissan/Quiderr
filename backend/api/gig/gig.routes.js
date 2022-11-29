const express = require('express')
// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getGigs, getGigById, addGig, updateGig, removeGig, addReview } = require('./gig.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getGigs)
router.get('/:id', getGigById)
router.post('/', addGig)
// router.post('/', addGig)
router.put('/:id', updateGig)
router.post('/:id', updateGig)
// router.delete('/:id', removeGig)
// router.post('/', requireAuth, requireAdmin, addGig)//,
// router.put('/:id', requireAuth, requireAdmin, updateGig)
// router.put('/:id', requireAuth, updateGig)
router.delete('/:id', removeGig)//requireAuth, requireAdmin,
router.post('/:id/review', addReview)

module.exports = router
