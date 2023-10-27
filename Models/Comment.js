// Import necessary modules
const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

// Define the Comment model
class Comment extends Model {}

Comment.init(
  {
    // Define the columns and their data types
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blogpost_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'blogpost', // Reference the 'blogpost' model
        key: 'id', // Using the 'id' column of the 'blogpost' model as a foreign key
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user', // Reference the 'user' model
        key: 'id', // Using the 'id' column of the 'user' model as a foreign key
      },
    },
  },
  {
    sequelize, // Use the configured Sequelize connection
    timestamps: false, // Disable timestamps for this model
    freezeTableName: true, // Set the table name to be the same as the model name
    underscored: true, // Use underscored naming for columns (e.g., created_at becomes created_at)
    modelName: 'comment', // Set the model name to 'comment'
  },
)

// Export the Comment model for use in other parts of the application
module.exports = Comment
