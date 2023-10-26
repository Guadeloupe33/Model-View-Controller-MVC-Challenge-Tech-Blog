const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.TEXT, // Use TEXT data type for comments to allow longer text
      allowNull: false,
    },
    blogpost_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'blogpost',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false, // This disables createdAt and updatedAt columns
    freezeTableName: true, // Prevents Sequelize from pluralizing the table name
    underscored: true, // Use underscored naming for columns
    modelName: 'comment', // Model name in singular form
  }
);

module.exports = Comment;
