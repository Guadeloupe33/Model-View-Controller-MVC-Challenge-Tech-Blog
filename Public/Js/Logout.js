// Function to handle user logout
const logout = async () => {
  // Send a POST request to the server to log out
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    // Redirect to the login page if logout is successful
    document.location.replace("/login");
  } else {
    // Show an alert if logout fails
    alert("Failed to log out");
  }
};

// Add an event listener for the logout button
document.querySelector("#logout").addEventListener("click", logout);
