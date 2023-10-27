// Import necessary modules and models
const router = require('express').Router()
const { BlogPost } = require('../../models')
const withAuth = require('../../utils/auth')

// Define a POST route for creating a new blog post
router.post('/', withAuth, async (req, res) => {
  try {
    // Create a new blog post using data from the request body
    const blogPostData = await BlogPost.create({
      title: req.body.title,
      comment: req.body.comment,
      date: req.body.date,
      user_id: req.session.user_id, // Assign the user's ID from the session
    })

    // Respond with a success status and the created blog post data
    res.status(200).json(blogPostData)
  } catch (err) {
    // Handle errors and respond with an error status and message
    console.log(err)
    res.status(400).json(err)
  }
})

// Define a DELETE route for deleting a blog post by ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // Delete a blog post based on the ID provided in the URL parameters
    const post = BlogPost.destroy({
      where: {
        id: req.params.id,
      },
    })

    // Respond with a success status and the result of the deletion
    res.status(200).json(post)
  } catch (err) {
    // Handle errors and respond with an error status and message
    console.log(err)
    res.status(500).json(err)
  }
})

// Define a PUT route for updating a blog post by ID
router.put('/:id', withAuth, async (req, res) => {
  try {
    // Update a blog post with the data from the request body based on the ID provided
    const blogPost = BlogPost.update(req.body, {
      where: { id: req.params.id },
    })

    // Respond with a success status and the result of the update
    res.status(200).json(blogPost)
  } catch (err) {
    // Handle errors and respond with an error status and message
    console.log(err)
    res.status(500).json(err)
  }
})

// Export the router for use in other parts of the application
module.exports = router
