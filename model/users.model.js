const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    accountname: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('users', userSchema)