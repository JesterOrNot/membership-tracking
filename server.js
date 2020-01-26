const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
var xssFilter = require('x-xss-protection');
var nosniff = require('dont-sniff-mimetype');
const request = require('request');

const app = express();

app.use(cors());
app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.use(xssFilter());
app.use(nosniff());
app.set('etag', false);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.use(
  express.static(path.join(__dirname, 'dist/club-members'), {
    etag: false
  })
);

app.get('/api/members', (req, res) => {
  // request('https://3000-e4d680b0-deb5-4ef1-9996-99a613870f7e.ws-us02.gitpod.io/members', (err, response, body) => {
    request('http://localhost:3000/members', (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

app.get('/api/members/ids', (req, res) => {
  request('http://localhost:3000/members', (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

// Submit Form
app.post('/api/addMember', (req, res) => {

});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/club-members/index.html'));
});

app.listen('8000', () => {
  console.log('Node Express server running');
});
