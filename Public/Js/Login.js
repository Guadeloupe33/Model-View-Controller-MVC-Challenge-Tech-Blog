// Function to handle user login
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Get the email and password from the input fields
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the server to log in
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // Redirect to the homepage if login is successful
      document.location.replace('/');
    } else {
      // Show an alert if login fails
      alert('Failed to log in');
    }
  }
};

// Function to handle user signup
const signupFormHandler = async (event) => {
  event.preventDefault();

  // Get the name, email, and password from the input fields
  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    // Send a POST request to the server to sign up
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // Redirect to the homepage if signup is successful
      document.location.replace('/');
    } else {
      // Show an alert if signup fails
      alert('Failed to sign up.');
    }
  }
};

// Function for handling the dashboard (if needed)
const dashboard = async (event) => {
  event.preventDefault();
  // You can add functionality for handling the dashboard here if required.
  // It currently doesn't have any specific functionality.
};

// Add event listeners for the login and signup forms
document.querySelector('#form-submit').addEventListener('submit', loginFormHandler);
document.querySelector('#form-signup').addEventListener('submit', signupFormHandler);
