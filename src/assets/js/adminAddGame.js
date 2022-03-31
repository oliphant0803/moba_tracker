window.onload = init;
function init(){
    const submitForm = document.querySelector('.submit');
    submitForm.addEventListener('click', addNewGame);
    getUsers();
    loadHeader();
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
    const headerName = document.querySelector('.header-name');
    headerName.innerHTML = currentAdmin.username;
    const headerImgContainer = document.querySelector('.header-img-container');
    const imgProfile = document.querySelector('.img-profile');
    imgProfile.src = "../assets/images/login3.png";
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

//hard coded value for tag game id, champion, and posts
const currentAdmin = {
    username: "BestAdmin",
    password:'password',
    profilePic:'../assets/images/tiger1.png'
}

//the way we expect to get from json
var games = []

function addNewGame(e){
    e.preventDefault();
    let valid = document.getElementById('newGameForm').checkValidity();
    if(!valid) {
        alert('Invalid input. Please double check every field.');
    } else{
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
        kdaA.push(parseInt(document.querySelector('#assist0').value))
        kdaB.push(parseInt(document.querySelector('#assist1').value))
        kdaA.push(parseInt(document.querySelector('#death0').value))
        kdaB.push(parseInt(document.querySelector('#death1').value))
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
    console.log("try add match to db")
    console.log(JSON.stringify(match))

    const request = new Request(url, {
        method: 'post',
        body: JSON.stringify(match),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });

    fetch(request).catch((error) =>{
        log(error)
    })

}

