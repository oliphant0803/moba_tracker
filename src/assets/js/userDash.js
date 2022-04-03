let fav_searches;
let recent_searches;

window.onload = init;


var currentUser;
fetch('/user')
.then((res) => { 
    if (res.status === 200) {
        return res.json() 
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
}).catch(error => {
    console.log(error);
});


async function init(){
    await new Promise(r => setTimeout(r, 1000));

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
        
        recent_searches = json.recents;

        document.getElementById('recentS').style.display = "flex";
        document.getElementById('favS').style.display = "none";
        
        for(var i=0; i<recent_searches.length; i++){
            displayOneRecent(recent_searches[i], "recentS");

        }
        emptyDisplay("favS");

        document.getElementById("recentCon").classList.add("active-button");
        document.getElementById("favCon").classList.remove("active-button");
    }).catch((error) => {
        console.log(error)
    })

  }

function showFav() {

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
        
        fav_searches = json.favs;

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
    }).catch((error) => {
        console.log(error)
    })
    

    
}

function showRecent() {

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
        
        recent_searches = json.recents;

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
    }).catch((error) => {
        console.log(error)
    })
}

function searchOther(){
    var userId = document.getElementById("search-id-input");
    console.log(userId.value);
    //redirect to the users name
    if(userId.value != ""){
        const url = '/api/userByName/' + userId.value;
        fetch(url)
        .then((res) => { 
            if (res.status === 200) {
            return res.json() 
        } else {
            alert('Could not get user')
        }                
        })
        .then((json) => { 
            
            //append to recent searches of the current user
            fetch('/api/users/' + currentUser)
            .then((res) => { 
                if (res.status === 200) {
                return res.json() 
            } else {
                alert('Could not get user')
            }                
            })
            .then((json2) => { 
                var recentList = json2.recents;

                if(recentList.includes(json._id)){
                    console.log(json._id);
                    if(json._id == currentUser){
                        window.location.href = "my-profile";
                    }else {
                        window.location.href = "other-profile?id="+json._id;
                    }
                    return
                }
                else if(recentList.length >= 8){
                    recentList.pop();
                }
                recentList.push(json._id);
                let data = {
                    username: json2.username,
                    email: json2.email,
                    password: json2.password,
                    bio: json2.bio,
                    favs: json2.favs,
                    recents: recentList,
                    match_history: json2.match_history,
                    icon: json2.icon
                }
                const request = new Request('/api/users/' + currentUser, {
                    method: 'put', 
                    body: JSON.stringify(data),
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                });
            
                fetch(request)
                .then(function(res) {
                    if(json._id == currentUser){
                        window.location.replace("my-profile");
                    }else {
                        window.location.replace("other-profile?id="+json._id);
                    }
                }).catch((error) => {
                    console.log(error)
                })

               
            });
        });
    }
}


function redirect(aDiv, userName){

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
            aDiv.href= "my-profile"
        }else{
            aDiv.href = "other-profile?id="+json._id;
        }
    });
}

function displayOneRecent(user_info, divName){
    //get icon link and username from user_info
    const url = '/api/users/' + user_info;
    fetch(url)
    .then((res) => { 
        if (res.status === 200) {
           return res.json() 
       } else {
            console.log('Could not get user')
       }                
    })
    .then((json) => { 
        
        const t = [json.icon, json.username]
        var colDiv = document.createElement("div");
        colDiv.classList.add("col-xl-3");
        colDiv.classList.add("col-sm-6");
        colDiv.classList.add("d-flex");
        colDiv.classList.add("justify-content-center");

        var aDiv = document.createElement("a");
        redirect(aDiv, t[1]); 
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
    }).catch((error) => {
        console.log(error)
    })

}

function emptyDisplay(divName){
    var parent = document.getElementById(divName);
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

