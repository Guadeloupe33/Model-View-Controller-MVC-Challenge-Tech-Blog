const router = require('express').Router();
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new blog post
router.post('/', withAuth, async (req, res) => {
  try {
    // Create a new blog post with data from the request
    const blogPostData = await BlogPost.create({
      title: req.body.title,
      comment: req.body.comment,
      date: req.body.date,
      user_id: req.session.user_id,
    });

    // Respond with a 201 Created status and the created blog post data
    res.status(201).json(blogPostData);
  } catch (err) {
    console.error(err);
    // Handle errors by responding with a 400 Bad Request status
    res.status(400).json({ error: 'Failed to create a blog post.' });
  }
});

// Delete a blog post by ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // Attempt to delete a blog post by ID
    const deletedCount = await BlogPost.destroy({
      where: {
        id: req.params.id,
      },
    });

    // Check if any blog posts were deleted and respond accordingly
    if (deletedCount > 0) {
      res.status(200).json({ message: 'Blog post deleted successfully.' });
    } else {
      // Respond with a 404 Not Found status if the resource doesn't exist
      res.status(404).json({ error: 'Blog post not found.' });
    }
  } catch (err) {
    console.error(err);
    // Handle server errors with a 500 Internal Server Error status
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Edit a blog post by ID
router.put('/:id', withAuth, async (req, res) => {
  try {
    // Update a blog post by ID with data from the request
    const [updatedCount] = await BlogPost.update(req.body, {
      where: { id: req.params.id },
    });

    // Check if any blog posts were updated and respond accordingly
    if (updatedCount > 0) {
      res.status(200).json({ message: 'Blog post updated successfully.' });
    } else {
      // Respond with a 404 Not Found status if the resource doesn't exist
      res.status(404).json({ error: 'Blog post not found.' });
    }
  } catch (err) {
    console.error(err);
    // Handle server errors with a 500 Internal Server Error status
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
