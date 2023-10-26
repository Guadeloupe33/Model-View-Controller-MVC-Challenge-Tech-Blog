const BlogPost = require('./BlogPost');
const User = require('./User');
const Comment = require('./Comment');

// Define associations between models

// A user has many blog posts
User.hasMany(BlogPost, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// A blog post belongs to a user
BlogPost.belongsTo(User, {
  foreignKey: 'user_id',
});

// A blog post has many comments
BlogPost.hasMany(Comment, {
  foreignKey: 'blogpost_id',
  onDelete: 'CASCADE',
});

// A comment belongs to a blog post
Comment.belongsTo(BlogPost, {
  foreignKey: 'blogpost_id',
});

// A user has many comments
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// A comment belongs to a user
Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, BlogPost, Comment };
