window.onload=function(){
    getMatches();
    getPosts();
    addChamp();
    currUser();
    getFav();
}

const posts = []
const matches = []
const champions = []

class Match{
    constructor(winLoss, userA, champA, kdaA, userB, champB, kdaB) {
        this.winLoss = winLoss;
        this.userA = userA;
        this.championA = champA;
        this.kdaA = kdaA;
        this.userB = userB;
        this.championB = champB;
        this.kdaB = kdaB;
    }
}

class UserPost{
    constructor(userid, champ){
        this.userid = userid
        this.champTag = champ;
    }
}

class GameUser{
    constructor(id, fav){
        this.id = id;
        this.fav = fav;
    }
}

var currentUserId;
var curr_user;

function checkUser(){
    const userType = document.querySelector('#user').value;
    if (userType != "Select") {
        getChamp(userType);
    }
}

function getChamp(type){
    const champ1 = document.querySelector("#champion1").value;
    const champ2 = document.querySelector("#champion2").value;
    if (champ1 != "Select" && champ2 != "Select") {
        displayPickRate(champ1, champ2, type);
        displayWinRate(champ1, champ2, type);
        displayDiscussRate(champ1, champ2, type);
        displayKDA(champ1, champ2, type);
    }
}


function pickRate(champ, type) {
    var count = 0;
    var lst = [];
    if (type === "all") {
        lst = matches;
    }
    else if (type === "self") {
        // Need to change after adding session
        const user = curr_user.id;
        for (const match of matches) {
            if (match.userA == user) {
                lst.push(match);
            }
            else if (match.userB == user) {
                lst.push(match);
            }
        }
    }
    else{
        const fav = curr_user.fav;
        for (const favUser of fav) {
            for (const match of matches) {
                if (match.userA == favUser) {
                    lst.push(match);
                }
                else if (match.userB == favUser) {
                    lst.push(match);
                }
            }
        }
    }
    const numMatch = lst.length;
    for (let index = 0; index < numMatch; index++) {
        const match = lst[index];
        if (match.championA === champ) {
            count++;
        }
        if (match.championB === champ) {
            count++;
        }
    }
    if (numMatch == 0) {
        return 0;
    }
    else{
        return Math.round(count/(numMatch*2)*100);
    }
}

function winRate(champ, type) {
    var count = 0;
    var lst = [];
    if (type === "all") {
        lst = matches;
    }
    else if (type === "self") {
        // Need to change after adding session
        const user = curr_user.id;
        for (const match of matches) {
            if (match.userA == user) {
                lst.push(match);
            }
            else if (match.userB == user) {
                lst.push(match);
            }
        }
    }
    else{
        const fav = curr_user.fav;
        for (const favUser of fav) {
            for (const match of matches) {
                if (match.userA == favUser) {
                    lst.push(match);
                }
                else if (match.userB == favUser) {
                    lst.push(match);
                }
            }
        }
    }
    const numMatch = lst.length;
    for (let index = 0; index < numMatch; index++) {
        const match = lst[index];
        if (match.winLoss== match.userA && match.championA === champ) {
            count++;
        }
        if (match.winLoss== match.userB && match.championB === champ) {
            count++;
        }
    }
    if (numMatch == 0) {
        return 0;
    }
    else{
        return Math.round(count/numMatch*100);
    }
}

function discussRate(champ, type){
    var count = 0;
    var lst = [];
    if (type === "all") {
        lst = posts;
    }
    else if (type === "self") {
        // Need to change after adding session
        const user = curr_user.id;
        for (const post of posts) {
            if (post.userid == user) {
                lst.push(post);
            }
        }
    }
    else{
        const fav = curr_user.fav;
        for (const favUser of fav) {
            for (const post of posts) {
                if (post.userid == favUser) {
                    lst.push(post);
                }
            }
        }
    }
    const numPost = lst.length;
    for (const post of lst) {
        if (post.champTag === champ) {
            count++;
        }
    }
    if (numPost == 0) {
        return 0;
    }
    else{
        return Math.round(count/numPost*100);
    }
    
}

function averageKDA(champ, type){
    var sum = 0;
    var count = 0;
    var lst = [];
    if (type === "all") {
        lst = matches;
    }
    else if (type === "self") {
        // Need to change after adding session
        const user = curr_user.id;
        for (const match of matches) {
            if (match.userA == user) {
                lst.push(match);
            }
            else if (match.userB == user) {
                lst.push(match);
            }
        }
    }
    else{
        const fav = curr_user.fav;
        for (const favUser of fav) {
            for (const match of matches) {
                if (match.userA == favUser) {
                    lst.push(match);
                }
                else if (match.userB == favUser) {
                    lst.push(match);
                }
            }
        }
    }
    const numMatch = lst.length;
    for (let index = 0; index < numMatch; index++) {
        const match = lst[index];
        if (match.championA === champ) {
            count++;
            const kda = match.kdaA
            const calc = Math.round((kda[0]+kda[2])/kda[1] * 100)/100
            sum += calc
        }
        if (match.championB === champ) {
            count++;
            const kda = match.kdaB
            const calc = Math.round((kda[0]+kda[2])/kda[1] * 100)/100
            sum += calc
        }
    }
    if (count === 0) {
        return 0;
    }
    return Math.round(sum/count*100)/100;
}

//DOM
async function addChamp() {
    await new Promise(r => setTimeout(r, 1000));
    const champ1 = document.querySelector('table').children[0].children[0].children[0].children[0];
    const champ2 = document.querySelector('table').children[0].children[0].children[2].children[0];
    champions.sort(function(a, b){return a-b});
    for (const element of champions) {
        const option = document.createElement("option");
        option.value="champion".concat(element);
        option.innerText="champion".concat(element);
        champ1.appendChild(option);
    }
    for (const element of champions) {
        const option = document.createElement("option");
        option.value="champion".concat(element);
        option.innerText="champion".concat(element);
        champ2.appendChild(option);
    }

}

function displayPickRate(champ1, champ2, type){
    const r1 = pickRate(champ1, type);
    const r2 = pickRate(champ2, type);
    const pk1 = document.querySelector('table').children[1].children[0].children[0];
    const pk2 = document.querySelector('table').children[1].children[0].children[2];
    if (r1>=r2) {
        pk1.className="blue"
        pk2.className="red"
    }
    pk1.innerText=r1+"%";
    pk2.innerText=r2+"%";
}

function displayWinRate(champ1, champ2, type){
    const r1 = winRate(champ1, type);
    const r2 = winRate(champ2, type);
    const pk1 = document.querySelector('table').children[1].children[1].children[0];
    const pk2 = document.querySelector('table').children[1].children[1].children[2];
    if (r1>=r2) {
        pk1.className="blue"
        pk2.className="red"
    }
    pk1.innerText=r1+"%";
    pk2.innerText=r2+"%";
}

function displayDiscussRate(champ1, champ2, type){
    const r1 = discussRate(champ1, type);
    const r2 = discussRate(champ2, type);
    const pk1 = document.querySelector('table').children[1].children[2].children[0];
    const pk2 = document.querySelector('table').children[1].children[2].children[2];
    if (r1>=r2) {
        pk1.className="blue"
        pk2.className="red"
    }
    pk1.innerText=r1+"%";
    pk2.innerText=r2+"%";
}

function displayKDA(champ1, champ2, type){
    const r1 = averageKDA(champ1, type);
    const r2 = averageKDA(champ2, type);
    const pk1 = document.querySelector('table').children[1].children[3].children[0];
    const pk2 = document.querySelector('table').children[1].children[3].children[2];
    if (r1>=r2) {
        pk1.className="blue"
        pk2.className="red"
    }
    pk1.innerText=r1;
    pk2.innerText=r2;
}


// Database related function
function getMatches(){
    const url = 'api/matches';
    
    fetch(url).then((res) => {
        if (res.status === 200) {
            return res.json();
        }
        else{
            alert('Could not get users');
        }
    }).then((json) => {
        json.matches.forEach(element => {
            const wl = element.win;
            const uA = element.userA;
            const uB = element.userB;
            const cA = element.championA;
            const cB = element.championB;
            const kA = element.kdaA;
            const kB = element.kdaB;
            const match = new Match(wl, uA, "champion".concat(cA), kA, uB, "champion".concat(cB), kB);
            if (!champions.includes(cA)) {
                champions.push(cA);
            }
            if (!champions.includes(cB)) {
                champions.push(cB);
            }
            matches.push(match);
        });
    }).then().catch((error) => {
        console.log(error)
    })
}

function getPosts(){
    const url = 'api/posts';
    
    fetch(url).then((res) => {
        if (res.status === 200) {
            return res.json();
        }
        else{
            alert('Could not get users');
        }
    }).then((json) => {
        json.forEach(element => {
            const id = element.username;
            const champ = element.tag_champion;
            const post = new UserPost(id, champ);
            posts.push(post);
        });
    }).catch((error) => {
        console.log(error)
    })
}

function currUser(){
    fetch('/user').then((res) => { 
    if (res.status === 200) {
        return res.json() 
    } else {
        console.log('Could not get user')
    }                
}).then((json) =>{
    currentUserId = json.currentUser;
    fetch('api/users/'+currentUserId).then((res) => {
        if (res.status === 200) {
            return res.json();
        }
        else{
            alert('Could not get admins');
        }
    }).then((json) => {
        let user = json
        const headerName = document.querySelector('.header-name');
        headerName.innerHTML = user.username;
        const headerImgContainer = document.querySelector('.header-img-container');
        const imgProfile = document.querySelector('.img-profile');
        imgProfile.src = user.icon;
        const headerAnnounce = document.querySelector('.header-announcement');
        headerAnnounce.innerHTML = "Welcome, " + user.username + ". ";
    }).catch((error) => {
        console.log(error)
    })
}).catch((error)=>{
    console.log(error);
})
}

async function getFav(){
    await new Promise(r => setTimeout(r, 1000));
    const url = '/api/users/' + currentUserId;
    fetch(url)
    .then((res) => { 
        if (res.status === 200) {
        return res.json() 
    } else {
            console.log('Could not get user')
    }                
    })
    .then((json) => {
        const fav = json.favs;
        curr_user = new GameUser(currentUserId, fav);
    })
}