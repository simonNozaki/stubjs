"use strict"

const objectUtil = require("./object-util");
const appConst = require("../const/app-const");

/**
 * 標準出力を生成します
 * @param 出力したい文字列
 * @returns 標準出力用に整形された文字列
 */
function appendStdOut(object){

    var main;

    // オブジェクトがJSON形式である場合の処理
    if(objectUtil.isJson(object)){
        main = JSON.stringify(object);
    }

    // 文字列でない場合、Stringにキャスト
    if (typeof object !== String){
        main = object.toString();
    }

    main = object;

    return appConst.STD_OUT_CONST.TRACE_START + appConst.STD_OUT_CONST.TRACE_NEW_LINE + main + appConst.STD_OUT_CONST.TRACE_NEW_LINE + appConst.STD_OUT_CONST.TRACE_END;

};
module.exports.appendStdOut = appendStdOut;