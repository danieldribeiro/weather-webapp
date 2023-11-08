const options = {
    key: '58eb68d178a44ab19e5225538230711',
	method: 'GET',
	headers: {
        'X-RapidAPI-Key': '8a04b1a555mshc5e6037e7da46edp1a711ajsn200128871740',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
};

const url = `http://api.weatherapi.com/v1/forecast.json?key=${options.key}&q=Rio de Janeiro&days=10&aqi=yes`;

fetch(url)
    .then(response => {
        if(!response.ok){
            throw new Error(`http error: status ${response.status}`)
        }
        return response.json()
    })
    .catch(error => {
        alert(error.message)
    })
    .then(response => {
        displayResult(response)
    })

function displayResult(location){
    const body = document.querySelector('body')
    
    console.log(location.location.name)
}