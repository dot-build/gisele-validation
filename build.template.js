(function(addExtension) {
    if (typeof define === 'function' && define.amd) {
        define('gisele', function(Gisele) {
            addExtension(Gisele);
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        addExtension(require('gisele'))
    } else {
        addExtension(window.Gisele);
    }
})(function extension(Gisele) {
    'use strict';

    /* content goes here */

});
