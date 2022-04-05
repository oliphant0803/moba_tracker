window.onload = init;
let matchHis = [];
let searchedUser;
var currentAdmin;
fetch('/admin').then((res) => { 
    if (res.status === 200) {
        return res.json() 
    }    
}).then((json) =>{
    currentAdmin = json.currentAdmin
    fetch('../api/admins').then((res) => {
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


    async function init(){
        await new Promise(r => setTimeout(r, 1000));
        searchedUser= getParams();

        loadSearchedUser()

        function getAllMatches(){

            const url = '/api/matches/player/' + searchedUser;

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
                    if(match.userA == searchedUser){
                        let match_i = {   };
                        match_i.gameId = match.match_name;
                        match_i.champ = "../assets/images/champions/c"+match.championA+".webp";
                        if(match.win == searchedUser){
                            match_i.winLoss = "win"
                        }else{
                            match_i.winLoss = "loss"
                        }
                        match_i.r1url = "../assets/images/runes/r"+match.runeA[0]+".png"
                        match_i.r2url = "../assets/images/runes/r"+match.runeA[1]+".png"
                        match_i.s1url = "../assets/images/summoners/summoner"+match.summonerA[0]+".png"
                        match_i.s2url =  "../assets/images/summoners/summoner"+match.summonerA[1]+".png"
                        match_i.items = match.buildA
                        match_i.kill = match.kdaA[0].toString();
                        match_i.death = match.kdaA[1].toString();
                        match_i.assists = match.kdaA[2].toString();

                        matchHis.push(match_i);
                    }else{
                        let match_i = {   };
                        match_i.gameId = match.match_name;
                        match_i.champ = "../assets/images/champions/c"+match.championB+".webp";
                        if(match.win == searchedUser){
                            match_i.winLoss = "win"
                        }else{
                            match_i.winLoss = "loss"
                        }
                        match_i.r1url = "../assets/images/runes/r"+match.runeB[0]+".png"
                        match_i.r2url = "../assets/images/runes/r"+match.runeB[1]+".png"
                        match_i.s1url = "../assets/images/summoners/summoner"+match.summonerB[0]+".png"
                        match_i.s2url =  "../assets/images/summoners/summoner"+match.summonerB[1]+".png"
                        match_i.items = match.buildB
                        match_i.kill = match.kdaB[0].toString();
                        match_i.death = match.kdaB[1].toString();
                        match_i.assists = match.kdaB[2].toString();
                        matchHis.push(match_i);
                        
                    }

                });
                console.log(matchHis);
                matchHis.forEach((match) => {
                    console.log(match);
                    displayGameSelect(match)
                    displayOneGame(match);
                })
            });

        }
        getAllMatches();
}

function getParams() {
    var idx = document.URL.indexOf('?');
    var params = new Array();
    if (idx != -1) {
    var pairs = document.URL.substring(idx+1, document.URL.length).split('&');
    for (var i=0; i<pairs.length; i++) {
        nameVal = pairs[i].split('=');
        params[nameVal[0]] = nameVal[1];
       }
    }
    return unescape(params["id"]);
}



function loadSearchedUser(){
    

    const url = '/api/users/'+searchedUser;
    fetch(url)
    .then((res) => { 
        if (res.status === 200) {
           return res.json() 
       } else {
            console.log('Could not get user')
       }                
    })
    .then((json) => { 
        
        document.getElementById("usernameInput").value = json.username;
        document.getElementById("quoteInput").value = json.bio;
        document.getElementById("iconPic").src = json.icon;
    }).catch((error) => {
        console.log(error)
    })
}

function displayPost(post, isParent){
    var selectCon = document.getElementById("report-detail-post");
    if(isParent){
        var selectOption = document.createElement("option");
        selectOption.textContent = "post "+post;
        selectOption.value = post;
        selectCon.add(selectOption);
    }else{
        var selectOption = document.createElement("option");
        selectOption.textContent = "comment for "+post;
        selectOption.value = post;
        selectCon.add(selectOption);
    }
    
    
}

function displayGameSelect(match){
    var selectCon = document.getElementById("report-detail-game");
    var selectOption = document.createElement("option");
    selectOption.textContent = match.gameId;
    selectOption.value = match.gameId;
    selectCon.add(selectOption);
    
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

function displayOneGame(match_i){
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
    rowCol4.appendChild(appendItems(match_i.items, match_i.winLoss, match_i.gameId));
    rowCol4.appendChild(displayCap( match_i.gameId));

    matchContainer.appendChild(rowCol4);
    document.getElementById("history").appendChild(matchContainer);
}

function appendItem(item){
    var itemImg = document.createElement("img");
    itemImg.src = item;
    itemImg.classList.add("img-fluid");
    itemImg.classList.add("img-item");
    return itemImg;
}

function appendItems(items, wl, id){
    var itemsCon = document.createElement("div");
    itemsCon.classList.add("col-5");
    itemsCon.classList.add("d-flex");
    itemsCon.classList.add("align-items-center");
    var firstRow = document.createElement("div");
    var rowOne = document.createElement("div");
    rowOne.classList.add("d-flex");
    rowOne.appendChild(appendItem("../assets/images/items/i"+items[0]+".png"));
    rowOne.appendChild(appendItem("../assets/images/items/i"+items[1]+".png"));
    rowOne.appendChild(appendItem("../assets/images/items/i"+items[2]+".png"));
    firstRow.appendChild(rowOne);

    var rowTwo = document.createElement("div");
    rowTwo.classList.add("d-flex");
    rowTwo.appendChild(appendItem("../assets/images/items/i"+items[3]+".png"));
    rowTwo.appendChild(appendItem("../assets/images/items/i"+items[4]+".png"));
    rowTwo.appendChild(appendItem("../assets/images/items/i"+items[5]+".png"));
    firstRow.appendChild(rowTwo);
    itemsCon.appendChild(firstRow);

    // var expandRow = document.createElement("div");
    // var expandBtn = document.createElement("button");
    // // expandBtn.classList.add("btn");
    // if(wl == "win"){
    //     expandBtn.classList.add("btn-victory");
    // }else if(wl == "loss"){
    //     expandBtn.classList.add("btn-loss");
    // }
    // const gid = "#collapseGame".concat(id);
    // expandBtn.setAttribute("data-toggle", "collapse");
    // expandBtn.setAttribute("data-target", gid);
    // expandBtn.innerHTML = "+";
    // expandRow.classList.add("vl-container");
    // expandRow.appendChild(expandBtn);
    // itemsCon.appendChild(expandRow);
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