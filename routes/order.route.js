import express from 'express'
import { getOrders, intent, confirm } from '../contollers/order.contoller.js'
import { verifyToken } from '../middleware/jwt.js'

const router = express.Router()

// router.post('/:id', verifyToken, createOrder)
router.get('/', verifyToken, getOrders)
router.post('/create-payment-intent/:id', verifyToken, intent)
router.put('/', verifyToken, confirm)

export default router
