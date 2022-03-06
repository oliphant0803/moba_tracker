window.onload = init;
    function init(){
        
        for(let i = 0; i< gameIds.length; i++){
            displaySelect("select-input-gameid", gameIds[i]);
            console.log(gameIds[i]);
        }
        for(let i = 0; i< champions.length; i++){
            displaySelect("select-input-champion", champions[i]);
            console.log(champions[i]);
        }
        displayUser();
        displayAllFilter("dropdownGame", gameIds);
        displayAllFilter("dropdownChamp", champions);

        for(let i = posts.length-1; i>=0; i--){
            displayPost(posts[i]);
            console.log(posts[i]);
        }
        
  }

function clearSelection(){
    document.getElementById("select-input-champion").selectedIndex = 0;
    document.getElementById("select-input-gameid").selectedIndex = 0;
    document.getElementById("input-post").value = '';
}

var filter_posts = [];
var filter_users = [];
var curr_posts =[];


function disablePtr(id){
    var selectionDiv = document.getElementById(id);
    for(let i = 2; i < selectionDiv.children.length; i++){
        selectionDiv.children[i].firstChild.classList.add("disable");
    }
}

function enablePtr(id){
    var selectionDiv = document.getElementById(id);
    for(let i = 2; i < selectionDiv.children.length; i++){
        selectionDiv.children[i].firstChild.classList.remove("disable");
    }
}

function showUser(filter){
    filter_users= [];
    console.log(filter);
    var p = document.getElementById("posts"); 

    if(filter == "favourite"){
        //display only posts from favourite users
        for(let i = 0; i<p.children.length; i++){
            var curr_child = p.children[i];
            if (!favs.includes(curr_child.children[0].children[1].children[0].innerHTML)){
                filter_users.push(i);
            } 
        }
    }
    else if(filter=="all"){
        while (p.firstChild) {
            p.removeChild(p.lastChild);
        }
        for(let i = posts.length-1; i>=0; i--){
            displayPost(posts[i]);
        }
        enablePtr("dropdownUser");
        enablePtr("dropdownChamp");
        enablePtr("dropdownGame");
        return;
    }
    else {
        for(let i = 0; i<p.children.length; i++){
            var curr_child = p.children[i];
            console.log(curr_child.children[0].children[1].children[0].innerHTML);
            if (curr_child.children[0].children[1].children[0].innerHTML != filter){
                filter_users.push(i);
            } 
        }
    }
    console.log(filter_users);
    if(filter_users.length == posts.length || p.children.length == filter_users.length){
        alert("Selected user has not posted");
        return;
    }
    disablePtr("dropdownUser");

    for(let i = filter_users.length-1; i>=0; i--){
        console.log(filter_users[i]);
        p.removeChild(p.children[filter_users[i]-i]);
    }

}

function removePost(filter){
    filter_posts = [];
    var p = document.getElementById("posts"); 
    
    if(filter=="all"){
        while (p.firstChild) {
            p.removeChild(p.lastChild);
        }
        for(let i = posts.length-1; i>=0; i--){
            displayPost(posts[i]);
        }
        enablePtr("dropdownUser");
        enablePtr("dropdownChamp");
        enablePtr("dropdownGame");
        return;
    }

    for(let i = 0; i<p.children.length; i++){
        var curr_child = p.children[i];
        if (curr_child.children[1].children[1].children[0].id != filter && curr_child.children[1].children[1].children[1].id != filter){
            filter_posts.push(i);
        } 
    }
    console.log(filter_posts);
    if(filter_posts.length == posts.length){
        alert("Selected filter is not available");
        return;
    }
    disablePtr("dropdownChamp");
    disablePtr("dropdownGame");

    for(let i = filter_posts.length-1; i>=0; i--){
        console.log(filter_posts[i]);
        p.removeChild(p.children[filter_posts[i]-i]);
    }
}

function saveSelection(){
    //check constraint and save to database for phase 2
    //right now just add to hard coded array for js
    if(document.getElementById("select-input-gameid").selectedIndex == 0 || document.getElementById("select-input-champion").selectedIndex == 0){
        alert("Can not add if not select tag");
        return;
    } else if(document.getElementById("input-post").value == ""){
        alert("Can not be empty content");
        return;
    }
    //create a new post instance
    const post = {
        postId: post1.length, //just a tempory way for id
        time: new Date(),
        userName: "User 1", //current user , hard coded here
        userProfile: "../assets/images/login3.png",
        gameTag: document.getElementById("select-input-gameid").value,
        champTag: document.getElementById("select-input-champion").value,
        content: document.getElementById("input-post").value
    };
    posts.push(post);
    var p = document.getElementById("posts");
    while (p.firstChild) {
        p.removeChild(p.lastChild);
    }
    for(let i = posts.length-1; i>=0; i--){
        displayPost(posts[i]);
    }
}

function showFilter(instance){
    console.log(instance);
    removePost(instance.toString());
}


//hard coded value for tag game id, champion, and posts
const gameIds=[1, 2, 3, 4, 5, 6];

const champions=["Champion 1", "Champion 2", "Champion 3"];

const users=["User 1", "User 2", "User 3", "User 4", "User 5", "User 6", "User 7", "User 8", "User 9"];

const favs=["User 2"];

//the way we expect to get from json
const post1={
    postId: 1,
    time: new Date("2020-9-16 13:30:58"),
    userName: "User 1",
    userProfile: "../assets/images/login3.png",
    gameTag: 1,
    champTag: "Champion 1",
    content: "Great Game!"
}

const post2={
    postId: 2,
    time: new Date("2021-9-16 12:00:00"),
    userName: "User 2",
    userProfile: "../assets/images/login3.png",
    gameTag: 3,
    champTag: "Champion 2",
    content: "Check out my performance on champion 2 on this game!"
}

const post3={
    postId: 3,
    time: new Date("2022-1-1 13:30:58"),
    userName: "User 1",
    userProfile: "../assets/images/login3.png",
    gameTag: 4,
    champTag: "Champion 1",
    content: "Had fun on champion 1!"
}

const posts=[post1, post2, post3];

//display on select
function displaySelect(id, instance){
    var selectCon = document.getElementById(id);
    var selectOption = document.createElement("option");
    selectOption.textContent = instance;
    selectOption.value = instance;
    selectCon.add(selectOption);
}

function displayUser(){
    var uldiv = document.getElementById("dropdownUser");
    var li = document.createElement("li");
    var link = document.createElement("a");
    link.innerHTML = "all";
    li.onclick = function(){showUser("all")};
    li.appendChild(link);
    uldiv.appendChild(li);
    uldiv = document.getElementById("dropdownUser");
    li = document.createElement("li");
    link = document.createElement("a");
    link.innerHTML = "favourite";
    li.onclick = function(){showUser("favourite")};
    li.appendChild(link);
    uldiv.appendChild(li);
    for(let i = 0; i< users.length; i++){
        displayUserFilter("dropdownUser", users[i]);
    }
}

function displayUserFilter(id, instance){
    var uldiv = document.getElementById(id);
    var li = document.createElement("li");
    var link = document.createElement("a");
    link.innerHTML = instance;
    li.onclick = function(){showUser(instance)};
    li.appendChild(link);
    uldiv.appendChild(li);
}

function displayAllFilter(id, list){
    var uldiv = document.getElementById(id);
    var li = document.createElement("li");
    var link = document.createElement("a");
    link.innerHTML = "all";
    li.onclick = function(){showFilter("all")};
    li.appendChild(link);
    uldiv.appendChild(li);
    for(let i = 0; i< list.length; i++){
        displayFilter(id, list[i]);
    }
}

//display on filter
function displayFilter(id, instance){
    var uldiv = document.getElementById(id);
    var li = document.createElement("li");
    var link = document.createElement("a");
    link.innerHTML = instance;
    li.onclick = function(){showFilter(instance)};
    li.appendChild(link);
    uldiv.appendChild(li);
}

current_user = "User 1";

function redirect(userName){
    if(userName == current_user){
        return "userProfile.html"
    }
    return "otherProfile.html";
}

//display timeline post
function displayPost(post_i){
    var mainDiv = document.createElement("div");
    mainDiv.classList.add("posted-timeline");
    var userDiv = document.createElement("div");
    var link = document.createElement("a");
    link.href = redirect(post_i.userName); //will added after have api
    var icon = document.createElement("img");
    icon.src = post_i.userProfile;
    link.classList.add("summoner-icon");
    link.appendChild(icon);
    userDiv.appendChild(link);
    var nameHeading = document.createElement("h6");
    nameHeading.classList.add("summoner-name");
    var nameLink = document.createElement("a");
    nameLink.href = redirect(post_i.userName); //will added after have api
    nameLink.innerHTML = post_i.userName;
    nameHeading.appendChild(nameLink);
    userDiv.appendChild(nameHeading);
    mainDiv.appendChild(userDiv);

    var contentDiv = document.createElement("div");
    contentDiv.classList.add("post-content");
    var timeDiv = document.createElement("div");
    timeDiv.classList.add("posted-time");
    timeDiv.innerHTML = timeDiff(post_i.time);
    contentDiv.appendChild(timeDiv);
    var tagDiv = document.createElement("div");
    tagDiv.classList.add("d-flex");
    var tag1 = document.createElement("div");
    tag1.classList.add("tag");
    tag1.innerHTML = "Game " + post_i.gameTag;
    tag1.setAttribute("id", post_i.gameTag);
    tagDiv.appendChild(tag1);
    var tag2 = document.createElement("div");
    tag2.classList.add("tag");
    tag2.setAttribute("id", post_i.champTag);
    tag2.innerHTML = post_i.champTag;
    tagDiv.appendChild(tag2);
    var tag3 = document.createElement("div");
    tag3.classList.add("tag");
    tag3.innerHTML = "Post #" + post_i.postId;
    tagDiv.appendChild(tag3);
    contentDiv.appendChild(tagDiv);
    var cp = document.createElement("p");
    cp.classList.add("mb-0");
    cp.textContent = post_i.content;
    contentDiv.appendChild(cp);
    mainDiv.appendChild(contentDiv);

    document.getElementById("posts").appendChild(mainDiv);
}

function timeDiff(curr_date){
    var today = new Date();
    var diffMs = (curr_date - today); 
    var diffDays = Math.floor(diffMs / 86400000); 
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000);
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    if(diffDays == 0 && diffHrs == 0 && diffMins == 0){
        return "Posted now";
    } else if(diffDays == 0 && diffHrs == 0){
        return "Posted " + Math.abs(diffMins) + " mins ago";
    } else if (diffDays == 0){
        return "Posted " + Math.abs(diffHrs) + " hours ago";
    }
    return "Posted " + Math.abs(diffDays) + " days, " + Math.abs(diffHrs) + " hours ago";
}

function filterUser(){
    var input = document.getElementById("userSelect");
    var filter = input.value.toUpperCase();
    var div = document.getElementById("dropdownUser");
    var a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
}

function filterChamp() {
    var input = document.getElementById("champSelect");
    var filter = input.value.toUpperCase();
    var div = document.getElementById("dropdownChamp");
    var a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }

  function filterGame() {
    var input = document.getElementById("gameSelect");
    var filter = input.value.toUpperCase();
    var div = document.getElementById("dropdownGame");
    var a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }