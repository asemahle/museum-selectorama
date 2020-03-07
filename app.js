const express = require('express');
const hbs = require('hbs');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const dataRouter = require('./routes/data');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views', 'partials'));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use('/data', dataRouter);
app.use('/', indexRouter);

// ENV
process.env.BASE = __dirname;
process.env.DB = path.join(__dirname, 'db', 'users');
process.env.DBJS = path.join(__dirname, 'db', 'db');

// Database setup
const DB = require(process.env.DBJS);
const db = new DB(process.env.DB);
db.createUserTable();
db.close();

module.exports = app;
