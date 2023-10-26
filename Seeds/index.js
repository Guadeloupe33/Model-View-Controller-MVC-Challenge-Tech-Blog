const sequelize = require("../config/connection");
const { User, BlogPost } = require("../models");

// Import user and blog post data from JSON files
const userData = require("./userData.json");
const blogPostData = require("./blogPostData.json");

// Define the function to seed the database
const seedDatabase = async () => {
  // Synchronize the database by dropping and recreating the tables (use with caution)
  await sequelize.sync({ force: true });

  // Bulk insert user data into the User table
  const users = await User.bulkCreate(userData, {
    individualHooks: true, // Trigger hooks (e.g., password hashing)
    returning: true, // Get the inserted records
  });

  // Loop through the blog post data and create blog posts
  for (const blog of blogPostData) {
    // Create a blog post and associate it with a random user
    await BlogPost.create({
      ...blog, // Spread the blog post data
      user_id: users[Math.floor(Math.random() * users.length)].id, // Assign a random user ID
    });
  }

  // Exit the script
  process.exit(0);
};

// Call the database seeding function
seedDatabase();
