window.onload = init;
function init(){
    const search = document.querySelector('.searchBut');
    search.addEventListener('click', searchAction);

    const submitForm = document.querySelector('.submit');
    submitForm.addEventListener('click', addGame);

    resultSection = document.querySelector('#result-container');
    resultSection.addEventListener('click', userReport);

    //displaySearchSection();
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

const post1={
    postId: 1,
    time: new Date("2020-9-16 13:30:58"),
    userName: "User 1",
    userProfile: "../assets/images/login3.png",
    gameTag: 1,
    champTag: "Champion 1",
    content: "Bad Things"
}

const post2={
    postId: 2,
    time: new Date("2021-9-16 12:00:00"),
    userName: "User 2",
    userProfile: "../assets/images/login3.png",
    gameTag: 3,
    champTag: "Champion 2",
    content: "Content Content Content Content Content Content Content"
}

const post3={
    postId: 3,
    time: new Date("2022-1-1 13:30:58"),
    userName: "User 1",
    userProfile: "../assets/images/login3.png",
    gameTag: 4,
    champTag: "Champion 1",
    content: "Bad Things Bad Things Bad Things Bad Things Bad Things "
}

posts = [post1, post2, post3]

const users = [
    {
        username: 'User 1',
        userId: 1,
        profilePic:'../assets/images/tiger1.png'
    },
    {
        username: 'User 2',
        userId: 2,
        profilePic:'../assets/images/tiger1.png'
    },
    {
        username: 'User 3',
        userId: 3,
        profilePic:'../assets/images/tiger1.png'
    }
];

var reports = [
    {
        reporterId:2,
        reportTime: new Date("2022-1-5 13:30:58"),
        userId: 1,
        reportCause: 'Offensive Post',
        reportPost: post3
    },
    {
        reporterId:1,
        reportTime: new Date("2022-1-3 13:30:58"),
        userId: 2,
        reportCause: 'Inappropriate Name',
        reportPost: null
    },
    {
        reporterId:3,
        reportTime: new Date("2022-1-4 13:30:58"),
        userId: 1,
        reportCause: 'Offensive Post',
        reportPost: post1
    },
    {
        reporterId:3,
        reportTime: new Date("2022-1-5 13:30:58"),
        userId: 1,
        reportCause: 'Offensive Post',
        reportPost: post3
    }
];

function addGame(e){
    e.preventDefault();
    let valid = document.getElementById('newGameForm').checkValidity();
    if(!valid) {
        alert('Please fill up all field');
    } else{
    const username1a = document.querySelector('#username1a').value
    const username1b = document.querySelector('#username1b').value
    const runes1a1 = document.getElementById('runes1a1')
    const runes1a2 = document.getElementById('runes1a2')
    const runes1a3 = document.getElementById('runes1a3')
    const runes1a4 = document.getElementById('runes1a4')
    const runes1b1 = document.getElementById('runes1b1')
    const runes1b2 = document.getElementById('runes1b2')
    const runes1b3 = document.getElementById('runes1b3')
    const runes1b4 = document.getElementById('runes1b4')
    const runes1a = [runes1a1, runes1a2, runes1a3, runes1a4]
    const runes1b = [runes1b1, runes1b2, runes1b3, runes1b4]
    const runesChoice1a = []
    const runesChoice1b = []
    var count = 0;
    for (var i = runes1a.length - 1; i >= 0; i--) {
        if (runes1a[i].checked) {
            count = count + 1;
            runesChoice1a.push(i);
        }
    }
    if (count != 2) {
            alert("There must be 2 runes!")
            return;
    }
    count = 0;
    for (var i = runes1a.length - 1; i >= 0; i--) {
        if (runes1b[i].checked) {
            count = count + 1;
            runesChoice1b.push(i);
        }
    }
    if (count != 2) {
           alert("There must be 2 runes!")
            return;
    }
    const summoner1a1 = document.getElementById('summoners1a1')
    const summoner1a2 = document.getElementById('summoners1a2')
    const summoner1a3 = document.getElementById('summoners1a3')
    const summoner1a4 = document.getElementById('summoners1a4')
    const summoner1b1 = document.getElementById('summoners1b1')
    const summoner1b2 = document.getElementById('summoners1b2')
    const summoner1b3 = document.getElementById('summoners1b3')
    const summoner1b4 = document.getElementById('summoners1b4')
    const summoner1a = [summoner1a1, summoner1a2, summoner1a3, summoner1a4]
    const summoner1b = [summoner1b1, summoner1b2, summoner1b3, summoner1b4]
    const summonerChoice1a = []
    const summonerChoice1b = []
    count = 0;
    for (var i = summoner1a.length - 1; i >= 0; i--) {
        if (summoner1a[i].checked) {
            count = count + 1;
            summonerChoice1a.push(i);
        }
    }
    if (count != 2) {
            alert("There must be 2 summoners!")
            return;
    }
    count = 0;
    for (var i = summoner1b.length - 1; i >= 0; i--) {
        if (summoner1b[i].checked) {
            count = count + 1;
            summonerChoice1b.push(i);
        }
    }
    if (count != 2) {
            alert("There must be 2 summoners!")
            return;
    }
    const item1a1 = document.getElementById('item1a1')
    const item1a2 = document.getElementById('item1a2')
    const item1a3 = document.getElementById('item1a3')
    const item1a4 = document.getElementById('item1a4')
    const item1a5 = document.getElementById('item1a5')
    const item1a6 = document.getElementById('item1a6')
    const item1a7 = document.getElementById('item1a7')
    const item1a8 = document.getElementById('item1a8')
    const item1a9 = document.getElementById('item1a9')
    const item1a10 = document.getElementById('item1a10')
    const item1a = [item1a1, item1a2, item1a3, item1a4, item1a5, item1a6, item1a7, item1a8, item1a9, item1a10]
    const itemChoice1a = []
    count = 0;
    for (var i = item1a.length - 1; i >= 0; i--) {
        if (item1a[i].checked) {
            count = count + 1;
            itemChoice1a.push(i);
        }
    }
    if (count != 6) {
            alert("There must be 6 items!")
            return;
        }
    const item1b1 = document.getElementById('item1b1')
    const item1b2 = document.getElementById('item1b2')
    const item1b3 = document.getElementById('item1b3')
    const item1b4 = document.getElementById('item1b4')
    const item1b5 = document.getElementById('item1b5')
    const item1b6 = document.getElementById('item1b6')
    const item1b7 = document.getElementById('item1b7')
    const item1b8 = document.getElementById('item1b8')
    const item1b9 = document.getElementById('item1b9')
    const item1b10 = document.getElementById('item1b10')
    const item1b = [item1b1, item1b2, item1b3, item1b4, item1b5, item1b6, item1b7, item1b8, item1b9, item1b10]
    const itemChoice1b = []
    count = 0;
    for (var i = item1b.length - 1; i >= 0; i--) {
        if (item1b[i].checked) {
            count = count + 1;
            itemChoice1b.push(i);
        }
    }
        if (count != 6) {
            alert("There must be 6 items!")
            return;
        }
    const kill1a = document.querySelector('#kill1a').value
    const kill1b = document.querySelector('#kill1b').value
    const assist1a = document.querySelector('#assist1a').value
    const assist1b = document.querySelector('#assist1b').value
    const death1a = document.querySelector('#death1a').value
    const death1b = document.querySelector('#death1b').value
    const user1a={
            username:username1a,
            runes:runesChoice1a,
            summoners:summonerChoice1a,
            items:itemChoice1a,
            kill:kill1a,
            assist:assist1a,
            death:assist1a
        }
    const user1b={
            username:username1a,
            runes:runesChoice1a,
            summoners:summonerChoice1a,
            items:itemChoice1a,
            kill:kill1a,
            assist:assist1a,
            death:assist1a
        }
    const game = {
        gameId:games.length,
        user1a:user1a,
        user1b:user1b,

    }
    console.log("game loading done")
    games.push(game);
    updateResult();
    }
    
}

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

function findReportTime(reports){
    return reports.length;
}

function findMostCause(reports){
    if (reports.length ===0) {
        return "None";
    }
    const causes = reports.reduce(function(cause, report){
        var c = report.reportCause;
        if (cause[report.reportCause] !== undefined){
            cause[report.reportCause] = cause[report.reportCause] + 1;
        } else {
            cause[report.reportCause] = 0;
        }
        return cause;
    }, {});
    const mostCause = Object.entries(causes).reduce((a, b) => a[1] > b[1] ? a : b)[0]
    return mostCause;

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

function userManage(e){
    e.preventDefault();
    // check if return button was clicked, otherwise do nothing.
    if (e.target.classList.contains('banBtn')) {
        //console.log("Try ban a user")
        const username = e.target.parentElement.parentElement.children[0].children[1].innerHTML;
        const targetUser = users.filter(user => user.username === username);
        for (var i = users.length - 1; i >= 0; i--) {
            if (users[i].userId === targetUser[0].userId){
                users.splice(i, 1);
            }
        }
        displaySearchSection();
    }
    if (e.target.classList.contains('clearBtn')) {
        //console.log("Try clear a user's report")
        const username = e.target.parentElement.parentElement.children[0].children[1].innerHTML;
        const targetUser = users.filter(user => user.username === username);
        reports = reports.filter(reportUser => reportUser.userId !== targetUser[0].userId);
        displaySearchSection();
        displayReportSection(targetUser[0]);
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

function findUserById(id){
    const wantUser = users.filter(user => user.userId === id);
    return wantUser[0];
}

