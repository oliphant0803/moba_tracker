window.onload = getPosts;
let posts = [];
var currentUser;
fetch('/user').then((res) => { 
    if (res.status === 200) {
        return res.json() 
    }    
}).then((json) =>{
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
}).catch(error => {
    console.log(error);
    // window.location.href="/login";
});

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
            if(!champions.includes("champion"+match.championA)){
                champions.push("champion"+match.championA)
            }
            if(!champions.includes("champion"+match.championB)){
                champions.push("champion"+match.championB)
            }
        })

        // console.log(champions)
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

async function getPosts(){
    await new Promise(r => setTimeout(r, 1000));
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
        
        location.reload(); 
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

        if(json._id == currentUser){
            link.href= "my-profile"
        }else{
            link.href = "other-profile?id="+json._id;
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
    var tag1 = document.createElement("button");
    tag1.type = "button";
    tag1.setAttribute("data-toggle", "modal");
    tag1.setAttribute("data-target", "#gameInfo");
    tag1.classList.add("tag");
    tag1.classList.add("btn");
    tag1.onclick = function(event) {
        var target = event.target || event.srcElement;
        document.getElementById("gameInfo").querySelector(".modal-title").innerHTML = "Game Details for " + target.innerHTML.slice(4);
        displayGameInfoBody(target.innerHTML.slice(5));
    }
    tag1.innerHTML = "Game " + post_i.gameTag;
    tag1.setAttribute("id", post_i.gameTag);
    tagDiv.appendChild(tag1);
    var tag2 = document.createElement("button");
    tag2.type = "button";
    tag2.setAttribute("data-toggle", "modal");
    tag2.setAttribute("data-target", "#champInfo");
    tag2.onclick = function(event) {
        var target = event.target || event.srcElement;
        document.getElementById("champInfo").querySelector(".modal-title").innerHTML = "Champion Details for " + target.innerHTML;
        displayChampInfoBody(target.innerHTML);
    }
    tag2.classList.add("tag");
    tag2.classList.add("btn");
    tag2.setAttribute("id", post_i.champTag);
    tag2.innerHTML = post_i.champTag;
    tagDiv.appendChild(tag2);
    var tag3 = document.createElement("button");
    tag3.classList.add("tag");
    tag3.classList.add("btn");
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

  function displayChampInfoBody(champname){
    const imgurl = "assets/images/champions/c"+champname.slice(8)+".webp";
    var div = document.createElement("div");
    div.classList.add("d-flex");
    div.classList.add("align-items-center");
    var champContainer = document.createElement("img");
    champContainer.src = imgurl;
    champContainer.classList.add("img-fluid");
    champContainer.classList.add("img-champ");
    div.appendChild(champContainer);
    var btnContainer = document.createElement("button");

    btnContainer.classList.add("btn");
    btnContainer.classList.add("btn-primary");
    btnContainer.onclick = function(){
        location.href= "championAnalysis.html"
    }
    btnContainer.innerHTML = "View Champion Analysis"
    div.appendChild(btnContainer);
    document.getElementById("champInfoBody").appendChild(div);
  }

  function displayGameInfoBody(matchname){
    const url = '/api/matches/'+ matchname;

    fetch(url)
    .then((res) => { 
        if (res.status === 200) {
            return res.json() 
        } else {
            console.log('Could not get user match history')
        }                
    })
    .then((json) => { 

        let match_i = {   };
        match_i.gameId = json.match_name;
        match_i.champ = "assets/images/champions/c"+json.championA+".webp";
        if(json.win == json.userA){
            match_i.winLoss = "win"
        }else{
            match_i.winLoss = "loss"
        }

        match_i.r1url = "assets/images/runes/r"+json.runeA[0]+".png"
        match_i.r2url = "assets/images/runes/r"+json.runeA[1]+".png"
        match_i.s1url = "assets/images/summoners/summoner"+json.summonerA[0]+".png"
        match_i.s2url =  "assets/images/summoners/summoner"+json.summonerA[1]+".png"
        match_i.items = json.buildA
        match_i.kill = json.kdaA[0].toString();
        match_i.death = json.kdaA[1].toString();
        match_i.assists = json.kdaA[2].toString();

        displayOneGame(match_i);

        match_i = {   };
        match_i.gameId = json.match_name;
        match_i.champ = "assets/images/champions/c"+json.championB+".webp";
        if(json.win == json.userB){
            match_i.winLoss = "win"
        }else{
            match_i.winLoss = "loss"
        }

        match_i.r1url = "assets/images/runes/r"+json.runeB[0]+".png"
        match_i.r2url = "assets/images/runes/r"+json.runeB[1]+".png"
        match_i.s1url = "assets/images/summoners/summoner"+json.summonerB[0]+".png"
        match_i.s2url =  "assets/images/summoners/summoner"+json.summonerB[1]+".png"
        match_i.items = json.buildB
        match_i.kill = json.kdaB[0].toString();
        match_i.death = json.kdaB[1].toString();
        match_i.assists = json.kdaB[2].toString();
        displayOneGame(match_i);
    });
}

  function displayOneGame(match_i){

    console.log(match_i)

    var  matchContainer = document.createElement("div");
    matchContainer.classList.add("match-container"); 
    if(match_i.winLoss == "win"){
        matchContainer.classList.add("victory-bg");
    } else if(match_i.winLoss == "loss"){
        matchContainer.classList.add("defeat-bg");
    }

    var rowCol4 = document.createElement("div");
    rowCol4.classList.add("row");
    rowCol4.classList.add("row-col-4");
    
    rowCol4.appendChild(appendChamp(match_i));
    rowCol4.appendChild(appendKDA(match_i.kill, match_i.death, match_i.assists));
    rowCol4.appendChild(appendItems(match_i.items, match_i.winLoss, match_i.gameId));

    matchContainer.appendChild(rowCol4);
    matchContainer.appendChild(appendCollapse(match_i.gameId));
    document.getElementById("gameInfoBody").appendChild(matchContainer);
}

function appendCollapse(gid){
    const gameid = "collapseGame".concat(gid);
    var collapseDiv = document.createElement("div");
    collapseDiv.classList.add("collapse");
    collapseDiv.setAttribute("id", gameid);
    console.log(gameid);
    var detailCon = document.createElement("div");
    detailCon.classList.add("card");
    detailCon.classList.add("card-body");
    detailCon.innerHTML = "Game Details for ".concat(gid);
    collapseDiv.appendChild(detailCon);
    return collapseDiv;
}

function appendItem(item){
    var itemImg = document.createElement("img");
    itemImg.src = item;
    itemImg.classList.add("img-fluid");
    itemImg.classList.add("img-item");
    return itemImg;
}

function appendItems(items, wl, id){
    var itemsCon = document.createElement("div");
    itemsCon.classList.add("col-6");
    itemsCon.classList.add("d-flex");
    itemsCon.classList.add("align-items-center");
    var firstRow = document.createElement("div");
    var rowOne = document.createElement("div");
    rowOne.classList.add("d-flex");
    rowOne.appendChild(appendItem("assets/images/items/i"+items[0]+".png"));
    rowOne.appendChild(appendItem("assets/images/items/i"+items[1]+".png"));
    rowOne.appendChild(appendItem("assets/images/items/i"+items[2]+".png"));
    firstRow.appendChild(rowOne);

    var rowTwo = document.createElement("div");
    rowTwo.classList.add("d-flex");
    rowTwo.appendChild(appendItem("assets/images/items/i"+items[3]+".png"));
    rowTwo.appendChild(appendItem("assets/images/items/i"+items[4]+".png"));
    rowTwo.appendChild(appendItem("assets/images/items/i"+items[5]+".png"));
    firstRow.appendChild(rowTwo);
    itemsCon.appendChild(firstRow);

    
    return itemsCon;
}

function appendChamp(match_i){
    var championCon = document.createElement("div");
    championCon.classList.add("col");

    var championRow = document.createElement("div");
    championRow.classList.add("row");

    var championImgCon = document.createElement("div");
    championImgCon.classList.add("col");
    championImgCon.classList.add("d-flex");
    championImgCon.classList.add("align-items-center");

    var championImg = document.createElement("img");
    championImg.src = match_i.champ;
    championImg.classList.add("img-fluid");
    championImg.classList.add("img-champ");

    championImgCon.appendChild(championImg);
    championRow.appendChild(championImgCon);

    var srCon = document.createElement("div");
    srCon.classList.add("col");
    srCon.classList.add("d-flex");
    srCon.classList.add("align-items-center");

    var sCon = document.createElement("div");

    var s1img = document.createElement("img");
    s1img.src = match_i.s1url;
    s1img.classList.add("img-fluid");
    s1img.classList.add("img-sumon");

    var s2img = document.createElement("img");
    s2img.src = match_i.s2url;
    s2img.classList.add("img-fluid");
    s2img.classList.add("img-sumon");

    sCon.appendChild(s1img);
    sCon.appendChild(s2img);
    srCon.appendChild(sCon);

    var rCon = document.createElement("div");

    var r1img = document.createElement("img");
    r1img.src = match_i.r1url;
    r1img.classList.add("img-fluid");
    r1img.classList.add("img-rune");

    var r2img = document.createElement("img");
    r2img.src = match_i.r2url;
    r2img.classList.add("img-fluid");
    r2img.classList.add("img-rune");

    rCon.appendChild(r1img);
    rCon.appendChild(r2img);
    srCon.appendChild(rCon);
    championRow.appendChild(srCon);
    championCon.appendChild(championRow);

    return championCon;
}

function appendKDA(kill, death, assists){
    var kdaCon = document.createElement("div");
    kdaCon.classList.add("col");
    kdaCon.classList.add("text-center");
    kdaCon.classList.add("kda-container");

    var kdas = document.createElement("div");
    kdas.setAttribute("id", "kda-s");
    var kdaText = document.createElement("h5");
    kdaText.innerHTML = kill.concat("/", death).concat("/", assists);
    kdas.appendChild(kdaText);
    kdaCon.appendChild(kdas);

    var kdaa = document.createElement("div");
    kdaa.setAttribute("id", "kda-a");
    kdaa.classList.add("d-flex");
    kdaa.classList.add("justify-content-center");
    var ratioText = document.createElement("h5");
    if(parseInt(death) == 0){
        ratioText.innerHTML = "Perfect".concat(":1");
    }else{
        var ratio = ((parseInt(kill) + parseInt(assists))/parseInt(death));
        ratio = Math.round(ratio * 100) / 100;
        ratioText.innerHTML = ratio.toString().concat(":1");
    }
    var greyText = document.createElement("h5");
    greyText.classList.add("grey-text");
    greyText.innerHTML = "&nbsp KDA";

    kdaa.appendChild(ratioText);
    kdaa.appendChild(greyText);

    kdaCon.appendChild(kdaa);
    return kdaCon;
}