// Global functions -> (for selecting elements)
const selector = name => document.querySelector(name)
const selectors = name => document.querySelectorAll(name)

// Elements
const firstname = selector('#firstname')
const lastname = selector('#lastname')
const email = selector('#email')
const companyName = selector('#company-name')
const companyUrl = selector('#company-url')
const address = selector('#address')
const apartment = selector('#apartment')
const city = selector('#city')
const state = selector('#state')
const postalCode = selector('#postal-code')
const country = selector('#country')
const createBtn = selector('#create')

const form = selector('form')
const allInput = selectors('input')

const screen = selector('#user-screen')
const table = selector('#table')

// Store
const usersData = []


// table.classList.add('show')
// console.log('Before ->', table.className)
// table.className += ' show'
// console.log('After ->', table.className)



// Add To Store
function addToStore() {
    const user = {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        companyName: companyName.value,
        companyUrl: companyUrl.value,
        address: address.value,
        apartment: apartment.value,
        city: city.value,
        state: state.value,
        postalCode: postalCode.value,
        country: country.value
    }

    usersData.push(user)
    form.reset()
    displayUser()
}

function deleteUser(userIndex) {
    usersData.splice(userIndex, 1);
    displayUser()
}

function editUser(userIndex) {
    const user = usersData[userIndex]

    firstname.value = user.firstname
    lastname.value = user.lastname
    email.value = user.email
    companyName.value = user.companyName
    companyUrl.value = user.companyUrl
    apartment.value = user.apartment
    city.value = user.city
    state.value = user.state
    postalCode.value = user.postalCode
    country.value = user.country
    address.value = user.address

    createBtn.innerHTML = 'Update'
    createBtn.setAttribute('data-name', 'update')
    createBtn.setAttribute('data-id', userIndex)
}

function displayUser() {
    // Show table
    table.className += ' show';

    screen.innerHTML = ''

    // loop through users
    usersData.forEach( function (user, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = `<td>${user.firstname}</td>
        <td>${user.lastname}</td>
        <td>${user.email}</td>
        <td>${user.companyName}</td>
        <td>${user.companyUrl}</td>
        <td>${user.address}</td>
        <td>${user.apartment}</td>
        <td>${user.city}</td>
        <td>${user.state}</td>
        <td>${user.postalCode}</td>
        <td>${user.country}</td>
        <td class="d-flex pt-2">
            <button onclick="editUser(${index})" class="btn btn-primary btn-sm mr-2">Edit</button>
            <button onclick="deleteUser(${index})" class="btn btn-danger btn-sm">delete</button>  
        </td>`

        screen.appendChild(tr)
    })
}

function handleUpdate() {
    const user = {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        companyName: companyName.value,
        companyUrl: companyUrl.value,
        address: address.value,
        apartment: apartment.value,
        city: city.value,
        state: state.value,
        postalCode: postalCode.value,
        country: country.value
    }
    const index = createBtn.getAttribute('data-id')

    usersData.splice(index, 1, user)

    displayUser()

    // Reset
    form.reset()
    createBtn.innerHTML = 'Create'
    createBtn.setAttribute('data-name', null)
    createBtn.setAttribute('data-id', null)
}

function globalValidate (){
    let result = true

    if(!validate(firstname)){
        firstname.classList.add('required')
        result = false
    }
    
    if(!validate(lastname)){
        lastname.classList.add('required')
        result = false
    }

    if(!validate(companyName)){
        companyName.classList.add('required')
        result = false
    }
    
    if(!validate(companyUrl)){
        companyUrl.classList.add('required')
        result = false
    }
  
    if(!validate(address)){
        address.classList.add('required')
        result = false
    }

    if(!validate(apartment)){
        apartment.classList.add('required')
        result = false
    }
    if(!validate(city)){
        city.classList.add('required')
        result = false
    }
    
    if(!validate(state)){
        state.classList.add('required')
        result = false
    }

    if(!validate(postalCode)){
        postalCode.classList.add('required')
        result = false
    }

    if(!validate(country)){
        country.classList.add('required')
        result = false
    }
    
    if(!validate(firstname)){
        firstname.classList.add('required')
        result = false
    }
    
    if(!validate(email)){
        email.classList.add('required')
        result = false
    }

    return result

}


function removeBorder(index) {
    if(allInput[index].value.length > 1){
        if(allInput[index].classList.contains('required')){
            allInput[index].classList.remove('required')
        }
    }
}


function validate (input) {
    let result = true

    if(input.value.length <= 2){
        result = false
    }
    
    return result
}

// Adding to window's object
// window.deleteUser = deleteUser

// Events

allInput.forEach((input, index) => {
    input.addEventListener('keypress', () => {
        removeBorder(index)
    })
})

createBtn.addEventListener('click', e => {
    // To prevent page from refreshing
    e.preventDefault()

    // For validation
    if(globalValidate()) {
        if(createBtn.getAttribute('data-name') == 'update'){
            handleUpdate()
        }
        else{
            addToStore()
        }
    }
})