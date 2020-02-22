var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

logger.token('membership', function (req, res) { 
    return !!req.headers['membership'] ? req.headers['membership']: 'n/a'
})

app.use(
    logger(':date[iso] GMT :method :status :response-time ms size: :res[content-length]\t :url key: :membership', {
        skip: function (req, res) {
            return '/health' == req.path 
        }
      })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.disable('etag');
module.exports = app;
