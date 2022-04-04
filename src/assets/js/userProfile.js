window.onload = init;
var currentUser;
fetch('/user')
.then((res) => { 
    if (res.status === 200) {
        return res.json() 
    } else {
        console.log('Could not get user')
    }                
})
.then((json) =>{
    currentUser = json.currentUser
    fetch('api/users/'+currentUser).then((res) => {
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
})
    async function init(){
        await new Promise(r => setTimeout(r, 1000));
        //hard coded current user
        loadCurrentUser()
        // document.getElementById("usernameInput").value = "User 1";
        // document.getElementById("quoteInput").value = "Hi";
        function getAllMatches(){

            const url = '/api/matches/player/' + currentUser;

            fetch(url)
            .then((res) => { 
                if (res.status === 200) {
                    return res.json() 
                } else {
                    console.log('Could not get user match history')
                }                
            })
            .then((json) => { 
                
                json.forEach((match) => {
                    if(match.userA == currentUser){
                        let match_i = {   };
                        match_i.gameId = match.match_name;
                        match_i.champ = "assets/images/champions/c"+match.championA+".webp";
                        if(match.win == currentUser){
                            match_i.winLoss = "win"
                        }else{
                            match_i.winLoss = "loss"
                        }
                        match_i.r1url = "assets/images/runes/r"+match.runeA[0]+".png"
                        match_i.r2url = "assets/images/runes/r"+match.runeA[1]+".png"
                        match_i.s1url = "assets/images/summoners/summoner"+match.summonerA[0]+".png"
                        match_i.s2url =  "assets/images/summoners/summoner"+match.summonerA[1]+".png"
                        match_i.items = match.buildA
                        match_i.kill = match.kdaA[0].toString();
                        match_i.death = match.kdaA[1].toString();
                        match_i.assists = match.kdaA[2].toString();

                        let op = {};
                        op.gameId = match.match_name;
                        op.champ = "assets/images/champions/c"+match.championB+".webp";
                        if(match.win == currentUser){
                            op.winLoss = "loss"
                        }else{
                            op.winLoss = "win"
                        }
                        op.r1url = "assets/images/runes/r"+match.runeB[0]+".png"
                        op.r2url = "assets/images/runes/r"+match.runeB[1]+".png"
                        op.s1url = "assets/images/summoners/summoner"+match.summonerB[0]+".png"
                        op.s2url =  "assets/images/summoners/summoner"+match.summonerB[1]+".png"
                        op.items = match.buildB
                        op.kill = match.kdaB[0].toString();
                        op.death = match.kdaB[1].toString();
                        op.assists = match.kdaB[2].toString();

                        matchHis.push([match_i, op]);

                    }else{
                        let match_i = {   };
                        match_i.gameId = match.match_name;
                        match_i.champ = "assets/images/champions/c"+match.championB+".webp";;
                        if(match.win == currentUser){
                            match_i.winLoss = "win"
                        }else{
                            match_i.winLoss = "loss"
                        }
                        match_i.r1url = "assets/images/runes/r"+match.runeB[0]+".png"
                        match_i.r2url = "assets/images/runes/r"+match.runeB[1]+".png"
                        match_i.s1url = "assets/images/summoners/summoner"+match.summonerB[0]+".png"
                        match_i.s2url =  "assets/images/summoners/summoner"+match.summonerB[1]+".png"
                        match_i.items = match.buildB
                        match_i.kill = match.kdaB[0].toString();
                        match_i.death = match.kdaB[1].toString();
                        match_i.assists = match.kdaB[2].toString();
                       
                        
                        let op = {};
                        op.gameId = match.match_name;
                        op.champ = "assets/images/champions/c"+match.championA+".webp";
                        if(match.win == currentUser){
                            op.winLoss = "loss"
                        }else{
                            op.winLoss = "win"
                        }
                        op.r1url = "assets/images/runes/r"+match.runeA[0]+".png"
                        op.r2url = "assets/images/runes/r"+match.runeA[1]+".png"
                        op.s1url = "assets/images/summoners/summoner"+match.summonerA[0]+".png"
                        op.s2url =  "assets/images/summoners/summoner"+match.summonerA[1]+".png"
                        op.items = match.buildA
                        op.kill = match.kdaA[0].toString();
                        op.death = match.kdaA[1].toString();
                        op.assists = match.kdaA[2].toString();

                        matchHis.push([match_i, op]);
                    }

                });
                // console.log(matchHis);
                matchHis.forEach((match) => {
                    console.log(match)
                    displayOneGame(match[0], match[1]);
                })
            });

        }
        getAllMatches();

        displaySaved();

  }

function loadCurrentUser(){


    const url = '/api/users/' + currentUser;
    fetch(url)
    .then((res) => { 
        if (res.status === 200) {
           return res.json() 
       } else {
            console.log('Could not get user')
       }                
    })
    .then((json) => { 
        
        icon_path = json.icon;
        document.getElementById("usernameInput").value = json.username;
        document.getElementById("quoteInput").value = json.bio;
        document.getElementById("iconPic").src = icon_path;
    }).catch((error) => {
        console.log(error)
    })
}

let matchHis = [];



function displaySaved(){

    const url = '/api/users/' + currentUser;
    fetch(url)
    .then((res) => { 
        if (res.status === 200) {
           return res.json() 
       } else {
            console.log('Could not get user')
       }                
    })
    .then((json) => { 
        
        const favList = json.favs;
        if (favList.includes(currentUser)){
            document.getElementById("star").classList.add("saved");
        }else{
            document.getElementById("star").classList.remove("saved");
        }
    }).catch((error) => {
        console.log(error)
    })
    
}

function saveAsFav(){
    if (document.getElementById("star").classList.contains("saved")){
        document.getElementById("star").classList.remove("saved");
        
        //update in db. remove current user as fav list

        const url = '/api/users/' + currentUser;

        fetch(url)
        .then((res) => { 
            if (res.status === 200) {
            return res.json() 
        } else {
            console.log('Could not get user')
            }                
        })
        .then((json) => {
            var favList = json.favs;
            favList.splice(favList.indexOf(currentUser), 1); 
            let data = {
                username: json.username,
                email: json.email,
                password: json.password,
                bio: json.bio,
                favs: favList,
                recents: json.recents,
                match_history: json.match_history,
                icon: json.icon
            }
            const request = new Request(url, {
                method: 'put', 
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
            });
        
            fetch(request)
            .then(function(res) {
        
                if (res.status === 200) {
                    console.log('Profile Changes')
                    
                } else {    
                    console.log('Profile Unchanged')
                
                }
                
            }).catch((error) => {
                console.log(error)
            })
            
        }).catch((error) => {
            console.log(error)
        })
    }else{
        document.getElementById("star").classList.add("saved");


        const url = '/api/users/' + currentUser;

        fetch(url)
        .then((res) => { 
            if (res.status === 200) {
            return res.json() 
        } else {
            console.log('Could not get user')
            }                
        })
        .then((json) => {
            var favList = json.favs;
            favList.push(currentUser); 
            let data = {
                username: json.username,
                email: json.email,
                password: json.password,
                bio: json.bio,
                favs: favList,
                recents: json.recents,
                match_history: json.match_history,
                icon: json.icon
            }
            const request = new Request(url, {
                method: 'put', 
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
            });
        
            fetch(request)
            .then(function(res) {
        
                if (res.status === 200) {
                    console.log('Profile Changes')
                    
                } else {    
                    console.log('Profile Unchanged')
                
                }
                
            }).catch((error) => {
                console.log(error)
            })
            
        }).catch((error) => {
            console.log(error)
        })
    }
}

function editProfile(){
    if(document.getElementById("edit").innerHTML == "Edit Profile"){
        document.getElementById("usernameInput").removeAttribute("readonly");
        document.getElementById("quoteInput").removeAttribute("readonly");
        document.getElementById("edit").innerHTML = "Save";

    }else if(document.getElementById("edit").innerHTML == "Save"){
        document.getElementById("usernameInput").readOnly = true;
        document.getElementById("quoteInput").readOnly = true;
        document.getElementById("edit").innerHTML = "Edit Profile";
        //check for user name constraint
        fetch('/api/userByName/'+document.getElementById("usernameInput").value.split(" ").join(""))
        .then((res) => { 
            if(res.status == 204){
                return "nouser"
            }else if(res.status == 200){
                return res.json()
            } 
        })
        .then((json) => {
            if(json == "nouser"){
                const url = '/api/users/' + currentUser;

                fetch(url)
                .then((res) => { 
                    if (res.status === 200) {
                        return res.json() 
                    } else {
                        console.log('Could not get user')
                    }                
                })
                .then((json) => { 
                    //save current changes to db
                    let data = {
                        username: document.getElementById("usernameInput").value.split(" ").join(""),
                        email: json.email,
                        password: json.password,
                        bio: document.getElementById("quoteInput").value,
                        favs: json.favs,
                        recents: json.recents,
                        match_history: json.match_history,
                        icon: json.icon
                    }
                    const request = new Request(url, {
                        method: 'put', 
                        body: JSON.stringify(data),
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                    });
                
                    fetch(request)
                    .then(function(res) {
                
                        if (res.status === 200) {
                            console.log('Profile Changes')
                        
                        } else {    
                            console.log('Profile Unchanged')
                    
                        }
                        
                    }).catch((error) => {
                        console.log(error)
                    })
                
                }).catch((error) => {
                    console.log(error)
                })
            }else{
                const url = '/api/users/' + currentUser;
                fetch(url)
                .then((res) => { 
                    if (res.status === 200) {
                    return res.json() 
                } else {
                        console.log('Could not get user')
                }                
                })
                .then((json) => { 
                    if(document.getElementById("usernameInput").value.split(" ").join("") != json.username){
                        document.getElementById("usernameInput").value = json.username.split(" ").join("");
                        document.getElementById("quoteInput").value = json.bio;
                        alert("User name exists");
                    }
                    let data = {
                        username: json.username.split(" ").join(""),
                        email: json.email,
                        password: json.password,
                        bio: document.getElementById("quoteInput").value,
                        favs: json.favs,
                        recents: json.recents,
                        match_history: json.match_history,
                        icon: json.icon
                    }
                    const request = new Request(url, {
                        method: 'put', 
                        body: JSON.stringify(data),
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                    });
                
                    fetch(request)
                    .then(function(res) {
                
                        if (res.status === 200) {
                            console.log('Profile Changes')
                        
                        } else {    
                            console.log('Profile Unchanged')
                    
                        }
                        
                    }).catch((error) => {
                        console.log(error)
                    })
                }).catch((error) => {
                    console.log(error)
                })

            }
        });
                
    }
}

function startCapture(){
    if(document.getElementById("cap").innerHTML != "Discard"){
        document.getElementById("analysis").style.display = "block";
        document.getElementById("cap").innerHTML = "Discard";
        const caps = document.getElementsByClassName("cap-fav");
        for(var i = 0; i<caps.length; i++){
            caps[i].style.display = "block";
        }
    } else if(document.getElementById("cap").innerHTML == "Discard"){
        document.getElementById("analysis").style.display = "none";
        document.getElementById("cap").innerHTML = "Capture";
        const caps = document.getElementsByClassName("cap-fav");
        for(var i = 0; i<caps.length; i++){
            caps[i].style.display = "none";
        }
    }
}

function addToCap(id){
    const gameid = "favgame".concat(id);
    document.getElementById(gameid).firstChild.classList.add("saved");
    console.log(id);
}

function changeIcon(image){
    if (image.files && image.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e){
            var profielPic = document.getElementById("iconPic");
            profielPic.src = e.target.result;
            console.log(profielPic.src);
        };

        reader.readAsDataURL(image.files[0]);
    }
}

function dismissChange(){
    var profielPic = document.getElementById("iconPic");
    profielPic.src = icon_path;
}

function confirmChange(){

    icon_path = document.getElementById("iconPic").src;

    console.log(icon_path)
    //update to the db

    const url = '/api/users/' + currentUser;

    fetch(url)
    .then((res) => { 
        if (res.status === 200) {
           return res.json() 
       } else {
            console.log('Could not get user')
       }                
    })
    .then((json) => { 
        
        let data = {
            username: json.username,
            email: json.email,
            password: json.password,
            bio: json.bio,
            favs: json.favs,
            recents: json.recents,
            match_history: json.match_history,
            icon: icon_path
        }
        const request = new Request(url, {
            method: 'put', 
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        });
    
        fetch(request)
        .then(function(res) {
    
            if (res.status === 200) {
                // If student was added successfully, tell the user.
                console.log('Change Icon')
               
            } else {    
                console.log('Icon Unchanged')
         
            }
            
        }).catch((error) => {
            console.log(error)
        })
        
    }).catch((error) => {
        console.log(error)
    })

}

function displayCap(id){
    const gameid = "favgame".concat(id);
    var favBtn = document.createElement("button");
    favBtn.onclick = function(){addToCap(id)};
    favBtn.classList.add("cap-fav");
    favBtn.setAttribute("id", gameid);
    var star = document.createElement("i");
    star.classList.add("fa");
    star.classList.add("fa-star");
    favBtn.appendChild(star);
    return favBtn;
}

function displayOneGame(match_i, op){
    var  matchContainer = document.createElement("div");
    matchContainer.classList.add("match-container"); 
    if(match_i.winLoss == "win"){
        matchContainer.classList.add("victory-bg");
    } else if(match_i.winLoss == "loss"){
        matchContainer.classList.add("defeat-bg");
    }

    var rowCol4 = document.createElement("div");
    rowCol4.classList.add("row");
    rowCol4.classList.add("row-col-4");
    
    rowCol4.appendChild(appendChamp(match_i));
    rowCol4.appendChild(appendKDA(match_i.kill, match_i.death, match_i.assists));
    rowCol4.appendChild(appendItems(match_i.items, match_i.winLoss, match_i.gameId, true));
    rowCol4.appendChild(displayCap( match_i.gameId));

    matchContainer.appendChild(rowCol4);
    matchContainer.appendChild(appendCollapse(match_i.gameId, op));
    // matchContainer.appendChild(displayCap( match_i.gameId));
    document.getElementById("history").appendChild(matchContainer);
}

function appendCollapse(gid, op){
    const gameid = "collapseGame".concat(gid);
    var collapseDiv = document.createElement("div");
    collapseDiv.classList.add("collapse");
    collapseDiv.setAttribute("id", gameid);
    console.log(gameid);
    var detailCon = document.createElement("div");
    detailCon.classList.add("card");
    detailCon.classList.add("card-body");
    detailCon.innerHTML = "Game Details for ".concat(gid);
    detailCon.appendChild(detailGame(op));
    collapseDiv.appendChild(detailCon);
    return collapseDiv;
}

function detailGame(match_i){
    var  matchContainer = document.createElement("div");
    matchContainer.classList.add("match-container"); 
    if(match_i.winLoss == "win"){
        matchContainer.classList.add("victory-bg");
    } else if(match_i.winLoss == "loss"){
        matchContainer.classList.add("defeat-bg");
    }

    var rowCol4 = document.createElement("div");
    rowCol4.classList.add("row");
    rowCol4.classList.add("row-col-4");
    
    rowCol4.appendChild(appendChamp(match_i));
    rowCol4.appendChild(appendKDA(match_i.kill, match_i.death, match_i.assists));
    rowCol4.appendChild(appendItems(match_i.items, match_i.winLoss, match_i.gameId, false));
    rowCol4.appendChild(displayCap( match_i.gameId));

    matchContainer.appendChild(rowCol4);
    return matchContainer;
    
}

function appendItem(item){
    var itemImg = document.createElement("img");
    itemImg.src = item;
    itemImg.classList.add("img-fluid");
    itemImg.classList.add("img-item");
    return itemImg;
}

function appendItems(items, wl, id, isChild){
    var itemsCon = document.createElement("div");
    itemsCon.classList.add("col-6");
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

    var expandRow = document.createElement("div");
    var expandBtn = document.createElement("button");
    expandBtn.classList.add("btn");
    if(wl == "win"){
        expandBtn.classList.add("btn-victory");
    }else if(wl == "loss"){
        expandBtn.classList.add("btn-loss");
    }
    const gid = "#collapseGame".concat(id);
    expandBtn.setAttribute("data-toggle", "collapse");
    expandBtn.setAttribute("data-target", gid);
    expandBtn.innerHTML = "+";
    expandRow.classList.add("vl-container");
    expandRow.appendChild(expandBtn);
    if(isChild){
        itemsCon.appendChild(expandRow);
    }
    return itemsCon;
}

function appendChamp(match_i){
    var championCon = document.createElement("div");
    championCon.classList.add("col");

    var championRow = document.createElement("div");
    championRow.classList.add("row");

    var championImgCon = document.createElement("div");
    championImgCon.classList.add("col");
    championImgCon.classList.add("d-flex");
    championImgCon.classList.add("align-items-center");

    var championImg = document.createElement("img");
    championImg.src = match_i.champ;
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
    s1img.src = match_i.s1url;
    s1img.classList.add("img-fluid");
    s1img.classList.add("img-sumon");

    var s2img = document.createElement("img");
    s2img.src = match_i.s2url;
    s2img.classList.add("img-fluid");
    s2img.classList.add("img-sumon");

    sCon.appendChild(s1img);
    sCon.appendChild(s2img);
    srCon.appendChild(sCon);

    var rCon = document.createElement("div");

    var r1img = document.createElement("img");
    r1img.src = match_i.r1url;
    r1img.classList.add("img-fluid");
    r1img.classList.add("img-rune");

    var r2img = document.createElement("img");
    r2img.src = match_i.r2url;
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
    kdas.setAttribute("id", "kda-s");
    var kdaText = document.createElement("h5");
    kdaText.innerHTML = kill.concat("/", death).concat("/", assists);
    kdas.appendChild(kdaText);
    kdaCon.appendChild(kdas);

    var kdaa = document.createElement("div");
    kdaa.setAttribute("id", "kda-a");
    kdaa.classList.add("d-flex");
    kdaa.classList.add("justify-content-center");
    var ratioText = document.createElement("h5");
    if(parseInt(death) == 0){
        ratioText.innerHTML = "Perfect".concat(":1");
    }else{
        var ratio = ((parseInt(kill) + parseInt(assists))/parseInt(death));
        ratio = Math.round(ratio * 100) / 100;
        ratioText.innerHTML = ratio.toString().concat(":1");
    }
    var greyText = document.createElement("h5");
    greyText.classList.add("grey-text");
    greyText.innerHTML = "&nbsp KDA";

    kdaa.appendChild(ratioText);
    kdaa.appendChild(greyText);

    kdaCon.appendChild(kdaa);
    return kdaCon;
}