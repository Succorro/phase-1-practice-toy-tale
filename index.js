// --
// --
// --
// --
let addToy = false;
//Allows for on/off visual on page by setting default to false
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyForm = document.querySelector('.add-toy-form')
const toyCollectionDiv = document.getElementById("toy-collection");


function addBtnFunction(){
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  })
};
document.addEventListener("DOMContentLoaded", () => {
  addBtnFunction();
  //^Calls given function above^
  addToyForm();
  //Used for event listener, handles new toys being submitted
  fetch('http://localhost:3000/toys')
  .then(r => r.json())
  .then(data => data.forEach(data => createToy(data)))
//renders the data in localhost to page via FETCH GET, createToy function below takes the parsed data that has been individually identified via for each
});

function addToyForm(){
  toyFormContainer.addEventListener('submit', (event) => {
    event.preventDefault();
    createNewToy();
    toyForm.reset();
    })
};

function createNewToy () {
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      'name': document.querySelector('#new-name').value ,
      'image': document.querySelector('#new-image').value,
      'likes' : 0,
    })
  })
  .then(r => r.json())
  .then(data => createToy(data))
};

function createToy(toy){
  //toy.value used to specify which data value pair was attained and where the value will be added to markup
  console.log(toy)
  let i = document.createElement('div');
  i.className = 'card'
   i.innerHTML = ` <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes} Likes</p>
    <button class="like-btn" id="${toy.id}">Like ❤️</button>`
    toyCollectionDiv.appendChild(i) 
  //make sure to appendchild on the given collection div
  i.querySelector('.like-btn').addEventListener('click',() => {
    //like event listener, increases like value by one and uses updateLike to PATCH server
    toy.likes += 1
    i.querySelector('p').innerText = `${toy.likes} Likes`
    updateLike(toy)
  })
}

function updateLike(toy){
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toy)
  })
  .then(r=>r.json())
  .then(d=>console.log('nice'))
}
