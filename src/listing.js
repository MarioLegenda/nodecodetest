const q = require('q');

function Listing() {
    this.createListing = function(rp, airlines, uri) {
        return new Promise(function (resolve, reject) {
            let tempListing = [];

            let promises = [];

            for (let i = 0; i < airlines.length; i++) {
                let code = airlines[i].code;

                let currentUri = uri.replace(/:code/, code);

                let promise = rp(currentUri).then(function(data) {
                    let flightData = JSON.parse(data);

                    for (let a = 0; a < flightData.length; a++) {
                        let result = {};
                        let flight = flightData[a];
                        let departureDate = new Date(flight.start.dateTime);
                        let destinationDate = new Date(flight.finish.dateTime);

                        result.airlineName = flight.airline.name;
                        result.flightNumber = flight.flightNum;
                        result.departure = {
                            date: departureDate.getFullYear() + '-' + (departureDate.getMonth() + 1) + '-' + departureDate.getDate(),
                            time: departureDate.getHours() + ':' + departureDate.getMinutes() + ':' + departureDate.getSeconds(),
                            airportName: flight.start.airportName,
                            cityName: flight.start.cityName,
                            countryName: flight.start.countryName
                        };

                        result.destination = {
                            date: destinationDate.getFullYear() + '-' + (destinationDate.getMonth() + 1) + '-' + destinationDate.getDate(),
                            time: destinationDate.getHours() + ':' + destinationDate.getMinutes() + ':' + destinationDate.getSeconds(),
                            airportName: flight.finish.airportName,
                            cityName: flight.finish.cityName,
                            countryName: flight.finish.countryName
                        };

                        result.duration = flight.durationMin;
                        result.price = flight.price;

                        tempListing.push(result);
                    }
                });

                promise.catch(function(e) {
                    console.log('There has been an error with message ' + e.message);
                });

                promises.push(promise);
            }

            q.all(promises).then(function() {
                resolve(tempListing);
            });
        });
    }
}

module.exports = new Listing();