'use strict';
const yargs = require('yargs');
const axios = require('axios');


const argv = yargs.options({
	a: {
		demand: true,
		alias: 'address',
		describe: 'Address to fetch weather for',
		string: true
	}
}).help().alias('help, h').argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
	var lat = response.data.results[0].geometry.location.lat;
	var lng = response.data.results[0].geometry.location.lng;
	var weatherUrl = `https://api.darksky.net/forecast/758f9571c597cec939af3020df3490d4/${lat},${lng}`;
	if (response.data.status === 'ZERO_RESULTS') {
		throw new Error('Unable to find that address')
	}
	console.log(response.data.results[0].formatted_address);
	return axios.get(weatherUrl)
}).then((response) => {
	console.log(response.data.currently.temperature)
}).catch((e) => {
	if (e.code === 'ENOTPOUND') {
		console.log('Server error')
	} else {
		console.log(e.message)
	}
});