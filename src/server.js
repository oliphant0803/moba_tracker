/* server.js, with mongodb API */
'use strict';
const log = console.log
const path = require('path')

const express = require('express')

// starting the express server
const app = express();

const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname)));

// mongoose and mongo connection
const { mongoose } = require('../src/db/mongoose')
mongoose.set('bufferCommands', false);  // don't buffer db requests if the db server isn't connected - minimizes http requests hanging if this is the case.

// import the mongoose models
const gameSquad = require('../src/models/gameSquad.js')

const Post = gameSquad.Post
const User = gameSquad.User
const Match = gameSquad.Match
const Admin = gameSquad.Admin
const Report = gameSquad.Report

var session;

// to validate object IDs
const { ObjectID } = require('mongodb')

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser') 
app.use(bodyParser.json())

/*** Helper functions below **********************************/
function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
	return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

/*** Webpage routes below **********************************/
/// We only allow specific parts of our public directory to be access, rather than giving
/// access to the entire directory.


// static js directory
app.use("/js", express.static(path.join(__dirname, '/assets/js')))
// route for root
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/templates/index.html'))
})

app.post('/user',(req,res) => {
	session=req.session;
	session.userid=req.body.id;
	console.log(req.session)
	res.send(session);
})

app.get('/user',(req,res) => {
	res.send(session);
})

app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

app.get('/index.html', (req, res) => {
	res.sendFile(path.join(__dirname, '/templates/index.html'))
})

app.get('/register.html', (req, res) => {
	res.sendFile(path.join(__dirname, '/templates/register.html'))
})

app.get('/userPost.html', (req, res) => {
	res.sendFile(path.join(__dirname, '/templates/userPost.html'))
})

app.get('/userDashboard.html', (req, res) => {
	res.sendFile(path.join(__dirname, '/templates/userDashboard.html'))
})

app.get('/userProfile.html', (req, res) => {
	res.sendFile(path.join(__dirname, '/templates/userProfile.html'))
})

app.get('/userAnalysis.html', (req, res) => {
	res.sendFile(path.join(__dirname, '/templates/userAnalysis.html'))
})

app.get('/championAnalysis.html', (req, res) => {
	res.sendFile(path.join(__dirname, '/templates/championAnalysis.html'))
})

app.get('/otherProfile.html', (req, res) => {
	res.sendFile(path.join(__dirname, '/templates/otherProfile.html'))
})

app.get('/adminUserManagement.html', (req, res) => {
	res.sendFile(path.join(__dirname, '/templates/adminUserManagement.html'))
})

app.get('/adminPostManagement.html', (req, res) => {
	res.sendFile(path.join(__dirname, '/templates/adminPostManagement.html'))
})

app.get('/adminAddGame.html', (req, res) => {
	res.sendFile(path.join(__dirname, '/templates/adminAddGame.html'))
})

app.get('/adminManageGame.html', (req, res) => {
	res.sendFile(path.join(__dirname, '/templates/adminManageGame.html'))
})


/*** GameSquad API Routes below ************************************/

/*** user API ************************************/
//get all users
app.get('/api/users', async(req, res) => {


	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}  

	try {
		const users = await User.find()
		res.send({ users }) 
	} catch(error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}
});

//add users post request
app.post('/api/users', async(req, res) => {


	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}  

	const user = new User({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
		bio: req.body.icon,
		favs: [],
		recents: [],
		icon: req.body.icon
	})

	try {
		const result = await user.save()	
		res.send(result)
	} catch(error) {
		log(error) 
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
	}

});

//get all admins
app.get('/api/admins', async(req, res) => {


	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}  

	try {
		const admins = await Admin.find()
		res.send({ admins }) 
	} catch(error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}

});

//add admins post request
app.post('/api/admins', async(req, res) => {

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}  

	const admin = new Admin({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
	})

	try {
		const result = await admin.save()	
		res.send(result)
	} catch(error) {
		log(error) 
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
	}

});


//get user information
app.get('/api/users/:id', (req, res) => {
	// Add code here
	const id = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(404).send();
		return;
	}else if (mongoose.connection.readyState != 1) {
		log('Mongoose connection failed');
		res.status(500).send('Internal server error');
		return;
	}

	User.findById(id).then((user) => {
		if (!user) {
			res.status(404).send();
		} else {
			res.send(user);
		}
	}).catch((error) => {
		res.status(400).send(error);
	})
})

//update user profile from myprofile.html
app.put('/api/users/:id', async (req, res) => {
	
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).send('Resource not found')
		return;
	}

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	} 
	

	try {
		const user = await User.findOneAndReplace({_id: id}, req.body, {new: true, useFindAndModify: false})
		if (!user) {
			res.status(404).send()
		} else {   
			res.send(user)
		}
	} catch (error) {
		log(error) 
		if (isMongoError(error)) { 
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request')
		}
	}
})

app.get('/api/userByName/:username', async (req, res) => {

	const user = req.params.username

	if (mongoose.connection.readyState != 1) {
		log('Mongoose connection failed');
		res.status(500).send('Internal server error');
		return;
	}

	User.findOne({username:user}, function(err,obj){ 
		if (err){
			res.status(404).send(error);
		}
		else{
			res.send(obj);
		}
	})
})

app.get('/api/userFav/:matchId', async (req, res) => {
	const matchId = req.params.matchId

	if (mongoose.connection.readyState != 1) {
		log('Mongoose connection failed');
		res.status(500).send('Internal server error');
		return;
	}

	User.find({ favs: { $all: [matchId] } }, function(err,obj){ 
		if (err){
			res.status(404).send(error);
		}
		else{
			res.send(obj);
		}
	})
})

/*** match API ************************************/
//get all matches
app.get('/api/matches', async(req, res) => {
	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}  
	try {
		const matches = await Match.find()
		res.send({ matches }) 
	} catch(error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}
});

app.get('/api/matches/:matchname', async(req, res) => {
	const matchname = req.params.matchname;
	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}  
	Match.findOne( { match_name:matchname }, function(err,obj){ 
		if (err){
			res.status(404).send(error);
		}
		else{
			res.send(obj);
		}
	})
});

//add match post request
app.post('/api/matches', async(req, res) => {

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}  

	const match = new Match({
		match_name: req.body.match_name,
		add_time: req.body.add_time,
		userA: req.body.userA,
		userB: req.body.userB,
		championA: req.body.championA,
		championB: req.body.championB,
		win: req.body.win,
		kdaA: req.body.kdaA,
		kdaB: req.body.kdaB,
		runeA: req.body.runeA,
		runeB: req.body.runeB,
		summonerA: req.body.summonerA,
		summonerB: req.body.summonerB,
		buildA: req.body.buildA,
		buildB: req.body.buildB
	})

	try {
		const result = await match.save()	
		res.send(result)
	} catch(error) {
		log(error) 
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
	}

});

//find matches for a specific player 
app.get('/api/matches/player/:id', (req, res) => {
	// Add code here
	const playerid = req.params.id;

	if (mongoose.connection.readyState != 1) {
		log('Mongoose connection failed');
		res.status(500).send('Internal server error');
		return;
	}

	Match.find( { $or:[{userA: playerid}, {userB: playerid}] }, function(err,obj){ 
		if (err){
			res.status(404).send(error);
		}
		else{
			res.send(obj);
		}
	})
})

//delete specific match by match id
app.delete('/api/matches/:name', async (req, res) => {
	const name = req.params.name

	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	} 

	try {
		//remove match
		const match = await Match.findOneAndDelete({match_name: name});
		console.log(match)
		if (!match) {
			res.status(404).send('Resource not found') 
			return;
		} 
		res.send(match)
		
	} catch(error) {
		log(error) 
		res.status(500).send('Internal server error')
	}
})


/*** post API ************************************/

//get all post in mongoose
app.get('/api/posts', async(req, res) => {
	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}  

	await Post.find({}).sort({post_time: -1}).exec((err, obj) => { 
		if (err){
			res.status(404).send(error);
		}
		else{
			res.send(obj);
		}
	});

});

//find posts of sepecific name
app.get('/api/posts/:id', (req, res) => {
	// Add code here
	const postName = req.params.id;

	if (mongoose.connection.readyState != 1) {
		log('Mongoose connection failed');
		res.status(500).send('Internal server error');
		return;
	}

	Post.findOne({postname : postName}, function(err,obj){ 
		if (err){
			res.status(404).send(error);
		}
		else{
			res.send(obj);
		}
	})
})

//find post by id
app.get('/api/post/:id', (req, res) => {
	// Add code here
	const id = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(404).send();
		return;
	}else if (mongoose.connection.readyState != 1) {
		log('Mongoose connection failed');
		res.status(500).send('Internal server error');
		return;
	}

	Post.findById(id).then((post) => {
		if (!post) {
			res.status(404).send();
		} else {
			res.send(post);
		}
	}).catch((error) => {
		res.status(400).send(error);
	})
})


//find posts of posted by a user or commented
app.get('/api/posts/user/:id', (req, res) => {
	// Add code here
	const user = req.params.id;

	if (mongoose.connection.readyState != 1) {
		log('Mongoose connection failed');
		res.status(500).send('Internal server error');
		return;
	}

	Post.find({username: user}, function(err,obj){ 
		if (err){
			res.status(404).send(error);
		}
		else{
			res.send(obj);
		}
	})
})

app.post('/api/posts', async(req, res) => {
	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}  

	const post = new Post({
		username: req.body.username,
		post_time: req.body.post_time,
		tag_champion: req.body.tag_champion,
		tag_gameName: req.body.tag_gameName,
		content: req.body.content,
		parent_post: req.body.parent_post,
		postname: req.body.postname
	})

	try {
		const result = await post.save()	
		res.send(result)
	} catch(error) {
		log(error) 
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
	}

});

/**************Report API********************/
//get all reports in mongoose
app.get('/api/reports', async(req, res) => {


	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}  

	try {
		const reports = await Report.find()
		res.send({ reports }) 
	} catch(error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}
});

//add reports request
app.post('/api/reports', async(req, res) => {


	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}  

	const report = new Report({
		reported_username: req.body.reported_username,
		reporter: req.body.reporter,
		report_time: req.body.report_time,
		report_cause: req.body.report_cause,
		report_addition: req.body.report_addition 
	})

	try {
		const result = await report.save()	
		res.send(result)
	} catch(error) {
		log(error) 
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
	}

});
/*********************************************************/


// Express server listening...
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port http://localhost:${port}...`)
}) 

