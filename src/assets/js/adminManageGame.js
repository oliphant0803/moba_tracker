window.onload = init;
var currentAdmin;
fetch('/admin').then((res) => { 
    if (res.status === 200) {
        return res.json() 
    }    
}).then((json) =>{
    // console.log(json.currentUser)

    currentAdmin = json.currentAdmin
    fetch('api/admins').then((res) => {
        if (res.status === 200) {
            return res.json();
        }
        else{
            alert('Could not get admins');
        }
    }).then((json) => {
        currentAdmin = json.admins.filter((admin) => admin._id === currentAdmin)[0]
        const headerAnnounce = document.querySelector('.header-announcement');
        headerAnnounce.innerHTML = "Welcome, " + currentAdmin.username + ". ";
    }).catch((error) => {
        console.log(error)
    })

}).catch(error => {
    console.log(error);
    // window.location.href="/login";
});

function init(){
    const search = document.querySelector('.searchBut');
    search.addEventListener('click', searchAction);

    resultSection = document.querySelector('#result-container');
    resultSection.addEventListener('click', userReport);
    fetch('api/users').then((res) => {
        if (res.status === 200) {
            return res.json();
        }
        else{
            alert('Could not get users');
        }
    }).then((json) => {
        userLibrary = json.users

        fetch('api/matches').then((res) => {
            if (res.status === 200) {
                return res.json();
            }
            else{
                alert('Could not get games');
            }
        }).then((json) => {
            gameLibrary = json.matches
            for (var i = gameLibrary.length - 1; i >= 0; i--) {
                currentResult.push(gameLibrary[i])
            }
            updateResult()

        }).catch((error) => {
            console.log(error)
        })

    }).catch((error) => {
        console.log(error)
    })
}

userLibrary = []
gameLibrary = []
currentResult = []

function updateResult(){
    for (var i = resultSection.children.length - 1; i >= 0; i--) {
        resultSection.children[i].remove();
    }
    for (var i = currentResult.length - 1; i >= 0; i--) {
        displayGame(currentResult[i]);
    }
}

function searchAction(e){
    e.preventDefault();
    const value = document.querySelector('#search').value;
    currentResult = []
    for (var i = gameLibrary.length - 1; i >= 0; i--) {
        if (gameLibrary[i]._id === value){
            currentResult.push(gameLibrary[i]);
        } else if (gameLibrary[i].match_name.includes(value)) {
            currentResult.push(gameLibrary[i]);
        }
    }
    updateResult()
}

function displayGame(game){
    console.log("try display game")
    const row = document.createElement('div');
    row.classList.add('row');

    const gameInfo = document.createElement('div');
    gameInfo.classList.add('col');
    gameInfo.classList.add('user-info-container');
    gameInfo.innerHTML = "Game Id:<br>Name:";
    row.appendChild(gameInfo);
    const gameActualInfo = document.createElement('div');
    gameActualInfo.classList.add('col');
    gameActualInfo.classList.add('flex-3');
    gameActualInfo.classList.add('user-info-container');
    gameActualInfo.classList.add('text-secondary');
    gameActualInfo.innerHTML = game._id + "<br>" +game.match_name;
    row.appendChild(gameActualInfo);

    const userA = document.createElement('div');
    userA.classList.add('col');
    userA.classList.add('flex');

    userA.classList.add('victory-bg')
    userA.classList.add('user-info-container');
    userA.innerHTML = "User A:<br>" + userLibrary.filter((user) => user._id === game.userA)[0].username
    row.appendChild(userA);
    const champA = document.createElement('div');
    champA.classList.add('col');
    champA.classList.add('flex');
    champA.classList.add('user-info-container');
    champA.classList.add('text-secondary');
    let imgContainer = document.createElement('div');
    imgContainer.classList.add('user-img-container');
    let img = document.createElement('img');
    img.src = "../assets/images/champions/c" + game.championA + ".webp";
    img.classList.add("img-profile");
    imgContainer.appendChild(img);
    champA.appendChild(imgContainer)
    row.appendChild(champA);

    const userB = document.createElement('div');
    userB.classList.add('col');
    userB.classList.add('flex');
    userB.classList.add('user-info-container');
    userB.innerHTML = "User B:<br>" + userLibrary.filter((user) => user._id === game.userB)[0].username
    row.appendChild(userB);

    const champB = document.createElement('div');
    champB.classList.add('col');
    champB.classList.add('flex');
    champB.classList.add('user-info-container');
    champB.classList.add('text-secondary');
    imgContainer = document.createElement('div');
    imgContainer.classList.add('user-img-container');
    img = document.createElement('img');
    img.src = "../assets/images/champions/c" + game.championB + ".webp";
    img.classList.add("img-profile");
    imgContainer.appendChild(img);
    champB.appendChild(imgContainer)
    row.appendChild(champB);

    if (game.win === game.userB) {
        userB.classList.add("victory-bg");
        userA.classList.add("defeat-bg");
    } else {
        userA.classList.add("victory-bg");
        userB.classList.add("defeat-bg");
    }

    const banContainer = document.createElement('div');
    banContainer.classList.add('user-info-container');
    banContainer.classList.add('col');
    banContainer.classList.add('flex-2');
    const ban = document.createElement('button');
    ban.classList.add('btn');
    ban.classList.add('viewBtn');
    ban.classList.add('btn-action');
    ban.innerHTML = 'View Details';
    banContainer.appendChild(ban);
    row.appendChild(banContainer)

    resultSection.appendChild(row);
}

function userReport(e){
    e.preventDefault();
    // check if return button was clicked, otherwise do nothing.
    if (e.target.classList.contains('viewBtn')) {
        let gameId = e.target.parentElement.parentElement.children[1].innerHTML;
        gameId = gameId.split("<br>")[0]
        addDescription(gameId)
    } else if (e.target.classList.contains('banBtn')) {
        let gameName = e.target.parentElement.parentElement.children[0].children[0].innerHTML;
        gameName = gameName.split(": ")[1]
        if (window.confirm('Are you sure to delete this game? Press OK to proceed.')) {
            deleteGame(gameName)
        }
    }
}

function deleteGame(gameName){
    const url = '/api/matches/' + gameName
    fetch('api/matches').then((res) => {
            if (res.status === 200) {
                return res.json();
            }
            else{
                alert('Could not get games');
            }
        }).then((json) => {
            gameLibrary = json.matches
            
            const request = new Request(url, {
            method: 'delete', 
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            });

            fetch(request)
            .then(function(res) {
                if (res.status === 200) {
                    currentResult = currentResult.filter((match) => match.match_name !== gameName)
                    gameLibrary = gameLibrary.filter((match) => match.match_name !== gameName)
                    alert('Deleted successfully!')
                    // updateResult()
                    location.reload()
                } else {    
                    alert('Deleted cannot be completed. Please try again.')
                    location.reload()
                }
                
            }).catch((error) => {
                console.log(error)
            })

        }).catch((error) => {
            console.log(error)
        })
}

function addDescription(gameId){
    let index = currentResult.findIndex((game)=> game._id === gameId)
    let match_i = currentResult[index]
    const gameDescription = addGameDescription(match_i)
    let resultSection = document.querySelector('#result-container');
    resultSection.children[currentResult.length - index-1].insertAdjacentElement("afterend", gameDescription);
    
    var row1 = document.createElement("div");
    row1.classList.add("row");
    row1.classList.add('user-info-container');
    if (match_i.win === match_i.userA) {
        row1.classList.add("victory-bg");
    } else {
        row1.classList.add("defeat-bg");
    }

    var username0 = document.createElement("div");
    username0.classList.add("col");
    username0.classList.add("d-flex");
    username0.classList.add("flex-half");
    username0.classList.add("align-items-center");
    username0.innerHTML = "<h5>" + userLibrary.filter((user) => user._id === match_i.userA)[0].username + "</h5>"

    row1.appendChild(username0)

    var userId0 = document.createElement("div");
    userId0.classList.add("col");
    userId0.classList.add("d-flex");
    userId0.classList.add("align-items-center");
    userId0.innerHTML = userLibrary.filter((user) => user._id === match_i.userA)[0]._id
    row1.appendChild(userId0)
    
    row1.appendChild(appendChamp(match_i.championA, match_i.runeA, match_i.summonerA));
    row1.appendChild(appendKDA(match_i.kdaA[0].toString(), match_i.kdaA[1].toString(), match_i.kdaA[2].toString()));
    row1.appendChild(appendItems(match_i.buildA));

    gameDescription.insertAdjacentElement("afterend", row1);

    var row2 = document.createElement("div");
    row2.classList.add("row");
    row2.classList.add('user-info-container');

    var username1 = document.createElement("div");
    username1.classList.add("col");
    username1.classList.add("d-flex");
    username1.classList.add("flex-half");
    username1.classList.add("align-items-center");
    username1.innerHTML = "<h5>" + userLibrary.filter((user) => user._id === match_i.userB)[0].username+ "</h5>"
    row2.appendChild(username1)

    var userId1 = document.createElement("div");
    userId1.classList.add("col");
    userId1.classList.add("d-flex");
    userId1.classList.add("align-items-center");
    userId1.innerHTML = userLibrary.filter((user) => user._id === match_i.userB)[0]._id
    row2.appendChild(userId1)
    
    row2.appendChild(appendChamp(match_i.championB, match_i.runeB, match_i.summonerB));
    row2.appendChild(appendKDA(match_i.kdaB[1].toString(), match_i.kdaB[1].toString(), match_i.kdaB[2].toString()));
    row2.appendChild(appendItems(match_i.buildB));

    if (match_i.win === match_i.userB) {
        row2.classList.add("victory-bg");
    } else {
        row2.classList.add("defeat-bg");
    }
    
    row1.insertAdjacentElement("afterend", row2);
}


function addGameDescription(game){
    updateResult()
    const row = document.createElement('div');
    row.classList.add('row');

    const gameNmae = document.createElement('div');
    gameNmae.classList.add('col');
    gameNmae.classList.add('text-align');
    gameNmae.classList.add('user-info-container');
    gameNmae.classList.add("align-items-center")
    gameNmae.innerHTML = "<h5>Name: " + game.match_name + "</h5>"
    row.appendChild(gameNmae);

    const reporter = document.createElement('div');
    reporter.classList.add('col');
    reporter.classList.add('text-align');
    reporter.classList.add('user-info-container');
    reporter.classList.add("align-items-center")
    reporter.innerHTML = "<h5>Winner: " + userLibrary.filter((user) => user._id === game.win)[0].username + "</h5>"
    row.appendChild(reporter);

    const time = document.createElement('div');
    time.classList.add('col');
    time.classList.add('text-align');
    time.classList.add('flex-2');
    time.classList.add('user-info-container');
    time.classList.add("align-items-center")
    time.innerHTML = "<h5>Add time: " +(new Date(game.add_time)).toLocaleString() + "</h5>"
    row.appendChild(time);

    const banContainer = document.createElement('div');
    banContainer.classList.add('user-info-container');
    banContainer.classList.add('col');
    const ban = document.createElement('button');
    ban.classList.add('btn');
    ban.classList.add('banBtn');
    ban.classList.add('btn-action');
    ban.innerHTML = 'Delete Game';
    banContainer.appendChild(ban);
    row.appendChild(banContainer)
    return row;
}

function appendItem(item){
    var itemImg = document.createElement("img");
    itemImg.src = item;
    itemImg.classList.add("img-fluid");
    itemImg.classList.add("img-item");
    return itemImg;
}

function appendItems(items){
    var itemsCon = document.createElement("div");
    itemsCon.classList.add("col");
    itemsCon.classList.add("d-flex");
    itemsCon.classList.add("align-items-center");
    var firstRow = document.createElement("div");
    var rowOne = document.createElement("div");
    rowOne.classList.add("d-flex");
    rowOne.appendChild(appendItem("assets/images/items/i"+items[0]+".png"));
    rowOne.appendChild(appendItem("assets/images/items/i"+items[1]+".png"));
    rowOne.appendChild(appendItem("assets/images/items/i"+items[2]+".png"));
    firstRow.appendChild(rowOne);

    var rowTwo = document.createElement("div");
    rowTwo.classList.add("d-flex");
    rowTwo.appendChild(appendItem("assets/images/items/i"+items[3]+".png"));
    rowTwo.appendChild(appendItem("assets/images/items/i"+items[4]+".png"));
    rowTwo.appendChild(appendItem("assets/images/items/i"+items[5]+".png"));
    firstRow.appendChild(rowTwo);
    itemsCon.appendChild(firstRow);
    return itemsCon;
}

function appendChamp(champion, runes, summoners){
    var championCon = document.createElement("div");
    championCon.classList.add("col");

    var championRow = document.createElement("div");
    championRow.classList.add("row");

    var championImgCon = document.createElement("div");
    championImgCon.classList.add("col");
    championImgCon.classList.add("d-flex");
    championImgCon.classList.add("align-items-center");

    var championImg = document.createElement("img");
    championImg.src = "assets/images/champions/c"+champion+".webp";
    championImg.classList.add("img-fluid");
    championImg.classList.add("img-champ");

    championImgCon.appendChild(championImg);
    championRow.appendChild(championImgCon);

    var srCon = document.createElement("div");
    srCon.classList.add("col");
    srCon.classList.add("d-flex");
    srCon.classList.add("align-items-center");

    var sCon = document.createElement("div");

    var s1img = document.createElement("img");
    s1img.src = "assets/images/summoners/summoner"+summoners[0]+".png";
    s1img.classList.add("img-fluid");
    s1img.classList.add("img-sumon");

    var s2img = document.createElement("img");
    s2img.src = "assets/images/summoners/summoner"+summoners[1]+".png";
    s2img.classList.add("img-fluid");
    s2img.classList.add("img-sumon");

    sCon.appendChild(s1img);
    sCon.appendChild(s2img);
    srCon.appendChild(sCon);

    var rCon = document.createElement("div");

    var r1img = document.createElement("img");
    r1img.src = "assets/images/runes/r"+runes[0]+".png";
    r1img.classList.add("img-fluid");
    r1img.classList.add("img-rune");

    var r2img = document.createElement("img");
    r2img.src = "assets/images/runes/r"+runes[1]+".png";
    r2img.classList.add("img-fluid");
    r2img.classList.add("img-rune");

    rCon.appendChild(r1img);
    rCon.appendChild(r2img);
    srCon.appendChild(rCon);
    championRow.appendChild(srCon);
    championCon.appendChild(championRow);

    return championCon;
}

function appendKDA(kill, death, assists){
    var kdaCon = document.createElement("div");
    kdaCon.classList.add("col");
    kdaCon.classList.add("text-center");
    kdaCon.classList.add("align-items-center");

    var kdas = document.createElement("div");
    kdas.classList.add("id", "kda-s");
    kdas.innerHTML = kill.concat("/", death).concat("/", assists);
    kdaCon.appendChild(kdas);

    var kdaa = document.createElement("div");
    kdaa.setAttribute("id", "kda-a");
    kdaa.classList.add("d-flex");
    kdaa.classList.add("justify-content-center");
    var ratioText = document.createElement("h5");
    var ratio = ((parseInt(kill) + parseInt(assists))/parseInt(death));
    ratio = Math.round(ratio * 100) / 100;
    ratioText.innerHTML = ratio.toString().concat(":1");
    if (parseInt(death)===0) {
        ratioText.innerHTML = "Perfect:1"
    }
    var greyText = document.createElement("h5");
    greyText.classList.add("grey-text");
    greyText.innerHTML = "&nbsp KDA";

    kdaa.appendChild(ratioText);
    kdaa.appendChild(greyText);

    kdaCon.appendChild(kdaa);
    return kdaCon;
}