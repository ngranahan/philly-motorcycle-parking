const express = require("express");
const expressNunjucks = require('express-nunjucks');
const bodyParser = require("body-parser");

// TODO: Figure out if we need to store the addresses and if so, where. Maybe a really simple mongo setup. 
// TODO: Convert addresses to lat and long (probably gonna use google maps geocoder for that)
// TODO: Setup webpack to compile frontend assets (probably want to use sass)
// TODO: Build the frontend (HTML and CSS)
// TODO: Integrate with map api and drop coordinates on the map
// TODO: Deploy to heroku or something similar

// TODO: Move these things over to another file
const axios = require('axios');
const cheerio = require('cheerio');
const url = 'http://www.philapark.org/motorcycle-scooter-parking/';
// 

const app = express();
const isDev = app.get('env') === 'development';

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('views', __dirname + '/views');
 
const njk = expressNunjucks(app, {
    watch: isDev,
    noCache: isDev
});

// TODO: Move this to another file
axios.get(url).then((res) => {
    // Scrape addresses and drop 'em in an array
    const $ = cheerio.load(res.data);
    const addresses = [];
    $('li', '.span3').each(function(i, el) {
        addresses[i] = $(this).text();
    });
    addresses.join(', ');
    console.log(addresses);
}).catch((err) => {
    console.log(`there was an error: ${err}`);
});
// 
 
app.get('/', (req, res) => {
    res.render('index');
});

app.listen(PORT, () => console.log("App running on port " + PORT + " 💥"));
