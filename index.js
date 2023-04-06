const WEATHER_API = config.WEATHER_API;
const NASA_API = config.NASA_API;

const date = new Date().getFullYear();
const footer = document.querySelector('footer');
footer.textContent = `Copyright © ${date} By Basit Ali`;
footer.style.fontSize = "large"

//<<---------- cricket sports monk api token ------------>>>>>>>

// function getLeagues(){
//     fetch("https://cricket.sportmonks.com/api/v2.0/leagues?api_token=tJ7bU3nCUZh63hAo8Gp59gF407ZV7GTxYe7lqR5mZdNmHTvptbTLGBEAeoGj")
//     .then(res => console.log(res))
//     .catch(err => console.log(err))
// }

// <<<<<<<<<<<--------- open weather api ------------->>>>>>>>

async function getCoordinates(city){
    const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${WEATHER_API}`);
    const jsonData = await res.json();
    getWeather(jsonData, city);
}

// getCoordinates("sialkot");

async function getWeather([coordinates], city){
    const {lat, lon} = coordinates;
    const res = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily,minutely&appid=${WEATHER_API}`);
    const jsonData = await res.json();
    displayWeather(jsonData, city);

}

displayWeather();

// function displayWeather(weather, city){
function displayWeather(){
    // const {current: {weather: cuurentWeather}} = weather;
    // const [todayWeather] = cuurentWeather;
    const todayWeather = {id: 1, main: "cloudy", description: "cloudy very", icon: "02"};
    const city = "sailkot"
    const {id, main ,description, icon} = todayWeather;
    const weatherSection = document.querySelector('.grid-item.item2');
    weatherSection.textContent = `ID: ${id} main: ${main} DESc: ${description} CITY: ${city}`
    console.log(weatherSection);
}

// <<---------------- NASA API------------------->>>>>.

async function getAstronomyPic(){
    // const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API}`)
    // const jsonData = await res.json();
    // console.log(jsonData[1].url);

    const gridItem3 = document.querySelector('.grid-item.item3');
    const img = document.createElement('img');
    img.setAttribute('src',localStorage.getItem('imgUrl'));
    gridItem3.appendChild(img);

    const gridItem4 = document.querySelector('.grid-item.item4');
    const img2 = document.createElement('img');
    img2.setAttribute('src',localStorage.getItem('imgUrl'));
    gridItem4.appendChild(img2);


}

getAstronomyPic();