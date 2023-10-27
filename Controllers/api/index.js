// Import necessary modules and routes for user, blog post, and comments
const router = require('express').Router()
const userRoutes = require('./userRoutes') // Import user-related routes
const blogPostRoutes = require('./blogPostRoutes') // Import blog post-related routes
const commentRoutes = require('./commentRoutes') // Import comment-related routes

// Use the imported routes with specified prefixes
router.use('/users', userRoutes) // Mount user routes under the '/users' prefix
router.use('/blogPost', blogPostRoutes) // Mount blog post routes under the '/blogPost' prefix
router.use('/comments', commentRoutes) // Mount comment routes under the '/comments' prefix

// Export the router for use in other parts of the application
module.exports = router
