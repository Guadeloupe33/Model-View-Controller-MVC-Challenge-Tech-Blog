// Import necessary modules and models
const router = require('express').Router()
const { User } = require('../../models')

// Define a POST route for user registration
router.post('/', async (req, res) => {
  try {
    // Create a new user with data from the request body
    const userData = await User.create(req.body)

    // Save user session data and respond with a success status and user data
    req.session.save(() => {
      req.session.user_id = userData.id
      req.session.loggedIn = true

      res.status(200).json(userData)
    })
  } catch (err) {
    // Handle errors and respond with an error status and message
    res.status(400).json(err)
  }
})

// Define a POST route for user login
router.post('/login', async (req, res) => {
  try {
    // Find a user by email in the database
    const userData = await User.findOne({ where: { email: req.body.email } })

    if (!userData) {
      // Handle incorrect email or password and respond with an error message
      res.status(400).json({ message: 'Incorrect email or password, please try again' })
      return
    }

    // Check if the provided password matches the stored hashed password
    const validPassword = await userData.checkPassword(req.body.password)

    if (!validPassword) {
      // Handle incorrect password and respond with an error message
      res.status(400).json({ message: 'Incorrect email or password, please try again' })
      return
    }

    // Save user session data and respond with user data and a success message
    req.session.save(() => {
      req.session.user_id = userData.id
      req.session.loggedIn = true

      res.json({ user: userData, message: 'You are now logged in!' })
    })
  } catch (err) {
    // Handle errors and respond with an error status and message
    res.status(400).json(err)
  }
})

// Define a POST route for user logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    // Destroy the session for logged-in users and respond with a success status
    req.session.destroy(() => {
      res.status(204).end()
    })
  } else {
    // Respond with a not found status if the user is not logged in
    res.status(404).end()
  }
})

// Export the router for use in other parts of the application
module.exports = router
