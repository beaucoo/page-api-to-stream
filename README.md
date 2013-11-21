#PAGE-API-TO-STREAM

Consume any pageable API and convert it to a stream

Install via <code>npm install page-api-to-stream</code>

<pre>
// Example (see tests for more):

<code>
// Create the paging function that gets the data in pages
// Trick: Use a closure to create a scoped page index (or whatever demarks pages e.g. dates)
function getPagingFunc() {
    var pageIndex = 0;

    function getDataFromApi(lastResponse, callback) {
        // Create url w/ pageIndex (incremented each time)
        // Retrieve page of data

        callback(null, {
            response: res,              // The full response. Will be pass in on next call as 'lastReponse' for own use during api request and paging
            items: res.items || []      // An array of items retrieved. Return 0 to end paging
        });
    }
}

// 'pageApi' will repeatedly call 'getDataFromApi' until zero items are returned
var pageApi = require('./page-api-to-stream');
pageApi(getPagingFunc()).pipe(outStream);
</code>
</pre>


##Release Notes
v1.0.0 First

##Running Tests

* Run 'npm test'
* or run `mocha test --require must --reporter spec --recursive`

##License
(The MIT License)

Copyright (c) 2013-20* BeauCoo Technologies Inc. <info@beaucoo.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

