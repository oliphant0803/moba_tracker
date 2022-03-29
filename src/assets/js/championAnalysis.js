window.onload=function(){
    addChamp();
}

//the way we expect to get from json
const post1={
    postId: 1,
    time: new Date("2020-9-16 13:30:58"),
    userName: "User 1",
    userProfile: "../assets/images/login3.png",
    gameTag: 1,
    champTag: "Champion1",
    content: "Content"
}

const post2={
    postId: 2,
    time: new Date("2021-9-16 12:00:00"),
    userName: "User 2",
    userProfile: "../assets/images/login3.png",
    gameTag: 3,
    champTag: "Champion2",
    content: "Content"
}

const post3={
    postId: 3,
    time: new Date("2022-1-1 13:30:58"),
    userName: "User 1",
    userProfile: "../assets/images/login3.png",
    gameTag: 4,
    champTag: "Champion1",
    content: "Content"
}

const match1 = 
    {   
        gameId: "1",
        winLoss: "A",
        champ1: "champ 1",
        champ2: "champ 2",
        champ3: "champ 3",
        champ4: "champ 4",
        champ5: "champ 5",
        teamA: ["Champion1", "Champion2", "Champion3", "Champion4", "Champion5"],
        kdaA: [13.4, 10.8, 6.0, 9.2, 8.4],
        champ6: "champ 6",
        champ7: "champ 7",
        champ8: "champ 8",
        champ9: "champ 9",
        champ10: "champ 10",
        teamB: ["Champion6", "Champion7", "Champion8", "Champion9", "Champion10"],
        kdaB: [4.8, 5.8, 6.6, 5.8, 8.3]
};

const match2 = 
    {   
        gameId: "2",
        winLoss: "A",
        champ1: "champ 1",
        champ2: "champ 7",
        champ3: "champ 3",
        champ4: "champ 9",
        champ5: "champ 5",
        teamA:["Champion1", "Champion7", "Champion3", "Champion9", "Champion5"],
        kdaA: [12.0, 14.4, 8.3, 11.1, 8.4],
        champ6: "champ 1",
        champ7: "champ 7",
        champ8: "champ 4",
        champ9: "champ 5",
        champ10: "champ 6",
        teamB:["Champion1", "Champion7", "Champion4", "Champion6", "Champion5"],
        kdaB:[4.2, 5.2, 5.2, 5.2, 5.6]
    };

const match3 = 
    {   
        gameId: "3",
        winLoss: "B",
        champ1: "champ 1",
        champ2: "champ 2",
        champ3: "champ 8",
        champ4: "champ 4",
        champ5: "champ 7",
        teamA:["Champion1", "Champion2", "Champion8", "Champion4", "Champion7"],
        kdaA:[6.6, 7.0, 10.4, 3.8, 4.2],
        champ6: "champ 2",
        champ7: "champ 4",
        champ8: "champ 8",
        champ9: "champ 5",
        champ10: "champ 10",
        teamB:["Champion2", "Champion4", "Champion8", "Champion10", "Champion5"],
        kdaB:[8.0, 6.4, 12.5, 12.4, 5.7]
    };

const posts=[post1, post2, post3];
const matches = [match1, match2, match3];


function pickRate(champ) {
    var count = 0;
    const numMatch = matches.length;
    for (let index = 0; index < numMatch; index++) {
        const match = matches[index];
        if (match.teamA.includes(champ)) {
            count++;
        }
        if (match.teamB.includes(champ)) {
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
        if (match.winLoss=="A" && match.teamA.includes(champ)) {
            count++;
        }
        if (match.winLoss=="B" && match.teamB.includes(champ)) {
            count++;
        }
    }
    return Math.round(count/numMatch*100);
}

function discussRate(champ){
    var count = 0;
    const numPost = posts.length;
    for (let index = 0; index < numPost; index++) {
        const post = posts[index];
        if (post.champTag == champ) {
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
        if (match.teamA.includes(champ)) {
            count++;
            const i = match.teamA.indexOf(champ)
            sum += match.kdaA[i]
        }
        if (match.teamB.includes(champ)) {
            count++;
            const i = match.teamB.indexOf(champ)
            sum += match.kdaB[i]
        }
    }
    return Math.round(sum/count*100)/100;
}

function getChamp(){
    const champ1 = document.querySelector("#champion1").value;
    const champ2 = document.querySelector("#champion2").value;
    if (champ1 != "Select" && champ2 != "select") {
        displayPickRate(champ1, champ2);
        displayWinRate(champ1, champ2);
        displayDiscussRate(champ1, champ2);
        displayKDA(champ1, champ2);
    }
}

//DOM
function addChamp() {
    const champ1 = document.querySelector('table').children[0].children[0].children[0].children[0];
    const champ2 = document.querySelector('table').children[0].children[0].children[2].children[0];
    for (let i = 1; i < 11; i++) {
        const element = "Champion"+String(i);
        const option = document.createElement("option");
        option.value=element;
        option.innerText=element;
        champ1.appendChild(option);
    }
    for (let i = 1; i < 11; i++) {
        const element = "Champion"+String(i);
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