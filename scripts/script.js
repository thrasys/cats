
//! Adjust Font Size
function fontAdjustment() {

    let fontPixel = 18;
    
    function setCustom(elementId, value) {
        fontPixel = value;
        document.getElementById(elementId).style.fontSize = `${fontPixel}px`;
    }

    function increase(elementId) {
        fontPixel += 2;
        document.getElementById(elementId).style.fontSize = `${fontPixel}px`;
    }

    function decrease(elementId) {
        fontPixel -= 2;
        document.getElementById(elementId).style.fontSize = `${fontPixel}px`;
    }

    function reset(elementId) {
        fontPixel = 18;
        document.getElementById(elementId).style.fontSize = `${fontPixel}px`;
    }
    
    return { setCustom, increase, decrease, reset}
}

const setFontSize = new fontAdjustment();

document.getElementById('size-reset').onclick = () => setFontSize.reset('container');
document.getElementById('size-up').onclick = () => setFontSize.increase('container');
document.getElementById('size-down').onclick =  () => setFontSize.decrease('container');

//! Fetches a random fact

const catFactURL = 'https://catfact.ninja/fact'
const BtnReferesh = document.getElementById('refresh');

const searchCatBreed = document.getElementById('btn-search-submit');
searchCatBreed.addEventListener('click', () => {
    let breedName = document.getElementById('field-search-breed').value;
    if (breedName === '') {
        alert('Search Field Cannot be Empty!');
    } else {
        getCatDetails(breedName);
    }
})

async function getCatFact() {
    const response = await fetch(catFactURL);
    const data = await response.json();
    document.getElementById('cat-fact').innerText = data.fact;
}

BtnReferesh.addEventListener('click', () =>getCatFact());

//! Fetches Cat Details

const catDetailsURL = 'https://api.api-ninjas.com/v1/cats?name=';
const apiKey = 'BQO9pZUKJe3MYRUrUKkXqKfhiaYkpp3lZRCiBbkQ';

// Fetch Details Api
async function getCatDetails(breedName) {
    try {
        const response = await fetch(catDetailsURL+breedName, {
            method: "GET",
            headers: { 'X-api-key' : apiKey}
        });
        const catBreedData = await response.json();
        
        const catDetails = catBreedData[0]
        console.log(catBreedData[0]);
        
        detailsToAppend(catDetails);
        
    } catch (error) {
        console.log("Error: " + error);
    }
    
}

// Applies the fetched data to the html
async function detailsToAppend(responseData) {
    
    const catDetailsEl = document.getElementById('cat-details');
    const catPhoto = document.getElementById('cat-photo');
    catDetailsEl.innerHTML = "";
    catPhoto.innerHTML = "";
    

    const catName = document.createElement('p');
    catName.innerText = 'Name: ' + responseData['name'];
    
    const catOrigin = document.createElement('p');
    catOrigin.innerText = 'Origin: ' + responseData['origin'];
    
    const catLength = document.createElement('p');
    catLength.innerText = 'Length: ' + responseData['length'];

    const catMinLifeExpectency = document.createElement('p');
    catMinLifeExpectency.innerText = 'Minimum Life Expectancy: ' + responseData['min_life_expectancy'];
    
    const catMaxLifeExpectency = document.createElement('p');
    catMaxLifeExpectency.innerText = 'Maximum Life Expectancy: ' + responseData['max_life_expectancy'];

    const catImage = document.createElement('img');
    catImage.src = responseData['image_link']

    catDetailsEl.append(catName);
    catDetailsEl.append(catOrigin);
    catDetailsEl.append(catLength);
    catDetailsEl.append(catMinLifeExpectency);
    catDetailsEl.append(catMaxLifeExpectency);
    catPhoto.append(catImage);
    catImage.width = "300";

}
