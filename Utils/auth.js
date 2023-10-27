const withAuth = (req, res, next) => {
  // Check if the user is not logged in
  if (!req.session.loggedIn) {
    // Redirect to the login page
    res.redirect('/login')
    // Logging statement for debugging (optional)
    console.log('MIDELWEARTAFSAFAF')
  } else {
    // If the user is logged in, allow them to proceed to the next middleware or route
    next()
  }
}

// Export the withAuth middleware for use in routes
module.exports = withAuth
