// Import necessary modules
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

// Define the User model
class User extends Model {
  // Method to check the provided password against the hashed password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    // Define the columns and their data types
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Validate that the email is in the correct format
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8], // Validate that the password has a minimum length of 8 characters
      },
    },
  },
  {
    hooks: {
      // Hook to hash the password before creating a new user
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10); // Hash the password with a salt factor of 10
        return newUserData;
      },
    },
    sequelize, // Use the configured Sequelize connection
    timestamps: false, // Disable timestamps for this model
    freezeTableName: true, // Set the table name to be the same as the model name
    underscored: true, // Use underscored naming for columns (e.g., created_at becomes created_at)
    modelName: "user", // Set the model name to 'user'
  }
);

// Export the User model for use in other parts of the application
module.exports = User;

