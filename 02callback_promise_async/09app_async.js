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

const proxyConf = { proxy: { host: '3.20.128.6', port: 88 } };

async function get(url, proxy) {
    try {
        const res = await axios.get(url, proxy);
        const info = res.data;
        return info;
    } catch (error) {
        console.log(error);
    }
}

async function main() {
    const encodeAddress = encodeURIComponent(address);
    const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}&&key=${geoAk}`;

    const geoInfo = await get(geoUrl, proxyConf);
    if (geoInfo.status === 'OK') {
        const formattedAdd = geoInfo.results[0].formatted_address;
        console.log(`Address: ${formattedAdd}`);

        const latitude = geoInfo.results[0].geometry.location.lat;
        const longitude = geoInfo.results[0].geometry.location.lng;
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&&lon=${longitude}&&appid=${weatherAk}`;

        const weatherInfo = await get(weatherUrl, proxyConf);
        const temperature = weatherInfo.main.temp;
        console.log(`Temperature:${temperature}`);
    }
}

main();