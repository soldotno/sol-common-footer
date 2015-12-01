const superagent = require('superagent');
const urlJoin = require('url-join');

const loadSiteConfiguration = (config, callback) => {
    const search = 'site';
    const url = urlJoin(config.baseUrl, search);
    const requestTimeout = (config.requestTimeout || 5) * 1000; // 1000 ms is 1 sec
    console.log(requestTimeout);
    superagent
        .get(url)
        .timeout(requestTimeout)
        .end( (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result.body);
        });
};

module.exports = loadSiteConfiguration;
