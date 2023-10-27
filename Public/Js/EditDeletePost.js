// Delete Post Section
// Function to handle deleting a blog post
const deletePostFormHandler = async (event) => {
  event.preventDefault()
  const id = event.target.dataset.id

  // Send a DELETE request to remove the specified blog post
  const response = await fetch(`/api/blogPost/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })

  console.log(response)

  if (response.ok) {
    // If successful, redirect to the dashboard
    document.location.replace(`/dashboard`)
  } else {
    // If there is an error, show an alert
    alert('Failed to delete Post')
  }
}

// Add click event listeners to all delete buttons
const deleteButtons = document.querySelectorAll('.delete-buttons')
for (const deleteButton of deleteButtons) {
  deleteButton.addEventListener('click', deletePostFormHandler)
}

// Edit Post Section
// Variable to store the ID of the post being edited
let id = 0

// Function to display the edit form
const showEdit = async (event) => {
  event.preventDefault()

  // Get the ID of the post to be edited from the clicked button's dataset
  id = event.target.dataset.id
  console.log('showEdit: ' + id)

  // Show the edit form corresponding to the clicked post
  const editFormEl = document.querySelector(`#edit-form-${id}`)
  editFormEl.style.display = 'block'
}

// Function to handle editing a blog post
const editPostHandler = async (event) => {
  event.preventDefault()
  console.log('editPostHandler: ' + id)

  // Get updated values from the edit form
  const title = document.querySelector(`#edit-title-${id}`).value.trim()
  console.log(title)

  const comment = document.querySelector(`#edit-content-${id}`).value.trim()
  console.log(comment)

  // Send a PUT request to update the specified blog post
  const response = await fetch(`/api/blogPost/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      comment,
    }),
    headers: { 'Content-Type': 'application/json' },
  })

  console.log(response)

  if (response.ok) {
    // If successful, redirect to the dashboard
    document.location.replace(`/dashboard`)
  } else {
    // If there is an error, show an alert
    alert('Failed to edit Post')
  }
}

// Add click event listeners to all edit buttons
const editButtons = document.querySelectorAll('.edit-buttons')
for (const editButton of editButtons) {
  editButton.addEventListener('click', showEdit)
}

// Add click event listeners to all submit edit buttons
const submitEditButtons = document.querySelectorAll('.edit-btn')
for (const submitEdit of submitEditButtons) {
  submitEdit.addEventListener('click', editPostHandler)
}
