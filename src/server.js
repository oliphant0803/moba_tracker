/* server.js, with mongodb API */
'use strict';
const log = console.log
const path = require('path')

const express = require('express')
// starting the express server
const app = express();

app.use("/", express.static(path.join(__dirname)));

// mongoose and mongo connection
const { mongoose } = require('../src/db/mongoose.js')
mongoose.set('bufferCommands', false);  // don't buffer db requests if the db server isn't connected - minimizes http requests hanging if this is the case.

// import the mongoose models
const { gameSquad } = require('../src/models/gameSquad.js')


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

/*********************************************************/

// Express server listening...
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port http://localhost:${port}...`)
}) 

