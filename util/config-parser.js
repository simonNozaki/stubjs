"use strict";
const _ = require("underscore");
const fs = require("fs");
const httpHeaderValue = require("../const/http-const").HTTP_HEADER_VALUE;
const isNullOrUndefined = require("../util/object-util").isNullOrUndefined;

/**
 * 設定の正常性確認します。
 * @returns 判定結果、不正があればfalse
 */
function hasValidConfig(){

    // 設定ファイルの存在確認
    if (!fs.existsSync(__dirname + "/../config/resource/server-config.json")) {
        console.error('設定ファイルが存在しません。server-config.jsonが存在することを確認してください。');
        return false;
    }

    // 設定ファイルの読み込み
    var config = JSON.parse(fs.readFileSync(__dirname +"/../config/resource/server-config.json"));

    for (let resource of config.server){
        var matched = _.find([httpHeaderValue.HTTP_METHOD_GET, httpHeaderValue.HTTP_METHOD_POST, httpHeaderValue.HTTP_METHOD_DELETE, 
            httpHeaderValue.HTTP_METHOD_PATCH, httpHeaderValue.HTTP_METHOD_PUT],
            function(method){
                return method === resource.method;
            }
        );
        
        // HTTPリクエストメソッドの設定チェック
        if (isNullOrUndefined(matched)) {
            console.error('HTTPメソッドが正しく設定されていません : ' + resource.method);
            return false;
        }

        // ステータスコードの設定チェック
        if(resource.responseStatus < 100 || resource.responseStatus > 599){
            console.error("レスポンスステータスの設定が不正です。リソース名 : " + resource.name);
            return false;
        }
    }
    
    return true;
};
module.exports.hasValidConfig = hasValidConfig;

/**
 * 設定の読み込み。設定に不正がある場合は空のオブジェクトを返却します。
 * @returns 読み込んだ設定のJSオブジェクト
 */
function parseConfig(){

    if(this.hasValidConfig()){
        return JSON.parse(fs.readFileSync(__dirname +"/../config/resource/server-config.json"));
    }

    return {};

};
module.exports.parseConfig = parseConfig;