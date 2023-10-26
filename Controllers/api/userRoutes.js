const router = require('express').Router();
const { User } = require('../../models');

// Route for user registration
router.post('/', async (req, res) => {
  try {
    // Create a new user with data from the request
    const userData = await User.create(req.body);

    // Save user session data and respond with a 200 OK status
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    // Handle registration errors with a 400 Bad Request status
    res.status(400).json(err);
  }
});

// Route for user login
router.post('/login', async (req, res) => {
  try {
    // Find the user with the provided email
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      // Respond with a 400 Bad Request status and an error message if the user is not found
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Check the password validity
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      // Respond with a 400 Bad Request status and an error message if the password is invalid
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Save user session data and respond with user information and a success message
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    // Handle login errors with a 400 Bad Request status
    res.status(400).json(err);
  }
});

// Route for user logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    // Destroy the user session and respond with a 204 No Content status
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    // Respond with a 404 Not Found status if the user is not logged in
    res.status(404).end();
  }
});

module.exports = router;
