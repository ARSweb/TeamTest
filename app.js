const apiKey = "39b6727afb1087b977c26d6db8c93cc9";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const temp = document.getElementById("temp");
const city = document.getElementById("city");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");

async function getWeather(cityName){

    try{

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);

        const data = await response.json();

        if(data.cod !== 200){
            throw new Error(data.message);
        }

        temp.innerText = data.main.temp + "°C";
        city.innerText = data.name;
        humidity.innerText = data.main.humidity + "%";
        wind.innerText = data.wind.speed + " km/h";

        // weather icon
        const iconCode = data.weather[0].icon;

        weatherIcon.src =
        `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        // input tozalash
        cityInput.value = "";

    }
    catch(error){

        alert(error.message);

    }

}

searchBtn.addEventListener("click", () => {

    const cityName = cityInput.value;

    if(cityName === ""){
        alert("Enter city name");
        return;
    }

    getWeather(cityName);

});


// ENTER bilan qidirish
cityInput.addEventListener("keypress", (event) => {

    if(event.key === "Enter"){

        const cityName = cityInput.value;

        if(cityName === ""){
            alert("Enter city name");
            return;
        }

        getWeather(cityName);

    }

});

function getLocationWeather(){

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(async (position)=>{

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const url =
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            const response = await fetch(url);
            const data = await response.json();

            temp.innerText = data.main.temp + "°C";
            city.innerText = data.name;
            humidity.innerText = data.main.humidity + "%";
            wind.innerText = data.wind.speed + " km/h";

            const iconCode = data.weather[0].icon;

            weatherIcon.src =
            `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        });

    }else{

        alert("Geolocation not supported");

    }

}


// default location
getLocationWeather();