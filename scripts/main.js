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

for (const i of icons) {
    if (i.classList.contains("bi-search")) {
        i.addEventListener("click", () => {
            search();
        });
    }
}

function search() {
    let city = input.value
    getAndDisplayWeather(city)
    input.value = ''
}

const getAndDisplayWeather = async (city) => {
    try {
        const data = await getWeatherData(city)
        getForecastData(city)
        displayResult(data)
    } catch (error) {
        console.error(error.message)
    }
}

const getForecastData = async (city) => {
    const apiKey = '93794c18194ddc939f782804dd07dee6'
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

    const response = await fetch(forecastUrl)

    if (!response.ok) {
        throw new Error(`HTTP error: status ${response.status}`)
    }

    const forecastData = await response.json()

    setForecastData(forecastData)
    getForecastTemperature(forecastData)
    getForecastHours(forecastData)
    getForecastDescription(forecastData)

    return forecastData
}

function setForecastData(forecastData){
    const children = document.querySelector('.forecast').children
    const temperature =getForecastTemperature(forecastData)
    const hours = getForecastHours(forecastData)
    const getDescription = getForecastDescription(forecastData)

    let setDescription = []
    getDescription.map((e, i) => {
        switch(e){
            case 'céu limpo':
            case 'nuvens dispersas':
            case 'algumas nuvens':
                setDescription.push((hours[i] === '18:00' || hours[i] === '21:00' || hours[i] === '00:00' || hours[i] === '03:00')
                    ? '<i class="bi bi-moon-stars-fill"></i>'
                    : '<i class="bi bi-brightness-high-fill"></i>')
                break
            case 'nublado':
                setDescription.push('<i class="bi bi-cloud-fill"></i>')
                break
            case 'chovendo':
            case 'chuva leve':
            case 'chuva moderada':
            case 'chuva forte':
            case 'chuvisco de intensidade leve':
            case 'chuvisco':
            case 'chuvisco de intensidade forte':
            case 'chuvisco de intensidade leve':
            case 'chuva de chuvisco':
            case 'chuvisco de intensidade forte':
            case 'chuva e chuvisco':
            case 'chuva intensa e chuvisco':
            case 'chuvisco de chuva':
            case 'chuva de intensidade forte':
            case 'chuva muito forte':
            case 'chuva extrema':
            case 'chuva congelante':
            case 'chuva leve de intensidade':
            case 'chuva de chuvisco':
            case 'chuva de intensidade forte':
            case 'chuva irregular':
                setDescription.push('<i class="bi bi-cloud-rain-fill"></i>')
                break
            case 'pouca neve':
            case 'neve leve':
            case 'neve':
            case 'neve intensa':
            case 'chuva com neve':
            case 'chuva de neve leve':
            case 'chuva de neve':
            case 'chuva leve e neve':
            case 'chuva e neve':
            case 'chuva leve de neve':
            case 'chuva de neve':
                setDescription.push('<i class="bi bi-cloud-snow-fill"></i>')
                break
        }
    })

    for(i = 0; i <= children.length; i++){
        switch(i){
            case 0:
                children.item(i).innerHTML = `  ${temperature[0].toFixed(0)}º
                                                <p class='forecastIcon'>${setDescription[0]}</p>
                                                <p>${hours[0]}</p>`
                break
            case 1:
                children.item(i).innerHTML = `  ${temperature[1].toFixed(0)}º
                                                <p class='forecastIcon'>${setDescription[1]}</p>
                                                <p>${hours[1]}</p>`
                break
            case 2:
                children.item(i).innerHTML = `  ${temperature[2].toFixed(0)}º
                                                <p class='forecastIcon'>${setDescription[2]}</p>
                                                <p>${hours[2]}</p>`
                break
            case 3:
                children.item(i).innerHTML = `  ${temperature[3].toFixed(0)}º
                                                <p class='forecastIcon'>${setDescription[3]}</p>
                                                <p>${hours[3]}</p>`
                break
            case 4:
                children.item(i).innerHTML = `  ${temperature[4].toFixed(0)}º
                                                <p class='forecastIcon'>${setDescription[4]}</p>
                                                <p>${hours[4]}</p>`
                break
            case 5:
                children.item(i).innerHTML = `  ${temperature[5].toFixed(0)}º
                                                <p class='forecastIcon'>${setDescription[5]}</p>
                                                <p>${hours[5]}</p>`
                break
            case 6:
                children.item(i).innerHTML = `  ${temperature[6].toFixed(0)}º
                                                <p class='forecastIcon'>${setDescription[6]}</p>
                                                <p>${hours[6]}</p>`
                break
            case 7:
                children.item(i).innerHTML = `  ${temperature[7].toFixed(0)}º
                                                <p class='forecastIcon'>${setDescription[7]}</p>
                                                <p>${hours[7]}</p>`
                break
        }
    }
}

function getForecastTemperature(forecastData){
    let temp = []
    for(i of forecastData.list.slice(0, 8)){
        temp.push(i.main.temp)
    }
    displayChart(temp)
    return temp
}

function getForecastHours (forecastData) {
    let hour = []
    for(i of forecastData.list.slice(0, 8)){
        hour.push(i.dt_txt.slice(11, 16))
    }
    return hour
}

function getForecastDescription(forecastData){
    let description = []
    for(i of forecastData.list.slice(0, 8)){
        description.push(i.weather[0].description)
    }
    return description
}

const getWeatherData = async (city) => {
    const apiKey = '93794c18194ddc939f782804dd07dee6'
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

    const response = await fetch(weatherUrl)

    if (!response.ok) {
        throw new Error(`HTTP error: status ${response.status}`)
    }

    const data = await response.json()
    return data
}

const displayResult = (data) => {
    changeWeatherIcon(data)
    displayAside(data)
    displayMainInfo(data)
    changeBg(data)

    const hr = document.querySelector('hr')
    hr.style.display = 'block'
}

//=================================================== Functions ===================================================
function changeBgNight(){
    document.body.style.backgroundImage = 'url("../images/clear-night.jpg")'
}

function changeBg(data){
    const currentHour = new Date().getHours()

    switch(data.weather[0].description){
        case 'nublado':
            document.body.style.backgroundImage = 'url("../images/cloudy.jpg")'
            break
        case 'céu limpo':
        case 'algumas nuvens':
        case 'nuvens dispersas':
            (currentHour >= 18 || currentHour <= 3)
            ? document.body.style.backgroundImage = 'url("../images/clear-night.jpg")'
            : document.body.style.backgroundImage = 'url("../images/sunny.jpg")'
            break
        case 'chovendo':
        case 'chuva leve':
        case 'chuva moderada':
        case 'chuvisco de intensidade leve':
        case 'chuvisco':
        case 'chuvisco de intensidade forte':
        case 'chuvisco de intensidade leve':
        case 'chuva de chuvisco':
        case 'chuvisco de intensidade forte':
        case 'chuva e chuvisco':
        case 'chuva intensa e chuvisco':
        case 'chuvisco de chuva':
        case 'chuva de intensidade forte':
        case 'chuva muito forte':
        case 'chuva extrema':
        case 'chuva congelante':
        case 'chuva leve de intensidade':
        case 'chuva de chuvisco':
        case 'chuva de intensidade forte':
        case 'chuva irregular':
            document.body.style.backgroundImage = 'url("../images/rainy.jpg")'
            break
        case 'pouca neve':
        case 'neve leve':
        case 'neve':
        case 'neve intensa':
        case 'chuva com neve':
        case 'chuva de neve leve':
        case 'chuva de neve':
        case 'chuva leve e neve':
        case 'chuva e neve':
        case 'chuva leve de neve':
        case 'chuva de neve':
            document.body.style.backgroundImage = 'url("../images/snowing.jpg")'
            break
    }
}

async function getCountryName(countryCode) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
        if (!response.ok) {
            throw new Error(`HTTP error: status ${response.status}`)
        }
    
        const data = await response.json()
        const countryName = data[0]?.translations?.por?.common || 'Nome não encontrado'
    
        return countryName
    } catch (error) {
        console.error(error.message)
        return null
    }
}

function changeWeatherIcon(data){
    const weatherIcon = document.querySelector('.weather-icon')
    const currentHour = new Date().getHours()

    switch(data.weather[0].description){
        case 'nublado':
            weatherIcon.innerHTML = '<i class="bi bi-cloud-fill weather-icon"></i>'
            break
        case 'céu limpo':
        case 'nuvens dispersas':
        case 'algumas nuvens':
            (currentHour >= 18 || currentHour <= 3)
            ? weatherIcon.innerHTML = '<i class="bi bi-moon-stars-fill weather-icon"></i>'
            : weatherIcon.innerHTML = '<i class="bi bi-brightness-high-fill weather-icon"></i>'
            break
        case 'chovendo':
        case 'chuva leve':
        case 'chuva moderada':
        case 'chuvisco de intensidade leve':
        case 'chuvisco':
        case 'chuvisco de intensidade forte':
        case 'chuvisco de intensidade leve':
        case 'chuva de chuvisco':
        case 'chuvisco de intensidade forte':
        case 'chuva e chuvisco':
        case 'chuva intensa e chuvisco':
        case 'chuvisco de chuva':
        case 'chuva de intensidade forte':
        case 'chuva muito forte':
        case 'chuva extrema':
        case 'chuva congelante':
        case 'chuva leve de intensidade':
        case 'chuva de chuvisco':
        case 'chuva de intensidade forte':
        case 'chuva irregular':
            weatherIcon.innerHTML = '<i class="bi bi-cloud-rain-fill weather-icon"></i>'
            break
        case 'pouca neve':
        case 'neve leve':
        case' neve':
        case 'neve intensa':
        case 'chuva com neve':
        case 'chuva de neve leve':
        case 'chuva de neve':
        case 'chuva leve e neve':
        case 'chuva e neve':
        case 'chuva leve de neve':
        case 'chuva de neve':
            weatherIcon.innerHTML = '<i class="bi bi-cloud-snow-fill"></i>'
            break
    }
}

function displayAside(data){
    //City
    const cityName = document.querySelector('.city-name')
    cityName.innerText = data.name

    //Country
    const countryCode = data.sys.country
    getCountryName(countryCode)
        .then(countryName => {
            const country = document.querySelector('.country-name')
            country.innerText = countryName
    })

    //Temperature
    const temperature = document.querySelector('.temperature')
    temperature.innerHTML = `${data.main.temp.toFixed(0)}<span class="degrees">ºC</span>`

    //Temperature Min - Max
    const temperatureMinMax = document.querySelector('.max-min')
    temperatureMinMax.innerText = `Max.: ${data.main.temp_max.toFixed(0)}ºC Min.: ${data.main.temp_min.toFixed(0)}ºC`
}

function displayMainInfo(data){
    //Feels Like
    const feelsLike = document.querySelector('.feels-like')
    feelsLike.innerText = `Sensação: ${data.main.feels_like.toFixed(0)}ºC`

    //Weather description
    const weatherDescription = document.querySelector('.weather-description')
    weatherDescription.innerText = `${data.weather[0].description}`

    //hour
    function convertUnixToDateFormat(unixTimestamp) {
        const date = new Date(unixTimestamp * 1000)
    
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        } 
    
        const formattedDate = date.toLocaleDateString('pt-BR', options)
        return formattedDate
    }
    
    const unixTimestamp = data.dt
    
    const hour = document.querySelector('.hour')
    hour.innerText = convertUnixToDateFormat(unixTimestamp)

     //Pressure
    const pressure = document.querySelector('.pressure')
    pressure.innerHTML = `<i class="bi bi-water"></i> Pressão: ${data.main.pressure}(hPa)`

    //humidity
    const humidity = document.querySelector('.humidity')
    humidity.innerHTML = `<i class="bi bi-moisture"></i> Umidade: ${data.main.humidity}%`

    // Visibility
    const visibility = document.querySelector('.visibility')
    let visibilityToKm = (Number(data.visibility) / 1000).toFixed(2)
    visibility.innerHTML = `<i class="bi bi-eye"></i> Visibilidade: ${visibilityToKm}Km`

    //Wind
    const wind = document.querySelector('.wind')
    wind.innerHTML = `<i class="bi bi-wind"></i> Vento: ${data.wind.speed.toFixed(1)}Km/h`
}

const ctx = document.getElementById('forecastChart');
let chart = null

const displayChart = (temp) => {
        if (chart) {
            chart.destroy();
        }

        let temperatures = []
        temp.map((e) => {
            temperatures.push(e.toFixed(0))
        })

        chart = new Chart(ctx, {
            type: 'line',
            data: {
                    labels: ['', '', '', '', '', '', '', ''],
                    datasets: [{
                    label: '',
                    data: temperatures,
                    borderWidth: 3,
                    borderColor: 'rgb(255, 165, 0)',
                    tension: .4
                }]
            },
            options: {
                resposive: true,
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        display: false,
                        beginAtZero: false
                    }
                },
                plugins: {
                    legend: {
                        display: false // Desativa a exibição da legenda
                    }
                }
            }
    })
}