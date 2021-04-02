/* eslint-disable consistent-return */
/* eslint-disable object-shorthand */
const express = require('express')
const Question = require('../models/question')
const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

router.get('', async (req, res, next) => {
  try {
    const answer = await Question.find({})
    res.send('found all of the questions')
    return answer
  } catch {
    next(new Error('could not get all questions'))
  }
})

router.post('/add', isAuthenticated, async (req, res, next) => {
  const { questionText } = req.body
  const { username } = req.session
  try {
    await Question.create({ questionText, author: username })
    res.send('question added')
  } catch {
    next(new Error('could not add question'))
  }
})

router.post('/answer', isAuthenticated, async (req, res, next) => {
  const { _id, answer } = req.body
  try {
    await Question.findOneAndUpdate({ _id: _id }, { answer: answer })
    res.send('question answered')
  } catch {
    next(new Error('could not answer'))
  }
})

module.exports = router
