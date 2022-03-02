/*
 * This code is for creating an index page.
 * Author: Zewen Ma
 */

window.onload=function(){
    // // DOM elements
    const userInfo = document.querySelector('#userInfo');
    // Event Listerners
    userInfo.addEventListener('submit', loginCheck);
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
                canLogin();
            }
            else{
                wrongInput("type");
            }
        }
        else{
            wrongInput("password");
        }
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
        const warning = typesec.children[0].children[1].children[0];
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
        const warning = typesec.children[0].children[1].children[0];
        warning.innerText = "";
        const another = userInfo.children[3].children[1];
        another.className = 'success';
        another.innerText = "";
    }
}

function canLogin(){
    const typesec = userInfo.children[3].children[1];
    typesec.innerText = "Successfully logged in!"
}

function wrongInput(section){
    if (section == "type") {
        const typesec = userInfo.children[3].children[1];
        typesec.className = 'fail';
        typesec.innerText = "Invalid usertype inserted"
    } else {
        const emailsec = userInfo.children[2].children;
        const warning = emailsec[1];
        warning.innerText = "Password and username do not match";
    }
}