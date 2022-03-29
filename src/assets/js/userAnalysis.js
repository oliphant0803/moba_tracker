window.onload = init;
    function init(){
        computeTotalWinrate();
        computeGamePlayer();
        computeAverageKDA();
        displaySelect();
        updateN();
  }

//current n
var n = "all";
//display on select
function displaySelect(){
    var selectCon = document.getElementById("select-input-n");
    var selectOption = document.createElement("option");
    selectOption.textContent = "all";
    selectOption.value = "all";
    selectCon.add(selectOption);
    for(let i = 0; i<matchHis.length; i++){
        var selectOption = document.createElement("option");
        selectOption.textContent = i+1;
        selectOption.value = i+1;
        selectCon.add(selectOption);
    }
}

function resetCanvas(idcontainer, id){
    document.getElementById(id).remove();
    var canvas = document.createElement("canvas");
    canvas.setAttribute("id", id);
    document.getElementById(idcontainer).append(canvas);
}

function updateN(){
    resetCanvas("champBarContainer", "champBar");
    resetCanvas("cpieContainer", "champPie");
    resetCanvas("rpieContainer", "runePie");
    resetCanvas("spieContainer", "summonerPie");
    var barColors = randomizeColors();
    new Chart("champBar", {
        type: "bar",
        data: {
          labels: championsBar.championsX,
          datasets: [{
            backgroundColor: barColors,
            data: championsBar.championsY
          }]
        },
        options: {
          legend: {display: false},
          title: {
            display: true,
            text: "Champion Average KDA"
          }
        }
      });
    console.log(document.getElementById("select-input-n").value);
    n = document.getElementById("select-input-n").value;
    if(n == "all"){
        n = matchHis.length;
    }
    let champPie = updateChampPie(n);
    let runePie = updateRunePie(n);
    let sumPie = updateSummonerPie(n);
    new Chart("champPie", {
        type: "doughnut",
        data: {
          labels: champPie.recentChampionX,
          datasets: [{
            backgroundColor: barColors,
            data: champPie.recentChampionY
          }]
        },
        options: {
          title: {
            display: true,
            text: "Champion Respective Winrate on recent " + n + " games"
          }
        }
      });
      new Chart("runePie", {
        type: "doughnut",
        data: {
          labels: runePie.recentRuneX,
          datasets: [{
            backgroundColor: barColors,
            data: runePie.recentRuneY
          }]
        },
        options: {
          title: {
            display: true,
            text: "Rune Respective Winrate on recent " + n + " games"
          }
        }
      });
      new Chart("summonerPie", {
        type: "doughnut",
        data: {
          labels: sumPie.recentSumX,
          datasets: [{
            backgroundColor: barColors,
            data: sumPie.recentSumY
          }]
        },
        options: {
          title: {
            display: true,
            text: "Spell Respective Winrate on recent " + n + " games"
          }
        }
      });
}

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
    rune1: "rune 4",
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
    rune2: "rune 3",
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
    rune1: "rune 5",
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

//computed values for chart
var championsBar = computeChampionKDA();
console.log(championsBar.championsX);
console.log(championsBar.championsY);

function randomizeColors(){
    var barColors = [];
    for(let i = 0; i<matchHis.length*2; i++){
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        var color = "rgb(" + r + "," + g + "," + b + ")";
        barColors.push(color);
    }
    console.log(barColors);
    return barColors;
}

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

function computeChampionKDA(){
    var championsX = [];
    var championsY = [];
    var championsKill = [];
    var championsDeath = [];
    var championsAssists = [];
    for (let i=0; i<matchHis.length; i++){
        const curr_champ = matchHis[i].champ;
        if (!championsX.includes(curr_champ)){
            championsX.push(curr_champ);
            championsKill.push(0);
            championsDeath.push(0);
            championsAssists.push(0);
        }
        const j = championsX.indexOf(curr_champ);
        championsKill[j] += parseInt(matchHis[i].kill);
        championsDeath[j] += parseInt(matchHis[i].death);
        championsAssists[j] += parseInt(matchHis[i].assists);
    }
    console.log(championsKill);
    console.log(championsDeath);
    console.log(championsAssists);
    for (let i=0; i<championsKill.length; i++){
        const kda = (championsKill[i] + championsAssists[i])/championsDeath[i];
        championsY.push(Math.round(kda * 100) / 100);
    }
    return {championsX, championsY}
}

function updateChampPie(n){
    var recentChampionX = [];
    var recentChampionGames = [];
    var recentChampionWins = [];
    var recentChampionY = [];
    for(let i=0; i<n; i++){
        const curr_champ = matchHis[i].champ;
        if (!recentChampionX.includes(curr_champ)){
            recentChampionX.push(curr_champ);
            recentChampionGames.push(0);
            recentChampionWins.push(0);
        }
        const j = recentChampionX.indexOf(curr_champ);
        recentChampionGames[j] += 1;
        if(matchHis[i].winLoss == "win"){
            recentChampionWins[j] += 1;
        }
    }
    for (let i=0; i<n; i++){
        const wr = recentChampionWins[i]/recentChampionGames[i];
        recentChampionY.push(Math.round(wr * 100) / 100);
    }
    return {recentChampionX, recentChampionY};
}

function updateHelper(arr1, arr2, arr3){
    for(let i=0; i<n; i++){
        const r1 = matchHis[i].rune1;
        const r2 = matchHis[i].rune2;
        if (!arr1.includes(r1)){
            arr1.push(r1);
            arr2.push(0);
            arr3.push(0);
        }
        var j = arr1.indexOf(r1);
        arr2[j] += 1;
        if(matchHis[i].winLoss == "win"){
            arr3[j] += 1;
        }
        if (!arr1.includes(r2)){
            arr1.push(r2);
            arr2.push(0);
            arr3.push(0);
        }
        var j = arr1.indexOf(r2);
        arr2[j] += 1;
        if(matchHis[i].winLoss == "win"){
            arr3[j] += 1;
        }
    }
    return {arr1, arr2, arr3};
}

function updateRunePie(n){
    const runes = updateHelper([], [], []);
    var recentRuneX = runes.arr1;
    var recentRuneGames = runes.arr2;
    var recentRuneWins = runes.arr3;
    var recentRuneY = [];
    for (let i=0; i<n; i++){
        const wr = recentRuneWins[i]/recentRuneGames[i];
        recentRuneY.push(Math.round(wr * 100) / 100);
    }
    return {recentRuneX, recentRuneY};
}

function updateSummonerPie(n){
    var recentSumX = [];
    var recentSumGames = [];
    var recentSumWins = [];
    var recentSumY = [];
    for(let i=0; i<n; i++){
        const s1 = matchHis[i].sum1;
        const s2 = matchHis[i].sum2;
        if (!recentSumX.includes(s1)){
            recentSumX.push(s1);
            recentSumGames.push(0);
            recentSumWins.push(0);
        }
        var j = recentSumX.indexOf(s1);
        recentSumGames[j] += 1;
        if(matchHis[i].winLoss == "win"){
            recentSumWins[j] += 1;
        }
        if (!recentSumX.includes(s2)){
            recentSumX.push(s2);
            recentSumGames.push(0);
            recentSumWins.push(0);
        }
        var j = recentSumX.indexOf(s2);
        recentSumGames[j] += 1;
        if(matchHis[i].winLoss == "win"){
            recentSumWins[j] += 1;
        }
    }
    for (let i=0; i<n; i++){
        const wr = recentSumWins[i]/recentSumGames[i];
        recentSumY.push(Math.round(wr * 100) / 100);
    }
    return {recentSumX, recentSumY};
}