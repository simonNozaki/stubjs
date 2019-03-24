"use strict";

/**
 * HTTPヘッダー定数
 */
const HTTP_HEADER_KEY = {

    /**
     * Access-Control-Allow-Origin
     */
    ACCESS_CONTROL_ALLOW_ORIGIN : "Access-Control-Allow-Origin",

    /**
     * Access-Control-Allow-Method
     */
    ACCESS_CONTROL_ALLOW_METHODS : "Access-Control-Allow-Methods",

    /**
     * Access-Control-Allow-Headers
     */
    ACCESS_CONTROL_ALLOW_HEADERS : "Access-Control-Allow-Headers"

};
module.exports.HTTP_HEADER_KEY = HTTP_HEADER_KEY;


/**
 * HTTPヘッダー値
 */
const HTTP_HEADER_VALUE = {

    /**
     * アスタリスク
     */
    ASTERISK : "*",

    /**
     * HTTPメソッド、GET
     */
    HTTP_METHOD_GET : "GET",

    /**
     * HTTPメメソッド、POST
     */
    HTTP_METHOD_POST : "POST",

    /**
     * HTTPメソッド、PUT
     */
    HTTP_METHOD_PUT : "PUT",

    /**
     * HTTPメソッド、PATCH
     */
    HTTP_METHOD_PATCH : "PACTH",

    /**
     * HTTPメソッド、DELETE
     */
    HTTP_METHOD_DELETE : "DELETE"

};
module.exports.HTTP_HEADER_VALUE = HTTP_HEADER_VALUE;