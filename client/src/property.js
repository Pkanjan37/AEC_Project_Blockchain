const fs = require('fs');
const logDir = 'log';
const env = process.env.NODE_ENV || 'development';
const winston = require('winston');
const validator = require('validator');

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
const tsFormat = () => (new Date()).toLocaleTimeString();
const logger = new (winston.Logger)({
  transports: [
    // colorize the output to the console
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
      level: 'info'
    }),
    new (winston.transports.File)({
      filename: `${logDir}/results.log`,
      timestamp: tsFormat,
      level: env === 'development' ? 'debug' : 'info'
    })
  ]
});

var inboundRequest = function logInbound(payload) {

    logger.info('EventName @', "Inbound_Request");
	logger.info('----Payload info :: ', payload);
}

var outboundResponse = function logOutbound(payload) {

    logger.info('EventName @', "Outbound_Response");
	logger.info('----Payload info :: ', payload);
}

var validateMandatory = function require(payload) {

    for (var key in payload) {
    if(isEmpty(payload[key])){
	return {errorText: payload[key] + " is require property"};
	}
}
return {successText : "validation success"};
}
var validateDecimal = function decimal(payload) {

    for (var key in payload) {
    if(validator.isDecimal(payload[key])){
	return {errorText: payload[key] + " must be decimal"}
	}
}
}
function isEmpty(str) {
    return (!str || 0 === str.length);
}
module.exports = {validateMandatory,validateDecimal,inboundRequest, outboundResponse};
