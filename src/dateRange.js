const moment = require('moment');

function DateRange() {
    this.createDateRange = function(date) {
        const ranges = [];
        const tempNow = new Date();
        const now = moment(tempNow, 'YYYY-DD-MM');
        const yesterday = moment(date, 'YYYY-DD-MM').subtract(1, 'days');
        let substract = 2;

        let momentNow = now.toDate();
        let momentYes = yesterday.toDate();

        const parsedNow = momentNow.getFullYear() + '-' + (momentNow.getMonth() + 1) + '-' + momentNow.getDate();
        const parsedYes = momentYes.getFullYear() + '-' + (momentYes.getMonth() + 1) + '-' + momentYes.getDate();

        if (parsedNow === parsedYes) {
            substract = 1;
        }

        let
            day = date.getDate() - substract,
            month = date.getMonth() + 1,
            year = date.getFullYear();

        if (month < 10) {
            month = '0' + month;
        }

        for (let i = 0; i < 5; i++) {
            ranges.push(year + '-' + month + '-' + (day + i));
        }

        return ranges;
    }
}

module.exports = new DateRange();