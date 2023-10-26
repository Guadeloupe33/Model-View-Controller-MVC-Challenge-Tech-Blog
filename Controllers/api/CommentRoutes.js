const router = require('express').Router();
const { Comment, User } = require('../../models');

// Create a new comment on a specific blog post (POST /api/comments/:id)
router.post('/:id', async (req, res) => {
  try {
    // Validate the comment input
    if (!req.body.comment) {
      return res.status(400).json({ error: 'Comment content is required.' });
    }

    // Create a new comment with data from the request
    const commentData = await Comment.create({
      comment: req.body.comment,
      blogpost_id: req.params.id,
      user_id: req.session.user_id,
    });

    // Find the user associated with the session user_id
    const findUser = await User.findByPk(req.session.user_id);

    // Respond with a 200 OK status and a success message
    res.status(200).json({ message: 'Comment created successfully', commentData, findUser });
  } catch (err) {
    console.error(err);
    // Handle server errors with a 500 Internal Server Error status and an error message
    res.status(500).json({ error: 'Internal server error. Failed to create a comment.' });
  }
});

module.exports = router;
