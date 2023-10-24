import express from 'express'
import {
  createReview,
  getReviews,
  deleteReview,
} from '../contollers/review.contoller.js'
import { verifyToken } from '../middleware/jwt.js'

const router = express.Router()

router.post('/', verifyToken, createReview)
router.get('/:id', verifyToken, getReviews)
router.delete('/:id', verifyToken, deleteReview)

export default router
