const dotenv = require('dotenv');
dotenv.config();
// console.log(`Your API Key is: ${process.env.API_KEY}`);
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const cors = require('cors');
api_key = process.env.API_KEY;
console.log(`API key is: ${api_key}`);
const app = express()
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
const port = 8081;
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})