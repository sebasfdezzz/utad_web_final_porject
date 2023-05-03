const upload_pair = document.getElementById('upload_pair');
const city_users_input = document.getElementById('city_users');
const city_users_btn = document.getElementById('city_users_btn');
const image_preview1 = document.getElementById('image_preview1');
const image_preview2 = document.getElementById('image_preview2');
const text1 = document.getElementById('text1');
const image_upload1 = document.getElementById('image_upload1');
const text2 = document.getElementById('text2');
const image_upload2 = document.getElementById('image_upload2');
const form = document.getElementById("comercio-form");
const jwtTokenInput = document.getElementById("jwt-token");
const createButton = document.getElementById("create_btn");
const updateButton = document.getElementById("update_btn");
const deleteButton = document.getElementById("delete_btn");

image_upload1.addEventListener("change", () => {
    const file = image_upload1.files[0];
    const reader = new FileReader();
  
    reader.addEventListener("load", () => {
      // Update the src attribute of the image element with the data URL of the selected file
      image_preview1.src = reader.result;
    });
  
    // Read the selected file as a data URL
    reader.readAsDataURL(file);
});

image_upload2.addEventListener("change", () => {
    const file = image_upload2.files[0];
    const reader = new FileReader();
  
    reader.addEventListener("load", () => {
      // Update the src attribute of the image element with the data URL of the selected file
      image_preview2.src = reader.result;
    });
  
    // Read the selected file as a data URL
    reader.readAsDataURL(file);
});

upload_pair.addEventListener('click',async ()=>{
    const jwtToken = jwtTokenInput.value.trim();
    let webpageId = document.getElementById("webpage-id").value.trim();
    webpageId = webpageId.length ? webpageId : 'senslessid';
    
    let url = "http://localhost:3000/api/webpages/";
    //text part
    let response = await getJSON(url + 'texts/'+((webpageId.trim().length == 0) ? '34': webpageId),{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify({
            texts: [text1.value, text2.value]
        })
    });
    if(!response) return;
    

    // Upload image 1
    const formData = new FormData();
    formData.append('image',image_upload1.files[0]);
  
    let responseImage1 = image_upload1.files[0] ? (await getJSON('http://localhost:3000/api/storage', {
      method: 'POST',
      body: formData
    })).url : " ";
    if(!responseImage1) return;

    // Upload image 2
    const formData2 = new FormData();
    formData2.append('image',image_upload2.files[0]);
  
    let responseImage2 = image_upload2.files[0] ? (await getJSON('http://localhost:3000/api/storage', {
      method: 'POST',
      body: formData2
    })).url : " ";
    if(!responseImage2) return;

    response = await getJSON(url + 'photos/'+webpageId,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify({
            images: [responseImage1, responseImage2]
        })
    });
    if(!response) return;
    alert('Texto e imagenes guardados')
});

city_users_btn.addEventListener('click',async ()=>{
    let url = 'http://localhost:3000/api/users/'+city_users_input.value.trim();
    let response = await getJSON(url,{
        headers:{
            'Authorization': `Bearer ${document.getElementById("jwt-token").value.trim()}`
        }
    });
    if(!response) return;
    for(let i=0; i< response.length; i++){
        document.getElementById('email_list').innerHTML += `<p>${response[i]}</p><br></br>`
    }
});

createButton.addEventListener('click',async (event)=>{
    event.preventDefault(); // prevent default form submission
    const jwtToken = jwtTokenInput.value.trim();
    const webpageId = document.getElementById("webpage-id");
    const city = document.getElementById("city").value.trim().toLowerCase();
    const activity = document.getElementById("activity").value.trim().toLowerCase();
    const title = document.getElementById("title").value.trim();
    const summary = document.getElementById("summary").value.trim();
    
    // Define the request headers
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwtToken}`
    };
    
    // Define the request body
    const body = JSON.stringify({city, activity, title, summary });
    
    // Determine which button was clicked and set the appropriate request method and endpoint URL
    let response, method, url="http://localhost:3000/api/webpages/";
    console.log('create button entered');
    method = "POST";
    response = await getJSON(url, {method, headers,body});
    if (!response)
        return;
    if (response.message){
        webpageId.value = response.webpage_id;
        alert('Este comercio ya tiene una pagina web con id: '+ response.webpage_id);
    }
    else{
        webpageId.value = response.webpage_id;
        alert('Pagina web creada con id: '+response.webpage_id);
    }
});

updateButton.addEventListener('click',async (event)=>{
    event.preventDefault(); // prevent default form submission
    const jwtToken = jwtTokenInput.value.trim();
    let webpageId = document.getElementById("webpage-id").value.trim();
    const city = document.getElementById("city").value.trim().toLowerCase();
    const activity = document.getElementById("activity").value.trim().toLowerCase();
    const title = document.getElementById("title").value.trim();
    const summary = document.getElementById("summary").value.trim();
    webpageId = webpageId.length ? webpageId : 'senslessid';

    // Define the request headers
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwtToken}`
    };
    
    // Define the request body
    const body = JSON.stringify({city, activity, title, summary });
    
    // Determine which button was clicked and set the appropriate request method and endpoint URL
    let response, method, url="http://localhost:3000/api/webpages/";
    method = "PUT";
    url += webpageId;
    response = await getJSON(url, {method, headers,body});
    if (!response) return;
    alert('Pagina actualizada');
});

deleteButton.addEventListener('click',async (event)=>{
    event.preventDefault(); // prevent default form submission
    const jwtToken = jwtTokenInput.value.trim();
    let webpageId = document.getElementById("webpage-id").value.trim();
    webpageId = webpageId.length ? webpageId : 'senslessid';

    // Define the request headers
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwtToken}`
    };
    
    // Determine which button was clicked and set the appropriate request method and endpoint URL
    let response, method, url="http://localhost:3000/api/webpages/";
    method = "DELETE";
    url += webpageId;  
    response = await getJSON(url, {method, headers});
    if (!response) return;
    alert('Pagina borrada');
});

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

