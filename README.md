# team47

## Instructions for using our app:

### Login/Register: 

* Login
    * If registered, input username and password, and select user type(admin or normal user)
        * Example normal user login credential: 
            * username: "Hide on Bush"
            * password: "0803"
        * Example admin user login credential:
            * username: "MasLayerKaka"
            * password: "Katherine0905"
    * If not registered, click "register" to register page

* Register
    * Input email, username, and password with selected user type to register (new registered user are not stored in phase 1)

### User views: 

* Timeline
    * Logged in user can post on this page
    * Need to select the game id and champion as tag on the top dropdown list and post content can not be empty
    * Clear button can reset user's input
    * After clicking Post button, posts will show up with status "posted now"
    * Logged in user can also comment on the existing posts
    * Clicking user name link for each post will redirect to their profile
    * each post below have their tags, contents, comments, and upload time 
    * Can filter base on users (favourite), game id, and champion.
* Dashboard
    * The search text area can search for existing users 
        * "User 1" and "User 2" are hardcoded to be searched
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
    * selecting "recent n games" allows user to pick from 1 to total number of games (currently only 5 games hardcoded)
    * The below 3 charts shows the respective champion/rune/spell winrate in recent n games which user selected.

* Other's Profile
    * Current logged in users can add "other" in favourite list by clicking the star
    * logged in user can click report and select reasons (first dropdown), and the corresponding post id
    * Displays "other"'s match history


### Admin views:

*Post Management:
    * View posts and delete posts by clicking "delete this post"
    * Can filter posts base on user, champion, and game id

*User Management:
    * Display all users
        * search button to search for a specific user
    * "View details" for each user display their report history at the bottom
    * "Clear reports" button cleans the user's match history
    * "Ban user" button will remove the user from the app system

*Game Management:
    * 

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