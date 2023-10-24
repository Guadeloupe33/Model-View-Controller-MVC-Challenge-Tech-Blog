const sequelize = require("../Config/Connection");
const { User, BlogPost } = require("../Models");

const userData = require("./userData.json");
const blogPostData = require("./blogPostData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blog of blogPostData) {
    await BlogPost.create({
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();