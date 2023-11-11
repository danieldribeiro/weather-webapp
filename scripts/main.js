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
    const children = document.querySelector('.forecast').children
    const date = new Date()

    for(i = 0; i <= children.length; i++){
        switch(i){
            case 0:
                children.item(i).innerHTML = `  <p class='forecastIcon'></p>
                                                <p>${String((date.getHours() + 3) % 24).padStart(2, '0')}:00</p>`
                break
            case 1:
                children.item(i).innerHTML = `  <i class="bi bi-moon-stars-fill"></i>
                                                <p>${String((date.getHours() + 6) % 24).padStart(2, '0')}:00</p>`
                break
            case 2:
                children.item(i).innerHTML = `  <i class="bi bi-moon-stars-fill"></i>
                                                <p>${String((date.getHours() + 9) % 24).padStart(2, '0')}:00</p>`
                break
            case 3:
                children.item(i).innerHTML = `  <i class="bi bi-moon-stars-fill"></i>
                                                <p>${String((date.getHours() + 12) % 24).padStart(2, '0')}:00</p>`
                break
            case 4:
                children.item(i).innerHTML = `  <i class="bi bi-moon-stars-fill"></i>
                                                <p>${String((date.getHours() + 15) % 24).padStart(2, '0')}:00</p>`
                break
            case 5:
                children.item(i).innerHTML = `  <i class="bi bi-moon-stars-fill"></i>
                                                <p>${String((date.getHours() + 18) % 24).padStart(2, '0')}:00</p>`
                break
            case 6:
                children.item(i).innerHTML = `  <i class="bi bi-moon-stars-fill"></i>
                                                <p>${String((date.getHours() + 21) % 24).padStart(2, '0')}:00</p>`
                break
            case 7:
                children.item(i).innerHTML = `  <i class="bi bi-moon-stars-fill"></i>
                                                <p>${date.getHours()}:00</p>`
                break
        }
    }

    for(i of forecastData.list.slice(0, 8)){
        console.log(i)
    }

    changeForecastIcons(forecastData)

    return forecastData
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
    displayChart()
}


//=================================================== Functions ===================================================
function changeBgNight(){
    document.body.style.backgroundImage = 'url("../images/clear-night.jpg")'
}

function changeBg(data){
    switch(data.weather[0].description){
        case 'nublado':
            document.body.style.backgroundImage = 'url("../images/cloudy.jpg")'
            break
        case 'céu limpo':
        case 'algumas nuvens':
        case 'nuvens dispersas':
            document.body.style.backgroundImage = 'url("../images/sunny.jpg")'
            break
        case 'chovendo':
        case 'chuva moderada':
        case 'trovoada com chuva fraca':
        case 'chuva leve':
            document.body.style.backgroundImage = 'url("../images/rainy.jpg")'
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
    switch(data.weather[0].description){
        case 'nublado':
            weatherIcon.innerHTML = '<i class="bi bi-cloud-fill"></i>'
            break
        case 'céu limpo':
        case 'nuvens dispersas':
        case 'algumas nuvens':
            weatherIcon.innerHTML = '<i class="bi bi-brightness-high-fill"></i>'
            break
        case 'chovendo':
        case 'chuva moderada':
            weatherIcon.innerHTML = '<i class="bi bi-cloud-rain-fill"></i>'
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

function changeForecastIcons(forecastData){
    const forecastIcon = document.querySelector('.forecastIcon')
    switch(forecastData.list[0].weather[0].description){
        case 'nublado':
            forecastIcon.innerHTML = '<i class="bi bi-cloud-fill"></i>'
            break
        case 'céu limpo':
        case 'nuvens dispersas':
        case 'algumas nuvens':
            forecastIcon.innerHTML = '<i class="bi bi-brightness-high-fill"></i>'
            break
        case 'chovendo':
        case 'chuva moderada':
            forecastIcon.innerHTML = '<i class="bi bi-cloud-rain-fill"></i>'
            break
    }
}

const ctx = document.getElementById('forecastChart');
let chart = null

const displayChart = () => {
        if (chart) {
            chart.destroy();
        }

        chart = new Chart(ctx, {
            type: 'line',
            data: {
                    labels: ['', '', '', '', '', '', ''],
                    datasets: [{
                    label: '',
                    data: [24, 23, 22, 23, 28, 32, 31, 28],
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
                        beginAtZero: true
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