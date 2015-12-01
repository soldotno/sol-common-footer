'use strict';

var superagent = require('superagent');
var urlJoin = require('url-join');

var load = function load(config, callback) {
    var search = 'site';
    var url = urlJoin(config.baseUrl, search);
    var requestTimeout = (config.requestTimeout || 5) * 1000; // 1000 ms is 1 sec
    console.log(requestTimeout);
    superagent.get(url).timeout(requestTimeout).end(function (err, result) {
        if (err) {
            if (err.timeout) {
                return callback(null, {});
            }
            return callback(err);
        }

        callback(null, result.body);
    });
};

module.exports = load;