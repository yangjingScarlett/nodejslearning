"use strict";

const request = require('request');

function parseAddress(address, ak, callback) {
    const encodeAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}&&key=${ak}`;

    // Remember when run this script, the proxy must be the same proxy you use for LAN Setting
    request({
        url: url,
        method: "GET",
        proxy: 'http://3.20.128.6:88',
        json: true
    }, function (error, response, body) {
        if (error) {
            callback(error);
        }
        if (!error && response.statusCode == 200) {
            const status = body.status;
            if (status === "OK") {
                const infoJsonObj = body.results[0];
                const address = infoJsonObj.formatted_address;
                const location = infoJsonObj.geometry.location;
                callback(null, {
                    address: address,
                    latitude: location.lat,
                    longitude: location.lng
                })
            } else {
                callback(`No Result. Status: ${status}`);
            }

        }
    }
    )
}

module.exports.parseAddress = parseAddress;