/*jshint node: true, expr:true */
/*global describe, beforeEach, it, require */

var es = require('event-stream');
require('must'); // https://github.com/moll/js-must/blob/master/doc/API.md#Must


describe("Paging API", function () {
    "use strict";

    var mod;

    function stub() {
    }

    function notExpected() {
        throw "NOT EXPECTED";
    }

    function exists(val) {
        (!!val).must.be.true;
    }

    function notExists(val) {
        (!val).must.be.true;
    }

    function setMock(hash) {
        mod.__set__(hash);
    }

    function getFunc(name) {
        return mod.__get__(name);
    }

    // NOTE: Use create-module.js script to complete
    beforeEach(function (done) {
        mod = require("../lib/page-api-to-stream");
        done();
    });


    it("should page API", function (done) {
        function getPagingFunc() {
            var pageIndex = 0;

            return function getNextPageOfData(lastResponse, callback) {
                if (0 === pageIndex) {
                    (!lastResponse).must.be.true;
                } else {
                    lastResponse.must.eql("page" + pageIndex);
                }

                if (3 === pageIndex) {
                    return callback(null, {
                        items: []
                    });
                }

                pageIndex++;

                callback(null, {
                    response: "page" + pageIndex,
                    items: [1 * pageIndex, 2 * pageIndex]
                });
            }
        }


        var outStream = es.writeArray(function (err, array) {
            (!err).must.be.true;
            array.must.eql([1, 2, 2, 4, 3, 6]);
            done();
        });

        mod(getPagingFunc()).pipe(outStream);
    });


    it("should handle api error", function (done) {
        function getNextPageOfData(lastResponse, callback) {
            callback("API ERROR");
        }

        mod(getNextPageOfData).on('error', function(err) {
            err.must.eql("API ERROR");
            done();
        });
    });
});