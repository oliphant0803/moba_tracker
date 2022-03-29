
const mongoose = require('mongoose')

// Get the URI of the local database, or the one specified on deployment.
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://rachel:team47@csc309.ywd8x.mongodb.net/GameSquadAPI' || 'mongodb://localhost:27017/GameSquadAPI'

// 'mongodb+srv://rachel:team47@csc309.ywd8x.mongodb.net/GameSquadAPI' 

mongoose.connect(mongoURI, 
    { useNewUrlParser: true, useUnifiedTopology: true})
    .catch((error) => { 
        console.log('Error connecting to mongodb. Timeout reached.') 
        console.log(error) 
    })
;

module.exports = { mongoose }