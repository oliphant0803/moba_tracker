/*
 * This code is for creating an index page.
 * Author: Zewen Ma
 */

window.onload=function(){
    // // DOM elements
    const userInfo = document.querySelector('#userInfo');
    // Event Listerners
    const togglePassword = document.getElementById('togglePassword');
    const password = document.getElementById('password');
    
    togglePassword.addEventListener('click', function (e) {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        this.classList.toggle('fa-eye-slash');
    });
    userInfo.addEventListener('submit', loginCheck);
    getUsers();
    getAdmins();
}
// Global arrays
const userLibrary = [];

// User class
class User{
    constructor(id, email, username, password, type){
        this.id = id;
        this.email = email;
        this.username = username;
        this.password = password;
        this.type = type;
    }
}

function loginCheck(e){
    e.preventDefault();

    const username = document.querySelector('#userName').value;
    const password = document.querySelector('#password').value;
    const type = document.querySelector('#type').value;

    var canJumpAdmin = 0;
    var canJumpName = 0;
    var canJumpPassword = 0;
    if (username == '') {
        emptyMsg("name");
        canJumpName = 0;
    }
    else{
        noError("name");
        canJumpName = 1;
    }
    if (password == '') {
        emptyMsg("password");
        canJumpPassword = 0;
    }
    else{
        noError("password");
        canJumpPassword = 1;
    }
    if (type == "Admin" || type == "User") {
        noError("type");
        canJumpAdmin = 1;
    }
    else{
        emptyMsg("type");
        canJumpAdmin = 0;
    }
    var found = 0;
    var position = 0;
    for (let index = 0; index < userLibrary.length; index++) {
        const element = userLibrary[index];
        if (element.username == username) {
            found = 1;
            position = index;
            break;
        }
        
    }
    if (found == 1) {
        const user = userLibrary[position];
        if (password == user.password) {
            if (type == user.type) {
                // Redirect to user profile page
                // So far changes to a message
                if (type == "Admin") {
                    canLogin("admin", user);
                }
                else{
                    canLogin("user", user);
                }
            }
            else{
                wrongInput("type");
            }
        }
        else{
            wrongInput("password");
        }
    }
    else{
        wrongInput("user");
    }
}

function emptyMsg(section){
    if (section == "name") {
        const emailsec = userInfo.children[1].children[1];
        const warning = emailsec.children[0].children[0];
        warning.innerText = "Please enter your username";
    }
    else if (section == "password") {
        const emailsec = userInfo.children[2].children;
        const warning = emailsec[1];
        warning.innerText = "Please enter your password";
    }
    else{
        const typesec = userInfo.children[1].children[1];
        const warning = typesec.children[1].children[0];
        warning.innerText = "Please select a User Type";
    }
}

function noError(section){
    if (section == "name") {
        const emailsec = userInfo.children[1].children[1];
        const warning = emailsec.children[0].children[0];
        warning.innerText = "";
    }
    else if (section == "password") {
        const emailsec = userInfo.children[2].children;
        const warning = emailsec[1];
        warning.innerText = "";
    }
    else{
        const typesec = userInfo.children[1].children[1];
        const warning = typesec.children[1].children[0];
        warning.innerText = "";
    }
}

function canLogin(type, user){
    console.log(user);
    if (type == "admin") {
        //add to session
        const data = {
            id: user.id
        };
    
        console.log(data);
    
        const request = new Request('/admin', {
            method: 'post', 
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        });
        fetch(request)
        .then(function(res) {
            console.log(res.json())
        }).catch((error) => {
            console.log(error)
        })
        window.location.href="post-management";
        
    } else {
        //add to session
        const data = {
            id: user.id
        };
    
        console.log(data);
    
        const request = new Request('/user', {
            method: 'post', 
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        });
        fetch(request)
        .then(function(res) {
            console.log(res.json())
        }).catch((error) => {
            console.log(error)
        })
        window.location.href="forum";
    }
    
}

function wrongInput(section){
    if (section == "type") {
        const typesec = userInfo.children[1].children[1];
        const warning = typesec.children[1].children[0];
        warning.innerText = "User type does not match"
    } 
    else if(section == "password"){
        const emailsec = userInfo.children[2].children;
        const warning = emailsec[1];
        warning.innerText = "Password and username does not match";
    }
    else{
        const emailsec = userInfo.children[1].children[1];
        const warning = emailsec.children[0].children[0];
        warning.innerText = "No username found, please register";
    }
}

// Database related function
function getUsers(){
    const urlUser = 'api/users';
    
    fetch(urlUser).then((res) => {
        if (res.status === 200) {
            return res.json();
        }
        else{
            alert('Could not get users');
        }
    }).then((json) => {
        json.users.forEach(element => {
            const id = element._id;
            const username = element.username;
            const email = element.email;
            const password = element.password;
            const user = new User(id, email, username, password, "User");
            userLibrary.push(user);
        });
    }).catch((error) => {
        console.log(error)
    })
}

function getAdmins(){
    const urlUser = 'api/admins';
    
    fetch(urlUser).then((res) => {
        if (res.status === 200) {
            return res.json();
        }
        else{
            alert('Could not get users');
        }
    }).then((json) => {
        json.admins.forEach(element => {
            const id = element._id;
            const username = element.username;
            const email = element.email;
            const password = element.password;
            const user = new User(id, email, username, password, "Admin");
            userLibrary.push(user);
        });
    }).catch((error) => {
        console.log(error)
    })
}