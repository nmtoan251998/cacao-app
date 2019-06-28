const express = require('express');
const logger = require('morgan');
// .env
require('dotenv').config();

const Router = require('./routes/index.routes.js');
// Database
require('./config/mongo');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Router
app.use(Router);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));