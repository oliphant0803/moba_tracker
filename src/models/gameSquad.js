const mongoose = require('mongoose')

const User = mongoose.model('User',{
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
    icon: {
        type: String,
        default: "assets/images/login3.png"
    },
    match_history: [Match]
});

const Match = mongoose.model('Match', {

});

const Admin = mongoose.model('Admin', {
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

const Post = mongoose.model('Post', {
    username: {
        type: User,
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
        type: Match,
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

const Report = mongoose.model('Report', {
    reported_username: {
        type: User,
        required: true
    },
    reporter: {
        type: User,
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

module.exports = { 
    Admin, 
    Report,
    Post,
    User,
    Match
};