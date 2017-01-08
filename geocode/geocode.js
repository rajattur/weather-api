'use strict';
const request = require('request');

var connectToGoogle = (inputAddress, cd) => {
	var encodedAddress = encodeURIComponent(inputAddress);
	request({
		url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
		json: true
	}, (error, response, body) => {
		if (error) {
			var errorMessage = "Unable to connect to Google server";
			cd("Unable to connect to Google server",null)
		} else if (body.status === "ZERO_RESULTS") {
			var errorMessage1 = "Unable to find Address Provided";
			cd("Unable to find Address Provided",null)
		} else if (body.status === "OK") {
			var results = {
				address: body.results[0].formatted_address,
				lat: body.results[0].geometry.location.lat,
				lng: body.results[0].geometry.location.lng
			};
			cd(null, results)
		}
	});
};

module.exports = {
	connectToGoogle: connectToGoogle
};
