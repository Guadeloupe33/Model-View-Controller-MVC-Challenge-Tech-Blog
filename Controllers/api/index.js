const blogPostRoutes = require('./blogPostRoutes');
const commentRoutes = require('./commentRoutes');
const router = require('express').Router();
const userRoutes = require('./userRoutes');

// Mount userRoutes under '/user'
router.use('/user', userRoutes);

// Mount blogPostRoutes under '/blogPost'
router.use('/blogPost', blogPostRoutes);

// Mount commentRoutes under '/comment'
router.use('/comment', commentRoutes); // Use 'comment' instead of 'Comment' for consistency

module.exports = router;
