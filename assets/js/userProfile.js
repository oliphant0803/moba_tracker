function saveAsFav(){
    if (document.getElementById("star").classList.contains("saved")){
        document.getElementById("star").classList.remove("saved");
    }else{
        document.getElementById("star").classList.add("saved");
    }
}

function editProfile(){
    if(document.getElementById("edit").innerHTML == "Edit"){
        document.getElementById("usernameInput").removeAttribute("readonly");
        document.getElementById("quoteInput").removeAttribute("readonly");
        document.getElementById("edit").innerHTML = "Save";
    }else if(document.getElementById("edit").innerHTML == "Save"){
        document.getElementById("usernameInput").readOnly = true;;
        document.getElementById("quoteInput").readOnly = true;;
        document.getElementById("edit").innerHTML = "Edit";
    }
}

function startCapture(){

}

//hard coded match data
const match1 = 
    {   
        gameId: 1,
        winLoss: "win",
        champ: "../assets/images/login3.png",
        r1url: "../assets/images/runes/r1.png",
        r2url: "../assets/images/runes/r2.png",
        s1url: "../assets/images/summoners/flash.png",
        s2url: "../assets/images/summoners/heal.png",
        items:["../assets/images/items/i1.png", "../assets/images/items/i1.png", "../assets/images/items/i1.png", "../assets/images/items/i1.png", "../assets/images/items/i1.png", "../assets/images/items/i1.png"],
        kill: 5,
        death: 2,
        assists: 9,
        teammateIds: []
    };

const match2 = 
{   
    gameId: 1,
    winLoss: "loss",
    champ: "../assets/images/login3.png",
    r1url: "../assets/images/runes/r1.png",
    r2url: "../assets/images/runes/r3.png",
    s1url: "../assets/images/summoners/flash.png",
    s2url: "../assets/images/summoners/smite.png",
    items:["../assets/images/items/i1.png", "../assets/images/items/i1.png", "../assets/images/items/i1.png", "../assets/images/items/i1.png", "../assets/images/items/i1.png", "../assets/images/items/i1.png"],
    kill: 0,
    death: 5,
    assists: 3,
    teammateIds: []
};

//hard coded match history
const matchHis = [
    match1,
    match2,
    match1,
    match1,
    match2
];