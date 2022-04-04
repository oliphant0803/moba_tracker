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
    loadData()
}

function loadData(){
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
                        postLibrary = json
                        currentResult = []
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
    userLink.href = "/admin/user-profile?id="+user._id;
    userLink.innerHTML = user.username;

    const report = document.createElement('div');
    report.classList.add('col');
    report.classList.add('user-info-container');
    const userReports = reportLibrary.filter((report) => report.reported_username === user._id);
    report.innerHTML = "Report Time<br>" + findReportTime(userReports);

    const cause = document.createElement('div');
    cause.classList.add('col');
    cause.classList.add('user-info-container');
    cause.classList.add('text-left');
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
    // check if link was clicked, otherwise do nothing.
    if (e.target.classList.contains('username')) {
        window.location.href=e.target.href;
    }
    // check if return button was clicked, otherwise do nothing.
    if (e.target.classList.contains('banBtn')) {
        //console.log("Try ban a user")
        const userId = e.target.parentElement.parentElement.children[0].children[0].innerHTML;
        if (window.confirm('Are you sure to delete this user? All related posts, reports and games will also be deleted. Press OK to proceed.')) {
            deleteUser(userId)
            loadData()
        }
    }
    if (e.target.classList.contains('clearBtn')) {
        const userId = e.target.parentElement.parentElement.children[0].children[0].innerHTML;
        if (window.confirm('Are you sure to delete all reports of this user? Press OK to proceed.')) {
            deleteReport(userId)
            loadData()
        }
    }
    
}

function deleteUser(user_id){
    const url = '/api/users/' + user_id
    fetch('api/users').then((res) => {
            if (res.status === 200) {
                return res.json();
            }
            else{
                alert('Could not get users');
            }
        }).then((json) => {
            userLibrary = json.users
            
            const request = new Request(url, {
            method: 'delete', 
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            });

            fetch(request)
            .then(function(res) {
                if (res.status === 200) {
                    currentResult = currentResult.filter((user) => user._id !== user_id)
                    gameLibrary = gameLibrary.filter((user) => user._id !== user_id)
                    alert('Deleted successfully!')
                    location.reload()
                } else {    
                    alert('Deleted cannot be completed. Please try again.')
                    location.reload()
                }
            }).catch((error) => {
                console.log(error)
            })

        }).catch((error) => {
            console.log(error)
        })
}


function deleteReport(user_id){
    const url = '/api/reports/' + user_id
    fetch('api/users').then((res) => {
            if (res.status === 200) {
                return res.json();
            }
            else{
                alert('Could not get users');
            }
        }).then((json) => {
            userLibrary = json.users
            
            const request = new Request(url, {
            method: 'delete', 
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            });

            fetch(request)
            .then(function(res) {
                if (res.status === 200) {
                    alert('Report cleared successfully!')
                    location.reload()
                } else {    
                    alert('Action cannot be completed. Please try again.')
                    location.reload()
                }
            }).catch((error) => {
                console.log(error)
            })

        }).catch((error) => {
            console.log(error)
        })
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
        if (userReports[i].report_cause[0] !== "Inappropriate Name"){
            report.insertAdjacentElement("afterend", displayReportDetail(userReports[i]))
        }
    }
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
    ban.innerHTML = 'Delete User';
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
    row.classList.add('text-dark');

    const reporter = document.createElement('div');
    reporter.classList.add('col');
    reporter.classList.add('user-report-title-container');
    reporter.innerHTML = "Reporter<br>"
         + userLibrary.filter((user)=> user._id === report.reporter)[0].username;
    row.appendChild(reporter);

    const reportTime = document.createElement('div');
    reportTime.classList.add('col');
    reportTime.classList.add('user-report-title-container');
    reportTime.classList.add('flex-2');
    reportTime.innerHTML = "Report Time<br>" + (new Date(report.report_time)).toLocaleString();
    row.appendChild(reportTime);

    const reportCause = document.createElement('div');
    reportCause.classList.add('col');
    reportCause.classList.add('user-report-title-container');
    reportCause.innerHTML = "Cause<br>" + report.report_cause[0];
    row.appendChild(reportCause);

    const reportAdd = document.createElement('div');
    reportAdd.classList.add('col');
    reportAdd.classList.add('flex-3');
    reportAdd.classList.add('user-report-title-container');
    reportAdd.classList.add('justify-content-center');
    if (report.report_addition === ""){
        reportAdd.innerHTML = "Explanation<br>None"
    } else {
        reportAdd.innerHTML = "Explanation<br>" + report.report_addition;
    }
    row.appendChild(reportAdd);
    
    return row;
}

function displayReportDetail(report){
    const reportPost = document.createElement('div');
    if (report.report_cause[0] === "Offensive Post") {
        console.log(postLibrary)
        const post = postLibrary.filter((post)=> post._id === report.report_cause[1])[0];
        reportPost.classList.add('row');
        reportPost.classList.add('flex-3');
        reportPost.classList.add('user-report-content-container');
        reportPost.classList.add('justify-content-center');
        reportPost.innerHTML = "Post Title: " + post.postname + "<br>" + post.content;
    } else if (report.report_cause[0] === "Bad Performance"){
        const game = gameLibrary.filter((game)=> game._id === report.report_cause[1])[0];
        reportPost.classList.add('row');
        reportPost.classList.add('flex-3');
        reportPost.classList.add('user-report-content-container');
        reportPost.classList.add('justify-content-center');
        reportPost.innerHTML = "Game Title: " + game.match_name + "<br> Game ID: " + game._id;
    }
    return reportPost;
}


