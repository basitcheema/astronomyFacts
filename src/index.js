require("dotenv").config();

const date = new Date().getFullYear();
const footer = document.querySelector('footer p');
footer.textContent = `Copyright © ${date} By Basit Ali`;
footer.style.fontSize = "medium"


// <<<<<<<<<<<--------- open weather api ------------->>>>>>>>

function btnPlanet(){
    const city = "sialkot";
    getCoordinates(city).then(res => {
        console.log(res[0].name);
        getWeather(res, res[0].name).then(weather => {
            const {weather: [description]} = weather;
            const {main} = description;
            const currentWeather = {temp: weather.temp, feelsLike:weather.feels_like, humidity:weather.humidity, description: main}
            displayWeather(currentWeather, "earth");
            })
        });
}

const planetPress = document.querySelector('.planetLink');
planetPress.addEventListener('click', () =>{
    btnPlanet();
})

async function getCoordinates(city){
    const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.WEATHER_API}`);
    const jsonData = await res.json();
    return jsonData;
}


async function getWeather([coordinates]){
    const {lat, lon} = coordinates;
    const res = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily,minutely&units=metric&appid=${process.env.WEATHER_API}`);
    const jsonData = await res.json();
    return jsonData.current;
}


function displayWeather(currentWeather, planet){
    const {temp, feelsLike, humidity, description} = currentWeather;
    console.log(currentWeather, planet);
    if (planet === "earth"){
        const earthDiv = document.querySelector('.card.earth')
        const earthh6 = earthDiv.querySelector('h6')
        earthh6.textContent = `Temp: ${temp} C Humidity: ${humidity}`;
        const earthh7 = earthDiv.querySelector('h7')
        earthh7.textContent = `Feels Like: ${feelsLike} C --- ${description}`;
    // } else {
        const marsDiv = document.querySelector('.card.mars')
        const marsh6 = marsDiv.querySelector('h6')
        marsh6.textContent = `Temp: ${temp} C Humidity: ${humidity}`;
        const marsh7 = marsDiv.querySelector('h7')
        marsh7.textContent = `Feels Like: ${feelsLike} C --- ${description}`;
    }

}



// <<---------------- NASA API------------------->>>>>.
// getAstronomyPic();
// getMarsWeather();
// getRoverPhotos();
// getRoverPhotos2();
// getPatent();

async function getAstronomyPic(){
    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API}`)
    const jsonData = await res.json();
    console.log(jsonData);

    const carouselSliders = document.querySelectorAll('.carousel-item');

    for(let i=0; i < jsonData.length; i++){

        const img = carouselSliders[i].querySelector('img');
        if (jsonData[i].media_type = "image") {
            img.setAttribute('src',jsonData[i].url);
        } else {

            img.setAttribute('src','https://apod.nasa.gov/apod/image/0705/m81_hst.jpg');
        }


    }
}

async function getMarsWeather(){
    const res = await fetch(`https://api.nasa.gov/insight_weather/?api_key=${process.env.NASA_API}&feedtype=json&ver=10`);
    const jsonData = await res.json();
    console.log(jsonData);
}

async function getRoverPhotos(){
    const res = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=${process.env.NASA_API}`);
    const jsonData = await res.json();
    const cardsRover = document.querySelector('.cards-rover .card');
    const img = cardsRover.querySelector('img');
    img.setAttribute('src',jsonData.photos[3].img_src);
    
}

async function getRoverPhotos2(){
    const res = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=2&api_key=${process.env.NASA_API}`);
    const jsonData = await res.json();
    const cardsRoverLong = document.querySelector('.cards-rover-long');
    const img = cardsRoverLong.querySelector('img');
    img.setAttribute('src',jsonData.photos[3].img_src);
}

// NASA Patents
async function getPatent(){
    const res = await fetch(`https://api.nasa.gov/techtransfer/patent/?engine&api_key=${process.env.NASA_API}`);
    const jsonData = await res.json();
    console.log(jsonData);
}


 