/**
 * リクエストのルーティングモジュール
 * @module routes/index
 */
"use strict";

var express = require('express');
var router = express.Router();
var fs = require("fs");
const logger = require("../util/logger");

var configParser = require("../util/config-parser");
var stringUtil = require("../util/string-util");
var objectUtil = require("../util/object-util");
var appConst = require("../const/app-const").APP_CONST;

var config = configParser.parseConfig();

logger.info(
    appConst.TRACE_NEW_LINE
    + appConst.STR_SEPARATOR
    + appConst.TRACE_NEW_LINE
    + appConst.APP_NAME
    + appConst.TRACE_NEW_LINE
    + appConst.STR_SEPARATOR
    + appConst.TRACE_NEW_LINE);

// healthcehck
router.get("/healthcheck", function(res, req){
    logger.info("スタブAPIの処理を開始します - " + resource.method + appConst.COLON_WITH_SPACE + url);
    logger.info(stringUtil.appendStdOut(fs.readFileSync(__dirname + '/../stub/healthcheck.json')));
    logger.info("スタブAPIの処理を終了します - " + resource.method + appConst.COLON_WITH_SPACE + url);
    next();
});

if (objectUtil.isNullOrUndefined(config)) throw new Error("Config is empty. Please ensure server config.");


// -----------------
// Callback mappings
// -----------------
for(let resource of config.server){

    // URLの識別
    var url;

    // set context
    if(!objectUtil.isNullOrUndefined(config.context)) {
        url = config.context;
    }

    if (resource.path == '' ||resource.path == null) {
        url += appConst.STR_SLASH
    } else {
        url = url + resource.path;
    }

    // HTTPメソッド : URIパス
    logger.info(resource.method + appConst.COLON_WITH_SPACE + url);

    const resourcefile = __dirname + '/../stub/' + resource.name + '.json';

    switch (resource.method) {
        case "GET":
            router.get(url, function(req, res, next){
                logger.info(stringUtil.appendStdOut(fs.readFileSync(resouresourcefilerce)));
                return res.header(resource.responseStatus).send(JSON.parse(fs.readFileSync(resourcefile)));
            });
            break;
        case "POST":
            router.post(url, function(req, res, next){
                logger.info("リクエストを受け付けました : ", stringUtil.appendStdOut(JSON.stringify(req.body)), appConst.TRACE_NEW_LINE);
                logger.info(stringUtil.appendStdOut(fs.readFileSync(resourcefile)));
                return res.status(resource.responseStatus).send(JSON.parse(fs.readFileSync(resourcefile)));
            });
            break;
        case "PUT":
            router.put(url, function(req, res, next){
                logger.info(stringUtil.appendStdOut(fs.readFileSync(resourcefile)));
                return res.status(resource.responseStatus).send(JSON.parse(fs.readFileSync(resourcefile)));
            });
            break;
        case "PATCH":
            router.patch(url, function(req, res, next){
                logger.info(stringUtil.appendStdOut(fs.readFileSync(resourcefile)));
                return res.status(resource.responseStatus).send(JSON.parse(fs.readFileSync(resourcefile)));
            });
            break;
        case "DELETE":
            router.delete(url, function(req, res, next){
                logger.info(stringUtil.appendStdOut(fs.readFileSync(resourcefile)));
                return res.status(resource.responseStatus).send(JSON.parse(fs.readFileSync(resourcefile)));
            });
            break;
        default:
            logger.warn(appConst.STR_HTTP_METHOD_UNDEFINED);
            break;
    }
}


module.exports = router;
