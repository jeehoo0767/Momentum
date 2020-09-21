const COORDS = 'coords';
const API_KEY = "e785f87a9692eb0afd33a76d1cffc09b";
const weather = document.querySelector(".js-weather");

function getWeather(lat, lng){ // lat 위도 lng 경도 날씨정보 가져오기
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    )
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `섭씨${temperature}도@${place}`
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
    //handleGeoSucces 에서 저장된 위도,경도 객체를 localstorage에 저장.
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;//위도 가져오기
    const longitude = position.coords.longitude;//경도 가져오기
    const coordsObj = {
        latitude,
        longitude
    };
    //javascript에서 key명과 value명이 같다면 생략하여 하나만 사용해도 객체 할당
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("error");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }
    else{
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}
init();