// store all users 

let users = []

if (sessionStorage.getItem("users")) {
    users = JSON.parse(sessionStorage.getItem("users"))
    displayUserList()
}


userForm.addEventListener('submit', (event) => {
    event.preventDefault()
    // get all users from input 
    const userNameInput = username.value
    const userEmailInput = email.value
    console.log(userNameInput, userEmailInput);
    // add users to array
    if (userNameInput && userEmailInput) {
        const editIndex = editStatus.value
        if (editIndex == "") {
            users.push({ username: userNameInput, email: userEmailInput })
            console.log(users);
        } else {
            users[editIndex] = { username: userNameInput, email: userEmailInput }
        }
    } else {
        alert("Please fill the form completely")
    }
    userForm.reset()
    sessionStorage.setItem("users", JSON.stringify(users))
    displayUserList()
})


// display users array as table
function displayUserList() {
    tableBody.innerHTML = ""
    users.forEach((item, index) => {

        tableBody.innerHTML += `
         <tr>
                    <td>${index + 1}</td>
                    <td>${item.username}</td>
                    <td>${item.email}</td>
                    <td>
                         <button onclick="editUser(${index})" class="btn btn-warning">Edit</button>
                         <button onclick="deleteUser(${index})" class="btn btn-danger">Delete</button>
                    </td>
                </tr>
        `

    })
}



// edit user 
function editUser(userIndex) {
    const userDetails = users[userIndex]
    console.log(userDetails);
    username.value = userDetails.username
    email.value = userDetails.email
    editStatus.value = userIndex


}



// delete user

function deleteUser(userIndex) {
    if (confirm("Are you sure, you want to delete the data")) {
        users.splice(userIndex, 1)
        sessionStorage.setItem("users", JSON.stringify(users))
        displayUserList()
    }
}


