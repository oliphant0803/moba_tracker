window.onload=function(){
    getMatches();
    getPosts();
    addChamp();
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
    constructor(user, champ){
        this.username = user;
        this.champTag = champ;
    }
}


function pickRate(champ) {
    var count = 0;
    const numMatch = matches.length;
    for (let index = 0; index < numMatch; index++) {
        const match = matches[index];
        if (match.championA === champ) {
            count++;
        }
        if (match.championB === champ) {
            count++;
        }
    }
    return Math.round(count/(numMatch*2)*100);
}

function winRate(champ) {
    var count = 0;
    const numMatch = matches.length;
    for (let index = 0; index < numMatch; index++) {
        const match = matches[index];
        if (match.winLoss== match.userA && match.championA === champ) {
            count++;
        }
        if (match.winLoss== match.userB && match.championB === champ) {
            count++;
        }
    }
    return Math.round(count/numMatch*100);
}

function discussRate(champ){
    var count = 0;
    const numPost = posts.length;
    for (const post of posts) {
        if (post.champTag === champ) {
            count++;
        }
    }
    return Math.round(count/numPost*100);
}

function averageKDA(champ){
    var sum = 0;
    var count = 0;
    const numMatch = matches.length;
    for (let index = 0; index < numMatch; index++) {
        const match = matches[index];
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
    return Math.round(sum/count*100)/100;
}

function getChamp(){
    const champ1 = document.querySelector("#champion1").value;
    const champ2 = document.querySelector("#champion2").value;
    if (champ1 != "Select" && champ2 != "Select") {
        displayPickRate(champ1, champ2);
        displayWinRate(champ1, champ2);
        displayDiscussRate(champ1, champ2);
        displayKDA(champ1, champ2);
    }
}

//DOM
async function addChamp() {
    await new Promise(r => setTimeout(r, 1000));
    const champ1 = document.querySelector('table').children[0].children[0].children[0].children[0];
    const champ2 = document.querySelector('table').children[0].children[0].children[2].children[0];
    champions.sort(function(a, b){return a-b});
    for (const element of champions) {
        const option = document.createElement("option");
        option.value=element;
        option.innerText=element;
        champ1.appendChild(option);
    }
    for (const element of champions) {
        const option = document.createElement("option");
        option.value=element;
        option.innerText=element;
        champ2.appendChild(option);
    }

}

function displayPickRate(champ1, champ2){
    const r1 = pickRate(champ1);
    const r2 = pickRate(champ2);
    const pk1 = document.querySelector('table').children[1].children[0].children[0];
    const pk2 = document.querySelector('table').children[1].children[0].children[2];
    if (r1>=r2) {
        pk1.className="blue"
        pk2.className="red"
    }
    pk1.innerText=r1+"%";
    pk2.innerText=r2+"%";
}

function displayWinRate(champ1, champ2){
    const r1 = winRate(champ1);
    const r2 = winRate(champ2);
    const pk1 = document.querySelector('table').children[1].children[1].children[0];
    const pk2 = document.querySelector('table').children[1].children[1].children[2];
    if (r1>=r2) {
        pk1.className="blue"
        pk2.className="red"
    }
    pk1.innerText=r1+"%";
    pk2.innerText=r2+"%";
}

function displayDiscussRate(champ1, champ2){
    const r1 = discussRate(champ1);
    const r2 = discussRate(champ2);
    const pk1 = document.querySelector('table').children[1].children[2].children[0];
    const pk2 = document.querySelector('table').children[1].children[2].children[2];
    if (r1>=r2) {
        pk1.className="blue"
        pk2.className="red"
    }
    pk1.innerText=r1+"%";
    pk2.innerText=r2+"%";
}

function displayKDA(champ1, champ2){
    const r1 = averageKDA(champ1);
    const r2 = averageKDA(champ2);
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
            const cA = "champion".concat(element.championA);
            const cB = "champion".concat(element.championB);
            const kA = element.kdaA;
            const kB = element.kdaB;
            const match = new Match(wl, uA, cA, kA, uB, cB, kB);
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
        json.posts.forEach(element => {
            const username = element.username;
            const champ = element.tag_champion;
            const post = new UserPost(username, champ);
            posts.push(post);
        });
    }).catch((error) => {
        console.log(error)
    })
}