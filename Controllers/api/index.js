


const blogPostRoutes = require('./Blogpostroutes')
const commentRoutes = require('./CommentRoutes')
const router = require('express').Router()
const userRoutes = require('./userRoutes')

router.use('/users', userRoutes)
router.use('/blogPost', blogPostRoutes)
router.use('/comments', commentRoutes)

module.exports = router