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
// app.set('views', path.join(__dirname, 'views'));
app.set('views', `${process.cwd()}/views`);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log(`App is listening on ${port}.`);
});
