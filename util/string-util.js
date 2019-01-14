"use strict"

const objectUtil = require("./object-util");
const appConst = require("../const/app-const");

/**
 * 標準出力を生成します。出力例：
 * [Trace log start]
 * {
 *   key : "value"
 * }
 * [Trace log end]
 * @param {Object} 出力したい文字列
 * @returns {String} 標準出力用に整形された文字列
 */
function appendStdOut(object){

    var main;

    if(objectUtil.isJson(object)){
        main = JSON.stringify(object);
    }

    if (typeof object !== String){
        main = String(object);
    } else {
        main = object;
    }


    return appConst.STD_OUT_CONST.TRACE_START + appConst.STD_OUT_CONST.TRACE_NEW_LINE + main + appConst.STD_OUT_CONST.TRACE_NEW_LINE + appConst.STD_OUT_CONST.TRACE_END;

};
module.exports.appendStdOut = appendStdOut;