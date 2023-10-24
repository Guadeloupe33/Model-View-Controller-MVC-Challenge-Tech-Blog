const blogPostRoutes = require('./blogpostRoutes')
const commentRoutes = require('./commentRoutes')
const router = require('express').Router()
const userRoutes = require('./userRoutes')

router.use('/User', userRoutes)
router.use('/blogPost', blogPostRoutes)
router.use('/Comment', commentRoutes)

module.exports = router