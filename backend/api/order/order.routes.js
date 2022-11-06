const express = require('express')
// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getOrders, getOrderById, addOrder, updateOrder, removeOrder, addReview } = require('./order.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getOrders)
router.get('/:id', getOrderById)
router.post('/', addOrder)
router.put('/:id', updateOrder)
// router.post('/', requireAuth, addOrder)//,
// router.put('/:id', requireAuth, requireAdmin, updateOrder)
// router.put('/:id', requireAuth, updateOrder)
// router.delete('/:id', removeOrder)
router.delete('/:id', removeOrder)//requireAuth, requireAdmin,
router.post('/:id/review', addReview)

module.exports = router
