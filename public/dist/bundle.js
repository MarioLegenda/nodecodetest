!function(e){function t(a){if(r[a])return r[a].exports;var n=r[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,t),n.l=!0,n.exports}var r={};t.m=e,t.c=r,t.i=function(e){return e},t.d=function(e,r,a){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:a})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=3)}([function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),o=r(7),u=a(o),l=r(5),s=a(l),c=function(){function e(t,r,a){n(this,e),this.dep={$:t,repository:r,listing:a}}return i(e,[{key:"_initWidgets",value:function(){var e=this.dep.$("#travelDate");e.datepicker(),e.datepicker("option","dateFormat","yy-mm-dd")}},{key:"_initForm",value:function(){var e=this.dep.$,t={notDefinedKey:function(e){return"Key '"+e+"' is not defined in schema"},validateRequired:function(e){return"This field is required"},validateString:function(e){return"This field is required"},validateDate:function(e){return"This field has to be a valid date"}},r=new u.default({from:{type:String,required:!0},to:{type:String,required:!0},travelDate:{type:String,required:!0}},t),a=new s.default(r,e,this.dep.repository);e("#form").submit(e.proxy(function(t){t.preventDefault();var r=e("#travelDate").val();if(!0===a.validate(r)){var n=a.getModel();e(".listing").find(".tab-content").remove(),e(".listing").find(".nav").remove(),e(".item").remove(),e(".loading").css({display:"block"}),this.dep.repository.searchFlights(n.from,n.to,n.travelDate).done(this.dep.$.proxy(function(t){if("error"===t.status){e(".global-error").remove();for(var r=0;r<t.data.length;r++)e(".global-errors").append('<p class="global-error">'+t.data[r]+"</p>")}"success"===t.status&&(e(".global-error").remove(),!0===t.data.hasMultipleDates?this.dep.listing.listMultipleData(t.data):this.dep.listing.listData(t.data),e(".loading").css({display:"none"}))},this))}return!1},this))}},{key:"initApp",value:function(){this._initWidgets(),this._initForm()}}]),e}();t.default=c},function(e,t,r){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){var r=[],a=!0,n=!1,i=void 0;try{for(var o,u=e[Symbol.iterator]();!(a=(o=u.next()).done)&&(r.push(o.value),!t||r.length!==t);a=!0);}catch(e){n=!0,i=e}finally{try{!a&&u.return&&u.return()}finally{if(n)throw i}}return r}return function(t,r){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),i=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),o=function(){function e(){a(this,e)}return i(e,[{key:"listData",value:function(e){var t=!0,r=!1,a=void 0;try{for(var i,o=Object.entries(e)[Symbol.iterator]();!(t=(i=o.next()).done);t=!0){var u=n(i.value,2),l=(u[0],u[1]);if("object"===$.type(l)){var s=this._createSingleItem(l);this._showOnPage(s)}}}catch(e){r=!0,a=e}finally{try{!t&&o.return&&o.return()}finally{if(r)throw a}}}},{key:"listMultipleData",value:function(e){var t=$("<ul></ul>").addClass("nav nav-tabs").attr({role:"tablist"}),r=$("<div></div>").addClass("tab-content"),a=[],i=0,o=!0,u=!1,l=void 0;try{for(var s,c=Object.entries(e)[Symbol.iterator]();!(o=(s=c.next()).done);o=!0){var d=n(s.value,2),f=d[0],p=d[1];"hasMultipleDates"!==f&&"activeDate"!==f&&(t.append(this._createTab(f,i,e.activeDate)),a.push(this._createTabPane(p,i)),++i)}}catch(e){u=!0,l=e}finally{try{!o&&c.return&&c.return()}finally{if(u)throw l}}this._showOnPage(t);for(var v=0;v<a.length;v++){var h=a[v];r.append(h)}this._showOnPage(r)}},{key:"_createTabPane",value:function(e,t){var r=$("<div></div>").addClass("tab-pane fade in active").attr({role:"tabpanel",id:t}),a=!0,i=!1,o=void 0;try{for(var u,l=Object.entries(e)[Symbol.iterator]();!(a=(u=l.next()).done);a=!0){var s=n(u.value,2),c=(s[0],s[1]);"object"===$.type(c)&&r.append(this._createSingleItem(c))}}catch(e){i=!0,o=e}finally{try{!a&&l.return&&l.return()}finally{if(i)throw o}}return r}},{key:"_createTab",value:function(e,t,r){var a=e===r?"active":"";return $("<li></li>").addClass(a).attr({role:"presentation"}).append($("<a></a>").attr({"aria-controls":t,href:"#"+t,role:"tab","data-toggle":"tab"}).text(e))}},{key:"_createSingleItem",value:function(e){var t={airlineName:e.airlineName,flightNumber:e.flightNumber,price:e.price},r=this._createItem();return r.append(this._createItemHeader(t)),r.append(this._createItemSidebar("Departure",e.departure)),r.append(this._createItemSidebar("Destination",e.destination)),r.append(this._createBookButton()),r}},{key:"_createItemHeader",value:function(e){var t=$("<h4></h4>").addClass("item-title").append($("<span></span>").text(e.airlineName)).append($("<span></span>").text("Flight number: "+e.flightNumber)),r=$("<p></p>").addClass("item-price").text(e.price+" USD");return $("<div></div>").addClass("item-header").append(t).append(r)}},{key:"_createItemSidebar",value:function(e,t){return $("<div></div>").addClass("item-sidebar").append($("<h4></h4>").text(e)).append($("<ul></ul>").append($("<li></li>").text("Date: "+t.date)).append($("<li></li>").text("Time: "+t.time)).append($("<li></li>").text("Airport name: "+t.airportName)).append($("<li></li>").text("City name: "+t.cityName)).append($("<li></li>").text("Country name: "+t.countryName)))}},{key:"_createBookButton",value:function(){return $("<button></button>").addClass("btn btn-primary book-button").text("Book now")}},{key:"_createItem",value:function(){return $("<div></div>").addClass("col-xs-12 item")}},{key:"_showOnPage",value:function(e){$(".listing").append(e)}}]),e}();t.default=o},function(e,t,r){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),i=r(6),o=function(){function e(t){a(this,e),this.dep={$:t}}return n(e,[{key:"searchFlights",value:function(){return this.dep.$.ajax({url:i.routes.flightSearch,method:"POST",data:{from:arguments.length<=0?void 0:arguments[0],to:arguments.length<=1?void 0:arguments[1],travelDate:arguments.length<=2?void 0:arguments[2]}})}},{key:"searchAirports",value:function(e){return this.dep.$.ajax({url:i.routes.airportSearch,method:"POST",data:{airport:e}})}}]),e}();t.default=o},function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}var n=r(0),i=a(n),o=r(2),u=a(o),l=r(1),s=a(l);!function(e){new i.default(e,new u.default(e),new s.default).initApp()}(jQuery)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.envr=function(){var e=window.location.pathname;return/app_dev.php/.test(e)?"/app_dev.php/":"/"}()},function(e,t,r){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){var r=[],a=!0,n=!1,i=void 0;try{for(var o,u=e[Symbol.iterator]();!(a=(o=u.next()).done)&&(r.push(o.value),!t||r.length!==t);a=!0);}catch(e){n=!0,i=e}finally{try{!a&&u.return&&u.return()}finally{if(n)throw i}}return r}return function(t,r){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),i=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),o=function(){function e(t,r,n){a(this,e),this.model={from:null,to:null,travelDate:null},this.dep={$:r,repository:n},this.data={schema:t,errors:null},this._initAutocomplete()}return i(e,[{key:"_initAutocomplete",value:function(){this.dep.$("#from").autocomplete({minLength:2,source:this.dep.$.proxy(function(e,t){this.dep.repository.searchAirports(e.term).done(function(e){if("success"===e.status){for(var r=e.data,a=[],n=0;n<r.length;n++){var i=r[n],o={label:i.airportName+" - "+r[n].cityName,value:i.airportName+" - "+r[n].cityName,code:i.airportCode};a.push(o)}t(a)}else"failure"===e.status&&t([])})},this),select:this.dep.$.proxy(function(e,t){return this.model.from=t.item.code,t.item.label},this)}).autocomplete("instance")._renderItem=function(e,t){return $("<li>").append("<div>"+t.label+"</div>").appendTo(e)},this.dep.$("#to").autocomplete({minLength:2,source:this.dep.$.proxy(function(e,t){this.dep.repository.searchAirports(e.term).done(function(e){if("success"===e.status){for(var r=e.data,a=[],n=0;n<r.length;n++){var i=r[n],o={label:i.airportName+" - "+r[n].cityName,value:i.airportName+" - "+r[n].cityName,code:i.airportCode};a.push(o)}t(a)}else"failure"===e.status&&t([])})},this),select:this.dep.$.proxy(function(e,t){return this.model.to=t.item.code,t.item.label},this)}).autocomplete("instance")._renderItem=function(e,t){return $("<li>").append("<div>"+t.label+"</div>").appendTo(e)}}},{key:"validate",value:function(){var e=this.dep.$;this.model.travelDate=arguments.length<=0?void 0:arguments[0];var t=this.data.schema.validate(this.model);if(e.isEmptyObject(t)){var r=!0,a=!1,i=void 0;try{for(var o,u=Object.entries(this.model)[Symbol.iterator]();!(r=(o=u.next()).done);r=!0){var l=n(o.value,2),s=l[0];l[1];e("."+s+"-error").text("")}}catch(e){a=!0,i=e}finally{try{!r&&u.return&&u.return()}finally{if(a)throw i}}return!0}var c=!0,d=!1,f=void 0;try{for(var p,v=Object.entries(this.model)[Symbol.iterator]();!(c=(p=v.next()).done);c=!0){var h=n(p.value,2),s=h[0],y=(h[1],"."+s+"-error");t.hasOwnProperty(s)?e(y).text(t[s][0]):e(y).text("")}}catch(e){d=!0,f=e}finally{try{!c&&v.return&&v.return()}finally{if(d)throw f}}return!1}},{key:"getModel",value:function(){return this.model}}]),e}();t.default=o},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.routes=void 0;var a=r(4);t.routes={flightSearch:a.envr+"api/flight-search",airportSearch:a.envr+"api/airport-search"}},function(e,t,r){!function(t,r){e.exports=r()}(0,function(){return function(e){function t(a){if(r[a])return r[a].exports;var n=r[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,t),n.l=!0,n.exports}var r={};return t.m=e,t.c=r,t.i=function(e){return e},t.d=function(e,r,a){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:a})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=2)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.pick=function(e,t){var r={};return t.forEach(function(t){r[t]=e[t]}),r},t.difference=function(e,t){var r=[];return e.forEach(function(e){t.indexOf(e)<0&&r.push(e)}),r}},function(e,t,r){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),i=function(){function e(t){a(this,e),this.types=t}return n(e,[{key:"getTypes",value:function(){return this.types||[]}},{key:"parseValue",value:function(e){var t={};return this.getTypes().forEach(function(r,a){t["type"+a]=e}),t}},{key:"getSchema",value:function(){var e={};return this.getTypes().forEach(function(t,r){e["type"+r]={type:t,required:!0}}),e}}]),e}();t.default=i},function(e,t,r){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),o=r(0),u=r(1),l=function(e){return e&&e.__esModule?e:{default:e}}(u),s={notDefinedKey:function(e){return"Key '"+e+"' is not defined in schema"},modelIsUndefined:function(){return"Validated model is undefined"},validateRequired:function(e){return"Field '"+e+"' is required"},validateString:function(e){return"Field '"+e+"' is not a String"},validateNumber:function(e){return"Field '"+e+"' is not a Number"},validateObject:function(e){return"Field '"+e+"' is not a Object"},validateArray:function(e){return"Field '"+e+"' is not a Array"},validateBoolean:function(e){return"Field '"+e+"' is not a Boolean"},validateDate:function(e){return"Field '"+e+"' is not a Date"}},c=function(){function e(t,r){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];a(this,e),this.schema=t,this.errors={},this.promises=[],this.messages=r||s,this.validateKeys=n,this.validateTypeString=this.validateTypeString.bind(this),this.validateTypeNumber=this.validateTypeNumber.bind(this),this.validateTypeObject=this.validateTypeObject.bind(this),this.validateTypeArray=this.validateTypeArray.bind(this),this.validateTypeBoolean=this.validateTypeBoolean.bind(this),this.validateTypeDate=this.validateTypeDate.bind(this),this.validateTypeSchema=this.validateTypeSchema.bind(this),this.typesValidators={String:this.validateTypeString,Number:this.validateTypeNumber,Object:this.validateTypeObject,Array:this.validateTypeArray,Boolean:this.validateTypeBoolean,Date:this.validateTypeDate}}return i(e,[{key:"getDefaultValueForModel",value:function(e,t){return t?[e]:e}},{key:"getDefaultValues",value:function(){var t=this,r=Object.keys(this.schema),a={};return r.forEach(function(r){var n=t.getField(r),i=Array.isArray(n.type),o=i?n.type[0]:n.type;return n.defaultValue?void(a[r]=t.getDefaultValueForModel(n.defaultValue,i)):n.options?void(a[r]=t.getDefaultValueForModel(n.options[0].label?n.options[0].value:n.options[0],i)):o instanceof e?void(a[r]=t.getDefaultValueForModel(o.getDefaultValues(),i)):"Number"===o.name?void(a[r]=t.getDefaultValueForModel(NaN,i)):"Boolean"===o.name?void(a[r]=t.getDefaultValueForModel(!1,i)):"Object"===o.name?void(a[r]=t.getDefaultValueForModel({},i)):void(a[r]=t.getDefaultValueForModel("",i))}),a}},{key:"getField",value:function(e){return this.schema[e]}},{key:"getFields",value:function(){return this.schema}},{key:"validate",value:function(e){var t=this;return this.errors={},this.promises=[],this.checkModel(e)&&(this.checkKeysDiff(e),this.checkTypesAndValidators(e)),this.promises.length>0?new Promise(function(e){Promise.all(t.promises).then(e(t.errors))}):this.errors}},{key:"setError",value:function(e,t,r){return this.errors[e]||(this.errors[e]=[]),r>-1?void(this.errors[e][r]=t):void this.errors[e].push(t)}},{key:"checkModel",value:function(e){return!!e||(this.setError("model",this.messages.modelIsUndefined()),!1)}},{key:"checkKeysDiff",value:function(e){var t=this;if(!this.validateKeys)return!0;var r=Object.keys(e),a=Object.keys(this.schema),n=(0,o.difference)(r,a);n.length>0&&n.forEach(function(e){t.setError(e,t.messages.notDefinedKey(e))})}},{key:"checkTypesAndValidators",value:function(e){var t=this,r=Object.keys(this.schema),a=(0,o.pick)(e,r);r.forEach(function(e){var r=a[e],n=t.schema[e],i=Array.isArray(n.type),o=i?n.type[0]:n.type;i&&t.validateType(Array,r)?r.forEach(function(r,a){t.validateType(o,r,e,a)}):t.validateType(o,r,e),t.validateRequired(n,r,e),t.validateCustomValidators({validators:n.validators,value:r,fieldSchema:n,validatedObject:a,key:e})})}},{key:"validateCustomValidators",value:function(e){var t=this,r=e.validators,a=e.value,n=e.fieldSchema,i=e.validatedObject,o=e.key;r&&r.forEach(function(e){var r=e.validator,u=e.errorMessage,l=r(a,n,i);return l instanceof Promise?void t.promises.push(l.then(function(e){e||t.setError(o,u)})):void(l||t.setError(o,u))})}},{key:"validateRequired",value:function(e,t,r){!e.required||t&&0!==t.length||this.setError(r,this.messages.validateRequired(r))}},{key:"validateType",value:function(t,r,a,n){if("function"==typeof this.typesValidators[t.name])return this.typesValidators[t.name](r,a,t,n);if(t instanceof e)return this.validateTypeSchema(r,a,t,n);if(t instanceof l.default)return this.validateOneOfTypes(r,a,t,n);throw new Error("Unrecognized type "+t.name)}},{key:"validateTypeString",value:function(e,t,r){return"string"==typeof e||(this.setError(t,this.messages.validateString(t),r),!1)}},{key:"validateTypeNumber",value:function(e,t,r){return"number"==typeof e||(this.setError(t,this.messages.validateNumber(t),r),!1)}},{key:"validateTypeObject",value:function(e,t,r){return"object"===(void 0===e?"undefined":n(e))&&!Array.isArray(e)||(this.setError(t,this.messages.validateObject(t),r),!1)}},{key:"validateTypeArray",value:function(e,t,r){return!!Array.isArray(e)||(this.setError(t,this.messages.validateArray(t),r),!1)}},{key:"validateTypeBoolean",value:function(e,t,r){return"boolean"==typeof e||(this.setError(t,this.messages.validateBoolean(t),r),!1)}},{key:"validateTypeDate",value:function(e,t,r){return e instanceof Date||(this.setError(t,this.messages.validateDate(t),r),!1)}},{key:"validateTypeSchema",value:function(e,t,r,a){var n=r.validate(e);return 0===Object.keys(n).length||(this.setError(t,n,a),!1)}},{key:"validateOneOfTypes",value:function(t,r,a,n){var i=new e(a.getSchema()),o=i.validate(a.parseValue(t));return Object.keys(o).length<a.getTypes().length||(this.setError(r,o,n),!1)}}],[{key:"oneOfTypes",value:function(e){return new l.default(e)}}]),e}();t.default=c}])})}]);