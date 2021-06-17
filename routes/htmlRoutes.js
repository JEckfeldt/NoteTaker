const { join } = require('path')
const router = require('express').Router()

//routes
router.get('/notes', (req, res) => {
  res.sendFile(join(__dirname, '../public/notes.html'))
})

router.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../public/index.html'))
})

module.exports = router
