/**
 * リクエストのルーティングモジュール
 * @module routes/index
 */
"use strict";

var express = require('express');
var router = express.Router();
var fs = require("fs");

var configParser = require("../util/config-parser");
var stringUtil = require("../util/string-util");
var objectUtil = require("../util/object-util");
var appConst = require("../const/app-const");

var config = configParser.parseConfig();

// -----------------
// 起動ログ
// -----------------
console.log(appConst.STD_OUT_CONST.STR_SEPARATOR + appConst.STD_OUT_CONST.TRACE_NEW_LINE + "stubjs" + appConst.STD_OUT_CONST.TRACE_NEW_LINE + appConst.STD_OUT_CONST.STR_SEPARATOR
    + appConst.STD_OUT_CONST.TRACE_NEW_LINE);

// ヘルスチェック
router.get("/healthcheck", function(res, req){
    console.log("スタブAPIの処理を開始します - " + resource.method + appConst.STD_OUT_CONST.COLON_WITH_SPACE + url);
    console.log(stringUtil.appendStdOut(fs.readFileSync(__dirname + '/../stub/healthcheck.json')));
    console.log("スタブAPIの処理を終了します - " + resource.method + appConst.STD_OUT_CONST.COLON_WITH_SPACE + url);
    next();
});

// -----------------
// コールバック関数のマップ
// -----------------
for(let resource of config.server){

    // URLの識別
    var url;

    // コンテキストがある場合は設定
    if(!objectUtil.isNullOrUndefined(config.context)) {
        url = config.context;
    }

    if (resource.path == '' ||resource.path == null) {
        url += appConst.STD_OUT_CONST.STR_SLASH
    } else {
        url = url + resource.path;
    }

    // HTTPメソッド : URIパス
    console.log(resource.method + appConst.STD_OUT_CONST.COLON_WITH_SPACE + url);

    // HTTPメソッドに沿ってルーティング定義
    switch (resource.method) {
        case "GET":
            router.get(url, function(req, res, next){
                console.log(stringUtil.appendStdOut(fs.readFileSync(__dirname + '/../stub/' + resource.name + '.json')));
                return res.header(resource.responseStatus).send(JSON.parse(fs.readFileSync(__dirname + '/../stub/' + resource.name + '.json')));
            });
            break;
        case "POST":
            router.post(url, function(req, res, next){
                console.log("リクエストを受け付けました : ", stringUtil.appendStdOut(JSON.stringify(req.body)), appConst.STD_OUT_CONST.TRACE_NEW_LINE);
                console.log(stringUtil.appendStdOut(fs.readFileSync(__dirname + '/../stub/' + resource.name + '.json')));
                return res.status(resource.responseStatus).send(JSON.parse(fs.readFileSync(__dirname + '/../stub/' + resource.name + '.json')));
            });
            break;
        case "PUT":
            router.put(url, function(req, res, next){
                console.log(stringUtil.appendStdOut(fs.readFileSync(__dirname + '/../stub/' + resource.name + '.json')));
                return res.status(resource.responseStatus).send(JSON.parse(fs.readFileSync(__dirname + '/../stub/' + resource.name + '.json')));
            });
            break;
        case "PATCH":
            router.patch(url, function(req, res, next){
                console.log(stringUtil.appendStdOut(fs.readFileSync(__dirname + '/../stub/' + resource.name + '.json')));
                return res.status(resource.responseStatus).send(JSON.parse(fs.readFileSync(__dirname + '/../stub/' + resource.name + '.json')));
            });
            break;
        case "DELETE":
            router.delete(url, function(req, res, next){
                console.log(stringUtil.appendStdOut(fs.readFileSync(__dirname + '/../stub/' + resource.name + '.json')));
                return res.status(resource.responseStatus).send(JSON.parse(fs.readFileSync(__dirname + '/../stub/' + resource.name + '.json')));
            });
            break;
        default:
            console.log("対応していないHTTPメソッドが指定されています。GET, POST, PUT, PATCH, DELETEを指定してください。");
            break;
    }
}


module.exports = router;
