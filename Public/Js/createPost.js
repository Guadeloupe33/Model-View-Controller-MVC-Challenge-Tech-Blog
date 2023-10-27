// Function to show the create post form
const showCreate = async (event) => {
  event.preventDefault()

  const showCreate = document.querySelector('#create-form') // Get the create post form
  const hideCreateBtn = document.querySelector('#create-post') // Get the hide create button

  showCreate.style.display = 'block' // Show the create post form
  hideCreateBtn.style.display = 'none' // Hide the hide create button
}

// Function to create a new blog post
const createPost = async (event) => {
  event.preventDefault()

  // Get values from the input fields
  const title = document.querySelector('#create-title').value.trim()
  const comment = document.querySelector('#create-content').value.trim()
  const newDate = new Date()
  const date = newDate.getMonth() + '/' + newDate.getDay() + '/' + newDate.getFullYear()

  // Send a POST request to create a new blog post
  const response = await fetch('/api/blogPost/', {
    method: 'POST',
    body: JSON.stringify({
      title,
      comment,
      date,
    }),
    headers: { 'Content-Type': 'application/json' },
  })

  // Check the response status
  if (response.ok) {
    // If successful, redirect to the dashboard
    document.location.replace(`/dashboard`)
  } else {
    // If there is an error, show an alert and log the response
    alert('Failed to Create New Post')
    console.log(response)
  }
}

// Event listener to show the create post form when the button is clicked
document.querySelector('#create-post').addEventListener('click', showCreate)

// Event listener to create a new post when the button is clicked
document.querySelector('#create-btn').addEventListener('click', createPost)
