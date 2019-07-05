const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const secretOrKey = process.env.privateKey || 'privateprivateprivate';

const userSchema = mongoose.Schema({
    accountname: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /[a-zA-Z]/,
        minlength: 4,
        maxlength: 20
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 128,
        trim: true
    },
    username: {
        type: String,
        required: true,
        minlength: 1,        
        trim: true
    },
    createDate: {
        type: Date,
        default: Date.now
    }
});

// Pre save hook
userSchema.pre('save', function(next) {
    const round = process.env.NODE_ENV === 'test' ? 1 : 10;

    // only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();

    if(this.password) {
        bcrypt.genSalt(round, (err, salt) => {
            if(err) next(err);

            bcrypt.hash(this.password, salt, (err, hash) => {
                if(err) next(err);

                this.password = hash;
                next();
            })
        });
    }
});

userSchema.method({
    comparePassword: function(candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.password, function(err, isMatched) {
            if(err) return cb(err);        
            cb(null, isMatched);
        });
    }
})


module.exports = mongoose.model('users', userSchema)