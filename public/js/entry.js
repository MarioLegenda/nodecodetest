import App from './app.js';
import Repository from './repository.js';
import Listing from './listing.js';

(function($) {
    const app = new App($, new Repository($), new Listing());

    app.initApp();
} (jQuery) );