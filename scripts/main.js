const searchContainer = document.querySelector(".search-container");
const input = document.querySelector(".search-input");
const icons = document.querySelectorAll(".bi");

input.addEventListener("focus", () => {
    for (const i of icons) {
        i.classList.add("search-focus");
    }

    input.addEventListener("blur", () => {
        for (const i of icons) {
        i.classList.remove("search-focus");
        }
    });
});

// Adiciona um ouvinte de tecla para a tecla "Enter"
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault(); // Impede a submissão padrão do formulário
        search();
    }
});

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

    const response = await fetch(weatherUrl);

    if (!response.ok) {
        throw new Error(`HTTP error: status ${response.status}`);
    }

    const data = await response.json();
    return data;
};

const displayResult = (data) => {
    const cityName = document.querySelector('.city-name');
    const temperature = document.querySelector('.temperature')
    cityName.innerText = data.name;
    temperature.innerHTML = `${data.main.temp.toFixed(0)}<span class="degrees">º</span>`

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

    const countryCode = data.sys.country
    getCountryName(countryCode)
        .then(countryName => {
            const country = document.querySelector('.country-name')
            country.innerText = countryName
    });
};

// Adiciona um ouvinte de clique para o ícone de pesquisa
for (const i of icons) {
    if (i.classList.contains("bi-search")) {
        i.addEventListener("click", () => {
        search();
        });
    }
}