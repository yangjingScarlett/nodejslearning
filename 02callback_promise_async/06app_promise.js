"use strict";
const axios = require('axios-https-proxy-fix');
const yargs = require('yargs');

const argv = yargs
    .option({
        'address': {
            require: false,
            describe: 'Address to fetch gecode for',
            alias: 'a',
            string: true
        },
        'geo_ak': {
            require: true,
            describe: 'api key for accessing geocode',
            alias: 'geo',
            string: true
        },
        'weather_ak': {
            require: true,
            describe: 'api key for accessing openweathermap',
            alias: 'weather',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv

const address = argv.address ? argv.address : '1 huatuo road shanghai';
const geoAk = argv.geo_ak;
const weatherAk = argv.weather_ak;

const encodeAddress = encodeURIComponent(address);
const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}&&key=${geoAk}`;
const proxyConf = { proxy: { host: '3.20.128.6', port: 88 } };

axios.get(geoUrl, proxyConf).then((response) => {
    if (response.status === 200) {
        const resObj = response.data.results[0];
        const address = resObj.formatted_address;
        const lat = resObj.geometry.location.lat;
        const lng = resObj.geometry.location.lng;

        console.log(`Address: ${address}`);

        let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&&lon=${lng}&&appid=${weatherAk}`;
        return axios.get(weatherUrl, proxyConf);
    } else {
        throw new Error(`Cannot connect to ${geoUrl}`);
    }
}).then((response) => {
    if (response.status === 200) {
        const temperature = response.data.main.temp;
        console.log(`Temperature:${temperature}`);
    }
}).catch((error) => {
    console.log(error.message);
})

