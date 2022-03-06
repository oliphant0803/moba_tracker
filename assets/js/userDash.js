window.onload = init;

  function init(){
    for(var i=0; i<recent_searches.length; i++){
        displayOneRecent(recent_searches[i], "recentS");
    }

  }

function showFav() {
    document.getElementById('favS').style.display = "flex";
    document.getElementById('recentS').style.display = "none";
    if (document.getElementById("recentCon").classList.contains("active-button")){
        for(var i=0; i<fav_searches.length; i++){
            displayOneRecent(fav_searches[i], "favS");
        }
        emptyDisplay("recentS");
    
        document.getElementById("favCon").classList.add("active-button");
        document.getElementById("recentCon").classList.remove("active-button");
    }
}

function showRecent() {
    document.getElementById('recentS').style.display = "flex";
    document.getElementById('favS').style.display = "none";
    if (document.getElementById("favCon").classList.contains("active-button")){
        for(var i=0; i<recent_searches.length; i++){
            displayOneRecent(recent_searches[i], "recentS");
        }
        emptyDisplay("favS");

        document.getElementById("recentCon").classList.add("active-button");
        document.getElementById("favCon").classList.remove("active-button");
    }
}

function searchOther(){
    var userId = document.getElementById("search-id-input");
    console.log(userId.value);
    //redirect to the users name
    if(userId.value != ""){
        //hard coded to otherprofile.html before calling api since we only have 2 users.
        if(userId.value == "User 1"){
            document.getElementById("search-id").href = "userProfile.html";
        }else if(userId.value == "User 2"){
            document.getElementById("search-id").href = "otherProfile.html";
        }else{
            alert("Given User does not exist");
        }
    }
}


// hard coded value for recent search 
const recent_searches = [
    ["../assets/images/login3.png", "User 1"],
    ["../assets/images/login3.png", "User 2"]
];

// hard coded value for fav 
const fav_searches = [
    ["../assets/images/login3.png", "Fav 1"],
    ["../assets/images/login3.png", "Fav 2"],
    ["../assets/images/login3.png", "Fav 3"],
    ["../assets/images/login3.png", "Fav 4"],
    ["../assets/images/login3.png", "Fav 5"],
    ["../assets/images/login3.png", "Fav 6"],
    ["../assets/images/login3.png", "Fav 7"],
    ["../assets/images/login3.png", "Fav 8"]
];

current_user = "User 1";

function redirect(userName){
    if(userName == current_user){
        return "userProfile.html"
    }
    return "otherProfile.html";
}

function displayOneRecent(t, divName){
    var colDiv = document.createElement("div");
    colDiv.classList.add("col-xl-3");
    colDiv.classList.add("col-sm-6");
    colDiv.classList.add("d-flex");
    colDiv.classList.add("justify-content-center");

    var aDiv = document.createElement("a");
    aDiv.href = redirect(t[1]); //hard coded other profile now, can direct to more after calling api
    var recentCard = document.createElement("div");
    recentCard.classList.add("recent-search-card");
    recentCard.classList.add("rounded");
    recentCard.classList.add("shadow-sm");

    var profilePic = document.createElement("img");
    profilePic.src = t[0];
    profilePic.width = 50;
    profilePic.classList.add("img-fluid");
    profilePic.classList.add("rounded-circle");
    profilePic.classList.add("img-thumbnail");
    profilePic.classList.add("shadow-sm");

    var name = document.createElement("h6");
    name.classList.add("mb-0");
    name.innerHTML = t[1];

    recentCard.appendChild(profilePic);
    recentCard.appendChild(name);
    aDiv.appendChild(recentCard);
    colDiv.appendChild(aDiv);
    
    document.getElementById(divName).appendChild(colDiv);
}

function emptyDisplay(divName){
    var parent = document.getElementById(divName);
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

