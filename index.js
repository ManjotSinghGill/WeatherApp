const API_KEY = "595b97ab6095aa46a847bba22d31def6";
const weatherXHR = new XMLHttpRequest();
const selectionElement = document.getElementById('Selector');
let lat;
let long;
let selCity;

let coords = new Map([
    ['ludhiana', [30.90, 75.85]],
    ['chandigarh', [30.74, 76.76]]
]);

function updateWeather(res){
    
    document.getElementById('city_name').textContent = `City: ${res['city']['name']}`;
    document.getElementById('weather').textContent = `Weather ${res['list'][0]['weather'][0]['main']}`;
    document.getElementById('description').textContent = `Description: ${res['list'][0]['weather'][0]['description']}`;
    document.getElementById('current_temp').textContent = `Current Temp: ${res['list'][0]['main']['temp']}`;
    document.getElementById('feels_like').textContent = `Feels Like: ${res['list'][0]['main']['feels_like']}`;
    document.getElementById('max_temp').textContent = `Max Temp: ${res['list'][0]['main']['temp_max']}`;
    document.getElementById('min_temp').textContent = `Min Temp: ${res['list'][0]['main']['temp_min']}`;
}

function sendRequest(){

    weatherXHR.onload = function (){
        if(weatherXHR.status == 200){
            let res = JSON.parse(this.response);
            updateWeather(res);
        }
    }

    weatherXHR.open('GET',`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`);
    //weatherXHR.send();
}


selectionElement.addEventListener('change', () => {
    selCity = selectionElement.value;

    if(coords.has(selCity)){
        lat = coords.get(selCity)[0];
        long = coords.get(selCity)[1];
        sendRequest();
    }
})

document.addEventListener('DOMContentLoaded', () => {
    selCity = selectionElement.value;

    if(coords.has(selCity)){
        lat = coords.get(selCity)[0];
        long = coords.get(selCity)[1];
    }

    sendRequest();
});