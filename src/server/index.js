const dotenv = require('dotenv');
dotenv.config();
// console.log(`Your API Key is: ${process.env.API_KEY}`);
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var bodyParser = require('body-parser')
var cors = require('cors')

var json = {
    'title': 'test json response',
    'message': 'this is a message',
    'time': 'now'
}

const app = express()
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());

app.use(express.static('dist'))

console.log(JSON.stringify(mockAPIResponse))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.get('/test', function (req, res) {
    res.json(mockAPIResponse);
})


// designates what port the app will listen to for incoming requests
const port = 8081;
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})

// More Poerful Get Requests

const appData = {
    "year": "1901",
    "category": "physics",
    "laureates": [
        {
            "id": "1",
            "firstname": "Wilhelm Conrad",
            "surname": "R\u00f6ntgen",
            "motivation": "\"in recognition of the extraordinary services he has rendered by the discovery of the remarkable rays subsequently named after him\"",
            "share": "1"
        }
    ]
}
app.get('/all', function (req, res) {
    res.send(appData);
})

const movieData = []

app.post('/', function (req, res) {
    res.send('Post received!');
})

app.post('/addMovie', addMovie);

function addMovie(req, res) {
    console.log("Request body is: ");
    console.log(req.body);
    movieData.push(req.body);
    console.log("Movie Data is:");
    console.log(movieData);
}

const projectData = [];

app.post('/add', function (req, res) {
    const data = req.body;
    console.log(data);
    projectData.push(data);

})

const urlData = []

app.post('/geturl', function (req, res) {
    console.log("Request body is: ");
    console.log(req.body);
    urlData.push(req.body);
    console.log("URL Data is:");
    console.log(urlData); 
})