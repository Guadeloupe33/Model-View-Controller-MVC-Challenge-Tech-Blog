// Delete Post Section
const deletePostFormHandler = async (event) => {
  event.preventDefault();
  const id = event.target.dataset.id;

  // Send a DELETE request to the server to delete the post
  const response = await fetch(`/api/blogPost/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  // Log the response for debugging (optional)
  console.log(response);

  // Check if the response was successful and redirect to the dashboard if it was
  if (response.ok) {
    document.location.replace(`/dashboard`);
  } else {
    // Show an alert if post deletion failed
    alert('Failed to delete Post');
  }
};

// Add click event listeners for the delete buttons
const deleteButtons = document.querySelectorAll('.delete-buttons');
for (const deleteButton of deleteButtons) {
  deleteButton.addEventListener('click', deletePostFormHandler);
}

// Edit Post Section
let id = 0;
const showEdit = async (event) => {
  event.preventDefault();

  // Get the post ID from the data attribute
  id = event.target.dataset.id;
  console.log('showEdit: ' + id);

  // Get the edit form element and display it
  const editFormEl = document.querySelector(`#edit-form-${id}`);
  editFormEl.style.display = 'block';
};

const editPostHandler = async (event) => {
  event.preventDefault();
  console.log('editPostHandler: ' + id);

  // Get the edited title and comment from the input fields
  const title = document.querySelector(`#edit-title-${id}`).value.trim();
  console.log(title);

  const comment = document.querySelector(`#edit-content-${id}`).value.trim();
  console.log(comment);

  // Send a PUT request to the server to update the post
  const response = await fetch(`/api/blogPost/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      comment,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  // Log the response for debugging (optional)
  console.log(response);

  // Check if the response was successful and redirect to the dashboard if it was
  if (response.ok) {
    document.location.replace(`/dashboard`);
  } else {
    // Show an alert if post editing failed
    alert('Failed to edit Post');
  }
};

// Add click event listeners for the edit buttons and submit edit buttons
const editButtons = document.querySelectorAll('.edit-buttons');
for (const editButton of editButtons) {
  editButton.addEventListener('click', showEdit);
}

const submitEditButtons = document.querySelectorAll('.edit-btn');
for (const submitEdit of submitEditButtons) {
  submitEdit.addEventListener('click', editPostHandler);
}
