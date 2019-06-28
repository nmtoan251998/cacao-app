const jwt = require('jsonwebtoken');

const secretOrKey = process.env.privateKey;

module.exports.generateJWTToken = (req, res, next, id) => {
    // if(!req.user) {
    //     const token = jwt.sign()
    // }
    console.log(id);
    next();
}