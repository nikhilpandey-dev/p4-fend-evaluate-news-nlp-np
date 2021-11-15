import { async } from "regenerator-runtime"

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    const resultsContainer = document.getElementById('results');
    removeChildren(resultsContainer)
    if (isValidURL(formText)) {
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
            p.innerHTML = combinedText;
            div.appendChild(p);
            resultsContainer.appendChild(div); 
        }) 
    } else {
        resultsContainer.innerHTML = "Invalid URL. Please enter a valid URL"
    }

    

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

/* Valid URL Testing as per the bonus point
Source: Check if a JavaScript string is a URL from stack overflow.
(https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url)
Implementation I've used: https://stackoverflow.com/a/5717133
```javascript
function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}
```
  */

function isValidURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

export { isValidURL }

function removeChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
    }
} 