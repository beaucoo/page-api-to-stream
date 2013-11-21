/*jshint node: true, expr:true */
/*global module, require, __dirname, process */


var _ = require('lodash');
var es = require('event-stream');


module.exports = function createApiPagingStream(getNextPageFunc) {
    "use strict";

    var lastResponse;

    return es.readable(function (count, callback) {
        var self = this;

        getNextPageFunc(lastResponse, function (err, result) {
            if (err) {
                return self.emit('error', err);
            }

            if (_.isEmpty(result.items)) {
                return self.emit('end');
            }

            lastResponse = result.response;

            _.each(result.items, function (item) {
                self.emit('data', item);
            });

            callback();
        });
    });
};