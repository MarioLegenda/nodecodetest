import {routes} from './routes.js';

export default class Repository {
    constructor(jQuery) {
        this.dep = {
            $: jQuery
        };
    }

    searchFlights(...args) {
        return this.dep.$.ajax({
            url: routes.flightSearch,
            method: 'POST',
            data: {
                from: args[0],
                to: args[1],
                travelDate: args[2]
            }
        });
    }

    searchAirports(airport) {
        return this.dep.$.ajax({
            url: routes.airportSearch,
            method: 'POST',
            data: {
                airport: airport
            }
        });
    }
}