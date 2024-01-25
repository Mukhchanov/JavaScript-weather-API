import './style.scss';

'use strict';

const apiKey = '4a4a8753d06724ce59d974a134cc9027';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const weatherCity = document.querySelector('.weather__city');
const temp = document.querySelector('.weather__temp');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const searchInput = document.querySelector('.search__input');
const searchBtn = document.querySelector('.search__btn');
const weatherIcon = document.querySelector('.weather__icon');
const weather = document.querySelector('.weather');
const errorMessage = document.querySelector('.error');

async function checkWeather(city) {
    const response =  await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404) {
        errorMessage.style.display = 'block';
        weather.style.display = 'none';
    } else {
        var data = await response.json();

        weatherCity.innerHTML = data.name;
        temp.innerHTML = Math.round(data.main.temp) + '°C';
        humidity.innerHTML = data.main.humidity + ' %';
        wind.innerHTML = data.wind.speed + ' km/h';
    
        if(data.weather[0].main == 'Clouds') {
            weatherIcon.src = './images/clouds.png';
        } else if(data.weather[0].main == 'Clear') {
            weatherIcon.src = './images/clear.png';
        } else if(data.weather[0].main == 'Rain') {
            weatherIcon.src = './images/rain.png';
        } else if(data.weather[0].main == 'Drizzle') {
            weatherIcon.src = './images/drizzle.png';
        } else if(data.weather[0].main == 'Mist') {
            weatherIcon.src = './images/mist.png';
        }
    
        weather.style.display = 'block';
        errorMessage.style.display = 'none';
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(searchInput.value);
    searchInput.value = '';
});