window.onload = init;
    function init(){
        computeTotalWinrate();
        computeGamePlayer();
        computeAverageKDA();
  }


var xValues = ["Champion 1", "Champion 2", "Champion 3", "Champion 4", "Champion 5"];
var yValues = [55, 49, 44, 24, 15];
var barColors = ["red", "green","blue","orange","brown"];

//hard coded games (same as in match history from userProfile.js)
//hard coded match data
const match1 = 
    {   
        gameId: "1",
        winLoss: "win",
        champ: "champ 1",
        rune1: "rune 1",
        rune2: "rune 2",
        sum1: "flash",
        sum2: "heal",
        kill: "5",
        death: "2",
        assists: "9"
    };

const match2 = 
{   
    gameId: "2",
    winLoss: "loss",
    champ: "champ 2",
    rune1: "rune 1",
    rune2: "rune 2",
    sum1: "flash",
    sum2: "smite",
    kill: "1",
    death: "5",
    assists: "3"
};

const match3 = 
{   
    gameId: "3",
    winLoss: "win",
    champ: "champ 4",
    rune1: "rune 1",
    rune2: "rune 2",
    sum1: "flash",
    sum2: "smite",
    kill: "4",
    death: "5",
    assists: "3"
};

const match4 = 
{   
    gameId: "4",
    winLoss: "loss",
    champ: "champ 1",
    rune1: "rune 1",
    rune2: "rune 2",
    sum1: "flash",
    sum2: "ghost",
    kill: "0",
    death: "5",
    assists: "4"
};

const match5 = 
{   
    gameId: "5",
    winLoss: "win",
    champ: "champ 3",
    rune1: "rune 1",
    rune2: "rune 2",
    sum1: "flash",
    sum2: "exhaust",
    kill: "9",
    death: "2",
    assists: "6"
};

const matchHis = [
    match1,
    match2,
    match3,
    match4,
    match5
];

function computeTotalWinrate(){
    const wins = matchHis.filter(match => match.winLoss == "win");
    document.getElementById("t-winrate").innerHTML = (wins.length)/(matchHis.length);
}

function computeGamePlayer(){
    document.getElementById("t-games").innerHTML = matchHis.length;
}

function computeAverageKDA(){
    var tkills = 0;
    var tdeaths = 0;
    var tassists = 0;
    for (let i = 0; i< matchHis.length; i++){
        tkills += parseInt(matchHis[i].kill);
        tdeaths += parseInt(matchHis[i].death);
        tassists += parseInt(matchHis[i].assists);
    }
    var kda = (tkills + tassists)/tdeaths;
    document.getElementById("t-kda").innerHTML = Math.round(kda * 100) / 100;
}

var championsX = [];
var championsY = [];
function computeChampionKDA(){
    
}