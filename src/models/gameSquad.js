const mongoose = require('mongoose')

const MatchSchema  = mongoose.Schema({

});

const UserSchema  = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password :{
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: "No Bio Yet"
    },
    favs : {
        type: [String]
    },
    recents : {
        type: [String]
    },
    icon: {
        type: String,
        default: "assets/images/login3.png"
    },
    match_history: {
        type: [MatchSchema]
    }
});



const AdminSchema  = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password :{
        type: String,
        required: true
    }
});

const PostSchema  = new mongoose.Schema({
    username: {
        type: UserSchema,
        required: true
    },
    post_time: {
        type: Date,
        default: Date.now
    },
    tag_champion: {
        type: String,
        required: true
    },
    tag_gameName: {
        type: MatchSchema,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    parent_post:{
        type: String,
        enum : ['Comment', 'Post'],
        required: 'Post'
    }
});

const ReportSchema = new mongoose.Schema({
    reported_username: {
        type: UserSchema,
        required: true
    },
    reporter: {
        type: UserSchema,
        required: true
    },
    report_time: {
        type: Date,
        default: Date.now
    },
    report_cause: {
        type: String,
        required: true
    }
});

const Admin = mongoose.model('Admin', AdminSchema);
const Report = mongoose.model('Report', ReportSchema);
const Post = mongoose.model('Post', PostSchema);
const User = mongoose.model('User', UserSchema);
const Match = mongoose.model('Match', MatchSchema);

module.exports = Object.freeze({ 
    Admin:Admin, 
    Report:Report,
    Post:Post,
    User:User,
    Match:Match
});