'use strict';
const request = require('request');

var getForecast = (coordinates, cb) => {
	 request({
	 	url: `https://api.darksky.net/forecast/758f9571c597cec939af3020df3490d4/${coordinates.lat},${coordinates.lng}`,
		json: true
	 },(error, response, body) => {
	 	if (error) {
	 		cb("Cant connect to API server Error",null)
	    } else if (!error && response.statusCode === 200) {
			cb(null,body)
		} else {
			cb("Unable to get Weather Forecast", null)
		}
	 })
};
module.exports = {
	getForecast: getForecast
};