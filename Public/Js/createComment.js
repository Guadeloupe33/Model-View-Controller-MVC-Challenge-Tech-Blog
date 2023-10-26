// Function to handle adding comments to blog posts
const addCommentPostFormHandler = async (event) => {
  event.preventDefault();

  // Get the blog post ID from the data attribute
  const id = event.target.dataset.id;

  // Get the comment text from the input field
  const comment = document.querySelector(`#commentInput${id}`).value.trim();

  // Send a POST request to the server to create the comment
  const response = await fetch(`/api/comments/${id}`, {
    method: 'POST',
    body: JSON.stringify({
      comment,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  // Parse the response JSON
  const { commentData, findUser } = await response.json();

  // Get the comment list element
  const commentListInput = document.querySelector(`#commentList${id}`);

  // Create a new list item to display the comment
  const liEl = document.createElement('li');
  liEl.textContent = findUser.name + ': ' + comment;
  commentListInput.append(liEl);

  // Log the response for debugging (optional)
  console.log(response);

  // Check if the response was successful
  if (response.ok) {
    // Comment creation was successful
  } else {
    // Show an alert if comment creation failed
    alert('Failed to create a new Comment');
  }
};

// Add click event listeners to comment buttons
const buttons = document.querySelectorAll('.commentButton');

for (const button of buttons) {
  button.addEventListener('click', addCommentPostFormHandler);
}
