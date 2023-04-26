const form = document.querySelector('#image-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(form);
  fetch('http://localhost:3000/storage', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      // Handle response data
      console.log(data);
    })
    .catch(error => {
      // Handle errors
      console.error(error);
    });
});