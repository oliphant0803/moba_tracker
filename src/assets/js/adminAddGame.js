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
        loadHeader();
    }).catch((error) => {
        console.log(error)
    })

}).catch(error => {
    console.log(error);
    // window.location.href="/login";
});

function init(){
    const submitForm = document.querySelector('.submit');
    submitForm.addEventListener('click', addNewGame);
    getUsers();
    setUpForm();
}

userLibrary = []

// Database related function
function getUsers(){
    const urlUser = 'api/users';
    
    fetch(urlUser).then((res) => {
        if (res.status === 200) {
            return res.json();
        }
        else{
            alert('Could not get users');
        }
    }).then((json) => {
        userLibrary = json.users
    }).catch((error) => {
        console.log(error)
    })
}

function loadHeader(){
    const headerAnnounce = document.querySelector('.header-announcement');
    headerAnnounce.innerHTML = "Welcome, " + currentAdmin.username + ". ";
}

function setUpForm(){
    const championsQ = document.querySelector('.champions').children;
    const runesQ = document.querySelector('.runes').children;
    const summonersQ = document.querySelector('.summoners').children;
    const itemsQ = document.querySelector('.items').children;
    for (var i = 0; i <= 1; i++) {
        for (var j = 20; j >= 1; j--) {
            if (j!== 20 && j%5===0) {
                championsQ[i].appendChild(document.createElement("br"))
            }
            let input = document.createElement("input");
            input.type = "radio"
            input.name = "champion" + i.toString()
            input.id = "champion" + j.toString() + "-" + i.toString()
            championsQ[i].appendChild(input)

            let label = document.createElement("label");

            let img = document.createElement("img");
            img.src = "../assets/images/champions/c" + j.toString() + ".webp"
            img.classList.add("img-profile")
            label.appendChild(img)

            championsQ[i].appendChild(label)
        }
        for (var j = 11; j >= 1; j--) {
            if (j==5) {
                runesQ[i].appendChild(document.createElement("br"))
            }
            let input = document.createElement("input");
            input.type = "checkbox"
            input.id = "rune" + j.toString() + "-" + i.toString()
            runesQ[i].appendChild(input)

            let label = document.createElement("label");

            let img = document.createElement("img");
            img.src = "../assets/images/runes/r" + j.toString() + ".png"
            img.classList.add("img-profile")
            label.appendChild(img)

            runesQ[i].appendChild(label)
        }
        for (var j = 8; j >= 1; j--) {
            if (j==4) {
                summonersQ[i].appendChild(document.createElement("br"))
            }
            let input = document.createElement("input");
            input.type = "checkbox"
            input.id = "summoner" + j.toString() + "-" + i.toString()
            summonersQ[i].appendChild(input)

            let label = document.createElement("label");

            let img = document.createElement("img");
            img.src = "../assets/images/summoners/summoner" + j.toString() + ".png"
            img.classList.add("img-profile")
            label.appendChild(img)
            summonersQ[i].appendChild(label)
        }
        for (var j = 35; j >= 1; j--) {
            if (j!== 35 && j%5===0) {
                itemsQ[i].appendChild(document.createElement("br"))
            }
            let input = document.createElement("input");
            input.type = "checkbox"
            input.id = "item" + j.toString() + "-" + i.toString()
            itemsQ[i].appendChild(input)

            let label = document.createElement("label");

            let img = document.createElement("img");
            img.src = "../assets/images/items/i" + j.toString() + ".png"
            img.classList.add("img-profile")
            label.appendChild(img)
            itemsQ[i].appendChild(label)
        }
    }
}

function addNewGame(e){
    e.preventDefault();
    getUsers()
    let valid = document.getElementById('newGameForm').checkValidity();
    if(!valid) {
        alert('Invalid input. Please double check every field.');
    } else
    {
        const matchName = document.getElementById('gameName').value

        const username0 = document.getElementById('username0').value
        const username1 = document.getElementById('username1').value
        if (userLibrary.filter((user) => user.username === username0).length === 0) {
            alert("User A does not exist!")
            return;
        }
        if (userLibrary.filter((user) => user.username === username1).length === 0) {
            alert("User B does not exist!")
            return;
        }
        if (username0 === username1) {
            alert("Users cannot be the same!")
            return;
        }
        const user0 = userLibrary.filter((user) => user.username === username0)[0]._id
        const user1 = userLibrary.filter((user) => user.username === username1)[0]._id
        champions = []
        runes = []
        runes.push([])
        runes.push([])
        summoners = []
        summoners.push([])
        summoners.push([])
        items = []
        items.push([])
        items.push([])
        for (let i = 0; i <=1; i++) {
            // champions
            let count = 0
            for (let j = 20; j >= 1; j--) {
                let name = "champion" + j.toString() + "-" + i.toString()
                if (document.getElementById(name).checked) {
                    count++
                    champions.push(j.toString())
                }
            }
            if (count != 1) {
                alert("There must be 1 champion for each user!")
                return;
            }
            // runes
            count = 0
            for (let j = 11; j >= 1; j--) {
                let name = "rune" + j.toString() + "-" + i.toString()
                if (document.getElementById(name).checked) {
                    count++
                    runes[i].push(j.toString())
                }
            }
            if (count != 2) {
                alert("There must be 2 runes for each user!")
                return;
            }
            // summoner
            count = 0
            for (let j = 8; j >= 1; j--) {
                let name = "summoner" + j.toString() + "-" + i.toString()
                if (document.getElementById(name).checked) {
                    count++
                    summoners[i].push(j.toString())
                }
            }
            if (count != 2) {
                alert("There must be 2 summoners for each user!")
                return;
            }
            // items
            count = 0
            for (let j = 35; j >= 1; j--) {
                let name = "item" + j.toString() + "-" + i.toString()
                if (document.getElementById(name).checked) {
                    count++
                    items[i].push(j.toString())
                }
            }
            if (count != 6) {
                alert("There must be 6 items for each user!")
                return;
            }
        }
        kdaA = []
        kdaB = []
        kdaA.push(parseInt(document.querySelector('#kill0').value))
        kdaB.push(parseInt(document.querySelector('#kill1').value))
        kdaA.push(parseInt(document.querySelector('#death0').value))
        kdaB.push(parseInt(document.querySelector('#death1').value))
        kdaA.push(parseInt(document.querySelector('#assist0').value))
        kdaB.push(parseInt(document.querySelector('#assist1').value))
        win = user0
        if (document.getElementById("win0").checked) {
            win = user0
        } else if (document.getElementById("win1").checked) {
            win = user1
        } else {
            alert("There must be a winner!")
            return;
        }
        const match = {
            match_name: matchName,
            add_time: new Date(),
            userA:user0,
            userB:user1,
            championA: champions[0],
            championB: champions[1],
            win: win,
            kdaA: kdaA,
            kdaB: kdaB,
            runeA: runes[0],
            runeB: runes[1],
            summonerA: summoners[0],
            summonerB: summoners[1],
            buildA: items[0],
            buildB: items[1]
        }
        if (window.confirm('Is the form filled out correctly? Press OK to proceed.')) {
            addMatch(match)
        }
    }
}

function addMatch(match){
    const url = '/api/matches';

    const request = new Request(url, {
        method: 'post',
        body: JSON.stringify(match),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });

    fetch(request).then((res) => {
        if (res.status === 200) {
            alert("Game added successfully!")
            displayGame(match)
        } else if (res.status === 400){
            alert("Duplicate game name. Please try again.")
        } else {
            alert("Your request cannot be completed. Please try again.")
        } 
    }).catch((error) => {
        console.log(error)
    })
}

function displayGame(match){
    let section = document.getElementById("display-section")
    section.innerHTML = ""
    displayOneGame(match)
}

function displayOneGame(match_i){
    var matchContainer = document.createElement("div");
    matchContainer.classList.add("container"); 
    
    let title = document.createElement("h3");
    title.innerHTML = 'Added successfully at ' + (new Date(match_i.add_time)).toLocaleString()
    let gameName = document.createElement("h4");
    gameName.innerHTML = 'Game Name: ' + match_i.match_name
    matchContainer.appendChild(title)
    matchContainer.appendChild(gameName)

    var row1 = document.createElement("div");
    row1.classList.add("row");
    row1.classList.add("row-col-4");
    if (match_i.win === match_i.userA) {
        row1.classList.add("victory-bg");
    } else {
        row1.classList.add("defeat-bg");
    }

    var username0 = document.createElement("div");
    username0.classList.add("col");
    username0.classList.add("d-flex");
    username0.classList.add("align-items-center");
    username0.innerHTML = "<h4>" + userLibrary.filter((user) => user._id === match_i.userA)[0].username + "</h4>"

    row1.appendChild(username0)
    
    row1.appendChild(appendChamp(match_i.championA, match_i.runeA, match_i.summonerA));
    row1.appendChild(appendKDA(match_i.kdaA[0].toString(), match_i.kdaA[1].toString(), match_i.kdaA[2].toString()));
    row1.appendChild(appendItems(match_i.buildA));

    matchContainer.appendChild(row1);

    var row2 = document.createElement("div");
    row2.classList.add("row");
    row2.classList.add("row-col-4");

    var username1 = document.createElement("div");
    username1.classList.add("col");
    username1.classList.add("d-flex");
    username1.classList.add("align-items-center");
    username1.innerHTML = "<h4>" + userLibrary.filter((user) => user._id === match_i.userB)[0].username+ "</h4>"
    row2.appendChild(username1)
    
    row2.appendChild(appendChamp(match_i.championB, match_i.runeB, match_i.summonerB));
    row2.appendChild(appendKDA(match_i.kdaB[1].toString(), match_i.kdaB[1].toString(), match_i.kdaB[2].toString()));
    row2.appendChild(appendItems(match_i.buildB));

    if (match_i.win === match_i.userB) {
        row2.classList.add("victory-bg");
    } else {
        row2.classList.add("defeat-bg");
    }
    
    matchContainer.appendChild(row2);
    document.getElementById("display-section").appendChild(matchContainer);
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
    kdaCon.classList.add("kda-container");

    var kdas = document.createElement("div");
    kdas.classList.add("id", "kda-s");
    var kdaText = document.createElement("h5");
    kdaText.innerHTML = kill.concat("/", death).concat("/", assists);
    kdas.appendChild(kdaText);
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
