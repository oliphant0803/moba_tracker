window.onload = init;

class Admin {
    constructor(username, password, profilePic) {
        this.username = username;
        this.password = password;
        this.profilePic = profilePic;
    }
}

class User {
    constructor(username, password, profilePic) {
        this.username = username;
        this.password = password;
        this.profilePic = profilePic;
        this.favouriteUser = null;
        this.favouriteChamp = null;
        this.avgKDA = null;
        this.reportCause = ['Actor', 'Actor', 'Actor']
    }
}

class Champion {
    constructor(name, profilePic) {
        this.name = name;
        this.profilePic = profilePic;
    }
}

// hard coded value for user in the system
const user_value = [
    ["../assets/images/login3.png", "User 1"],
    ["../assets/images/login3.png", "User 2"],
    ["../assets/images/login3.png", "User 3"],
    ["../assets/images/login3.png", "User 4"],
    ["../assets/images/login3.png", "User 5"],
    ["../assets/images/login3.png", "User 6"],
    ["../assets/images/login3.png", "User 7"],
    ["../assets/images/login3.png", "User 8"]
];

const admins = [] // Array of admin
const users = [] //Array of user
const champions = [];
var currentAdmin = null;
var resultSection = null;
var menuswitch = 'viewUser';//'ViewUser', 'removeUser', 'addGame'];

function init(){
    const viewUser = document.querySelector('.viewUser');
    viewUser.addEventListener('click', viewUserAction);
    const removeUser = document.querySelector('.removeUser');
    //console.log(menu);
    removeUser.addEventListener('click', removeUserAction);
    const addGame = document.querySelector('.addGame');
    //console.log(menu);
    addGame.addEventListener('click', addGameAction);

    const search = document.querySelector('.searchBut');
    search.addEventListener('click', searchAction);

    resultSection = document.querySelector('#result-container');
    resultSection.addEventListener('click', banUser);

    const currAdminName = 'BestAdmin'
    const currAdminPassword = 'password'
    const currAdminprofilePic = '../assets/images/tiger1.png'
    admins.push(new Admin(currAdminName, currAdminPassword, currAdminprofilePic));
    currentAdmin = admins[0];

    const headerName = document.querySelector('.header-name');
    headerName.innerHTML = currentAdmin.username;
    const headerImgContainer = document.querySelector('.header-img-container');
    const imgProfile = document.querySelector('.img-profile');
    imgProfile.src = "../assets/images/login3.png";
    const headerAnnounce = document.querySelector('.header-announcement');
    headerAnnounce.innerHTML = "Welcome, " + currentAdmin.username + ". ";

    champions.push(new Champion('Teemo', '../assets/images/login3.png'));

    
    for (var i = user_value.length - 1; i >= 0; i--) {
        user = new User(user_value[i][1], 'password', user_value[i][0])
        user.favouriteChamp = champions[0];
        users.push(user);
    }
    
}


function viewUserAction(e) {
    e.preventDefault();
    console.log("Pressed view user");
    menuswitch = 'viewUser';

}
function removeUserAction(e) {
    e.preventDefault();
    console.log("Pressed remove user");
    menuswitch = 'removeUser';

}
function addGameAction(e) {
    e.preventDefault();
    console.log("Pressed add game");
    menuswitch = 'addGame';
}

function searchAction(e){
    e.preventDefault();
    console.log("search user");
    const searchUsername = document.querySelector('#search').value;
    for (var i = resultSection.children.length - 1; i >= 0; i--) {
        resultSection.children[i].remove();
        console.log("remove users...");
    }
    if (menuswitch == 'viewUser'){
        for (var i = users.length - 1; i >= 0; i--) {
            if (users[i].username == searchUsername){
                displayUser(users[i]);
                console.log(users[i].username);
            }
        }
    }
    if (menuswitch == 'removeUser'){
        for (var i = users.length - 1; i >= 0; i--) {
            if (users[i].username == searchUsername){
                displayBanUser(users[i]);
                console.log(users[i].username);
            }
        }
    }
    if (menuswitch == 'addGame'){
        for (var i = users.length - 1; i >= 0; i--) {
            if (users[i].username == searchUsername){
                displayAddGame(users[i]);
                console.log(users[i].username);
            }
        }
    }

}

function displayUser(user){
    const row = document.createElement('div');
    row.classList.add('row');

    const infoContainer = document.createElement('div');
    infoContainer.classList.add('col');
    infoContainer.classList.add('user-info-container');
    row.appendChild(infoContainer);


    const imgContainer = document.createElement('div');
    imgContainer.classList.add('user-img-container');
    const img = document.createElement('img');
    img.src = user.profilePic;
    img.classList.add("img-profile");
    imgContainer.appendChild(img);

    const userLink = document.createElement('a');
    userLink.classList.add('username');
    userLink.classList.add('justify-content-start');
    userLink.href = "https://github.com/csc309-winter-2022/team47"
    userLink.innerHTML = user.username;

    infoContainer.appendChild(imgContainer);
    infoContainer.appendChild(userLink);

    const champInfoContainer = document.createElement('div');
    champInfoContainer.classList.add('col');
    champInfoContainer.classList.add('user-champ-container');
    row.appendChild(champInfoContainer);

    const imgChampContainer = document.createElement('div');
    imgChampContainer.classList.add('user-img-container');
    const imgChamp = document.createElement('img');
    imgChamp.src = user.favouriteChamp.profilePic;
    imgChamp.classList.add("img-profile");
    imgChampContainer.appendChild(imgChamp);


    const champContainer = document.createElement('div');
    champContainer.classList.add('user-champ-link-container');
    champContainer.innerHTML = "Favourite Champion<br>"

    const champLink = document.createElement('a');
    champLink.href = "https://github.com/csc309-winter-2022/team47"
    champLink.innerHTML = user.favouriteChamp.name;
    champContainer.appendChild(champLink);

    const kdaContainer = document.createElement('div');
    kdaContainer.classList.add('col');
    kdaContainer.classList.add('user-info-container');
    if (user.avgKDA != null) {
        kdaContainer.innerHTML = "Avg KDA<br>" + user.avgKDA;
    } else {
        kdaContainer.innerHTML = "Avg KDA<br>" + "None";
    }
    
    champInfoContainer.appendChild(imgChampContainer);
    champInfoContainer.appendChild(champContainer);
    row.appendChild(champInfoContainer);
    row.appendChild(kdaContainer);

    resultSection.appendChild(row);
}


function displayBanUser(user){
        const row = document.createElement('div');
    row.classList.add('row');

    const infoContainer = document.createElement('div');
    infoContainer.classList.add('col');
    infoContainer.classList.add('user-info-container');
    row.appendChild(infoContainer);


    const imgContainer = document.createElement('div');
    imgContainer.classList.add('user-img-container');
    const img = document.createElement('img');
    img.src = user.profilePic;
    img.classList.add("img-profile");
    imgContainer.appendChild(img);

    const userLink = document.createElement('a');
    userLink.classList.add('username');
    userLink.classList.add('justify-content-start');
    userLink.href = "https://github.com/csc309-winter-2022/team47"
    userLink.innerHTML = user.username;

    const report = document.createElement('div');
    report.classList.add('col');
    report.classList.add('user-info-container');
    report.innerHTML = "Report Time<br>" + user.reportCause.length;

    const cause = document.createElement('div');
    cause.classList.add('col');
    cause.classList.add('user-info-container');
    cause.innerHTML = "Most Cause<br>" + mode(user.reportCause);

    const banContainer = document.createElement('div');
    banContainer.classList.add('user-info-container');
    banContainer.classList.add('col');
    const ban = document.createElement('button');
    ban.classList.add('btn');
    ban.classList.add('banUser');
    ban.classList.add('btn-action');
    ban.innerHTML = 'Ban';
    banContainer.appendChild(ban);

    infoContainer.appendChild(imgContainer);
    infoContainer.appendChild(userLink);

    row.appendChild(report);
    row.appendChild(cause);
    row.appendChild(banContainer);

    resultSection.appendChild(row);
}

function mode(arr){
    return arr.sort((a,b) =>
          arr.filter(v => v===a).length
        - arr.filter(v => v===b).length
    ).pop();
}

function displayAddGame(user){

}

function banUser(e){
    e.preventDefault();
    // check if return button was clicked, otherwise do nothing.
    if (e.target.classList.contains('banUser')) {
        console.log('Try ban a user');
        //const banUserId = parseInt(e.target.children[0].innerHTML)
        console.log(e.target);
        // Call removeBookFromPatronTable()
        //removeBookFromPatronTable(libraryBooks[returnBookId])
    }
}



