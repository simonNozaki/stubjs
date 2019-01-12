"use strict";

/**
 * オブジェクトが空もしくは未定義であるかを確認します。
 * @param {Object} subject 非検査対象オブジェクト
 */
function isNullOrUndefined(subject){

    // null
    if(typeof subject === null){
        return true;
    }

    // undefined
    if(typeof subject === undefined){
        return true;
    }

    // 空文字
    if(typeof subject === String || subject === ""){
        return true;
    }

    return false;

};
module.exports.isNullOrUndefined = isNullOrUndefined;

/**
 * JSON(object) -> JSオブジェクトに変換できることを確認します。
 * @returns 判定結果、真偽値
 */
function isJson(subject) {

    // 引数が関数であるかチェック
    var arg = (typeof subject === Function) ? arg() : arg;

    if(typeof arg !== String){
        return false;
    }

    try{
        // 正常にパースできるパターン
        arg = (!JSON) ? eval("(" + arg + ")") : JSON.parse(arg);
        return true;
    }catch(e){
        return false;
    }
};
module.exports.isJson = isJson;