const
    express = require('express'),
    app = express(),
    http = require('http'),
    server = http.Server(app),
    path = require('path'),
    bodyParser = require('body-parser'),
    expressValidator = require('express-validator'),
    rp = require('request-promise'),
    q = require('q'),
    moment = require('moment'),
    listing = require('./src/listing.js'),
    dateRange = require('./src/dateRange.js'),
    baseUri = 'http://node.locomote.com/code-task/',
    specialDate = '2017-06-25';

app.use(express.static("static", {maxage : 0}));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(expressValidator());
app.use(bodyParser.json());

app.use(expressValidator({
    customValidators: {
        isValidDate: function(value) {
            const travelDate = new Date(value);

            const now = new Date();

            now.setMinutes(0);
            now.setHours(0);
            now.setSeconds(0);

            if (travelDate < now) {
                return false;
            }

            return true;
        }
    }
}));

app.get('/', function(appReq, appRes) {
    const indexPath = path.resolve(__dirname + '/public/index.html')
    appReq.sendFile(indexPath);
});

app.post('/api/airport-search', function(appReq, appRes) {
    const uri = baseUri + 'airports?q=' + appReq.body.airport;

    rp(uri).then(function(data) {
        let responseData = {
            status: 'success',
            data: JSON.parse(data.toString())
        };

        appRes.setHeader('Content-Type', 'application/json');
        appRes.send(responseData);
    })
        .catch(function() {
            console.log('Error in making a request to ' + uri);
        })
});

app.post('/api/flight-search', function(appReq, appRes) {
    appReq.checkBody('from', '').notEmpty().isAlpha();
    appReq.checkBody('to', '').notEmpty().isAlpha();
    appReq.checkBody('travelDate', '').notEmpty().isDate().isValidDate();

    appReq.getValidationResult().then(function(result) {
        if (!result.isEmpty()) {
            const errors = result.array();

            if (errors[0].param === 'travelDate') {
                const responseData = {
                    status: 'error',
                    data: ['Travel date cannot be a date in the past']
                };

                appRes.setHeader('Content-Type', 'application/json');
                appRes.send(responseData);
            }
        } else {
            const
                from = appReq.body.from,
                to = appReq.body.to,
                travelDate = appReq.body.travelDate;

            const airlinesUri = baseUri + 'airlines';

            rp(airlinesUri).then(function(airlines) {
                airlines = JSON.parse(airlines);

                if (moment(travelDate).isSame(specialDate, 'day')) {
                    const range = dateRange.createDateRange(new Date(specialDate));
                    let promises = [];
                    let responseData = {
                        hasMultipleDates: true
                    };

                    let count = 0;
                    for (let i = 0; i < range.length; i++) {
                        let date = range[i];

                        let uri = baseUri + 'flight_search/:code?date=' + date + '&from=' + from + '&to=' + to;

                        promises.push(listing.createListing(rp, airlines, uri).then(function(data) {
                            responseData[range[count]] = data;

                            count++;
                        }));
                    }

                    q.all(promises).then(function() {
                        const response = {
                            status: 'success',
                            data: responseData
                        };

                        appRes.setHeader('Content-Type', 'application/json');
                        appRes.send(response);
                    });

                } else {
                    let uri = baseUri + 'flight_search/:code?date=' + travelDate + '&from=' + from + '&to=' + to;
                    listing.createListing(rp, airlines, uri).then(function(data) {
                        const response = {
                            status: 'success',
                            data: {}
                        };

                        Object.assign(response.data, data);


                        appRes.setHeader('Content-Type', 'application/json');
                        appRes.send(response);
                    });
                }
            });
        }
    });
});

server.listen(3000, function(){
    console.log('Listening to port 3000');
});