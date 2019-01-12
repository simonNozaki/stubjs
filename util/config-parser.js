"use strict";
const _ = require("underscore");
const fs = require("fs");

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

    // 設定できないHTTPリクエストの場合、警告ログ出力
    for (let resource of config.server){
        var matched = _.find(["GET", "PUT", "PATCH", "DELETE", "POST"], function(method){
            return method === resource.method;
        });

        if (typeof matched === undefined) {
            console.error('HTTPメソッドが正しく設定されていません : ' + resource.method);
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