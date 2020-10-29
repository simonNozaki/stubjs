"use strict";

/**
 * Innspect parameter is null or undefined.
 * This method expects the argument is an instance of Object class.
 * @param {Object} subject
 */
function isNullOrUndefined(subject){

    // null
    if(typeof subject == null){
        return true;
    }

    // undefined
    if(typeof subject === undefined){
        return true;
    }

    // empty object
    if (typeof subject === Object && Object.keys(subject).length != 0) {
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