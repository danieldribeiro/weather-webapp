const searchContainer = document.querySelector(".search-container")
const input = document.querySelector(".search-input")
const icons = document.querySelectorAll(".bi")

input.addEventListener("focus", () => {
    for (const i of icons) {
        if(!i.classList.contains('bi-brightness-high-fill')){
            i.classList.add("search-focus")
        }
    }

    input.addEventListener("blur", () => {
        for (const i of icons) {
        i.classList.remove("search-focus")
        }
    })
})

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault()
        search()
    }
})

function search() {
    let city = input.value;
    getAndDisplayWeather(city);
    input.value = ''
}

const getAndDisplayWeather = async (city) => {
    try {
        const data = await getWeatherData(city);
        displayResult(data);
    } catch (error) {
        console.error(error.message);
    }
};

const getWeatherData = async (city) => {
    const apiKey = '93794c18194ddc939f782804dd07dee6';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const response = await fetch(weatherUrl);

    if (!response.ok) {
        throw new Error(`HTTP error: status ${response.status}`);
    }

    const data = await response.json();
    return data;
};

const displayResult = (data) => {
    //City
    const cityName = document.querySelector('.city-name');
    cityName.innerText = data.name;

    async function getCountryName(countryCode) {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
            if (!response.ok) {
                throw new Error(`HTTP error: status ${response.status}`);
            }
        
            const data = await response.json();
            const countryName = data[0]?.name?.common || 'Nome não encontrado';
        
            return countryName;
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    //Country
    const countryCode = data.sys.country
    getCountryName(countryCode)
        .then(countryName => {
            const country = document.querySelector('.country-name')
            country.innerText = countryName
    });

    //Temperature
    const temperature = document.querySelector('.temperature')
    temperature.innerHTML = `${data.main.temp.toFixed(0)}<span class="degrees">ºC</span>`

    //Temperature Min - Max
    const temperatureMinMax = document.querySelector('.max-min')
    temperatureMinMax.innerText = `Max.: ${data.main.temp_max.toFixed(0)}ºC Min.: ${data.main.temp_min.toFixed(0)}ºC`

    //Feels Like
    const feelsLike = document.querySelector('.feels-like')
    feelsLike.innerText = `Feels Like: ${data.main.feels_like.toFixed(0)}ºC`

    //Pressure
    const pressure = document.querySelector('.pressure')
    pressure.innerText = `Pressure: ${data.main.pressure}(hPa)`

    //humidity
    const humidity = document.querySelector('.humidity')
    humidity.innerHTML = `Humidity: ${data.main.humidity}%`

    // Visibility
    const visibility = document.querySelector('.visibility')
    let visibilityToKm = (data.visibility / 1000)
    visibility.innerText = `Visibility: ${visibilityToKm}Km`

    //Weather description
    const weatherDescription = document.querySelector('.weather-description')
    weatherDescription.innerText = `${data.weather[0].description}`

    //hour
    function convertUnixToDateFormat(unixTimestamp) {
        const date = new Date(unixTimestamp * 1000);
    
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        } 

        if(date.getHours() >= 18){
            changeBgNight()
        }
    
        const formattedDate = date.toLocaleDateString('en-US', options);
        return formattedDate
    }
    
    const unixTimestamp = data.dt
    
    const hour = document.querySelector('.hour')
    hour.innerText = convertUnixToDateFormat(unixTimestamp)

    console.log(convertUnixToDateFormat(1699628400)) 
    console.log(convertUnixToDateFormat(1699639200)) 
    console.log(convertUnixToDateFormat(1699650000)) 

}

for (const i of icons) {
    if (i.classList.contains("bi-search")) {
        i.addEventListener("click", () => {
            search();
        });
    }
}

function changeBgNight(){
    document.body.style.backgroundImage = 'url("../images/clear-night.jpg")'
}