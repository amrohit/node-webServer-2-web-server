const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();


hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

//Using handlebars view engine for express.
//we have ton of others -> view js or pug
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    res.render('maintenance.hbs');
});
//using express -> middlewear to host static webpage
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});


// app.get('/', (req, res) => {
//     //res.send('<h1>Hello Express!</h1>');
//     res.send({
//         "name": "Rohit Sharma",
//         "course": "Node Js",
//         "day": "Sunday"
//     });
// });

app.get('/about', (req, res) => {
    // res.send('<h1>about Page</h1>');
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home New Page',
        welcomeMessage: 'Welcome to my website'
    });
});

app.get('/error', (req, res) => {
    res.send({
        errorMessage: "Something went wrong"
    });
});


app.listen(port, () => {
    console.log(`Starting Server on port ${port}`);
});