"use strict";
const yargs = require('yargs');
const parseAddress = require('./03parsingaddress').parseAddress;
const parseWeather = require('./03parsingweather').parseWeather;

const argv = yargs
    .option({
        'address': {
            describe: "The address to fetch weather for",
            demand: false,
            alias: 'a',
            string: true
        },
        'geo_ak': {
            describe: "The ak for the gecodeapi access",
            demand: true,
            alias: "geo",
            string: true
        },
        'weather_ak': {
            describe: "The ak for the openweathermap access",
            demand: true,
            alias: "weather",
            string: true
        }
    })
    .help()
    .alias("help", "h")
    .argv

const address = argv.address ? argv.address : "1 huatuo road shanghai";
// to protect the ak, use it as the node terminal environment argument, sample: node 03requestapi.js --ak=yourak
const geo_ak = argv.geo_ak;
const weather_ak = argv.weather_ak;

parseAddress(address, geo_ak, (error, result) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Address: ${result.address}`);
        const lat = result.latitude;
        const lng = result.longitude;
        parseWeather(lat, lng, weather_ak, (error, temprature) => {
            if (error) {
                console.log(error);
            } else {
                console.log(`Temprature: ${temprature}`);
            }
        })
    }
})


