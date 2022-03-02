/*
 * This code is for creating a register page.
 * Author: Zewen Ma
 */

window.onload=function(){
    // // DOM elements
    const userInfo = document.querySelector('#userInfo');
    // Event Listerners
    userInfo.addEventListener('submit', addNewUser);
}
// Global arrays
const userLibrary = [];
let numUsers = 0;

// User class
class User{
    constructor(email, username, password, type){
        this.email = email;
        this.username = username;
        this.password = password;
        this.type = type;
        this.userId = numUsers;
        numUsers++;
    }
}

// Some initial users
kath = new User("katherinema0905@gmail.com", "MasLayerKaka", "Katherine0905", "Admin");
oli = new User("oliver.h0803@gmail.com", "Hide on Bush", "0803", "User");
rachel = new User("rachel1231@gmail.com", "Distruction10000", "Rachel1231", "User");
userLibrary.push(kath);
userLibrary.push(oli);
userLibrary.push(rachel);

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
        console.log("no email");
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
            noError(1);
            canJumpEmail = 1;
        }
        else{
            // registeredEmail();
            canJumpEmail = 0;
        }
    }

    if (canJumpAdmin && canJumpEmail && canJumpName && canJumpPassword) {
        backToIndex();
    }
    // addNewUserToLibraray(newUser);
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
    window.location.href="index.html";
}