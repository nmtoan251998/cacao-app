const bcrypt = require('bcrypt');

const User = require('../model/users.model');

const {
    validateModifyInput
} = require('../validation/users.validate');

module.exports.test = (req, res) => {
    res.send('Test users API');
}

module.exports.user = (req, res) => {
    const user = req.user;

    if(!user) {
        return res.status(401).json({
            success: false,                    
            msg: 'Invalid auth token'
        })
    }
    
    res.status(200).json(user);
}

module.exports.userById = (req, res) => {
    const id = req.params.id;
    
    User.findById(id)
        .then(user => {
            if(!user) {
                return res.status(404).json({ 
                    success: false, 
                    msg: 'User not found' 
                });
            }

            res.status(200).json({ username: user.username });
        })
}

module.exports.modifyUserById = (req, res) => {
    const id = req.params.id;

    const error = validateModifyInput(req.body);

    if(Object.keys(error).length > 0) {
        return res.status(400).json(error);
    }
        
    User.findById(id)
        .then(user => {
            if(!user) {
                return res.status(404).json({ error: 'User not found' });
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
                            msg: 'Updated user'
                        }))
                        .catch(err => res.status(400).json({
                            success: false,
                            error: 'Fail to update user information'
                        }));
                })                
            })                        
        })
}

module.exports.deleteUserById = (req, res) => {
    const id = req.params.id;
    
    User.findById(id)
        .then(user => {
            if(!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            
            User.findByIdAndRemove(id)
                .then(deleteedUser => res.status(200).json({
                    success: true,
                    msg: 'Deleted user'
                }))
                .catch(err => res.status(400).json({
                    success: false,
                    error: 'Fail to delete user information'
                }));            
        })
}

module.exports.allUsers = async (req, res) => {    
    const users = await User.find();

    if(!users) {
        return res.status(404).json({ error: 'Users not found. '});
    }

    res.status(200).json(users);    
}