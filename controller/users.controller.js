const bcrypt = require('bcrypt');

const User = require('../model/users.model');

module.exports.test = (req, res) => {
    res.send('Test users API');
}

module.exports.user = (req, res) => {    
    const user = req.user;
    
    res.status(200).json(user);
}

module.exports.userById = (req, res) => {
    const id = req.params.id;
    const error = {};
    
    User.findById(id)
        .then(user => {
            if(!user) {
                error.noUser = 'No user found';
                return res.status(404).json({ 
                    success: false, 
                    error
                });
            }

            res.status(200).json({ username: user.username });
        })
}

module.exports.modifyUserById = (req, res) => {
    const id = req.params.id;
    const error = {};

    User.findById(id)
        .then(user => {
            if(!user) {
                error.noUser = 'No user found';
                return res.status(404).json({ 
                    success: false,
                    error
                });
            }            

            // encode before saving to DB
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, encoded) => {
                    const modifiedData = {
                        _id: user._id,
                        accountname: user.accountname,
                        username: req.body.username,                
                        password: encoded
                    };
    
                    User.findByIdAndUpdate(id, modifiedData)
                        .then(updatedUser => res.status(200).json({
                            success: true,
                            error
                        }))
                        .catch(err => {
                            error.updateInfor = 'Failed to update user information';
                            res.status(400).json({
                                success: false,
                                error
                            })
                        });
                })                
            })                        
        })
}

module.exports.deleteUserById = (req, res) => {
    const id = req.params.id;
    const error = {};
    console.log(req.params.id);
    
    User.findById(id)
        .then(user => {            
            if(!user) {
                error.noUser = 'No user found';
                return res.status(404).json({ 
                    success: false,
                    error
                });
            }
            
            User.findByIdAndRemove(id)
                .then(deletedUser => {
                    res.status(200).json({
                        success: true,
                        error
                    })
                })
                .catch(err => {
                    error.deleteUser = 'Failed to delete user';
                    res.status(400).json({
                        success: false,
                        error
                    })
                });            
        })
        .catch(err => {
            error.deleteUser = 'Failed to delete user';
            res.status(400).json({
                success: false,
                error
            })
        })
}

module.exports.allUsers = async (req, res) => {    
    const users = await User.find();
    const error = {};

    if(!users) {
        error.noUsers = 'No users found';
        return res.status(404).json({ 
            success: false,
            error            
        });
    }

    res.status(200).json(users);    
}