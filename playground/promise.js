'use strict';

var somePromise = new Promise((resolve, reject) => {
	resolve('It worked')
});

somePromise.then((message) => {
	console.log(`Success: ${message}`)
});