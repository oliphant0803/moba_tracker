window.onload = getPosts;

let posts = [];
const currentUser = "62436866d4cc88a03be4de21"

async function init(){
    //get gameids, champions, users, and favs from db
    await new Promise(r => setTimeout(r, 1000));
    
    //sort by time
    posts.sort(function (a, b) {
        return b.time.localeCompare(a.time);
    });

    console.log(posts);

    posts.forEach((post)=>{
        displayPost(post)
    })

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

function getPosts(){
    const url = '/api/posts'
    fetch(url)
    .then((res) => { 
        if (res.status === 200) {
            return res.json() 
        } else {
            console.log('Could not get posts')
        }                
    })
    .then((json) => { 
        
        json.forEach((post)=>{

            if(post.parent_post == "parent"){
                let post_i = { }
                post_i.postId = post.postname
                post_i.gameTag = post.tag_gameName
                post_i.champTag = post.tag_champion
                post_i.content = post.content
                post_i.time = post.post_time
                post_i.comments = []
                post_i.id = post._id
                fetch('./api/users/'+post.username)
                .then((res) => { 
                    if (res.status === 200) {
                        return res.json() 
                    } else {
                        console.log('Could not get user')
                    }                
                }).then((json2) => { 
                    post_i.userName = json2.username
                    post_i.userProfile = json2.icon
                    posts.push(post_i)
                });

            }
            
        })
    })
    getFavs()
        

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
        posts.forEach((post) => {
            displayPost(post);
        })
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

    for(let i = 0; i<filter_users.length; i++){
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
    } else if(document.getElementById("input-post").value == "" || document.getElementById("post-name-input").value==""){
        alert("Can not be empty content or title");
        return;
    }
    //create a new post instance
    
    const data = {
        username: currentUser,
        postname: document.getElementById("post-name-input").value,
        tag_gameName: document.getElementById("select-input-gameid").value,
        tag_champion: document.getElementById("select-input-champion").value,
        content: document.getElementById("input-post").value,
    };

    console.log(data);

    const request = new Request('/api/posts', {
        method: 'post', 
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    fetch(request)
    .then(function(res) {
        
        // location.reload(); 
    }).catch((error) => {
        console.log(error)
    })
    
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
        posts.forEach((post) => {
            displayPost(post);
        })
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

    for(let i = 0; i<filter_posts.length;i++){
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



function redirect(link, userName){
    const url = '/api/userByName/' + userName;
    fetch(url)
    .then((res) => { 
        if (res.status === 200) {
           return res.json() 
       } else {
            console.log('Could not get user')
       }                
    })
    .then((json) => { 
        const currentUser = "62436866d4cc88a03be4de21" //hard coded current user for now

        if(json._id == currentUser){
            link.href= "userProfile.html"
        }else{
            link.href = "otherProfile.html?id="+json._id;
        }
    });
}

function postComment(pid, id){
    commentBody = document.getElementById(id).value;
    if(commentBody == ''){
        alert("Can not comment empty contents");
        return;
    }else{
        fetch('/api/posts/'+pid)
        .then(function(res) {
            if (res.status === 200) {
               return res.json() 
           } else {
                console.log('Could not get posts')
           }     
             
        }).then((json) => {

            var data={
                username: currentUser, 
                tag_champion: json.tag_champion,
                tag_gameName: json.tag_gameName,
                content: commentBody,
                parent_post: json._id
            }

            const request = new Request('/api/posts', {
                method: 'post', 
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
            });
            fetch(request)
            .then(function(res) {
                
                location.reload(); 
            }).catch((error) => {
                console.log(error)
            })
        })

    }
}

//display timeline post
function displayPost(post_i){
    var mainDiv = document.createElement("div");
    mainDiv.classList.add("posted-timeline");
    mainDiv.setAttribute("id", post_i.postId);
    var userDiv = document.createElement("div");
    var link = document.createElement("a");
    redirect(link, post_i.userName);
    var icon = document.createElement("img");
    icon.src = post_i.userProfile;
    link.classList.add("summoner-icon");
    link.appendChild(icon);
    userDiv.appendChild(link);
    var nameHeading = document.createElement("h6");
    nameHeading.classList.add("summoner-name");
    var nameLink = document.createElement("a");
    redirect(nameLink, post_i.userName);
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
    tag3.innerHTML = post_i.postId;
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
    
    displayComment(comments, post_i);

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

function displayComment(comments, post_i){
    const url = '/api/posts'
    fetch(url)
    .then((res) => { 
        if (res.status === 200) {
            return res.json() 
        } else {
            console.log('Could not get posts')
        }                
    })
    .then((json) => { 
        json.forEach((comment)=>{
            if(comment.parent_post == post_i.id){
                let c = {}
                fetch('./api/users/'+comment.username)
                .then((res) => { 
                    if (res.status === 200) {
                        return res.json() 
                    } else {
                        console.log('Could not get user')
                    } 
                }).then((json3) => {
                    c.username = json3.username
                    c.content = comment.content
                    post_i.comments.push(c);

                    var commentDiv = document.createElement("div");
                    commentDiv.classList.add("comment");
                    var nameLink = document.createElement("a");
                    redirect(nameLink, c.username);
                    var commentUser = document.createElement("h6");
                    commentUser.innerHTML = c.username;
                    nameLink.appendChild(commentUser);
                    commentDiv.appendChild(nameLink);
                    var commentContent = document.createElement("p");
                    commentContent.innerHTML = comment.content;
                    commentDiv.appendChild(commentContent);
                    comments.appendChild(commentDiv);
                })
            }
        });
    });

}

function timeDiff(curr_date){
    var post_date = new Date(curr_date)
    var today = new Date();
    var diffMs = (today-post_date ); 
    var diffDays = Math.floor(diffMs / 86400000); 
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000);
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    if(diffDays == 0 && diffHrs == 0 && diffMins == 0){
        return "Posted now";
    } else if(diffDays == 0 && diffHrs == 0){
        return "Posted " + Math.abs(diffMins) + " mins ago";
    } else if (diffDays == 0){
        return "Posted " + Math.abs(diffHrs) + " hours, " + Math.abs(diffMins) + " mins ago";
    }
    return "Posted " + Math.abs(diffDays) + " days, " + Math.abs(diffHrs) + " hours, " + Math.abs(diffMins) + " mins ago";
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