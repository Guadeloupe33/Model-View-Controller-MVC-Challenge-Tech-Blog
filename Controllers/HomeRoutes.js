// Import necessary modules and models
const router = require('express').Router()
const { BlogPost, User, Comment } = require('../models')
const withAuth = require('../utils/auth')

// Route to prevent non-logged-in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    // Retrieve all blog posts with associated users and comments
    const blogPostData = await BlogPost.findAll({
      include: [{ model: User }, { model: Comment, include: [{ model: User }] }],
    })

    // Map the data to plain JavaScript objects
    const BlogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }))

    // Render the homepage template and pass the data and logged-in flag to it
    res.render('homepage', {
      BlogPosts,
      loggedIn: req.session.loggedIn, // Pass the logged-in flag to the template
    })
  } catch (err) {
    // Handle errors and respond with an error status
    res.status(500).json(err)
  }
})

// Route for the login page
router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.loggedIn) {
    res.redirect('/')
    return
  }

  // Render the login page
  res.render('login')
})

// Route for opening the dashboard, accessible only for logged-in users
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Retrieve blog posts associated with the current user
    const BlogPostData = await BlogPost.findAll({
      where: {
        user_id: req.session.user_id,
      },
    })

    // Map the data to plain JavaScript objects
    const posts = BlogPostData.map((post) => post.get({ plain: true }))

    // Render the dashboard template and pass the data and logged-in flag to it
    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn, // Pass the logged-in flag to the template
    })
  } catch (err) {
    // Handle errors and respond with an error status
    res.status(500).json(err)
  }
})

// Export the router for use in other parts of the application
module.exports = router
