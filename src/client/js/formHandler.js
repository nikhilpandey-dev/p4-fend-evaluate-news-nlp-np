function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)
  
    const obj = retrieveData(formText);
    console.log("Object is: ");
    console.log(obj);
    postData('/geturl', {url: formText})


    console.log("::: Form Submitted :::")
    const url = "http://localhost:8081/test";
    retrieveData(formText)
    .then(function(data) {
        // console.log(data.message);
        const div = document.createElement('div');
        const p1 = document.createElement('p');
        const p2 = document.createElement('p');
        p1.innerHTML = data.name;
        p2.innerHTML = data.main.temp;
        div.appendChild(p1);
        div.appendChild(p2);
        document.getElementById('results').appendChild(div);
        
    })
}


function getURL(zipCode) {
    const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
    const apiKey = '&appid=73bd3df1e312645a84349e249a9e4677&units=imperial';
    /* The URL requires a 2 letter ISO 3661 country code so have included US as a default country. I've included all URLs in README.md */
    const countryCode = 'us';
    const url = `${baseURL}${zipCode},${countryCode}${apiKey}`;
    
    return url;
}

export { handleSubmit }


async function retrieveData(zipCode) {

    const url = getURL(zipCode);
    const request = await fetch(url);
    try {
      // Transform into JSON
      const allData = await request.json();
      console.log("The weather data is: ");
      console.log(allData);
      console.log("The place is:");
      console.log(allData.name);
      return allData;
    } catch (error) {
      console.log('error: ', error);
    }
  }

async function postData(url = '', data = {}) {
    console.log(data);

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {

        const newData = await response.json();
        console.log(newData);
        return newData;
        
    } catch (error) {
        console.log("Error: ", error);
    }
}



export {postData}