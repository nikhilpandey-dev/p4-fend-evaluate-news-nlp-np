var axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
console.log(`Your API Key is: ${process.env.API_KEY}`);
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const cors = require('cors');
const { async } = require('regenerator-runtime');

var json = {
    'title': 'test json response',
    'message': 'this is a message',
    'time': 'now'
}

const app = express();
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


app.get('/hello', function (req, res) {
    res.send("Hello, world!")
});

app.post('/article', analyzeArticle);
articleData = {}

async function analyzeArticle(req, res) {

    try {
        console.log("The url send by you is: ");
    console.log(req.body.url);
    // articleData.push(req.body);
    articleURL = req.body.url;
    const url = createURL(articleURL);
    const response = await axios.post(url);
    // console.log("Response is: \n\n", response);
    articleData = {
        status: response.status,
        statusText: response.statusText,
        score_tag: response.data.score_tag,
        agreement: response.data.agreement,
        subjectivity: response.data.subjectivity,
        confidence: response.data.confidence
    };
    console.log("Response is: \n\n");
    console.log(articleData);
    res.send(articleData);

    } catch (error) {
        console.error(error);
    }
    
}


function createURL(articleURL) {
    const baseURL = 'https://api.meaningcloud.com/sentiment-2.1';
    const apiKey = process.env.API_KEY;
    const url = `${baseURL}?key=${apiKey}&lang=auto&url=${articleURL}`;
    return url;
}