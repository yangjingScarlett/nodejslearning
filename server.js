"use strict";
import express from 'express';
import path from 'path';
import hbs from 'hbs';

import logger from './logger';
import config from './config';

const port = config.port;

var app = express();

app.set('views', config.VIEW_PATH);
app.set('view engine', 'hbs');
app.use(express.static(config.VIEW_PATH)); // app.use() is for registering some middlewares, you can customize it

hbs.registerPartials(path.join(config.VIEW_PATH, 'partials'))
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: "Home Page"
    })
});

app.get('/user', (req, res) => {
    res.render('user.hbs', {
        pageTitle: "User Page",
        userInfo: JSON.stringify({
            name: 'Username',
            likes: ['reading', 'singing', 'skating']
        }, undefined, 2)
    })
})

app.get('/help', (req, res) => {
    res.render('help.hbs', {
        pageTitle: 'Help Page'
    })
})

app.get('/error', (req, res) => {
    res.render('error.hbs', {
        pageTitle: 'Help Page',
        errorMessage: 'Unable to connect this page.'
    })
})

app.listen(port, () => {
    logger.info(`Application started on  ${port}`);
});