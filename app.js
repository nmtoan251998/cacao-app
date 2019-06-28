const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const Router = require('./routes/index.routes.js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Router
app.use(Router);

// Database
require('./config/mongo');

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));