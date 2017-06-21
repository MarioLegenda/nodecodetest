export default class Listing {
    listData(data) {
        for (let [key, value] of Object.entries(data)) {
            if ($.type(value) === 'object') {
                const item = this._createSingleItem(value);

                this._showOnPage(item);
            }
        }
    }

    listMultipleData(data) {
        const tabs = $('<ul></ul>').addClass('nav nav-tabs').attr({'role': 'tablist'});
        const tabContent = $('<div></div>').addClass('tab-content');
        let tabPanes = [];

        let count = 0;
        for (let [date, value] of Object.entries(data)) {
            if (date !== 'hasMultipleDates' && date !== 'activeDate') {
                tabs.append(this._createTab(date, count, data.activeDate));

                tabPanes.push(this._createTabPane(value, count));

                ++count;
            }
        }

        this._showOnPage(tabs);

        for (let i = 0; i < tabPanes.length; i++) {
            let pane = tabPanes[i];

            tabContent.append(pane);
        }

        this._showOnPage(tabContent);
    }

    _createTabPane(data, count) {
        const tabPane = $('<div></div>')
            .addClass('tab-pane fade in active')
            .attr({
                'role': 'tabpanel',
                'id': count
            });

        for (let [key, value] of Object.entries(data)) {
            if ($.type(value) === 'object') {
                tabPane.append(this._createSingleItem(value));
            }
        }

        return tabPane;
    }

    _createTab(text, count, activeDate) {
        let activeClass = (text === activeDate) ? 'active' : '';

        return $('<li></li>').addClass(activeClass).attr({'role': 'presentation'})
            .append($('<a></a>').attr({
                'aria-controls': count,
                'href': '#' + count,
                'role': 'tab',
                'data-toggle': 'tab'
            }).text(text));
    }

    _createSingleItem(itemData) {
        let headerData = {
            airlineName: itemData.airlineName,
            flightNumber: itemData.flightNumber,
            price: itemData.price
        };

        let domItem = this._createItem();

        domItem.append(this._createItemHeader(headerData));
        domItem.append(this._createItemSidebar('Departure', itemData.departure));
        domItem.append(this._createItemSidebar('Destination', itemData.destination));
        domItem.append(this._createBookButton());

        return domItem;
    }

    _createItemHeader(data) {
        const header = $('<h4></h4>')
            .addClass('item-title')
            .append($('<span></span>').text(data.airlineName))
            .append($('<span></span>').text('Flight number: ' + data.flightNumber));


        const price = $('<p></p>')
            .addClass('item-price')
            .text(data.price + ' USD');

        return $('<div></div>').addClass('item-header')
            .append(header)
            .append(price);
    }

    _createItemSidebar(name, data) {
        return $('<div></div>')
            .addClass('item-sidebar')
            .append($('<h4></h4>').text(name))
            .append(
                $('<ul></ul>')
                    .append($('<li></li>').text('Date: ' + data.date))
                    .append($('<li></li>').text('Time: ' + data.time))
                    .append($('<li></li>').text('Airport name: ' + data.airportName))
                    .append($('<li></li>').text('City name: ' + data.cityName))
                    .append($('<li></li>').text('Country name: ' + data.countryName))
            )
    }

    _createBookButton() {
        return $('<button></button>').addClass('btn btn-primary book-button').text('Book now');
    }

    _createItem() {
        return $('<div></div>').addClass('col-xs-12 item');
    }

    _showOnPage(item) {
        $('.listing').append(item);
    }
}