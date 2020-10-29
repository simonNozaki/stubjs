"use strict";

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const log4js = require("./util/logger");

var indexRouter = require("./routes/index");
var configParser = require("./util/config-parser");
var config = configParser.parseConfig();
var appConst = require("./const/app-const");
var stdoutstr = appConst.STD_OUT_CONST;
var cors = require("cors");

//-----------------------
// Middlewares
//-----------------------
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// CORSを許可
if(config.allowCors){
  app.use(cors());
}

// interceptor for request
app.use(function(req, res, next){
    console.log(stdoutstr.STR_PROCESS_START);
    next();
});

//-----------------------
// Path routing
//-----------------------
app.all("*", indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    log4js.warn(appConst.STD_OUT_CONST.STR_RESOURCE_NOT_FOUND);
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};


    log4js.warn(appConst.STD_OUT_CONST.STR_SYSTEM_ERROR);
    res.status(err.status || 500);

    const error = __dirname + '/../stub/error.json';

    res.render("error").send(JSON.parse(fs.readFileSync(error)))
});

// 待受ポート
app.listen(config.port);

module.exports = app;
