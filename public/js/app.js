import Schema from 'form-schema-validation';
import Form from './form.js';

export default class App {
    constructor(jQuery, Repository, Listing) {
        this.dep = {
            $: jQuery,
            repository: Repository,
            listing: Listing
        };
    }

    _initWidgets() {
        const travelDateElem = this.dep.$('#travelDate');

        travelDateElem.datepicker();
        travelDateElem.datepicker('option', 'dateFormat', 'yy-mm-dd');
    }

    _initForm() {
        const $ = this.dep.$;

        const errorMessages = {
            notDefinedKey(key) { return `Key '${key}' is not defined in schema`; },
            validateRequired(key) { return `This field is required`; },
            validateString(key) { return `This field is required`; },
            validateDate(key) { return `This field has to be a valid date`; }
        };

        const schema = new Schema({
            from: {
                type: String,
                required: true
            },
            to: {
                type: String,
                required: true
            },
            travelDate: {
                type: String,
                required: true
            }
        }, errorMessages);

        const form = new Form(schema, $, this.dep.repository);

        $('#form').submit($.proxy(function(evn) {
            evn.preventDefault();

            const
                travelDate = $('#travelDate').val();

            if (form.validate(travelDate) === true) {
                const model = form.getModel();
                $('.listing').find('.tab-content').remove();
                $('.listing').find('.nav').remove();
                $('.item').remove();

                $('.loading').css({display: 'block'});

                this.dep.repository.searchFlights(model.from, model.to, model.travelDate)
                    .done(this.dep.$.proxy(function(data) {
                        if (data.status === 'error') {
                            $('.global-error').remove();

                            for (let i = 0; i < data.data.length; i++) {
                                $('.global-errors').append('<p class="global-error">' + data.data[i] + '</p>')
                            }
                        }

                        if (data.status === 'success') {
                            $('.global-error').remove();

                            if (data.data.hasMultipleDates === true) {
                                this.dep.listing.listMultipleData(data.data);
                            } else {
                                this.dep.listing.listData(data.data);
                            }

                            $('.loading').css({display: 'none'});
                        }
                    }, this));
            }

            return false;
        }, this));
    }

    initApp() {
        this._initWidgets();
        this._initForm();
    }
}