window.onload = init;
function init(){
    const search = document.querySelector('.searchBut');
    search.addEventListener('click', searchAction);

    resultSection = document.querySelector('#result-container');
    resultSection.addEventListener('click', userReport);

    reportSection = document.querySelector('#report-container');
    reportSection.addEventListener('click', userManage);

    displaySearchSection();
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

//hard coded value for tag game id, champion, and posts
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
    content: "Bad Things"
}

const post2={
    postId: 2,
    time: new Date("2021-9-16 12:00:00"),
    userName: "User 2",
    userProfile: "../assets/images/login3.png",
    gameTag: 3,
    champTag: "Champion 2",
    content: "Content Content Content Content Content Content Content"
}

const post3={
    postId: 3,
    time: new Date("2022-1-1 13:30:58"),
    userName: "User 1",
    userProfile: "../assets/images/login3.png",
    gameTag: 4,
    champTag: "Champion 1",
    content: "Bad Things Bad Things Bad Things Bad Things Bad Things "
}

posts = [post1, post2, post3]

const users = [
    {
        username: 'User 1',
        userId: 1,
        profilePic:'../assets/images/tiger1.png'
    },
    {
        username: 'User 2',
        userId: 2,
        profilePic:'../assets/images/tiger1.png'
    },
    {
        username: 'User 3',
        userId: 3,
        profilePic:'../assets/images/tiger1.png'
    }
];

var reports = [
    {
        reporterId:2,
        reportTime: new Date("2022-1-5 13:30:58"),
        userId: 1,
        reportCause: 'Offensive Post',
        reportPost: post3
    },
    {
        reporterId:1,
        reportTime: new Date("2022-1-3 13:30:58"),
        userId: 2,
        reportCause: 'Inappropriate Name',
        reportPost: null
    },
    {
        reporterId:3,
        reportTime: new Date("2022-1-4 13:30:58"),
        userId: 1,
        reportCause: 'Offensive Post',
        reportPost: post1
    },
    {
        reporterId:3,
        reportTime: new Date("2022-1-5 13:30:58"),
        userId: 1,
        reportCause: 'Offensive Post',
        reportPost: post3
    }
];

function searchAction(e){
    e.preventDefault();
    //console.log("search user");
    const searchUsername = document.querySelector('#search').value;
    for (var i = resultSection.children.length - 1; i >= 0; i--) {
        resultSection.children[i].remove();
    }
    for (var i = users.length - 1; i >= 0; i--) {
        if (users[i].username == searchUsername){
            displayUser(users[i]);
        }
    }

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
    img.src = user.profilePic;
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
    const userReports = reports.filter(reportUser => reportUser.userId === user.userId);
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
        var c = report.reportCause;
        if (cause[report.reportCause] !== undefined){
            cause[report.reportCause] = cause[report.reportCause] + 1;
        } else {
            cause[report.reportCause] = 0;
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
        const username = e.target.parentElement.parentElement.children[0].children[1].innerHTML;
        const targetUser = users.filter(user => user.username === username);
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
        displaySearchSection();
        displayReportSection(targetUser[0]);
    }
}

function displaySearchSection(userReports){
    clearReportSection();
    for (var i = resultSection.children.length - 1; i >= 0; i--) {
        resultSection.children[i].remove();
    }
    for(let i = 0; i< users.length; i++){
        displayUser(users[i]);
    }
}

function clearReportSection(){
    for (var i = reportSection.children.length - 1; i >= 0; i--) {
        reportSection.children[i].remove();
    }

}

function displayReportSection(user){
    const userReports = reports.filter(reportUser => reportUser.userId === user.userId);
    clearReportSection();
    displayReportedUser(user);
    for(let i = 0; i< userReports.length; i++){
        displayReport(userReports[i]);
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
    row.appendChild(infoContainer);


    const imgContainer = document.createElement('div');
    imgContainer.classList.add('user-img-container');
    const img = document.createElement('img');
    img.src = user.profilePic;
    img.classList.add("img-profile");
    imgContainer.appendChild(img);

    const userLink = document.createElement('a');
    userLink.classList.add('username');
    userLink.classList.add('justify-content-start');
    userLink.href = "https://github.com/csc309-winter-2022/team47"
    userLink.innerHTML = user.username;

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

    infoContainer.appendChild(imgContainer);
    infoContainer.appendChild(userLink);

    row.appendChild(banContainer);
    row.appendChild(clearContainer);

    reportSection.appendChild(row);
}

function displayReport(report){
    const row = document.createElement('div');
    row.classList.add('row');

    const reporter = document.createElement('div');
    reporter.classList.add('col');
    reporter.classList.add('user-info-container');
    reporter.innerHTML = "Reporter<br>" + report.reporterId;
    row.appendChild(reporter);

    const reportTime = document.createElement('div');
    reportTime.classList.add('col');
    reportTime.classList.add('user-info-container');
    reportTime.classList.add('flex-2');
    reportTime.innerHTML = "Report Time<br>" + report.reportTime.toLocaleString();
    row.appendChild(reportTime);

    const reportCause = document.createElement('div');
    reportCause.classList.add('col');
    reportCause.classList.add('user-info-container');
    reportCause.innerHTML = "Cause<br>" + report.reportCause;
    row.appendChild(reportCause);

    const reportPost = document.createElement('div');
    reportPost.classList.add('col');
    reportPost.classList.add('user-info-container');
    reportPost.classList.add('flex-3');
    reportPost.classList.add('justify-content-center');
    if (report.reportCause === "Offensive Post") {
        offensivePost = report.reportPost;
        reportPost.innerHTML = "Post Id: " + offensivePost.postId + "<br>" + offensivePost.content;
    }
    row.appendChild(reportPost);
    reportSection.appendChild(row);
}


