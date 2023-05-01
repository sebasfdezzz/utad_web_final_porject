const register_form = document.getElementById('register_form');
const name_input = document.getElementById('name');
const email_input = document.getElementById('email');
const password_input = document.getElementById('password');
const age_input = document.getElementById('age');
const city_input = document.getElementById('city');
const interests_input = document.getElementById('interests');
const offers_input = document.getElementById('offers');
const register_btn = document.getElementById('register_btn');
const update_btn = document.getElementById('update_btn');
const delete_btn = document.getElementById('delete_btn');
const review_form = document.getElementById('review_form');
const email_rev_input = document.getElementById('email_rev');
const password_rev_input = document.getElementById('password_rev');
const webpage_id_input = document.getElementById('webpage_id');
const score_input = document.getElementById('score');
const send_review_btn = document.getElementById('send_review_btn');
const review_textarea = document.getElementById('review_text');

const url = 'http://localhost:3000/api/users/'

register_btn.addEventListener('click', async (event) => {
  event.preventDefault(); // prevent form submission
  const payload = getPayload();
  let response = await getJSON(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  if(!response) return;
  alert('usuario registrado');
  register_form.reset();
  // your code here
});

update_btn.addEventListener('click', async (event) => {
  event.preventDefault(); // prevent form submission
  const payload = getPayload();
  let response = await getJSON(url, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  if(!response) return;
  alert('usuario actualizado');
  // your code here
});

delete_btn.addEventListener('click', async (event) => {
  event.preventDefault(); // prevent form submission
  const payload = getPayload(true);
  let response = await getJSON(url, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  if(!response) return;
  alert('usuario borrado');
  // your code here
});

send_review_btn.addEventListener('click', async (event) => {
  event.preventDefault(); // prevent form submission
  let webid = webpage_id_input.value.trim();
  webid = webid.length ? webid : 'senselessid';
  let url_review = 'http://localhost:3000/api/webpages/'+webid;
  const payload = getReviewPayload();
  let response = await getJSON(url_review, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  if(!response) return;
  alert('reseña mandada');
  // your code here
});

function updateValue(value) {
    document.getElementById("score-label").textContent = "Score: "+ value + " ★".repeat(Math.ceil(value));
}

function getPayload(forDelete=false){
    const name = name_input.value.trim();
    const email = email_input.value.trim();
    const password = password_input.value.trim();
    const age = age_input.value.trim();
    const city = city_input.value.trim();
    const interests = interests_input.value.trim().split(',').map((interest) => interest.trim());
    const acceptRecievingOffers = offers_input.checked;

    if (forDelete) {
      return { email, password };
    }

    return { name, email, password, age, city, interests, acceptRecievingOffers };
}

async function getJSON(url,options) {
  let response = await fetch(url,options);
  if (response.status>400){
      alert(response.status + ': ' + (await response.text()));
      return;
  }
  return await response.json();
}

function getReviewPayload() {
  const email = email_rev_input.value.trim();
  const password = password_rev_input.value.trim();
  const score = parseFloat(score_input.value);
  const opinion = review_textarea.value.trim();

  return { email, password, score, opinion };
}