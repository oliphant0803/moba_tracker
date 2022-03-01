/*
 * This code is for creating a register page.
 * Author: Zewen Ma
 */
window.onload=function(){
    // // DOM elements
    userInfo = document.querySelector('#userInfo');
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
    const type = document.querySelector('#usertype').value;
    const newUser = new User(email, username, password, type);
    userLibrary.push(newUser);

    // addNewUserToLibraray(newUser);
}
