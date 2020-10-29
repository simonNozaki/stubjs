"use strict";
const _ = require("underscore");
const fs = require("fs");
const { constant } = require("underscore");
const httpHeaderValue = require("../const/http-const").HTTP_HEADER_VALUE;
const objectUtil = require("../util/object-util");
const logger = require("../util/logger");

/**
 * 設定の正常性確認します。
 * @returns 判定結果、不正があればfalse
 */
function hasValidConfig(){

    const serverConfig = __dirname +"/../config/resource/server-config.json"

    // 設定ファイルの存在確認
    if (!fs.existsSync(serverConfig)) {
        logger.error('A resource file not found. Ensure server-config.json exists.');
        return false;
    }

    let config = JSON.parse(fs.readFileSync(serverConfig));

    for (let resource of config.server){
        var matched = _.find([httpHeaderValue.HTTP_METHOD_GET, httpHeaderValue.HTTP_METHOD_POST, httpHeaderValue.HTTP_METHOD_DELETE, 
            httpHeaderValue.HTTP_METHOD_PATCH, httpHeaderValue.HTTP_METHOD_PUT],
            (method) => method === resource.method
        );
        
        if (objectUtil.isNullOrUndefined(matched)) {
            logger.error('Invalid HTTP verb set : ' + resource.method);
            return false;
        }

        if(!isHttpStatus(resource.responseStatus)) {
            logger.error(`Invalid response status set. Status :  ${resource.name}; ${resource.responseStatus}`);
            return false;
        }
    }
    
    return true;
};
module.exports.hasValidConfig = hasValidConfig;

function isHttpStatus(status) {
    if (!Number.isInteger(status)) {
        return false;
    }

    if(status < 100 || status > 599) {
        return false;
    }

    return true;
}

function parseConfig(){

    if(this.hasValidConfig()){
        return JSON.parse(fs.readFileSync(__dirname +"/../config/resource/server-config.json"));
    }

    return {};

};
module.exports.parseConfig = parseConfig;