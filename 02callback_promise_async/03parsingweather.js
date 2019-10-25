"use strict";
const request = require('request');

function parseWeather(lat, lng, ak, callback) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${ak}`;
    request({
        url: url,
        method: "GET",
        json: true,
        proxy: "http://3.20.128.6:88"
    }, function (error, response, body) {
        if (error) {
            callback(error);
        } else if (response.statusCode === 200) {
            const temp = body.main.temp;
            callback(null, temp);
        }
    })
}

module.exports.parseWeather = parseWeather;