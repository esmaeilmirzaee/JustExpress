const express = require('express');
const app = require('app');
let port = process.env.PORT || 3000;

const hamlet = require('hamlet');

app.use(hamlet());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Welcome');
});

app.listen(port, () => {
    console.log(`App is listening on ${port}.`);
});
