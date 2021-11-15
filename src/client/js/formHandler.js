import { async } from "regenerator-runtime"

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    postData('/article', {url: formText})
    .then(function(data){
        console.log("The data returned is:");
        console.log(data);
        const div = document.createElement('div');
        const p = document.createElement('p');
        const score_tag = `score_tag: ${data.score_tag}\n`;
        const agreement = `agreement: ${data.agreement}\n`;
        const subjectivity = `subjectivity: ${data.subjectivity}\n`;
        const confidence = `confidence: ${data.confidence}\n`;
        const combinedText = `${score_tag}${agreement}${subjectivity}${confidence}`
        p.append(combinedText);
        div.appendChild(p);

        document.getElementById('results').appendChild(div); 
    })

    Client.checkForName(formText)

}

export { handleSubmit }

async function postData(url = '', data = {}) {
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
}

export {postData}