const sequelize = require('../Config/Connection')
const { Model, DataTypes } = require('sequelize')

class comment extends Model {}

comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    blogpost_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'blogpost',
        key: 'id',
      },
    },
    comment: {
        type: DataTypes.STRING,
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
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  },
)

module.exports = comment