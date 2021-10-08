const BASE_URL = 'http://api.countrylayer.com/v2/all'
const ACCESS_KEY = "9de26c215229bd44534d978a2c03eaea"

async function getAllCountries(){
    const countryURL = `${BASE_URL}?access_key=${ACCESS_KEY}`
    let countryData = null

    try{
        const response = await fetch(countryURL)
        countryData = await response.json()
        return countryData
    } catch(error){
        console.log(`Algo ha fallado ${error.message}`)
    }
}

async function loadCountries(){
    let data = await getAllCountries();
    main(data);
}

function main(data){
    countryData = data;
    document.getElementById("search").addEventListener("keyup", search);
    displayData();
}

function displayData(){
    let display="";
    countryData.forEach((country,index) => {
        display += `
            <ul id="${index}">
            <li><strong>Country Name:</strong> ${country.name}</li>
            <li><strong>Capital:</strong> ${country.capital}</li>
            </ul>
            `;
    });
    document.getElementById("data").innerHTML = display;
}

function search(){
    let text = document.getElementById("search").value;
    console.log(text)
    countryData.forEach((country, index) => {
        if (match(country.name,text) || text == "") show(index);
        else hide(index);
    });
}

function match(word, substring){
    console.log(word, substring);
    console.log(word.includes(substring));
    return word.includes(substring);
}

function hide(elementId){
    document.getElementById(elementId).style.display = "none";
}

function show(elementId){
    document.getElementById(elementId).style.display = "block";
}

loadCountries();