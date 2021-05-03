const express = require('express');
const app = express();

const helmet = require('helmet');
let port = process.env.PORT || 3000;
app.use(helmet());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', `${process.cwd()}/views`);

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/process_login', (req, res) => {
    res.json({ message: 'Loggedin' });
});

app.get('*', (req, res) => {
    res.send('<div class="container"><h1>Not found</h1></div>');
});

app.listen(port, () => {
    console.log(`App is listening on ${port}.`);
});
