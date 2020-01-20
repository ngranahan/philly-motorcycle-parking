const express = require("express");
const expressNunjucks = require('express-nunjucks');
const bodyParser = require("body-parser");

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
 
app.get('/', (req, res) => {
    res.render('index', {title: 'testing testing'});
});

app.listen(PORT, () => console.log("App running on port " + PORT + " 💥"));
