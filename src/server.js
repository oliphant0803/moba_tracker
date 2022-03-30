/* server.js, with mongodb API */
'use strict';
const log = console.log
const path = require('path')

const express = require('express')
// starting the express server
const app = express();

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

/*** GameSquad API Routes below ************************************/

//get all users
app.get('/api/users', async(req, res) => {

	log(req.body)

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

	log(req.body)

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
		icon: req.body.icon,
		match_history: []
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

//get all post in mongoose
app.get('/api/posts', async(req, res) => {

	log(req.body)

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}  

	try {
		const posts = await Post.find()
		res.send({ posts }) 
	} catch(error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}

});

app.post('/api/posts', async(req, res) => {

	log(req.body)

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
		parent_post: req.body.parent_post
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



/*********************************************************/


// Express server listening...
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port http://localhost:${port}...`)
}) 
