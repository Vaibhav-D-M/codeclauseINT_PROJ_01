const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRINDAY', 'SATURDAY'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');



setInterval(() => {

    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const minute = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';

    timeEl.innerHTML = (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute) + ' ' + `<span id="am-pm">${ampm}</span>`;
    dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month];

}, 1000);



search.addEventListener('click', () => {

    const APIKey = '42a10710c2d15b1eb75794eddb1de1bf';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
               
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');
            container.style.position.top = '125px';
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'https://openweathermap.org/img/wn/01d@2x.png';
                    break;

                case 'Rain':
                    image.src = 'https://openweathermap.org/img/wn/09d@2x.png';
                    break;

                case 'Snow':
                    image.src = 'https://openweathermap.org/img/wn/13d@2x.png';
                    break;

                case 'Clouds':
                    image.src = 'https://openweathermap.org/img/wn/04d@2x.png';
                    break;

                case 'Haze':
                    image.src = 'https://openweathermap.org/img/wn/50d@2x.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '580px';


        });


});

