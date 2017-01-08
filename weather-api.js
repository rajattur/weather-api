'use strict';
const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const getWeather = require('./forecast/forecast');

const argv = yargs.options({
	a: {
		demand: true,
		alias: 'address',
		describe: 'Address to fetch weather for',
		string: true
	}
}).help().alias('help, h').argv;

geocode.connectToGoogle(argv.address, (errorMessage, results) => {
	if (errorMessage) {
		console.log(errorMessage)
	} else {
		// console.log(JSON.stringify(results, undefined, 2));
		getWeather.getForecast(results, (error, data) => {
			if (error) {
				console.log(error)
			} else {
				var currentTemp = data.currently.temperature;
				// console.log(JSON.stringify(data.currently.temperature, undefined, 2));
				console.log(`Current temperature in ${results.address} is ${currentTemp} F`)
			}
		})
	}
});
