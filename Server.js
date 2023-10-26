const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const path = require("path");
const Sequelize = require("sequelize");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const routes = require("./controllers");
const helpers = require("./utils/helpers");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

// Configure Handlebars
const hbs = exphbs.create({ helpers });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Session Configuration
const sess = {
  secret: process.env.SESSION_SECRET || "Super secret secret", // Use environment variable
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess)); // Moved this line here

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use(routes);

// Database Sync
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App is now listening on port ${PORT}`));
});
