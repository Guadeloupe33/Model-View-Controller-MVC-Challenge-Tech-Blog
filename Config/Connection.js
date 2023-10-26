const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// Check if the JAWSDB_URL environment variable is set (typically used in production on platforms like Heroku).
if (process.env.JAWSDB_URL) {
  // If JAWSDB_URL is available, connect to the database using the URL.
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // If JAWSDB_URL is not available, connect to a local MySQL database using the values from the .env file.

  // Check if the required environment variables are set (DB_NAME, DB_USER, and DB_PASSWORD).
  if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD) {
    // If any of the required environment variables are missing, throw an error.
    throw new Error('Missing environment variables. Please set DB_NAME, DB_USER, and DB_PASSWORD.');
  }

  // Create a Sequelize instance with the local MySQL database configuration.
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  });
}

// Export the Sequelize instance for use in other parts of your application.
module.exports = sequelize;
