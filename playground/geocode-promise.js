const request = require('request');

var connectToGoogle = (inputAddress) => {
	var encodedAddress = encodeURIComponent(inputAddress);
	return new Promise((resolve, reject) => {
		request({
			url: `http://maps.googleapis.com/maps/api/geocode/json?address=${inputAddress}`,
			json: true
		}, (error, response, body) => {
			if (error) {
				var errorMessage = "Unable to connect to Google server";
				reject("Unable to connect to Google server")
			} else if (body.status === "ZERO_RESULTS") {
				var errorMessage1 = "Unable to find Address Provided";
				reject("Unable to find Address Provided")
			} else if (body.status === "OK") {
				var results = {
					address: body.results[0].formatted_address,
					lat: body.results[0].geometry.location.lat,
					lng: body.results[0].geometry.location.lng
				};
				resolve(results)
			}
		});
	});
};

connectToGoogle('75063').then((data) => {
	console.log(data)
}, (error) =>{
	console.log(error)
});
