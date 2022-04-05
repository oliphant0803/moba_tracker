# team47

## Requirements:

**Server:** 

The web app is already deployed on Heroku, simply visit https://timi-game-squad.herokuapp.com/ for the entire application.

**Run locally (local setup):**

You can enjoy full functionalities through the URL https://timi-game-squad.herokuapp.com/, but if you want to run our application locally. Here is the instruction.

1. Open the terminal and type the following three commands

```shell

# install in root directory /team47

npm install

# run express app

npm start

# alternative

node server.js

```

2. For database, open a new terminal and type the following commands

```shell

mkdir mongo-data

mongod --dbpath mongo-data

```

**Admin:**

Anyone can be registered as admin user in Register page

## Overview of routes:

### A route to login and create a session (/user)

Post request for updating current logged in user.


### A route to check if a user is logged in on the session (/user)

Get request for the logged in user and redirect back if log in failed (401)

### A route to login and create a session (/admin)

Post request for updating current logged in admin.


### A route to check if a user is logged in on the session (/admin)

Get request for the logged in admin and redirect back if log in failed (401)

### Get Request for all users (/api/users)

Return a list of user objects from database

Expected return example:

```shell
{
    "users": [
        {
            "_id": "62436866d4cc88a03be4de21",
            "username": "user1",
            "email": "user1@gmail.com",
            "password": "user1",
            "bio": "Go Gamers!",
            "favs": [ ],
            "recents": [ ],
            "icon": "assets/images/login3.png"
        },
        {
            ...
        },
        {
            ...
        } 
    ]
}
```

### Post request for add one user to users database (/api/users)

Expected request format:

```shell
{
    "username": "user10",
    "email": "user10@gamil.com",
    "password": "user10"
}
```

### Post requests for getting all admins from database (/api/admins)

Expected return format:

```shell
{
    "admins": [
        {
            "_id": "6244a64a88a7f7442e755a62",
            "username": "admin1",
            "email": "admin1@gmail.com",
            "password": "admin1",
            "__v": 0
        },
        {
            "_id": "624a3bea49a23a64f34578c3",
            "username": "admin2",
            "email": "admin2@gmail.com",
            "password": "admin2",
            "__v": 0
        }
    ]
}
```

### Get requests for adding one admin to the database (/api/admins)

Expected request format:

```shell
{
    "username": "admin10",
    "email": "admin10@gamil.com",
    "password": "admin10"
}
```

### Get request for one user information given user id (/api/users/:id)

get "api/users/62436866d4cc88a03be4de21"

Expected return format:

```shell
{
    "_id": "62436866d4cc88a03be4de21",
    "username": "user1",
    "email": "user1@gmail.com",
    "password": "user1",
    "bio": "No bio yet",
    "favs": [],
    "recents": [],
    "icon": "assets/images/login3.png"
}
```

### Put request for updating one user information given user id (/api/users/:id)

put "api/users/62436866d4cc88a03be4de21"

Expected request format:

```shell
{
    "username": "user1",
    "email": "user1@gmail.com",
    "password": "user1",
    "bio": "Go Gamers!",
    "favs": [
        "62436914d4cc88a03be4de24"
    ],
    "recents": [
        "62436914d4cc88a03be4de24",
        "624c830e053031e159205076",
        "624c839b053031e159205082"
    ],
    "icon": "assets/images/login3.png"
}
```

### Delete one user by user id (/api/users/:id)

example: delete "/api/users/62436866d4cc88a03be4de21"


### Get request for one user information given user name (/api/userByName/:username)

get "/api/userByName/user1"

Expected return format:

```shell
{   
    "_id": "62436866d4cc88a03be4de21",
    "username": "user1",
    "email": "user1@gmail.com",
    "password": "user1",
    "bio": "Go Gamers!",
    "favs": [
        "62436914d4cc88a03be4de24"
    ],
    "recents": [
        "62436914d4cc88a03be4de24",
        "624c830e053031e159205076",
        "624c839b053031e159205082"
    ],
    "icon": "assets/images/login3.png"
}
```

### Get request for all matches from database (/api/matches)

Expected return format:

```shell
{   
    "matches": [
        {
            "_id": "624a4bfacddd3a9ec1e7003d",
            "match_name": "game1",
            "add_time": "2022-04-04T01:37:59.784Z",
            "userA": "62436866d4cc88a03be4de21",
            "userB": "62436914d4cc88a03be4de24",
            "championA": "19",
            "championB": "17",
            "win": "62436866d4cc88a03be4de21",
            "kdaA": [5,1,2],
            "kdaB": [2,5,1],
            "runeA": ["11","8"],
            "runeB": ["10","6"],
            "summonerA": ["8","4"],
            "summonerB": ["6","2"],
            "buildA": ["35","34","33","32","31","30"],
            "buildB": ["35","29","23","17","14","8"],
            "__v": 0
        },
        {...}, {...}, {...}
}
```

### Post request for adding one match to database (/api/matches)

Expected request format:

```shell
{   
    "match_name": "game1",
    "add_time": "2022-04-04T01:37:59.784Z",
    "userA": "62436866d4cc88a03be4de21",
    "userB": "62436914d4cc88a03be4de24",
    "championA": "19",
    "championB": "17",
    "win": "62436866d4cc88a03be4de21",
    "kdaA": [5,1,2],
    "kdaB": [2,5,1],
    "runeA": ["11","8"],
    "runeB": ["10","6"],
    "summonerA": ["8","4"],
    "summonerB": ["6","2"],
    "buildA": ["35","34","33","32","31","30"],
    "buildB": ["35","29","23","17","14","8"]
}
```

### Get request for match information by match name (/api/matches/:matchname)

get "/api/matches/game1"

Expected return format:

```shell
{   
    "_id": "624a4bfacddd3a9ec1e7003d",
    "match_name": "game1",
    "add_time": "2022-04-04T01:37:59.784Z",
    "userA": "62436866d4cc88a03be4de21",
    "userB": "62436914d4cc88a03be4de24",
    "championA": "19",
    "championB": "17",
    "win": "62436866d4cc88a03be4de21",
    "kdaA": [5,1,2],
    "kdaB": [2,5,1],
    "runeA": ["11","8"],
    "runeB": ["10","6"],
    "summonerA": ["8","4"],
    "summonerB": ["6","2"],
    "buildA": ["35","34","33","32","31","30"],
    "buildB": ["35","29","23","17","14","8"]
}
```

### Get request to find matches/game for a specfic player by id (/api/matches/player/:id)

get "/api/matches/player/62436914d4cc88a03be4de24"

Expected return format:

```shell
{   
    {
        "_id": "624a4bfacddd3a9ec1e7003d",
        "match_name": "game1",
        "add_time": "2022-04-04T01:37:59.784Z",
        "userA": "62436866d4cc88a03be4de21",
        "userB": "62436914d4cc88a03be4de24",
        "championA": "19",
        "championB": "17",
        "win": "62436866d4cc88a03be4de21",
        "kdaA": [5,1,2],
        "kdaB": [2,5,1],
        "runeA": ["11","8"],
        "runeB": ["10","6"],
        "summonerA": ["8","4"],
        "summonerB": ["6","2"],
        "buildA": ["35","34","33","32","31","30"],
        "buildB": ["35","29","23","17","14","8"]
    },
    {...}
}
```
 
### Delete a match from database given name (/api/matches/:name)

delete "/api/matches/game1"

### Get all posts from database by desending order to posting time (/api/posts)

expected return format: array of posts object

```shell
[
    {
        "_id": "624c888a053031e1592051b7",
        "username": "62436866d4cc88a03be4de21",
        "post_time": "2022-04-05T18:20:58.296Z",
        "tag_champion": "champion3",
        "tag_gameName": "game2",
        "content": "Well Played!",
        "parent_post": "624c886e053031e15920518b",
        "__v": 0
    },
    {
        ...
    },
    {
        ...
    },
    {
        ...
    },
    {
        "_id": "624c83c8053031e15920508c",
        "username": "62436866d4cc88a03be4de21",
        "postname": "post1",
        "post_time": "2022-04-05T18:00:40.826Z",
        "tag_champion": "champion19",
        "tag_gameName": "game1",
        "content": "This is my first post on game 1 champion 19",
        "parent_post": "parent",
        "__v": 0
    }
]
```

### Get request for find posts of sepecific name (not comment)(/api/posts/:name)

get "api/posts/post1"

```shell
{
    "_id": "624c83c8053031e15920508c",
    "username": "62436866d4cc88a03be4de21",
    "postname": "post1",
    "post_time": "2022-04-05T18:00:40.826Z",
    "tag_champion": "champion19",
    "tag_gameName": "game1",
    "content": "This is my first post on game 1 champion 19",
    "parent_post": "parent",
    "__v": 0
}
```

### Get request for find post by id (including comment)(/api/post/:id)

get "api/post/624c83c8053031e15920508c"

```shell
{
    "_id": "624c83c8053031e15920508c",
    "username": "62436866d4cc88a03be4de21",
    "postname": "post1",
    "post_time": "2022-04-05T18:00:40.826Z",
    "tag_champion": "champion19",
    "tag_gameName": "game1",
    "content": "This is my first post on game 1 champion 19",
    "parent_post": "parent",
    "__v": 0
}
```

### Get request to find post of posted by a user or commented ('/api/posts/user/:id')

get "api/posts/user/62436914d4cc88a03be4de24"

```shell
[
    {
        "_id": "624c886e053031e15920518b",
        "username": "62436914d4cc88a03be4de24",
        "postname": "How did I lose",
        "post_time": "2022-04-05T18:20:30.820Z",
        "tag_champion": "champion3",
        "tag_gameName": "game2",
        "content": "How did I lose this?! Great game tho.",
        "parent_post": "parent",
        "__v": 0
    }
]
```

### Post request to add post into database ('/api/posts')

Expected request format:

```shell
{
    "username": "62436914d4cc88a03be4de24",
    "postname": "How did I lose",
    "tag_champion": "champion3",
    "tag_gameName": "game2",
    "content": "How did I lose this?! Great game tho.",
    "parent_post": "parent"
}
```

### Delete a post by its id ('/api/posts/:id')

delete ('/api/posts/624c886e053031e15920518b')

### Delete a report by its id ('/api/reports/:id')

delete ('/api/reports/624a3c3949a23a64f345791a')

### Get request for all report information ('/api/reports')

Expected return format:

```shell
{
    "reports": [
        {
            "_id": "624a3c3949a23a64f345791a",
            "reported_username": "62436914d4cc88a03be4de24",
            "reporter": "62436866d4cc88a03be4de21",
            "report_time": "2022-04-04T00:30:49.263Z",
            "report_cause": [
                "Inappropriate Name",
                "user2"
            ],
            "report_addition": "explan1",
            "__v": 0
        },
        {
            "_id": "624a3c4549a23a64f345791c",
            "reported_username": "62436914d4cc88a03be4de24",
            "reporter": "62436866d4cc88a03be4de21",
            "report_time": "2022-04-04T00:31:01.422Z",
            "report_cause": [
                "Offensive Post",
                ""
            ],
            "report_addition": "hehe",
            "__v": 0
        }
    ]
}
```

### Post request to add report of a user by reporter into database ('/api/reports')

Expected request format:

```shell
{
    "reported_username": userid,
    "reporter": loggedin user id,
    "report_cause": ["", ""],
    "report_addition": ""
}
```

## Instructions for using our app:

### Login/Register: 

* Login
    * If registered, input username and password, and select user type(admin or normal user)
        * Example normal user login credential: 
            * username: "user1"
            * password: "user1"
        * Example admin user login credential:
            * username: "admin1"
            * password: "admin1"
    * If not registered, click "register" to register page

* Register
    * Input email, username, and password with selected user type to register

### User views: 

* Timeline/Forum
    * Logged in user can post on this page
    * Need to select the game id and champion as tag on the top dropdown list and post content can not be empty
    * Clear button can reset user's input
    * After clicking Post button, posts will show up with status "posted now"
    * Logged in user can also comment on the existing posts
    * Clicking user name link for each post will redirect to their profile
    * Clicking the posts' champion tags and game tags show additional details
    * Can filter base on users (favourite), game id, and champion.
* Search
    * The search text area can search for existing users 
        * "User1" and "User2" are hardcoded to be searched
        * other inputs will result in alert of username not found
    * below displays the logged in user's recent searches (makes checking other's profile easier)
    * click "Favourite" displays the logged in user's favourite users (which can be used as filter for analysis and posts)
* My Profile
    * add themself in favourite list by clicking the star
    * "Edit profile" button allow users to change their name and quote, click "save" to save the changes
    * "Change Icon" button allow users to select images from file and click "update" will change the icon
    * Displays logged in user's match history

* Champion Analysis
    * Selecting the two champions will display:
        * champion pick rate
        * champion win rate 
        * champion discuss rate (tagged in posts or comments)
        * champion average kda (kill, death, assists ratio calculated from all matches with this particular champion)
    

* My Analysis
    * displays the general analysis for all matches on the top
    * selecting "recent n games" allows user to pick from 1 to total number of games
    * The below 3 charts shows the respective champion/rune/spell winrate in recent n games which user selected.

* Other's Profile
    * Current logged in users can add "other" in favourite list by clicking the star
    * logged in user can click report and select reasons (first dropdown), and the corresponding post id
    * Displays "other"'s match history by that player's id shown in URL


### Admin views:

* Post Management:
    * View posts and delete posts by clicking "delete this post"
    * Can filter posts base on user, champion, and game id

* User Management:
    * Display all users
        * search button to search for a specific user
    * "View details" for each user display their report history at the bottom
    * "Clear reports" button cleans the user's match history
    * "Delete user" button will remove the user from the app system

* Add Games:
    * Add 2 users that played a game, includes their champions, runes, summoners, items and performance in the game.
      * Use "Submit" to upload the new game
    * Will update the new game in the database

* Game Management:
    * Show all games in the database.
      * Use "Check details" to see the complete game history
      * Use "Delete" to delete a game from the database
    * Can search for specific games using game id or key words for game name

* User Profile
    * Displays a user's match history by that player's id shown in URL

### Other views:

* 404 Not found:
    * When user/admin tries to access a page that doesn't exist, a page showed up displaying "404 Not Found".

## Third-party libraries/frameworks:

### bootstrap v4.5
documentation: https://getbootstrap.com/docs/4.5/getting-started/introduction/

https://code.jquery.com/jquery-3.5.1.slim.min.js
https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js
https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js

### chart.js v2.5.0
https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.js

## Citations: (images used)

images from images/items folder: https://leagueoflegends.fandom.com/wiki/Item_(League_of_Legends)

images from images/runes folder: https://leagueoflegends.fandom.com/wiki/Rune

images from images/summoners folder: https://leagueoflegends.fandom.com/wiki/Summoner_spell

images/login1.png: https://support-leagueoflegends.riotgames.com/hc/article_attachments/4415714651795/Icons_Loot_Firecracker2022_Bag_01_Final.png

images/login2.png: https://support-leagueoflegends.riotgames.com/hc/article_attachments/4415714649107/Icons_Loot_Firecracker2022_Orb_Final.png

images/login3.png: https://hero.fandom.com/wiki/Teemo

images/tiger1.png: https://support-leagueoflegends.riotgames.com/hc/article_attachments/4415709925907/FirecrackerWardSkin_Final.png
