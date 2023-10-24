const blogPostRoutes = require('./blogPostRoutes')
const commentRoutes = require('./commentRoutes')
const router = require('express').Router()
const userRoutes = require('./userRoutes')

router.use('/user', userRoutes)
router.use('/blogPost', blogPostRoutes)
router.use('/Comment', commentRoutes)

module.exports = router