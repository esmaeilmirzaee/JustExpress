const express = require('express');
const app = express();

const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const loginRouter = require('./routes/loginRouter');
let port = process.env.PORT || 3000;
app.use(helmet());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
let justValid = false;

app.set('view engine', 'ejs');
app.set('views', `${process.cwd()}/views`);

app.get('/', (req, res, next) => {
    res.render('home');
});

// app.get('/login', (req, res, next) => {
//     res.render('login');
// });

app.use('/login', loginRouter);

// session stored in the server and will send to user when it requested
// cookies stored in the browser
app.post('/process_login', (req, res, next) => {
    console.log(req.body);
    const { email, password } = req.body;
    if (password === '123456789') {
        justValid = true;
        res.cookie('email', email);
        res.redirect('/welcome');
    } else {
        res.redirect('/login');
    }
});

app.get('/welcome', validateUser, (req, res) => {
    if (res.locals.validate) {
        res.render('welcome', { email: req.cookies.email });
    } else {
        res.redirect('/login');
    }
});

app.get('/logout', (req, res, next) => {
    res.clearCookie('email');
    res.redirect('/');
});

function validateUser(req, res, next) {
    if (req.cookies.email) {
        res.locals.validate = true;
    } else {
        res.locals.validate = false;
    }
    next();
}

// unwanted path
app.get('*', (req, res, next) => {
    res.send('<div class="container"><h1>Not found</h1></div>');
});

app.listen(port, () => {
    console.log(`Listening on ${port}.`);
});
