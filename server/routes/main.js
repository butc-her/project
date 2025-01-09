const express = require('express');
const app = express.Router();


app.get('/', (req, res) => {
    const locals = {
        title: "EthBenue",
        description: "Shaping the Future of Blockchain in Benue"
    };
    res.render('index', { locals });
});

app.get('/about-us', (req, res) => {
    const locals = {
        title: "EthBenue",
        description: "Shaping the Future of Blockchain in Benue"
    };
    res.render('about-us', { locals });
});

app.get('/event', (req, res) => {
    const locals = {
        title: "EthBenue",
        description: "Shaping the Future of Blockchain in Benue"
    };
    res.render('event', { locals });
});

app.get('/resourcesG', (req, res) => {
    const locals = {
        title: "EthBenue",
        description: "Shaping the Future of Blockchain in Benue"
    };
    res.render('resourcesG', { locals });
});

module.exports = app;