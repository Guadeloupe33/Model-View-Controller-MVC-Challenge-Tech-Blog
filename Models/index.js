const BlogPost = require('./blogPost')
const User = require('./User')
const Comment = require('./Comment')


Comment.belongsTo(BlogPost, {
    foreignKey: 'blogpost_id',
  })

User.hasMany(BlogPost, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
})

BlogPost.hasMany(Comment, {
    foreignKey: 'blogpost_id',
    onDelete: 'CASCADE',
  })
  
BlogPost.belongsTo(User, {
  foreignKey: 'user_id',
})

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
})

Comment.belongsTo(User, {
  foreignKey: 'user_id',
})

module.exports = { User, BlogPost, Comment }