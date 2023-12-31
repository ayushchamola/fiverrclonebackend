import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoute from './routes/user.route.js'
import reviewRoute from './routes/review.route.js'
import conversationRoute from './routes/conversation.route.js'
import gigRoute from './routes/gig.route.js'
import messageRoute from './routes/message.route.js'
import orderRoute from './routes/order.route.js'
import authRoute from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
dotenv.config()

mongoose.set('strictQuery', true)

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO)

    console.log('Connected to monogDB')
  } catch (error) {
    console.log(error)
  }
}

app.use(
  cors({
    origin: [
      'http://127.0.0.1:5173',
      'http://localhost:5173',
      'https://sparkly-youtiao-8f4a3c.netlify.app',
    ],
    credentials: true,
  })
)
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/orders', orderRoute)
app.use('/api/gigs', gigRoute)
app.use('/api/reviews', reviewRoute)
app.use('/api/messages', messageRoute)
app.use('/api/conversations', conversationRoute)

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || 'Something went wrong'

  return res.status(errorStatus).send(errorMessage)
})

app.listen(process.env.PORT || 8800, () => {
  connect()
  console.log('Backend server is running')
})
