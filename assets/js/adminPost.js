'use strict';
window.onload = init;
    function init(){
        displayUser();
        displayAllFilter("dropdownGame", gameIds);
        displayAllFilter("dropdownChamp", champions);
        for(let i = 0; i< posts.length; i++){
            displayPost(posts[i]);
            console.log(posts[i]);
        }
        const postSection = document.querySelector('#posts');
        postSection.addEventListener('click', deletePost);
        loadHeader();
  }

function loadHeader(){
    const headerName = document.querySelector('.header-name');
    headerName.innerHTML = currentAdmin.username;
    const headerImgContainer = document.querySelector('.header-img-container');
    const imgProfile = document.querySelector('.img-profile');
    imgProfile.src = "../assets/images/login3.png";
    const headerAnnounce = document.querySelector('.header-announcement');
    headerAnnounce.innerHTML = "Welcome, " + currentAdmin.username + ". ";
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
    filter_users = [];
    console.log(filter);
    var p = document.getElementById("posts"); 

    if(filter=="all"){
        while (p.firstChild) {
            p.removeChild(p.lastChild);
        }
        for(let i = 0; i< posts.length; i++){
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
    if(filter_users.length == posts.length || p.children.length == posts.length - filter_users.length){
        alert("Selected user has not posted");
        return;
    }
    disablePtr("dropdownUser");

    for(let i = 0; i<filter_users.length; i++){
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
        for(let i = 0; i< posts.length; i++){
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

    for(let i = 0; i<filter_posts.length; i++){
        console.log(filter_posts[i]);
        p.removeChild(p.children[filter_posts[i]-i]);
    }
}

function deletePost(e){
    e.preventDefault();
    // check if return button was clicked, otherwise do nothing.
    if (e.target.classList.contains('btn-delete')) {
        const deletePost = e.target.parentElement;
        const deletePostId = deletePost.children[0].children[0].innerHTML;
        for(let i = 0; i<posts.length; i++){
            if (posts[i].postId == deletePostId){
                console.log('find post');
                posts.pop(i);
            }
        }
        deletePost.parentElement.remove();
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


const currentAdmin = {
    username: "BestAdmin",
    password:'password',
    profilePic:'../assets/images/tiger1.png'
}

//the way we expect to get from json
const post1={
    postId: 1,
    time: new Date("2020-9-16 13:30:58"),
    userName: "User 1",
    userProfile: "../assets/images/login3.png",
    gameTag: 1,
    champTag: "Champion 1",
    content: "Content"
}

const post2={
    postId: 2,
    time: new Date("2021-9-16 12:00:00"),
    userName: "User 2",
    userProfile: "../assets/images/login3.png",
    gameTag: 3,
    champTag: "Champion 2",
    content: "Content"
}

const post3={
    postId: 3,
    time: new Date("2022-1-1 13:30:58"),
    userName: "User 1",
    userProfile: "../assets/images/login3.png",
    gameTag: 4,
    champTag: "Champion 1",
    content: "Content"
}

const posts=[post1, post2, post3];

function displayUser(){
    var uldiv = document.getElementById("dropdownUser");
    var li = document.createElement("li");
    var link = document.createElement("a");
    link.innerHTML = "all";
    li.onclick = function(){showUser("all")};
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

//display timeline post admin edition
function displayPost(post_i){
    var mainDiv = document.createElement("div");
    mainDiv.classList.add("posted-timeline");
    var userDiv = document.createElement("div");
    var link = document.createElement("a");
    link.href = "#"; //will added after have api
    var icon = document.createElement("img");
    icon.src = post_i.userProfile;
    link.classList.add("summoner-icon");
    link.appendChild(icon);
    userDiv.appendChild(link);
    var nameHeading = document.createElement("h6");
    nameHeading.classList.add("summoner-name");
    var nameLink = document.createElement("a");
    nameLink.href = "#"; //will added after have api
    nameLink.innerHTML = post_i.userName;
    nameHeading.appendChild(nameLink);
    userDiv.appendChild(nameHeading);
    mainDiv.appendChild(userDiv);

    var contentDiv = document.createElement("div");
    contentDiv.classList.add("post-content");

    //when introduced database will no longer needed
    var idDiv = document.createElement("div");
    idDiv.classList.add("posted-time");
    idDiv.innerHTML = "Post ID: ";
    var idSpan = document.createElement("span");
    idSpan.innerHTML = post_i.postId;
    idDiv.appendChild(idSpan);
    contentDiv.appendChild(idDiv);

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
    contentDiv.appendChild(tagDiv);
    var cp = document.createElement("p");
    cp.classList.add("mb-0");
    cp.textContent = post_i.content;
    contentDiv.appendChild(cp);
    var deleBtn = document.createElement("button");
    deleBtn.classList.add("btn");
    deleBtn.classList.add("btn-delete");
    deleBtn.textContent = "Delete This Post";
    contentDiv.appendChild(deleBtn);
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