# Just Express (with a bunch of Node and HTTP) in detail

Added: May 3, 2021 → May 3, 2021
Tags: express, nodejs

# What is ExpressJS?

> Express considers itself as two things: 1. Router and 2. Middleware that comprises a webframework.

## Middleware

Req ———MIDDLEWARE——>Res

`Middleware` function is any functions that has access to the req, res and next object.

1. Request comes in
2. we need to validate the user, sometimes.
3. we need to store some things in the DB.
4. if there is data from the user we need to parse it and store it.
5. Response goes out.

```jsx
function validateUser(req,res,next) {
	res.locals = true; // This always reside in res and is valide for each res
	console.log('VALIDATED RAN!);
	next();
}

app.use(validateUser); // So this runs always (ie ALL paths and methods) for the entire application

app.get('/', (req,res,next)=>{
	res.send('<h1>Home page</h1>', res.locals);
});
```

```jsx
app.use('/admin', validateUser);

// This only runs on the specified path and for the get method.
app.get('/', (req, res, next) => {
    res.send('<h1>Home page</h1>', res.locals);
});

app.get('/admin', (req, res, next) => {
    res.send('<h1>Home page</h1>', res.locals);
});
```

## Config App

`app.set` assigns setting name to value. You may store any value that you want, but certain names can be used to configure the behaviour of the server. These special names are listed in the following page.

![Just%20Express%20(with%20a%20bunch%20of%20Node%20and%20HTTP)%20in%20de%206c18b65d2e7a4cfba858d9502a1898a9/Untitled.png](<Just%20Express%20(with%20a%20bunch%20of%20Node%20and%20HTTP)%20in%20de%206c18b65d2e7a4cfba858d9502a1898a9/Untitled.png>)

## Modules

What is `express-generator`? This is a scaffolding for `express` applications. It automatically generates a bunch of file to speed up `express` application development. By default, it uses `jade/pug` as view engine and `morgan` as logging mechanism.

```jsx
yarn add express-generator

express myNewSite

// change default view engine
express myNewSite --view=ejs
```

## Express

`express.json()`uses

`express.urlencoded({extension: true})`provides `body`

`express.Router()`helps by providing router

## Request

`req.ip` contains requesters ip

`req.ips`when the trust proxy setting does not evaluate to false, this property contains any array of IP addresses specified in the **X-Forwarded-For** request header. Otherwise, it contains an empty array.

`req.path` contains the requested path

`req.body` parsed data

`req.query` is an object, with a property of every key in the query string. It's the where we put insecure data.

`req.param`

`req.xhr`A boolean property that is **true** if the request's **X-Requested-With** header field is 'XMLHttpRequest", indicating that the request was issued by a client library such as jQuery.

`req.accepts(['html','json'])`

`req.range()`

`req.is()`

## Response

`res.send` sends text/html

`res.headersSent`is a boolean type that would be `true` if the headers is already sent.

`res.sendFile` sends a file and browser renders the file to display to the client.

`res.download(path_to_file, 'name_of_file_to_save.format')` sends a file to the client in a way that could be downloaded. The name of file is optional and if it is not provided the name of the file would be the identical to the name that is saved in the directory. Also, this action could be done with the following code. **The third option for download is a callback function that may be run so it's possible to handle errors if any occurs.**

```jsx
res.set('Content-Disposition', 'attachment');
res.sendFile(...);

//
res.download(`${process.cwd()}/userStatements/${file}`, `${user.id.statement}`, (error) => {
	// if there is an error in sending the file, headers may already be sent
	// and you get the well-known error. So the following couldn't be done.
	if (error) {
		res.redirect('/download/error');
	}
	console.log(error);
});
```

`res.attachment(path_to_file, 'name_of_file_to_save.format')` this only sets the headers for content-disposition to attachment. If, a file provided, it will also set the filename.

`res.locals` when a function requires a value in the middle of running middleware function. it's available through the res

`res.json/jsonp` sends JSON back as application/json.

`res.format()`runs different function regarding the accepted format.

`res.append(field [,value])` appends the specified **value** to the HTTP response header **field**.

```jsx
res.append('Link', ['<http://localhost/>', '<http://localhost:3000/>']);
res.append('Set-Cookie', 'foo=bar;Path=/;HttpOnly');
```

`res.type('text/html')`sets the mime-type and is equivalent to `res.set('Content-Type', 'text/html')`.

`res.vary('User-Agent').render('docs')`adds the field to the **Vary** response header, it it is not there already.

## BodyParser

`express` comes with `body-parser`. It parses incoming requests with JSON payload and is based on `body-parser`.

```jsx
app.use(express.json());
```

## UrlEncoded

This is a built-in middleware function in Express. It parses incoming requests with `urlencoded` payloads and is based on `body-parser`. It's type would be `application/x-www-form-urlencoded`.

**extended**: This option allows to choose between parsing the URL-encoded data with the **querystring** library (when false) or the **qs** library (when **true**).

```jsx
app.use(express.urlencoded({ extended: false }));
```

---

`UrlEncoded` and `JSON` functions provide `req.body` so without those two functions we won't be able to access `req.body`. **It's good practice to put all of the three functions in all `express` app (ie `app.use(express.static('folder_name'))`, `app.use(express.json())` and `app.use(express.urlencoded({extended:false}))`).**

---

### JQuery

```jsx
const ourRequest = &.ajax({
	method: "POST",
	url: "http://localhost:3000/",
	dataType: "json",
	data: {
		name: "Rob",
	},
});

ourRequest.then((response) => {
	console.log(response);
});
```

## Routing

HTTP defines a set of request methods to indicate the desired action to be performed for a given resource. Although they can also be nouns, these request methods are sometimes referred as HTTP verbs.

-   **`GET`** READ, this is the default for all browsers.
-   **`POST`** CREATE
-   **`DELETE`** DELETE
-   **`PUT`** UPDATE
-   **`ALL`** accepts any methods; this is `express` method and is not a regular `HTTP` method.

In a route, anytime key has : in front of it that is a wildcard so it will match anything in that slot. The key will be stored in always exist `req.params` object.

```jsx
app.get('/story/:storyId', (req, res, next) => {
    res.send(`<h1>Story ${req.params.storyId}</h1>`);
});

app.get('/story/:storyId/:link', (req, res, next) => {
    res.send(`<h1>Story ${req.params.storyId} | Link ${req.params.link}</h1>`);
});
```

## Static

To expose a folder and its content to the public just use the following code and access to the file in URL without naming the folder name. **You can serve as many static folders as you require.**

```jsx
// First create a folder named `public` in the root directory
app.use(express.static('public'));

// eg node.png reside in public folder
https://domain.com/node.png
```

## Send file

To send a file express requires absolute path.

```jsx
process.cwd();

// instead of

__dirname;
```

```jsx
const path = require('path');
app.all('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/node.html'));
});
```

### res.json([body])

Sends a JSON response, it converts the response `mime-type` to `JSON`. This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using `JSON.stringify()`. There is also `res.jsonp()` which supports `JSONP`.

### res.send()

Sends back a pure `text/html`.

## Helmet

It helps you secure your Express apps by setting various HTTP headers. _It's not a silver bullet, but it can help._ **There is no reason not to use `helmet`.**

```jsx
yarn add helmet

const helmet = require('helmet');
app.use(helmet());
```

## View/Template Engine

Steps to use a view engine. `express` as we know it happens. Then we define a view engine. next, inside one of our routes, we have a `res.render`. Next, we pass that `res.render` two things: the file we want to use and the data we want to send that file. `express` uses the node module for our specified view engine and parses the file that means, it takes the `HTML`, `JS`, `CSS` and combines it with whatever `node`. There is in the file. Finally, the result of this process is a compiled product of the things the browser can read.

-   Available ones

    EJS is the easiest one to start.

    Mustache is the widely used.

    Handlebars

    Jade/Pug

### EJS

[EJS](https://ejs.co)

```jsx
/rendering.js

// Sample file
// views/index.ejs
<%- include('navbar') %>
<h1>Rendered files!</h1>
<h2><%= msg %><h2>
<h3><%= locals.validate %></h3>
```

```jsx
/index.js

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
}

// The second parameter/argument shares/passes the data between ejs and express
app.get('/', validateUser, (req, res) => {
    res.render('index', {msg: 'Success'});
});

app.listen(port, () => {
    console.log(`App is listening on ${port}.`);
});
```

![Just%20Express%20(with%20a%20bunch%20of%20Node%20and%20HTTP)%20in%20de%206c18b65d2e7a4cfba858d9502a1898a9/Untitled%201.png](<Just%20Express%20(with%20a%20bunch%20of%20Node%20and%20HTTP)%20in%20de%206c18b65d2e7a4cfba858d9502a1898a9/Untitled%201.png>)

EJS Tags

### Handlebars

```jsx
yarn add hbs -S

// Sample file
// views/index.hbs
<h1>Rendered files!</h1>
```

### Jade/Pug

```jsx
yarn add pug -S

// Sample file
// /views/index.pug
h1 Rendered files!
```

## Headers

Headers can be grouped according to their contexts:

-   **General header**: Headers applying to both requests and responses but with no relation to the data eventually transmitted in the body.

`res.set('Date', new Date(1969, 6, 20))`

`res.set('Content-Type', 'text/plain')` sets the content-type to plain/text which will be display the whole html file without rendering them.

```jsx
curl -v http://localhost:3000

// in the information date is a general header. It can be modified in the
// express using res.set('Date', new Date(1969, 6, 20));
```

---

### Cache-Control

Standard `Cache-Control` directives that can be used by the client in an HTTP request.

-   Cache request directives
    -   max-age=<seconds>
    -   max-stale[=<seconds>]⇒*how long the cache will be stale/alive*.
    -   min-fresh=<seconds>
    -   no-cache⇒*don't use cache*
    -   no-store⇒*don't keep any data*
    -   no-transform
    -   only-if-cached
-   Cache response directives
    -   must-revalidate⇒
    -   no-cache
    -   no-store
    -   no-transform
    -   public⇒
    -   private⇒
    -   proxy-revalidate
    -   max-age=<seconds>
    -   s-maxage=<seconds>

```jsx
res.set('Cache-Control', 'no-store');
console.log(req.fresh);
console.log(req.stale);
```

---

-   **Request header**: Headers containing more information about the resource to be fetched or about the client itself.
-   **Response header**: Headers with additional information about the response, like its location or about the server itself (name and version etc.).
-   **Entity header**: Headers containing more information about the body of the entity, like its content length or its MIME-type.

# Projects

1. IMDB Clone
2. Twitter Clone
3. Netflix Clone
