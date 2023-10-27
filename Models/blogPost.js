// Import necessary modules
const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

// Define the BlogPost model
class BlogPost extends Model {}

BlogPost.init(
  {
    // Define the columns and their data types
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: 'blogpost', // Set the model name to 'blogpost'
  },
)

// Export the BlogPost model for use in other parts of the application
module.exports = BlogPost
