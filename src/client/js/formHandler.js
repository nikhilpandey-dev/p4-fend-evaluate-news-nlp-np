function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/test')
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = res.message
    })
}

export { handleSubmit }

// Personal API Key for OpenWeatherMap API
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=73bd3df1e312645a84349e249a9e4677&units=imperial';

/* The URL requires a 2 letter ISO 3661 country code so have included US as a default country. I've included all URLs in README.md */
const countryCode = 'us';

async function handleSubmitWeatherData(event) {
    event.preventDefault();
    const request = await fetch('/recent');
    try {
        const recentData = await request.json();
        // console.log(recentData);
        /* We need to convert dt to javascript date and it's in UNIX epoch time.
        For this I've used:
        1. https://stackoverflow.com/questions/23576805/what-format-is-this-date-value-in, and
        2. https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
         */
        // const timeStamp = recentData.date * 1000;
        // // Converted UNIX time to UTC and then to UTC String
        // const dateVal = new Date(timeStamp).toUTCString();
        // document.getElementById('place').innerHTML = recentData.placeName;
        // document.getElementById('date').innerHTML = dateVal;
        // document.getElementById('temp').innerHTML = recentData.temp;
        // document.getElementById('content').innerHTML = recentData.feelings;
        document.getElementById('results').innerHTML = recentData.placeName;

    
      } catch (error) {
        console.log('error: ', error);
      }
}

/*  Function to Get Weather API Data */

async function retrieveWeatherData(baseURL, zipcode, countryCode, apiKey) {
    const url = `${baseURL}${zipCode},${countryCode}${apiKey}`;
    const request = await fetch(url);
    try {
        
        // Transform into JSON format

        const allData = await request.json();
        console.log(allData);
        return allData;

    } catch (error) {
        console.log("Error: ", error);
    }
}

// Function to Post data
async function postData(url = "", data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },     
    });

    try {

        const newData = await response.json();
        console.log(newData);
        return newData;
        
    } catch (error) {
        console.log("Error: ", error);
    }
}

// Update UI
function getZip(event) {
    const zipCode = document.getElementById('name').value;
    retrieveWeatherData(baseURL, zipCode, countryCode, apiKey).then((data) => {
        const newData = {
            placeName: data.name,
            temp:data.main.temp,
            date: data.dt,
            feelings: feelingsExpressed
          };
          postData('/getWeather', newData);
          // Updating UI with the latest data
          
          updateUI();
    })

}

// export {getZip}