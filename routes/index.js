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

var config = configParser.parseConfig();

// ヘルスチェック
router.get("/healthcheck", function(req, res){
    res.send(JSON.parse(fs.readFileSync(__dirname + '/../stub/healthcheck.json')));
});

// 設定ファイルから、リクエストとレスポンスの対応関係をExpressに定義します
for(let resource of config.server){

    // URLの識別
    var url;

    // コンテキストがある場合は設定
    if(!objectUtil.isNullOrUndefined(config.context)) {
        url = config.context;
    }

    if (resource.path == '' ||resource.path == null) {
        url += '/'
    } else {
        url = url + resource.path;
    }

    // HTTPメソッドに沿ってルーティング定義
    switch (resource.method) {
        case "GET":
            router.get(url, function(req, res){
                res.status(resource.responseStatus);
                console.log(stringUtil.appendStdOut(fs.readFileSync(__dirname + '/../stub/' + resource.name + '.json')));
                res.send(JSON.parse(fs.readFileSync(__dirname + '/../stub/' + resource.name + '.json')));
            });
            break;
        case "POST":
            router.post(url, function(req, res){
                res.status(resource.responseStatus);
                console.log(stringUtil.appendStdOut(fs.readFileSync(__dirname + '/../stub/' + resource.name + '.json')));
                res.send(JSON.parse(fs.readFileSync(__dirname + '/../stub/' + resource.name + '.json')));
            });
            break;
        case "PUT":
            router.put(url, function(req, res){
                res.status(resource.responseStatus);
                console.log(stringUtil.appendStdOut(fs.readFileSync(__dirname + '/../stub/' + resource.name + '.json')));
                res.send(JSON.parse(fs.readFileSync(__dirname + '/../stub/' + resource.name + '.json')));
            });
            break;
        case "PATCH":
            router.patch(url, function(req, res){
                res.status(resource.responseStatus);
                console.log(stringUtil.appendStdOut(fs.readFileSync(__dirname + '/../stub/' + resource.name + '.json')));
                res.send(JSON.parse(fs.readFileSync(__dirname + '/../stub/' + resource.name + '.json')));
            });
            break;
        case "DELETE":
            router.delete(url, function(req, res){
                res.status(resource.responseStatus);
                console.log(stringUtil.appendStdOut(fs.readFileSync(__dirname + '/../stub/' + resource.name + '.json')));
                res.send(JSON.parse(fs.readFileSync(__dirname + '/../stub/' + resource.name + '.json')));
            });
            break;
        default:
            console.log("対応していないHTTPメソッドが指定されています。GET, POST, PUT, PATCH, DELETEを指定してください。");
            break;
    }
}

module.exports = router;
