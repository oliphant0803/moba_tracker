window.onload = init;
    function init(){
        //hard coded current user
        document.getElementById("usernameInput").value = "User 2";
        document.getElementById("quoteInput").value = "Quote random";
        displayGames();
        displayPosts();
  }


function saveAsFav(){
    if (document.getElementById("star").classList.contains("saved")){
        document.getElementById("star").classList.remove("saved");
    }else{
        document.getElementById("star").classList.add("saved");
    }
}

function selectReport(){
    if(document.getElementById("report-reason").value=="reason2"){
        document.getElementById("details").style.display = "block";
        document.getElementById("report-detail-post").style.display = "block";
    }else{
        document.getElementById("details").style.display = "none";
        document.getElementById("report-detail-post").style.display = "none";
    }
}

function displayPosts(){
    var selectCon = document.getElementById("report-detail-post");
    for(let i=0; i<posts.length; i++){
        var selectOption = document.createElement("option");
        selectOption.textContent = "post #"+posts[i];
        selectOption.value = posts[i];
        selectCon.add(selectOption);
    }
}

function reportSend(){
    var reason = document.getElementById("report-reason").value;
    var detail = '';
    if(document.getElementById("report-reason").value=="reason2"){
        detail = document.getElementById("report-detail-post").value;
    }
    console.log(reason + ", " + detail);
    //send to api in phase 2
}
//hardcoded posts id by current user
posts = [2];
//hard coded match data
const match1 = 
    {   
        gameId: "6",
        winLoss: "loss",
        champ: "../assets/images/login3.png",
        r1url: "../assets/images/runes/r3.png",
        r2url: "../assets/images/runes/r2.png",
        s1url: "../assets/images/summoners/flash.png",
        s2url: "../assets/images/summoners/heal.png",
        items:["../assets/images/items/i1.png", "../assets/images/items/i1.png", "../assets/images/items/i1.png", "../assets/images/items/i1.png", "../assets/images/items/i1.png", "../assets/images/items/i1.png"],
        kill: "1",
        death: "2",
        assists: "9",
        teammateIds: []
    };

const match2 = 
{   
    gameId: "7",
    winLoss: "win",
    champ: "../assets/images/login3.png",
    r1url: "../assets/images/runes/r5.png",
    r2url: "../assets/images/runes/r3.png",
    s1url: "../assets/images/summoners/flash.png",
    s2url: "../assets/images/summoners/heal.png",
    items:["../assets/images/items/i1.png", "../assets/images/items/i1.png", "../assets/images/items/i1.png", "../assets/images/items/i1.png", "../assets/images/items/i1.png", "../assets/images/items/i1.png"],
    kill: "7",
    death: "6",
    assists: "2",
    teammateIds: []
};

const match3 = 
{   
    gameId: "8",
    winLoss: "loss",
    champ: "../assets/images/login3.png",
    r1url: "../assets/images/runes/r5.png",
    r2url: "../assets/images/runes/r4.png",
    s1url: "../assets/images/summoners/ghost.png",
    s2url: "../assets/images/summoners/smite.png",
    items:["../assets/images/items/i1.png", "../assets/images/items/i1.png", "../assets/images/items/i1.png", "../assets/images/items/i1.png", "../assets/images/items/i1.png", "../assets/images/items/i1.png"],
    kill: "3",
    death: "4",
    assists: "1",
    teammateIds: []
};

//hard coded match history
const matchHis = [
    match1,
    match2,
    match3
];

function displayGames(){
    for(let i = 0; i<matchHis.length; i++){
        displayOneGame(matchHis[i]);
    }
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
    matchContainer.appendChild(appendCollapse(match1.teammateIds, match_i.gameId));
    // matchContainer.appendChild(displayCap( match_i.gameId));
    document.getElementById("history").appendChild(matchContainer);
}

function appendCollapse(teammates, gid){
    const gameid = "collapseGame".concat(gid);
    var collapseDiv = document.createElement("div");
    collapseDiv.classList.add("collapse");
    collapseDiv.setAttribute("id", gameid);
    console.log(gameid);
    var detailCon = document.createElement("div");
    detailCon.classList.add("card");
    detailCon.classList.add("card-body");
    detailCon.innerHTML = "Game Details for ".concat(gid);
    collapseDiv.appendChild(detailCon);
    return collapseDiv;
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
    itemsCon.classList.add("col-6");
    itemsCon.classList.add("d-flex");
    itemsCon.classList.add("align-items-center");
    var firstRow = document.createElement("div");
    var rowOne = document.createElement("div");
    rowOne.classList.add("d-flex");
    rowOne.appendChild(appendItem(items[0]));
    rowOne.appendChild(appendItem(items[1]));
    rowOne.appendChild(appendItem(items[2]));
    firstRow.appendChild(rowOne);

    var rowTwo = document.createElement("div");
    rowTwo.classList.add("d-flex");
    rowTwo.appendChild(appendItem(items[3]));
    rowTwo.appendChild(appendItem(items[4]));
    rowTwo.appendChild(appendItem(items[5]));
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

    expandRow.appendChild(expandBtn);
    itemsCon.appendChild(expandRow);
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
    const ratio = ((parseInt(kill) + parseInt(assists))/parseInt(death)).toString();
    ratioText.innerHTML = ratio.concat(":1");
    var greyText = document.createElement("h5");
    greyText.classList.add("grey-text");
    greyText.innerHTML = "&nbsp KDA";

    kdaa.appendChild(ratioText);
    kdaa.appendChild(greyText);

    kdaCon.appendChild(kdaa);
    return kdaCon;
}