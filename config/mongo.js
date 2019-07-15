const mongoose = require('mongoose');
const mongoURI = process.env.mongoURI || 'mongodb://localhost:27017/cacao-app';
const options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
}

mongoose.connect(mongoURI, options)
    .then(
        () => console.log('Database connection established'),
        err => {
            console.log(err);
            console.log('Database connection unestablied, error occurred')
        }
    )

module.exports = mongoose;