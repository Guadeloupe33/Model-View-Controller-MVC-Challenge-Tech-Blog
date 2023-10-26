// Function to show the create post form
const showCreate = async (event) => {
  event.preventDefault();

  // Get the elements for showing/hiding the create form
  const showCreate = document.querySelector('#create-form');
  const hideCreateBtn = document.querySelector('#create-post');

  // Show the create form and hide the create post button
  showCreate.style.display = 'block';
  hideCreateBtn.style.display = 'none';
};

// Function to create a new blog post
const createPost = async (event) => {
  event.preventDefault();

  // Get the title, content, and date from the input fields
  const title = document.querySelector('#create-title').value.trim();
  const comment = document.querySelector('#create-content').value.trim();

  // Create the current date
  const newDate = new Date();
  const date = newDate.getMonth() + '/' + newDate.getDay() + '/' + newDate.getFullYear();

  // Send a POST request to the server to create the post
  const response = await fetch('/api/blogPost/', {
    method: 'POST',
    body: JSON.stringify({
      title,
      comment,
      date,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  // Check if the response was successful
  if (response.ok) {
    // Redirect to the dashboard after creating the post
    document.location.replace(`/dashboard`);
  } else {
    // Show an alert if post creation failed and log the response for debugging
    alert('Failed to Create New Post');
    console.log(response);
  }
};

// Add click event listeners for showing the create form and creating a post
document.querySelector('#create-post').addEventListener('click', showCreate);
document.querySelector('#create-btn').addEventListener('click', createPost);
