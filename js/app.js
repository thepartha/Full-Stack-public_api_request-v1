//GET DOM ELEMENTS
const body = document.getElementsByTagName('BODY')[0];
const gallery = document.getElementById('gallery');
const modal = document.querySelector('.modal-container');
const searchDiv = document.querySelector('.search-container');
const searchResultsGallery = document.createElement('div');
searchResultsGallery.setAttribute('class','gallery')
modal.style.display = "none";

//DECLARE EMPLOYEE ARRAYS
let employees=[];
let searchedEmployees=[];

//CREATE AND APPEND SEARCH HTML
const searchHTML = `
    <form action="#" method="get">
    <input type="search" id="search-input" class="search-input" onkeyup="searchEmployees()" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="serach-submit" onclick="searchEmployees()" class="search-submit">
    </form>`
searchDiv.innerHTML = searchHTML;

//FETCH FUNCTION
fetch('https://randomuser.me/api/?format=json&results=12&?nat=gb')
    .then(response => response.json())
    .then(data => generateGallery(data.results));

//SEARCH EMPLOYESS FUNCTION 
  function searchEmployees() {
    const searchString = document.getElementById('search-input').value;
    gallery.innerHTML = '';
    if(searchString) {
       for (let i = 0; i < employees.length ; i ++) {
            if (employees[i].name.search(searchString) > -1) { //search each list item for matching string 
               searchedEmployees.push(employees[i]); 
            }      
           }
           displayGallery(searchedEmployees); 
           searchedEmployees=[];
           search = true;
    } else {       
        displayGallery(employees);
        search = false;
    }
}

//GENERATE GALLERY AND ADD TO THE EMPLOYESS ARRAY 
function generateGallery(results) {
    results.forEach((item) => {
     const employee = new Employee();
            employee.name = item.name.first + ' ' + item.name.last,
            employee.email = item.email,
            employee.city= item.location.city,
            employee.address= item.location.street + ", " + item.location.state + " " + item.location.postcode,
            employee.image = item.picture.large,
            employee.phone = item.cell,
            employee.dob = item.dob.date.slice(0,10)
            employees.push(employee);
      });
      
      displayGallery(employees);
}

//GENERATE HTML AND DISPLAY GALLERY
function displayGallery(employees){
    employees.forEach((employee, index)=>{
        const card = document.createElement('div');
        card.setAttribute('class','card');
        card.innerHTML = `
           <div class="card-img-container">
               <img class="card-img" src="${employee.image}" alt="profile picture">
           </div>
           <div class="card-info-container">
               <h3 id="name" class="card-name cap">${employee.name} </h3>
               <p class="card-text">${employee.email}</p>
               <p class="card-text cap">${employee.city}</p>
           </div>`;
       card.addEventListener('click',function(){displayModal(employees, index)});
       gallery.appendChild(card);
    })

}

//GENERATE HTML AND DISPLAY MODAL 
function displayModal(employees, index){
    const dob = employees[index].dob
    const modalHTML = `
    <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn" onclick="closeModal()"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src=" ${employees[index].image}" alt="profile picture">
                <h3 id="name" class="modal-name cap"> ${employees[index].name}</h3>
                <p class="modal-text">${employees[index].email}</p>
                <p class="modal-text cap">${employees[index].city}</p>
                <hr>
                <p class="modal-text">${employees[index].phone}</p>
                <p class="modal-text">${employees[index].address}</p>
                <p class="modal-text">Birthday: ${dob.slice(5,7)}/${dob.slice(8)}/${dob.slice(0,4)}</p>
            </div>
            <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>`
    modal.innerHTML = modalHTML;
    document.getElementById('modal-prev').addEventListener('click', function() {handleClick(employees, index - 1)});    
    document.getElementById('modal-next').addEventListener('click', function() {handleClick(employees, index + 1)});  
    modal.style.display = "block";
}

// HANDLE PREVIOUS AND NEXT BUTTONS ON THE MODAL
function handleClick(employees, index){
    if(index >= employees.length){
        index = 0
    } else if (index < 0) {
        index = employees.length - 1
    }
   displayModal(employees, index)
}

//CLOSE MODAL    
function closeModal() {
    modal.style.display = "none";
    modal.innerHTML = ""; 
};
