const User = require('../model/users.model');

module.exports.test = (req, res) => {
    res.send('Test users API');
}

module.exports.user = async (req, res) => {
    const user = req.user;
    
    res.status(200).json(user);
}

module.exports.userById = async (req, res) => {
    const id = req.params.id;
    
    User.findById(id)
        .then(user => {
            if(!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            
            res.status(200).json({ username: user.username });
        })
}

module.exports.allUsers = async (req, res) => {
    const users = await User.find();

    if(!users) {
        return res.status(404).json({ error: 'Users not found. '});
    }

    res.status(200).json(users);
}