/*
 * This code is for creating a register page.
 * Author: Zewen Ma
 */

window.onload=function(){
    // // DOM elements
    const userInfo = document.querySelector('#userInfo');
    // Event Listerners
    userInfo.addEventListener('submit', addNewUser);
    getUsers();
    getAdmins();
}
// Global arrays
const userLibrary = [];

// User class
class User{
    constructor(email, username, password, type){
        this.email = email;
        this.username = username;
        this.password = password;
        this.type = type;
    }
}

// Function
function addNewUser(e){
    e.preventDefault();

    // Add user to global array
    const email = document.querySelector('#email').value;
    const username = document.querySelector('#userName').value;
    const password = document.querySelector('#password').value;
    const type = document.querySelector('#type').value;
    var canJumpAdmin = 0;
    var canJumpEmail = 0;
    var canJumpName = 0;
    var canJumpPassword = 0;
    if (username == '') {
        addErrorMsg("name");
        canJumpName = 0;
    }
    else{
        noError(2);
        canJumpName = 1;
    }
    if (password == '') {
        addErrorMsg("password");
        canJumpPassword = 0;
    }
    else{
        noError(3);
        canJumpPassword = 1;
    }
    if (type == "Admin" || type == "User") {
        noError(4);
        canJumpAdmin = 1;
    }
    else{
        addErrorMsg("type");
        canJumpAdmin = 0;
    }
    var invalid = 0;
    if (email == '') {
        addErrorMsg("email");
        canJumpEmail = 0;
        invalid = 1;
    }
    else{
        for (let index = 0; index < userLibrary.length; index++) {
            const storedUser = userLibrary[index];
            if (storedUser.email === email && storedUser.type == type) {
                registered("email");
                invalid = 1;
                break;
            }
            if (storedUser.username === username) {
                registered("username");
                canJumpName = 0;
            }
            else{
                noError(1);
            }
        }
    
        if (invalid == 0 && canJumpName == 1) {
            const newUser = new User(email, username, password, type);
            userLibrary.push(newUser);
            if (type === "Admin") {
                addAdmin(username, email, password);
            }
            else{
                addUser(username, email, password);
            }
            noError(1);
            canJumpEmail = 1;
        }
        else{
            canJumpEmail = 0;
        }
    }

    if (canJumpAdmin && canJumpEmail && canJumpName && canJumpPassword) {
        backToIndex();
    }
}

// DOM function
function addErrorMsg(section){
    if (section == "email") {
        const emailsec = userInfo.children[1].children;
        const warning = emailsec[1];
        warning.innerText = "Please enter your email";
    }
    else if (section == "name") {
        const emailsec = userInfo.children[2].children;
        const warning = emailsec[1];
        warning.innerText = "Please enter your username";
    }
    else if (section == "password") {
        const emailsec = userInfo.children[3].children;
        const warning = emailsec[1];
        warning.innerText = "Please enter your password";
    }
    else{
        const typesec = userInfo.children[4].children;
        const warning = typesec[1];
        warning.innerText = "Please select a user type";
    }
}

function registered(section){
    if (section == "email") {
        const emailsec = userInfo.children[1].children;
        const warning = emailsec[1];
        warning.innerText = "You've already registered using this email";
    }
    else{
        const emailsec = userInfo.children[2].children;
        const warning = emailsec[1];
        warning.innerText = "Username used";
    }
}

function noError(section){
    const sec = userInfo.children[section].children;
    const warning = sec[1];
    warning.innerText = "";
}

function backToIndex(){
    window.location.href="login";
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
            const username = element.username;
            const email = element.email;
            const password = element.password;
            const user = new User(email, username, password, "User");
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
            const username = element.username;
            const email = element.email;
            const password = element.password;
            const user = new User(email, username, password, "Admin");
            userLibrary.push(user);
        });
    }).catch((error) => {
        console.log(error)
    })
}

function addUser(username, email, password){
    const url = '/api/users';

    let data = {
        recents: [],
        username: username,
        email: email,
        password: password,
        bio: "No Bio Yet",
        favs: [],
        icon: "assets/images/login3.png",
        match_history: []
    }

    const request = new Request(url, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });

    fetch(request).catch((error) =>{
        log(error)
    })
}

function addAdmin(username, email, password){
    const url = '/api/admins';

    let data = {
        username: username,
        email: email,
        password: password,
    }

    const request = new Request(url, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });

    fetch(request).catch((error) =>{
        log(error)
    })
}