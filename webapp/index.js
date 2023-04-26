document.getElementById("admin-btn").addEventListener("click", function(){
    window.location.href = "admin.html";
});

document.getElementById("comercio-btn").addEventListener("click", function(){
    window.location.href = "merchant.html";
});

document.getElementById("usuario-btn").addEventListener("click", function(){
    window.location.href = "user.html";
});



































































// const form = document.querySelector('#image-form');
// form.addEventListener('submit', event => {
//   event.preventDefault();
//   const formData = new FormData(form);
//   fetch('http://localhost:3000/storage', {
//     method: 'POST',
//     body: formData
//   })
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//     })
//     .catch(error => {
//       console.error(error);
//     });
// });

