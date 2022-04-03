window.onload = init;

let matchHis=[];
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
        document.getElementById("select-input-n").onchange = function(){updateN(matchHis)}
        document.getElementById("select-input-kda").onchange = function(){updateN(matchHis)}
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
                        match_i.champ = "champion"+match.championA;
                        if(match.win == currentUser){
                            match_i.winLoss = "win"
                        }else{
                            match_i.winLoss = "loss"
                        }
                        match_i.rune1 = "rune"+match.runeA[0]
                        match_i.rune2 = "rune"+match.runeA[1]
                        match_i.sum1 = "summoner"+match.summonerA[0]
                        match_i.sum2 =  "summoner"+match.summonerA[1]
                        match_i.kill = match.kdaA[0].toString();
                        match_i.death = match.kdaA[1].toString();
                        match_i.assists = match.kdaA[2].toString();

                        matchHis.push(match_i);
                    }else{
                        let match_i = {   };
                        match_i.gameId = match.match_name;
                        match_i.champ = "champion"+match.championB;
                        if(match.win == currentUser){
                            match_i.winLoss = "win"
                        }else{
                            match_i.winLoss = "loss"
                        }
                        match_i.rune1 = "rune"+match.runeB[0]
                        match_i.rune2 = "rune"+match.runeB[1]
                        match_i.sum1 = "summoner"+match.summonerB[0]
                        match_i.sum2 =  "summoner"+match.summonerB[1]
                        match_i.items = match.buildB
                        match_i.kill = match.kdaB[0].toString();
                        match_i.death = match.kdaB[1].toString();
                        match_i.assists = match.kdaB[2].toString();
                        matchHis.push(match_i);
                        
                    }

                });
                console.log(matchHis);
                computeTotalWinrate(matchHis);
                computeGamePlayer(matchHis);
                computeAverageKDA(matchHis);
                displaySelect(matchHis);
                updateN(matchHis);
            });

        }
        getAllMatches();

  }

//current n
var n = "all";
//display on select
function displaySelect(matchHis){
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

function updateN(matchHis){

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
                match_i.champ = "champion"+match.championA;
                if(match.win == currentUser){
                    match_i.winLoss = "win"
                }else{
                    match_i.winLoss = "loss"
                }
                match_i.rune1 = "rune"+match.runeA[0]
                match_i.rune2 = "rune"+match.runeA[1]
                match_i.sum1 = "summoner"+match.summonerA[0]
                match_i.sum2 =  "summoner"+match.summonerA[1]
                match_i.kill = match.kdaA[0].toString();
                match_i.death = match.kdaA[1].toString();
                match_i.assists = match.kdaA[2].toString();

                matchHis.push(match_i);
            }else{
                let match_i = {   };
                match_i.gameId = match.match_name;
                match_i.champ = "champion"+match.championB;
                if(match.win == currentUser){
                    match_i.winLoss = "win"
                }else{
                    match_i.winLoss = "loss"
                }
                match_i.rune1 = "rune"+match.runeB[0]
                match_i.rune2 = "rune"+match.runeB[1]
                match_i.sum1 = "summoner"+match.summonerB[0]
                match_i.sum2 =  "summoner"+match.summonerB[1]
                match_i.items = match.buildB
                match_i.kill = match.kdaB[0].toString();
                match_i.death = match.kdaB[1].toString();
                match_i.assists = match.kdaB[2].toString();
                matchHis.push(match_i);
                
            }

        });
        resetCanvas("champBarContainer", "champBar");
        resetCanvas("cpieContainer", "champPie");
        resetCanvas("rpieContainer", "runePie");
        resetCanvas("spieContainer", "summonerPie");
        var barColors = randomizeColors(matchHis);
        if(document.getElementById("select-input-kda").value == "death"){
            var championsBar = computeChampionDeath(matchHis);
        }else if(document.getElementById("select-input-kda").value == "kill"){
            var championsBar = computeChampionKills(matchHis);
        }else if(document.getElementById("select-input-kda").value == "assists"){
            var championsBar = computeChampionAssits(matchHis);
        }else{
            var championsBar = computeChampionKDA(matchHis);
        }
        //computed values for chart
        console.log(championsBar.championsX);
        console.log(championsBar.championsY);
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
        n = document.getElementById("select-input-n").value;
        if(n == "all"){
            n = matchHis.length;
        }
        let champPie = updateChampPie(n, matchHis);
        let runePie = updateRunePie(n, matchHis);
        let sumPie = updateSummonerPie(n, matchHis);
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
    });

    
}

function randomizeColors(matchHis){
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

function computeTotalWinrate(matchHis){
    const wins = matchHis.filter(match => match.winLoss == "win");
    document.getElementById("t-winrate").innerHTML = Math.round((wins.length)/(matchHis.length)*100)/100;
}

function computeGamePlayer(matchHis){
    document.getElementById("t-games").innerHTML = matchHis.length;
}

function computeChampionKills(matchHis){
    var championsX = [];
    var championsY = [];
    for (let i=0; i<matchHis.length; i++){
        const curr_champ = matchHis[i].champ;
        if (!championsX.includes(curr_champ)){
            championsX.push(curr_champ);
            championsY.push(0);

        }
        const j = championsX.indexOf(curr_champ);
        championsY[j] += parseInt(matchHis[i].kill);
    }

    return {championsX, championsY}
}

function computeChampionAssits(matchHis){
    var championsX = [];
    var championsY = [];
    for (let i=0; i<matchHis.length; i++){
        const curr_champ = matchHis[i].champ;
        if (!championsX.includes(curr_champ)){
            championsX.push(curr_champ);
            championsY.push(0);

        }
        const j = championsX.indexOf(curr_champ);
        championsY[j] += parseInt(matchHis[i].assists);
    }

    return {championsX, championsY}
}

function computeChampionDeath(matchHis){
    var championsX = [];
    var championsY = [];
    for (let i=0; i<matchHis.length; i++){
        const curr_champ = matchHis[i].champ;
        if (!championsX.includes(curr_champ)){
            championsX.push(curr_champ);
            championsY.push(0);

        }
        const j = championsX.indexOf(curr_champ);
        championsY[j] += parseInt(matchHis[i].death);
    }

    return {championsX, championsY}
}

function computeAverageKDA(matchHis){
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

function computeChampionKDA(matchHis){
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

function updateChampPie(n, matchHis){
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

function updateHelper(arr1, arr2, arr3, matchHis){
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

function updateRunePie(n, matchHis){
    const runes = updateHelper([], [], [], matchHis);
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

function updateSummonerPie(n, matchHis){
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