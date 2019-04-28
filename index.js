module.exports = function(context, req) {
	context.log('OvenTemperature Service triggered');
	if (req.body && req.body.readings) {
		req.body.readings.forEach(function(reading) {
			let dateTime = new Date(reading.timestamp * 1000);
			dateTime.toLocaleString('en-US');
			if (reading.temperature <= 300) {
				reading.status = 'COLD';
			} else if (reading.temperature <= 500) {
				reading.status = 'GREAT';
			} else {
				reading.status = 'BURNT';
			}
			context.log(
				`The Pizza Oven Temperature Reading is ${
					reading.status
				} at ${dateTime}
                for Oven at ${reading.factory}`
			);
		});

		context.res = {
			// status: 200, /* Defaults to 200 */
			body: {
				readings: req.body.readings,
			},
		};
	} else {
		context.res = {
			status: 400,
			body:
				'Please send an array of temperature readings in the request body',
		};
	}
	context.done();
};
