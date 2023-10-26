const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BlogPost extends Model {}

BlogPost.init(
  {
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
      type: DataTypes.STRING, // Consider using the DATE or DATETIME data type for dates
      allowNull: false,
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
    modelName: 'blogpost', // Model name in singular form
  }
);

module.exports = BlogPost;
