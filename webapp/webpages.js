const form = document.querySelector('#filtros-form');
const right = document.getElementById('right_part');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // prevent default form submit behavior
    right.innerHTML='';
    // get form data
    const formData = new FormData(form);
    const id = formData.get('id').trim();
    const city = formData.get('city').trim();
    const activity = formData.get('activity').trim();
    const scoring = formData.get('scoring').trim();

    let url = 'http://localhost:3000/api/webpages/';

    if(id.length){
        const response = await getJSON(url + id);
        if(!response) return;
        right.innerHTML = oneRow(response);
        return;
    }
    url += 'search/'
    if(activity.length){
        const response = await getJSON(url + city + '/' +activity);
        if(!response) return;
        for(let i=0; i<response.length; i++){
            right.innerHTML += oneRow(response[i]);
        }
        return;
    }
    if(city.length){
        const response = await getJSON(url + city);
        if(!response) return;
        for(let i=0; i<response.length; i++){
            right.innerHTML += oneRow(response[i]);
        }
        return;
    }
    const response = await getJSON('http://localhost:3000/api/webpages/');
    if(!response) return;
    for(let i=0; i<response.length; i++){
        if(!response[i].title) continue;
        right.innerHTML += oneRow(response[i]);
    }

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

function oneRow(object){
    const webpageHTML = `
        <div class="webpage_row">
        <div class="info">
            <h2>${object.title}</h2>
            <b>${object.city}, ${object.activity}</b><br>
            <b>Score ${object.scoring}★ of ${object.number_of_reviews} reviews</b>
            <p>${object.summary}</p>	
        </div>`
        + ImgTxtPair(object.texts, object.images)
        +addReviews(object.reviews)
        +`</div>`;
    return webpageHTML;
}

function ImgTxtPair(texts, photos){
    let maxLen = Math.max(texts.length, photos.length);
    let result = "";
  
    for (let i = 0; i < maxLen; i++) {
      let text = i < texts.length ? texts[i] : " ";
      let photo = i < photos.length ? photos[i] : " ";
      result += `<div class="image_text_pair">
                    <img src="${photo}">
                    <a>${text}</a>
                 </div>`;
    }
  
    return `<div class="images-texts">${result}</div>`;
}

function addReviews(reviews){
    let result = '<div class="reviews-container"><b>Reseñas:</b>';

    for (let i = 0; i < reviews.scores.length; i++) {
      let score = reviews.scores[i];
      let opinion = reviews.opinions[i];
      result += `<div class="review"><a><b>${score}☆</b> ${opinion}</a></div>`;
    }
  
    result += '</div>';
    return result;
}