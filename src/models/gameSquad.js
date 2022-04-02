const mongoose = require('mongoose')


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
    }
});

const MatchSchema  = mongoose.Schema({
    match_name: {
        type: String,
        unique: true,
        required: true
    },
    add_time: {
        type: Date,
        default: Date.now
    },
    userA: {
        type: String,
        required: true,
    },
    userB: {
        type: String,
        required: true,
    },
    championA:{
        type: String,
        required: true,
    },
    championB:{
        type: String,
        required: true,
    },
    win: {
        type: String, //user Schema
        required: true,
    },
    kdaA: {
        type: [Number],
        required: true,
    },
    kdaB: {
        type: [Number],
        required: true,
    },
    runeA: {
        type: [String],
        required: true,
    },
    runeB: {
        type: [String],
        required: true,
    },
    summonerA:{
        type: [String],
        required: true,
    },
    summonerB:{
        type: [String],
        required: true,
    },
    buildA:{
        type: [String],
        required: true,
    },
    buildB:{
        type: [String],
        required: true,
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
        type: String, //user schema
        required: true
    },
    postname: {
        type: String,
        unique: true
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
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    parent_post:{
        type: String,
        default: "parent"
    }
});

const ReportSchema = new mongoose.Schema({
    reported_username: {
        type: String, //user Schema
        required: true
    },
    reporter: {
        type: String, //user Schema
        required: true
    },
    report_time: {
        type: Date,
        default: Date.now
    },
    report_cause: {
        type: [String],
        required: true
    },
    report_addition: {
        type: String
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