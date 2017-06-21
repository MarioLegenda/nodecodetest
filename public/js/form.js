export default class Form {
    constructor(schema, jQuery, Repository) {
        this.model = {
            from: null,
            to: null,
            travelDate: null
        };

        this.dep = {
            $: jQuery,
            repository: Repository
        };

        this.data = {
            schema: schema,
            errors: null
        };

        this._initAutocomplete();
    }

    _initAutocomplete() {
        this.dep.$("#from")
            .autocomplete({
                minLength: 2,
                source: this.dep.$.proxy(function (request, response) {
                    this.dep.repository.searchAirports(request.term).done(function(data) {
                        if (data.status === 'success') {
                            const
                                airports = data.data,
                                responseData = [];

                            for (let i = 0; i < airports.length; i++) {
                                let portData = airports[i];
                                let d = {
                                    label: portData.airportName + ' - ' + airports[i].cityName,
                                    value: portData.airportName + ' - ' + airports[i].cityName,
                                    code: portData.airportCode
                                };

                                responseData.push(d);
                            }

                            response(responseData);
                        } else if (data.status === 'failure') {
                            response([]);
                        }
                    });
                }, this),
                select: this.dep.$.proxy(function(event, ui) {
                    this.model.from = ui.item.code;

                    return ui.item.label;
                }, this)
            })
            .autocomplete( "instance" )._renderItem = function( ul, item ) {
                return $( "<li>" )
                .append( "<div>"  + item.label + "</div>" )
                .appendTo( ul );
            };

        this.dep.$("#to")
            .autocomplete({
                minLength: 2,
                source: this.dep.$.proxy(function (request, response) {
                    this.dep.repository.searchAirports(request.term).done(function(data) {
                        if (data.status === 'success') {
                            const
                                airports = data.data,
                                responseData = [];

                            for (let i = 0; i < airports.length; i++) {
                                let portData = airports[i];
                                let d = {
                                    label: portData.airportName + ' - ' + airports[i].cityName,
                                    value: portData.airportName + ' - ' + airports[i].cityName,
                                    code: portData.airportCode
                                };

                                responseData.push(d);
                            }

                            response(responseData);
                        } else if (data.status === 'failure') {
                            response([]);
                        }
                    });
                }, this),
                select: this.dep.$.proxy(function(event, ui) {
                    this.model.to = ui.item.code;

                    return ui.item.label;
                }, this)
            })
            .autocomplete( "instance" )._renderItem = function( ul, item ) {
            return $( "<li>" )
                .append( "<div>"  + item.label + "</div>" )
                .appendTo( ul );
        };
    }

    validate(...args) {
        const $ = this.dep.$;

        this.model.travelDate = args[0];

        const errors = this.data.schema.validate(this.model);

        if ($.isEmptyObject(errors)) {
            for(let [key, value] of Object.entries(this.model)) {
                let elemKey = '.' + key + '-error';

                $(elemKey).text('');
            }

            return true;
        } else {
            for(let [key, value] of Object.entries(this.model)) {
                let elemKey = '.' + key + '-error';

                if (errors.hasOwnProperty(key)) {
                    $(elemKey).text(errors[key][0]);
                } else {
                    $(elemKey).text('');
                }
            }
            return false;
        }
    }

    getModel()
    {
        return this.model;
    }
}