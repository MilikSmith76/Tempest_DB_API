var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
var cors = require('cors');
var os = require("os");

var indexRouter = require('./routes/index');
var categoryRouter = require('./routes/category');
var productCategoryRouter = require('./routes/productcategory')
var productRouter = require('./routes/product');
var productListRouter = require('./routes/productlist');
var productListProductRouter = require('./routes/productlistproduct');
var promotionRouter = require('./routes/promotion');
var promotionProductRouter = require('./routes/promotionproduct');
var usersRouter = require('./routes/user');
var imageRouter = require('./routes/image');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(cors({
  origin: ["http://localhost:4200", "http://192.168.99.100:4200"]
}));

app.use('/', indexRouter);
app.use('/api/category', categoryRouter);
app.use('/api/productcategory', productCategoryRouter)
app.use('/api/product', productRouter);
app.use('/api/productlist', productListRouter);
app.use('/api/productlistproduct', productListProductRouter);
app.use('/api/promotion', promotionRouter);
app.use('/api/promotionproduct', promotionProductRouter);
app.use('/api/user', usersRouter);
app.use('/api/image', imageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
