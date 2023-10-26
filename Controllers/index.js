const router = require("express").Router();

// Import API and home route modules
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");

// Use homeRoutes for the root path ('/') and apiRoutes under '/api'
router.use("/", homeRoutes);
router.use("/api", apiRoutes);

module.exports = router;
