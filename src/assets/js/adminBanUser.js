window.onload = init;
var currentAdmin;
userLibrary = []
gameLibrary = []
reportLibrary = []
postLibrary = []
currentResult = []
fetch('/admin').then((res) => { 
    if (res.status === 200) {
        return res.json() 
    }    
}).then((json) =>{
    currentAdmin = json.currentAdmin
    fetch('api/admins').then((res) => {
    if (res.status === 200) {
        return res.json();
    }
    else{
        alert('Could not get admins');
    }
    }).then((json) => {
        currentAdmin = json.admins.filter((admin) => admin._id === currentAdmin)[0]
        const headerAnnounce = document.querySelector('.header-announcement');
        headerAnnounce.innerHTML = "Welcome, " + currentAdmin.username + ". ";
    }).catch((error) => {
        console.log(error)
    })
    
}).catch(error => {
    console.log(error);
});


function init(){
    const search = document.querySelector('.searchBut');
    search.addEventListener('click', searchAction);

    resultSection = document.querySelector('#result-container');
    resultSection.addEventListener('click', userReport);

    reportSection = document.querySelector('#report-container');
    reportSection.addEventListener('click', userManage);
    fetch('api/users').then((res) => {
        if (res.status === 200) {
            return res.json();
        }
        else{
            alert('Could not get users');
        }
    }).then((json) => {
        userLibrary = json.users

        fetch('api/matches').then((res) => {
            if (res.status === 200) {
                return res.json();
            }
            else{
                alert('Could not get games');
            }
        }).then((json) => {
            gameLibrary = json.matches
            fetch('api/reports').then((res) => {
                    if (res.status === 200) {
                        return res.json();
                    }
                    else{
                        alert('Could not get reports');
                    }
                }).then((json) => {
                    reportLibrary = json.reports
                    fetch('api/posts').then((res) => {
                        if (res.status === 200) {
                            return res.json();
                        }
                        else{
                            alert('Could not get reports');
                        }
                    }).then((json) => {
                        postLibrary = json.posts
    
                        for (var i = userLibrary.length - 1; i >= 0; i--) {
                            currentResult.push(userLibrary[i])
                        }
                        updateResult()
                    }).catch((error) => {
                        console.log(error)
                    })
                }).catch((error) => {
                    console.log(error)
            })

        }).catch((error) => {
            console.log(error)
        })

    }).catch((error) => {
        console.log(error)
    })
}

function updateResult(){
    for (var i = resultSection.children.length - 1; i >= 0; i--) {
        resultSection.children[i].remove();
    }
    for (var i = currentResult.length - 1; i >= 0; i--) {
        displayUser(currentResult[i]);
    }
}

function searchAction(e){
    e.preventDefault();
    const value = document.querySelector('#search').value;
    currentResult = []

    for (var i = userLibrary.length - 1; i >= 0; i--) {
        if (userLibrary[i].username.includes(value)){
            currentResult.push(userLibrary[i]);
        } 
    }
    updateResult()
}

function displayUser(user){
    const row = document.createElement('div');
    row.classList.add('row');

    const infoContainer = document.createElement('div');
    infoContainer.classList.add('col');
    infoContainer.classList.add('user-info-container');
    row.appendChild(infoContainer);


    const imgContainer = document.createElement('div');
    imgContainer.classList.add('user-img-container');
    const img = document.createElement('img');
    img.src = user.icon;
    img.classList.add("img-profile");
    imgContainer.appendChild(img);

    const userLink = document.createElement('a');
    userLink.classList.add('username');
    userLink.classList.add('justify-content-start');
    userLink.href = "https://github.com/csc309-winter-2022/team47"
    userLink.innerHTML = user.username;

    const report = document.createElement('div');
    report.classList.add('col');
    report.classList.add('user-info-container');
    const userReports = reportLibrary.filter((report) => report.reported_username === user._id);
    report.innerHTML = "Report Time<br>" + findReportTime(userReports);

    const cause = document.createElement('div');
    cause.classList.add('col');
    cause.classList.add('user-champ-container');
    cause.innerHTML = "Most Cause<br>" + findMostCause(userReports) + "</div>";

    const banContainer = document.createElement('div');
    banContainer.classList.add('user-info-container');
    banContainer.classList.add('col');
    const ban = document.createElement('button');
    ban.classList.add('btn');
    ban.classList.add('viewBtn');
    ban.classList.add('btn-action');
    ban.innerHTML = 'View Details';
    banContainer.appendChild(ban);

    infoContainer.appendChild(imgContainer);
    infoContainer.appendChild(userLink);

    row.appendChild(report);
    row.appendChild(cause);
    row.appendChild(banContainer);

    resultSection.appendChild(row);
}

function findReportTime(reports){
    return reports.length;
}

function findMostCause(reports){
    if (reports.length ===0) {
        return "None";
    }
    const causes = reports.reduce(function(cause, report){
        var c = report.report_cause[0];
        if (cause[report.report_cause[0]] !== undefined){
            cause[report.report_cause[0]] = cause[report.report_cause[0]] + 1;
        } else {
            cause[report.report_cause[0]] = 0;
        }
        return cause;
    }, {});
    const mostCause = Object.entries(causes).reduce((a, b) => a[1] > b[1] ? a : b)[0]
    return mostCause;

}

function userReport(e){
    e.preventDefault();
    // check if return button was clicked, otherwise do nothing.
    if (e.target.classList.contains('viewBtn')) {
        updateResult()
        const username = e.target.parentElement.parentElement.children[0].children[1].innerHTML;
        const targetUser = userLibrary.filter(user => user.username === username);
        displayReportSection(targetUser[0])
    }
}

function userManage(e){
    e.preventDefault();
    // check if return button was clicked, otherwise do nothing.
    if (e.target.classList.contains('banBtn')) {
        //console.log("Try ban a user")
        const username = e.target.parentElement.parentElement.children[0].children[1].innerHTML;
        const targetUser = users.filter(user => user.username === username);
        for (var i = users.length - 1; i >= 0; i--) {
            if (users[i].userId === targetUser[0].userId){
                users.splice(i, 1);
            }
        }
        displaySearchSection();
    }
    if (e.target.classList.contains('clearBtn')) {
        //console.log("Try clear a user's report")
        const username = e.target.parentElement.parentElement.children[0].children[1].innerHTML;
        const targetUser = users.filter(user => user.username === username);
        reports = reports.filter(reportUser => reportUser.userId !== targetUser[0].userId);
        displayReportSection(targetUser[0]);
    }
}

function displayReportSection(user){
    let index = currentResult.findIndex((resultUser)=> resultUser._id === user._id)
    let resultSection = document.querySelector('#result-container');
    let reportedUser = displayReportedUser(user);
    resultSection.children[currentResult.length - index-1].insertAdjacentElement("afterend", reportedUser);
    // user_i.insertAdjacentElement("afterend", reportedUser);
    const userReports = reportLibrary.filter((report) => report.reported_username === user._id);
    for(let i = 0; i< userReports.length; i++){
        let report = displayReport(userReports[i])
        reportedUser.insertAdjacentElement("afterend", report);
    }
}

function findUserById(id){
    const wantUser = users.filter(user => user.userId === id);
    return wantUser[0];
}

function displayReportedUser(user){
    const row = document.createElement('div');
    row.classList.add('row');

    const infoContainer = document.createElement('div');
    infoContainer.classList.add('col');
    infoContainer.classList.add('user-info-container');
    infoContainer.classList.add('flex-2');
    infoContainer.classList.add("align-items-center");
    row.appendChild(infoContainer);

    const userLink = document.createElement('h5');
    userLink.classList.add('username');
    userLink.classList.add('text-dark');
    userLink.classList.add("mb-0");
    userLink.classList.add("pt-2.5");
    userLink.innerHTML = user._id;

    const banContainer = document.createElement('div');
    banContainer.classList.add('user-info-container');
    banContainer.classList.add('col');
    const ban = document.createElement('button');
    ban.classList.add('btn');
    ban.classList.add('banBtn');
    ban.classList.add('btn-action');
    ban.innerHTML = 'Ban User';
    banContainer.appendChild(ban);

    const clearContainer = document.createElement('div');
    clearContainer.classList.add('user-info-container');
    clearContainer.classList.add('col');
    const clear = document.createElement('button');
    clear.classList.add('btn');
    clear.classList.add('clearBtn');
    clear.classList.add('btn-action');
    clear.innerHTML = 'Clear Reports';
    clearContainer.appendChild(clear);

    infoContainer.appendChild(userLink);

    row.appendChild(banContainer);
    row.appendChild(clearContainer);
    return row;
}

function displayReport(report){
    const row = document.createElement('div');
    row.classList.add('row');

    const reporter = document.createElement('div');
    reporter.classList.add('col');
    reporter.classList.add('user-info-container');
    reporter.innerHTML = "Reporter<br>" + userLibrary.filter((user)=> user._id === report.reporter)[0].username;
    row.appendChild(reporter);

    const reportTime = document.createElement('div');
    reportTime.classList.add('col');
    reportTime.classList.add('user-info-container');
    reportTime.classList.add('flex-2');
    reportTime.innerHTML = "Report Time<br>" + report.report_time.toLocaleString();
    row.appendChild(reportTime);

    const reportCause = document.createElement('div');
    reportCause.classList.add('col');
    reportCause.classList.add('user-info-container');
    reportCause.innerHTML = "Cause<br>" + report.report_cause[0];
    row.appendChild(reportCause);

    const reportPost = document.createElement('div');
    reportPost.classList.add('col');
    reportPost.classList.add('user-info-container');
    reportPost.classList.add('flex-3');
    reportPost.classList.add('justify-content-center');
    if (report.reportCause === "reason2") {
        offensivePost = report.reportPost;
        reportPost.innerHTML = "Post Id: " + offensivePost.postId + "<br>" + offensivePost.content;
    }
    row.appendChild(reportPost);
    return row;
}


