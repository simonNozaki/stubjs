const log4js = require("log4js");
const logger = log4js.getLogger("stubjs");

logger.level = "info";

module.exports = logger;