const express = require('express');
const app = express();
let port = process.env.PORT || 3000;
const path = require('path');
const helmet = require('helmet');

app.use(helmet());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', `${process.cwd()}/views`);

function validateUser(req, res, next) {
    res.locals.validate = true;
    next();
}

app.get('/', validateUser, (req, res) => {
    res.render('index', { html: '<h1>Adds</h1>' });
});

app.listen(port, () => {
    console.log(`App is listening on ${port}.`);
});
