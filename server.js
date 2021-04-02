const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const accountRouter = require('./routes/account')
const questionRouter = require('./routes/api')

const app = express()
const MONGO_URI = 'mongodb://localhost:27017/hwsix'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(cookieSession({
  name: 'session',
  keys: ['randomKey'],
}))

app.use(express.json())

app.use('/account', accountRouter)

app.use('/question', questionRouter)

app.use((err, req, res, next) => {
  res.status(500)
  res.send(err.message)
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
