window.onload = init;

  function init(){
    for(var i=0; i<recent_searches.length; i++){
        displayOneRecent(i);
    }
  }

function showFav() {
    document.getElementById('favS').style.display = "flex";
    document.getElementById('recentS').style.display = "none";
}

function showRecent() {
    document.getElementById('recentS').style.display = "flex";
    document.getElementById('favS').style.display = "none";
}


// hard coded value for recent search 
const recent_searches = [
    ["../assets/images/login3.png", "User 1"],
    ["../assets/images/login3.png", "User 2"],
    ["../assets/images/login3.png", "User 3"],
    ["../assets/images/login3.png", "User 4"],
    ["../assets/images/login3.png", "User 5"],
    ["../assets/images/login3.png", "User 6"],
    ["../assets/images/login3.png", "User 7"],
    ["../assets/images/login3.png", "User 8"]
];

function displayOneRecent(i){
    var colDiv = document.createElement("div");
    colDiv.classList.add("col-xl-3");
    colDiv.classList.add("col-sm-6");
    colDiv.classList.add("d-flex");
    colDiv.classList.add("justify-content-center");

    var recentCard = document.createElement("div");
    recentCard.classList.add("recent-search-card");
    recentCard.classList.add("rounded");
    recentCard.classList.add("shadow-sm");

    var profilePic = document.createElement("img");
    profilePic.src = recent_searches[i][0];
    profilePic.width = 50;
    profilePic.classList.add("img-fluid");
    profilePic.classList.add("rounded-circle");
    profilePic.classList.add("img-thumbnail");
    profilePic.classList.add("shadow-sm");

    var name = document.createElement("h6");
    name.classList.add("mb-0");
    name.innerHTML = recent_searches[i][1];

    recentCard.appendChild(profilePic);
    recentCard.appendChild(name);
    colDiv.appendChild(recentCard);

    document.getElementById("recentS").appendChild(colDiv);
}

