
const body = document.getElementsByTagName('BODY')[0];
const gallery = document.getElementById('gallery');
const modal = document.querySelector('.modal-container');
const searchDiv = document.querySelector('.search-container');
const searchResultsGallery = document.createElement('div');
searchResultsGallery.setAttribute('class','gallery')
modal.style.display = "none";
let employeeArr = [];
let index = 0;
const recordCount = 0;
//Search HTML
const searchHTML = `
    <form action="#" method="get">
    <input type="search" id="search-input" class="search-input" onkeyup="searchEmployees()" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="serach-submit" onclick="searchEmployees()" class="search-submit">
    </form>`
searchDiv.innerHTML = searchHTML;


//FETCH FUNCTIONS 

fetch('https://randomuser.me/api/?format=json&results=12&?nat=gb')
    .then(response => response.json())
    .then(data => generateGallery(data.results));
  // .then(data => console.log(data));



//HELPER FUNCTIONS 
function searchEmployees() {
    const searchString = document.getElementById('search-input').value;
    const cards = gallery.children;
    searchResultsGallery.innerHTML = '';
    if(searchString) {
        gallery.classList.add('hidden');
       for (let i = 0; i < cards.length ; i ++) {
            if (cards[i].innerText.search(searchString) > -1) { //search each list item for matching string 
                searchResultsGallery.appendChild(cards[i].cloneNode(true)); //Clone element from the main list and append to Search list 
            }      
           }
        
        for (let i = 0; i < searchResultsGallery.children.length; i++) {
            searchResultsGallery.children[i].addEventListener('click',function(event){detail(event, null)});
        }   
        body.appendChild(searchResultsGallery);
        
           
    } else {       
        if(searchResultsGallery){
         searchResultsGallery.innerHTML = '';
      //   searchResultsGallery.parentNode.removeChild(searchResultsGallery);
        }
        gallery.classList.remove('hidden');
    }
}




function generateGallery(results) {

    results.forEach((item, i) => {
      const card = document.createElement('div');
      card.setAttribute('class','card');
      card.setAttribute('id', i);
      const employee = {
            name : item.name.first + ' ' + item.name.last,
            email : item.email,
            city : item.location.city,
            address : item.location.street + ", " + item.location.state + " " + item.location.postcode,
            picture : item.picture.large,
            phone : item.cell,
            birthday : item.dob.date
      };
      card.innerHTML = `
          <div class="card-img-container">
              <img class="card-img" src="${item.picture.medium}" alt="profile picture">
          </div>
          <div class="card-info-container">
              <h3 id="name" class="card-name cap">${item.name.first} ${item.name.last} </h3>
              <p class="card-text">${item.email}</p>
              <p class="card-text cap">${item.location.city}, ${item.location.state}</p>
          </div>`;
      card.addEventListener('click',function(event){detail(event, null)});
      employeeArr.push(employee);
      gallery.appendChild(card);
    });
    }



//SHOW MODAL WITH EMPLOYEE DETAIL    
function detail(event, i){
    if (i == null) {
    // GETTING THE ID FOR THE TARGET DIV
    if (event.target.className == "card-text" || event.target.className == "card-text cap" || event.target.className == "card-name cap" || event.target.className == "card-img") 
    { index = event.target.parentNode.parentNode.id;
    } else if (event.target.className == "card-info-container" || event.target.className == "card-img-container") {
    index = event.target.parentNode.id; }
    } else {
        if (i == -1) {
            index = 11;
        } else if (i == 12) {
            index = 0;
        } else {
        index = i;
        }
  } 
  const modalHTML = `
        <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn" onclick="closeModal()"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src=" ${employeeArr[index].picture}" alt="profile picture">
                    <h3 id="name" class="modal-name cap"> ${employeeArr[index].name}</h3>
                    <p class="modal-text">${employeeArr[index].email}</p>
                    <p class="modal-text cap">${employeeArr[index].city}</p>
                    <hr>
                    <p class="modal-text">${employeeArr[index].phone}</p>
                    <p class="modal-text">${employeeArr[index].address}</p>
                    <p class="modal-text">Birthday: ${employeeArr[index].birthday}</p>
                </div>
                <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn" onclick="detail(null,${+index - 1})">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn" onclick="detail(null,${+index + 1})">Next</button>
            </div>`
    modal.innerHTML = modalHTML;
    modal.style.display = "block";
}


//CLOSE MODAL    
function closeModal() {
    modal.style.display = "none";
    modal.innerHTML = "";
    
};
