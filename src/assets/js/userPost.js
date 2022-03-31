window.onload = getFavs;

//the way we expect to get from json
const post1={
    postId: 1,
    time: new Date("2020-9-16 13:30:58"),
    userName: "user1",
    userProfile: "../assets/images/login3.png",
    gameTag: 1,
    champTag: "Champion 1",
    content: "Great Game!",
    comments: [{username: "User 1", comments: "Comment 1"}, 
    {username: "User 2", comments: "Comment 2"}
    ]
}

const post2={
    postId: 2,
    time: new Date("2021-9-16 12:00:00"),
    userName: "user2",
    userProfile: "../assets/images/login3.png",
    gameTag: 3,
    champTag: "Champion 2",
    content: "Check out my performance on champion 2 on this game!",
    comments: [{username: "User 1", comments: "Comment 1"}
    ]
}

const post3={
    postId: 3,
    time: new Date("2022-1-1 13:30:58"),
    userName: "user1",
    userProfile: "../assets/images/login3.png",
    gameTag: 4,
    champTag: "Champion 1",
    content: "Had fun on champion 1!",
    comments: []
}

const posts=[post1, post2, post3];

function init(){
    
    //get gameids, champions, users, and favs from db

    const game_url = "/api/matches"

    fetch(game_url)
    .then((res) => { 
        if (res.status === 200) {
           return res.json() 
       } else {
            console.log('Could not get matches')
       }                
    })
    .then((json) => { 
        let gameIds=[];
        let champions=[];
        json.matches.forEach((match) => {
            if(!gameIds.includes(match.match_name)){
                gameIds.push(match.match_name)
            }
            if(!champions.includes(match.championA)){
                champions.push("champion"+match.championA)
            }
            if(!champions.includes(match.championB)){
                champions.push("champion"+match.championB)
            }
    
        })
        console.log(gameIds)
        console.log(champions)
        for(let i = 0; i< gameIds.length; i++){
            displaySelect("select-input-gameid", gameIds[i]);

        }
        for(let i = 0; i< champions.length; i++){
            displaySelect("select-input-champion", champions[i]);

        }
        displayAllFilter("dropdownGame", gameIds);
        displayAllFilter("dropdownChamp", champions);
    }).catch((error) => {
        console.log(error)
    })

    const user_url = "/api/users"
    fetch(user_url)
    .then((res) => { 
        if (res.status === 200) {
           return res.json() 
       } else {
            console.log('Could not get matches')
       }                
    })
    .then((json) => { 
        let users= [];
        json.users.forEach((user)=>{
            users.push(user.username)
        })
        console.log(users)
        displayUser(users);
    }).catch((error) => {
        console.log(error)
    })
    

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


function getFavs(){
    if(document.getElementById("invisFav") == null){
        let div = document.createElement("p");
        div.setAttribute("id", "invisFav");
        div.style.visibility = "hidden";
        document.body.appendChild(div);
    }

    // document.getElementById("invisFav").className="";

    const currentUser = "62436866d4cc88a03be4de21"

    const url = '/api/users/' + currentUser;
    fetch(url)
    .then((res) => { 
        if (res.status === 200) {
            return res.json() 
        } else {
                console.log('Could not get user')
        }                
    })
    .then((json) => { 
        json.favs.forEach((id) => {
            const fav_url = '/api/users/' + id;
            fetch(fav_url)
            .then((res) => { 
                if (res.status === 200) {
                    return res.json() 
                } else {
                    console.log('Could not get user')
                }                
            })
            .then((json2) => { 
                document.getElementById("invisFav").classList.add(json2.username);
                
            })
        })
    }).catch((error) => {
        console.log(error)
    })
    init();
}

function showUser(filter){
    filter_users= [];
    console.log(filter);
    var p = document.getElementById("posts"); 

    if(filter == "favourite"){
        
        const favs = document.getElementById("invisFav").classList;
        console.log(favs);
        //display only posts from favourite users
        for(let i = 0; i<p.children.length; i++){
            var curr_child = p.children[i];
            if (!favs.contains(curr_child.children[0].children[1].children[0].innerHTML)){
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
        content: document.getElementById("input-post").value,
        comments: []
    };
    posts.push(post);
    var p = document.getElementById("posts");
    while (p.firstChild) {
        p.removeChild(p.lastChild);
    }
    for(let i = posts.length-1; i>=0; i--){
        displayPost(posts[i]);
    }
    //reset input field
    clearSelection()
}

function showFilter(instance){
    console.log(instance);
    removePost(instance.toString());
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


//display on select
function displaySelect(id, instance){
    var selectCon = document.getElementById(id);
    var selectOption = document.createElement("option");
    selectOption.textContent = instance;
    selectOption.value = instance;
    selectCon.add(selectOption);
}

function displayUser(users){
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

function postComment(pid, id){
    commentBody = document.getElementById(id).value;
    if(commentBody == ''){
        alert("Can not comment empty contents");
        return;
    }else{
        new_comment={username: current_user, comments: commentBody}
        for(let i=0; i<posts.length; i++){
            if(posts[i].postId == pid){
                posts[i].comments.push(new_comment);
                console.log(new_comment);

            }
        }
        var p = document.getElementById("posts");
        while (p.firstChild) {
            p.removeChild(p.lastChild);
        }
        for(let i = posts.length-1; i>=0; i--){
            displayPost(posts[i]);
        }
        enablePtr("dropdownUser");
        enablePtr("dropdownChamp");
        enablePtr("dropdownGame");
    }
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

    var commentArea = document.createElement("div");
    commentArea.classList.add("comment-area");
    var comments = document.createElement("div");
    comments.classList.add("comments");
    comments.setAttribute("id", "comments"+post_i.postId);
    for(let i=post_i.comments.length-1; i>=0; i--){
        comments.appendChild(displayComment(post_i.comments[i]));
    }
    commentArea.appendChild(comments);
    var pComment = document.createElement("div");
    pComment.classList.add("d-flex");
    textArea = document.createElement("textarea");
    textArea.setAttribute("id", "comment-post"+post_i.postId);
    textArea.setAttribute("placeholder", "Comment here");
    textArea.classList.add("comment-post");

    pComment.appendChild(textArea);
    commentButton = document.createElement("button");
    commentButton.classList.add("btn");
    commentButton.classList.add("btn-post");
    commentButton.classList.add("px-4");
    commentButton.classList.add("py-1");
    commentButton.onclick = function(){postComment(post_i.postId, "comment-post"+post_i.postId)};
    commentButton.innerHTML = "Comment";
    pComment.appendChild(commentButton);
    commentArea.appendChild(pComment);
    mainDiv.appendChild(commentArea);
    document.getElementById("posts").appendChild(mainDiv);
}

function displayComment(comment){
    // <div class="comment"><h6>User name</h6>Comment 1</div>
    commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");
    commentUser = document.createElement("h6");
    commentUser.innerHTML = comment.username;
    commentDiv.appendChild(commentUser);
    commentDiv.innerHTML = comment.comments;
    return commentDiv;
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