const cuestionario = document.getElementById('cuestionario');
const token_input = document.getElementById('token_input');
const merchantId_input = document.getElementById('id');
const update_btn = document.getElementById('update_btn');
const delete_btn = document.getElementById('delete_btn');
const get1_btn = document.getElementById('get1_btn');
const get_btn = document.getElementById('get_btn');
const url = 'http://localhost:3000/api/merchants/';
const popup = document.getElementById('popup');


cuestionario.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
  
    // Do something with the form data here, e.g. send it to a server using AJAX  
    const payload = getPayload();
    const token = token_input.value.trim();

    let response = await getJSON(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    });

    if(!response) return;
    alert('Comercio registrado');
    document.getElementById('dialog').innerHTML = `
        <a><b>JWT: </b>${response.merchantJWT}</a>
        <a><b>webpage_id: </b>${response.webpage_id}</a>`;
});

update_btn.addEventListener('click', async() =>{
    const payload = getPayload();
    const token = token_input.value.trim();
    let merchant_id = merchantId_input.value.trim();
    merchant_id = merchant_id.length ?  merchant_id : 'senslessid' ;

    let response = await getJSON(url+merchant_id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    });
    if(!response) return;
    alert('comercio actualizado');
});

delete_btn.addEventListener('click', async() =>{
    let merchant_id = merchantId_input.value.trim();
    const token = token_input.value.trim();
    merchant_id = merchant_id.length ?  merchant_id : 'senslessid' ;

    let response = await getJSON(url+merchant_id, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if(!response) return;
    alert('Comercio borrado');

});

get1_btn.addEventListener('click', async() =>{
    let merchant_id = merchantId_input.value.trim();
    const token = token_input.value.trim();
    merchant_id = merchant_id.length ?  merchant_id : 'senslessid' ;
    let response = await getJSON(url+merchant_id, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if(!response) return;
    popup.innerHTML = `
    <div class="object-container">
      <a><b>Nombre: </b>${response._id}</a>
      <a><b>Nombre: </b>${response.name}</a>
      <a><b>CIF: </b>${response.CIF}</a>
      <a><b>Direccion: </b>${response.address}</a>
      <a><b>Email: </b>${response.email}</a>
      <a><b>Numero: </b>${response.phone_num}</a>
    </div>`;
    document.getElementById('popup').style.display = 'block';

});

get_btn.addEventListener('click', async() =>{
    const token = token_input.value.trim();

    let response = await getJSON(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if(!response) return;
    for(let i =0; i< response.length; i++){
        popup.innerHTML += `
        <div class="object-container">
          <a><b>Id: </b>${response[i]._id}</a>
          <a><b>Nombre: </b>${response[i].name}</a>
          <a><b>CIF: </b>${response[i].CIF}</a>
          <a><b>Direccion: </b>${response[i].address}</a>
          <a><b>Email: </b>${response[i].email}</a>
          <a><b>Numero: </b>${response[i].phone_num}</a>
        </div><hr></hr>`;
    }
    popup.style.display = 'block';
});


// Listen for clicks on the window
window.addEventListener('click', (event) => {
  // If the click target is not the popup or any of its children
  if (!popup.contains(event.target)) {
    // Hide the popup

    popup.style.display = 'none';
    popup.innerHTML = '';
  }
});

function getPayload(){
    const name = cuestionario.elements.name.value;
    const cif = cuestionario.elements.cif.value;
    const address = cuestionario.elements.address.value;
    const email = cuestionario.elements.email.value;
    const phone = cuestionario.elements.phone.value;
  
    return {
        name: name,
        CIF: cif,
        address: address,
        email: email,
        phone_num: phone
    };
}

function handleResponse(response){
    if(response.status > 400){
        alert(response.statusText);
        return;
    }
}

async function getJSON(url,options) {
    let response = await fetch(url,options);
    if (response.status>400){
        alert(response.status + ': ' + (await response.text()));
        return;
    }
    try{
        return await response.json();
    }catch(err){
        console.log(err);
        alert('RESPONSE_ERROR');
    }
}
