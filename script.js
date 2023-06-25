
var countries = document.getElementById('countries');
var weather = document.getElementById('weather');

async function getRestCountries() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const countriesList = await response.json();
        countriesList.forEach((country, index) => {
            countries.innerHTML += `

            <div class='row'>
            <div class='col col-lg-4 col-sm-12'>
            <div class='card' key='${index}'>
            <div class='card-header country-name'>${country.name.common}</div>
            <div class="card-body">
            <img class='card-img-top'src='${country.flags.png}' alt='Flag' />
            <div> Capital:${country.capital && country.capital[0]}</div>
            <div> Region:${country.region}</div>
            <div>Country Code:${country.cca3}</div>
            <button class='btn btn-primary' onclick='getWeather(${country.latlng[0]},${country.latlng[1]}, ${index})'>Click for Weather</button>
            
            <div id='weather-${index}'>
            </div>
            </div>
         </div>
            </div>
        </div>
            `
            console.log('Coutries: ', countriesList);
        })
    } catch (error) {
        console.log('Error: ', error);
    }
}

getRestCountries();



async function getWeather(lat, lng, index) {
    var weatherOfCountry = document.getElementById(`weather-${index}`);

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=f3414503a84e614ae22de22b4b156520`)
    const weatherOutput = await response.json();
    weatherOfCountry.innerHTML += `
        <p>Temperature: ${weatherOutput.main.temp} Celsius</p>
        <p>Feels like: ${weatherOutput.main.feels_like} Celsius</p>
        <p>Humidity: ${weatherOutput.main.humidity} </p>
    `

}