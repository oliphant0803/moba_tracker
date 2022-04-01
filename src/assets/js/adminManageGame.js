window.onload = init;
function init(){
    const search = document.querySelector('.searchBut');
    search.addEventListener('click', searchAction);

    resultSection = document.querySelector('#result-container');
    resultSection.addEventListener('click', userReport);

    loadHeader();
}

function loadHeader(){
    const headerName = document.querySelector('.header-name');
    headerName.innerHTML = currentAdmin.username;
    const headerImgContainer = document.querySelector('.header-img-container');
    const imgProfile = document.querySelector('.img-profile');
    imgProfile.src = "../assets/images/login3.png";
    const headerAnnounce = document.querySelector('.header-announcement');
    headerAnnounce.innerHTML = "Welcome, " + currentAdmin.username + ". ";
}


//hard coded value for tag game id, champion, and posts
const currentAdmin = {
    username: "BestAdmin",
    password:'password',
    profilePic:'../assets/images/tiger1.png'
}

//the way we expect to get from json
var games = []

function updateResult(){
    for (var i = resultSection.children.length - 1; i >= 0; i--) {
        resultSection.children[i].remove();
    }
    for (var i = games.length - 1; i >= 0; i--) {
        displayGame(games[i]);
    }
}
function searchAction(e){
    e.preventDefault();
    //console.log("search user");
    const searchId = document.querySelector('#search').value;
    for (var i = resultSection.children.length - 1; i >= 0; i--) {
        resultSection.children[i].remove();
    }
    for (var i = games.length - 1; i >= 0; i--) {
        if (games[i].gameId == searchId){
            displayGame(games[i]);
        }
    }

}

function displayGame(game){
    console.log("try display game")
    const row = document.createElement('div');
    row.classList.add('row');

    const gameInfo = document.createElement('div');
    gameInfo.classList.add('col');
    gameInfo.classList.add('user-info-container');
    gameInfo.innerHTML = "Game Id<br>" + game.gameId;
    row.appendChild(gameInfo);

    const user1 = document.createElement('div');
    user1.classList.add('col');
    user1.classList.add('flex-3');
    user1.classList.add('user-info-container');
    user1.innerHTML = "Group A Player<br>" + game.user1a.username;
    row.appendChild(user1);

    const runes1 = document.createElement('div');
    //runes1.classList.add('col');
    //user1.classList.add('flex-2');
    runes1.classList.add('user-info-container');
    for (var i = 0; i < 2; i++) {
        var img = document.createElement('img');
        img.classList.add('img-profile');
        var imgId = game.user1a.runes[i]+1;
        console.log(imgId)
        img.src = "../assets/images/runes/r" + imgId + ".png"
        console.log(img)
        //user1.classList.add('flex-2');
        runes1.appendChild(img);
    }
    user1.appendChild(runes1);

    const summoner1 = document.createElement('div');
    summoner1.classList.add('col');
    //user1.classList.add('flex-2');
    summoner1.classList.add('user-info-container');
    for (var i = 0; i < 2; i++) {
        var img = document.createElement('img');
        img.classList.add('img-profile');
        if (game.user1a.summoners[i] == 0){
            img.src = "../assets/images/summoners/heal.png"
        }
        if (game.user1a.summoners[i] == 1){
            img.src = "../assets/images/summoners/ghost.png"
        }
        if (game.user1a.summoners[i] == 2){
            img.src = "../assets/images/summoners/ignite.png"
        }
        if (game.user1a.summoners[i] == 3){
            img.src = "../assets/images/summoners/smite.png"
        }
        
        //user1.classList.add('flex-2');
        summoner1.appendChild(img);
    }
    user1.appendChild(summoner1);

    const kda1 = document.createElement('div');
    kda1.classList.add('col');
    
    kda1.classList.add('user-info-container');
    kda1.innerHTML = "KDA<br>" + game.user1a.kill + "/"+ game.user1a.death + "/"+ game.user1a.assist;
    user1.appendChild(kda1);

    const user2 = document.createElement('div');
    user2.classList.add('col');
    user2.classList.add('flex-3');
    user2.classList.add('user-champ-container');
    user2.innerHTML = "Group B Player<br>" + game.user1b.username;
    row.appendChild(user2);
    

    const runes2 = document.createElement('div');
    //runes2.classList.add('col');
    //user1.classList.add('flex-2');
    runes2.classList.add('user-info-container');
    for (var i = 0; i < 2; i++) {
        var img = document.createElement('img');
        img.classList.add('img-profile');
        var imgId = game.user1a.runes[i]+1;
        img.src = "../assets/images/runes/r" + imgId + ".png"
        //user1.classList.add('flex-2');
        runes2.appendChild(img);
    }
    user2.appendChild(runes2);


    const summoner2 = document.createElement('div');
    summoner2.classList.add('col');
    //user1.classList.add('flex-2');
    summoner2.classList.add('user-info-container');
    for (var i = 0; i < 2; i++) {
        var img = document.createElement('img');
        img.classList.add('img-profile');
        if (game.user1b.summoners[i] == 0){
            img.src = "../assets/images/summoners/heal.png"
        }
        if (game.user1b.summoners[i] == 1){
            img.src = "../assets/images/summoners/ghost.png"
        }
        if (game.user1b.summoners[i] == 2){
            img.src = "../assets/images/summoners/ignite.png"
        }
        if (game.user1b.summoners[i] == 3){
            img.src = "../assets/images/summoners/smite.png"
        }
        
        //user1.classList.add('flex-2');
        summoner2.appendChild(img);
    }
    user2.appendChild(summoner2);



    const kda2 = document.createElement('div');
    kda2.classList.add('col');
    //user1.classList.add('flex-2');
    kda2.classList.add('user-info-container');
    kda2.innerHTML = "KDA<br>" + game.user1b.kill + "/"+ game.user1b.death + "/"+ game.user1b.assist;
    user2.appendChild(kda2);

    resultSection.appendChild(row);
}

function userReport(e){
    e.preventDefault();
    // check if return button was clicked, otherwise do nothing.
    if (e.target.classList.contains('viewBtn')) {
        const username = e.target.parentElement.parentElement.children[0].children[1].innerHTML;
        const targetUser = users.filter(user => user.username === username);
        displayReportSection(targetUser[0])
    }
}


function displaySearchSection(userReports){
    clearReportSection();
    for (var i = resultSection.children.length - 1; i >= 0; i--) {
        resultSection.children[i].remove();
    }
    for(let i = 0; i< users.length; i++){
        displayUser(users[i]);
    }
}