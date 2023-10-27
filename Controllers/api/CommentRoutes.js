// Import necessary modules and models
const router = require('express').Router()
const { Comment, User } = require('../../models')

// Define a POST route for creating a new comment
router.post('/:id', async (req, res) => {
  try {
    // Create a new comment using data from the request body
    const commentData = await Comment.create({
      comment: req.body.comment,
      blogpost_id: req.params.id, // Assign the associated blog post ID from the URL parameters
      user_id: req.session.user_id, // Assign the user's ID from the session
    })

    // Find the user associated with the comment and respond with both comment and user data
    const findUser = await User.findByPk(req.session.user_id)

    // Respond with a success status and the created comment and user data
    res.status(200).json({ commentData, findUser })
  } catch (err) {
    // Handle errors and respond with an error status and message
    console.log(err)
    res.status(500).json(err)
  }
})

// Export the router for use in other parts of the application
module.exports = router
