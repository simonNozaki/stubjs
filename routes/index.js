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
var httpMethodValue = require("../const/http-const").HTTP_HEADER_VALUE;

var config = configParser.parseConfig();

// ヘルスチェック
router.get("/healthcheck", function(res, req){
    console.log("スタブAPIの処理を開始します - " + resource.method + appConst.STD_OUT_CONST.COLON_WITH_SPACE + url);
    console.log(stringUtil.appendStdOut(fs.readFileSync(__dirname + '/../stub/' + resource.name + '.json')));
    console.log("スタブAPIの処理を終了します - " + resource.method + appConst.STD_OUT_CONST.COLON_WITH_SPACE + url);
    next();
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
        url += appConst.STD_OUT_CONST.STR_SLASH
    } else {
        url = url + resource.path;
    }

    // HTTPメソッド : URIパス
    console.log(resource.method + appConst.STD_OUT_CONST.COLON_WITH_SPACE + url);

    /**
     * 全メソッド共通コールバック関数定義
     */
    const callbackApi = function(req, res, next){
        console.log("スタブAPIの処理を開始します - " + resource.method + appConst.STD_OUT_CONST.COLON_WITH_SPACE + url);
        console.log(stringUtil.appendStdOut(fs.readFileSync(__dirname + '/../stub/' + resource.name + '.json')));
        console.log("スタブAPIの処理を終了します - " + resource.method + appConst.STD_OUT_CONST.COLON_WITH_SPACE + url);
        next();
    }

    // HTTPメソッドに沿ってルーティング定義
    switch (resource.method) {
        case "GET":
            router.get(url, callbackApi);
            break;
        case "POST":
            router.post(url, callbackApi);
            break;
        case "PUT":
            router.put(url, callbackApi);
            break;
        case "PATCH":
            router.patch(url, callbackApi);
            break;
        case "DELETE":
            router.delete(url, callbackApi);
            break;
        default:
            console.log("対応していないHTTPメソッドが指定されています。GET, POST, PUT, PATCH, DELETEを指定してください。");
            break;
    }
}


module.exports = router;
