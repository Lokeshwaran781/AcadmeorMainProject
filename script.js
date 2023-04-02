const wrapper = document.querySelector(".wrapper"),
inputPart = document.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
searchBtn = inputPart.querySelector(".search"),
weatherPart = wrapper.querySelector(".weather-part"),
wIcon = weatherPart.querySelector("img"),
arrowBack = wrapper.querySelector("header i"),
locationBtn = inputPart.querySelector("#loc")
backButton = weatherPart.querySelector(".back");
let api, r;
inputField.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputField.value == ""){
        inputField.value="Delhi";
        requestApi(inputField.value);
        GetInfo();
    }
    else if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
        GetInfo();
    }
});
searchBtn.addEventListener("click", () =>{
    if(inputField.value==""){
        inputField.value="Delhi";
        requestApi(inputField.value);
        GetInfo();  
    }
    else if(inputField.value != ""){
        requestApi(inputField.value);
        GetInfo();
    }
});
locationBtn.addEventListener("click", () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Your browser not support geolocation api");
    }
});
function onSuccess(position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=ba43a4aff2f515eafec93587c3517753`;
    fetchData();
    var a="Chennai";
    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+a+'&appid=487ddf86d57d7a06357564af671f1106')
    .then(response => response.json())
    .then(data => {
        for(i = 0; i<7; i++){
            document.getElementById("day" + (i+1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min - 273.15).toFixed(1)+ "°";
        }
        for(i = 0; i<7; i++){
            document.getElementById("day" + (i+1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(2) + "°";
        }
        for(i = 0; i<7; i++){
            document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
            data.list[i].weather[0].icon +".png";
        }
        console.log(data)
    });
}
function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ba43a4aff2f515eafec93587c3517753`;
    fetchData();
}
function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}
function fetchData(){
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() =>{
        infoTxt.innerText = "Something went wrong";
        infoTxt.classList.replace("pending", "error");
    });
}
function weatherDetails(info){
    if(info.cod == "404"){
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
    }else{
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {temp, feels_like, humidity} = info.main;
        if(id == 800){
            wIcon.src = "icons/clear.svg";
        }else if(id >= 200 && id <= 232){
            wIcon.src = "icons/storm.svg";  
        }else if(id >= 600 && id <= 622){
            wIcon.src = "icons/snow.svg";
        }else if(id >= 701 && id <= 781){
            wIcon.src = "icons/haze.svg";
        }else if(id >= 801 && id <= 804){
            wIcon.src = "icons/cloud.svg";
        }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
            wIcon.src = "icons/rain.svg";
        }
        
        weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
        weatherPart.querySelector(".weather").innerText = description;
        weatherPart.querySelector(".location span").innerText = `${city}, ${country}`;
        weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
        infoTxt.classList.remove("pending", "error");
        infoTxt.innerText = "";
        inputField.value = "";
        wrapper.classList.add("active");
    }
}
backButton.addEventListener("click", () =>{
    location.reload(true);
});
function GetInfo() {
    if(inputField.value == ""){
        var a="Delhi";
        fetch('https://api.openweathermap.org/data/2.5/forecast?q='+a+'&appid=487ddf86d57d7a06357564af671f1106')
        .then(response => response.json())
        .then(data => {
            for(i = 0; i<7; i++){
                document.getElementById("day" + (i+1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min - 273.15).toFixed(1)+ "°";
            }
            for(i = 0; i<7; i++){
                document.getElementById("day" + (i+1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(2) + "°";
            }
             for(i = 0; i<7; i++){
                document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
                data.list[i].weather[0].icon +".png";
            }
            console.log(data)
        })
    }
    else{
        fetch('https://api.openweathermap.org/data/2.5/forecast?q='+inputField.value+'&appid=487ddf86d57d7a06357564af671f1106')
        .then(response => response.json())
        .then(data => {
            for(i = 0; i<7; i++){
                document.getElementById("day" + (i+1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min - 273.15).toFixed(1)+ "°";
            } 
            for(i = 0; i<7; i++){
                document.getElementById("day" + (i+1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(2) + "°";
            }
            for(i = 0; i<7; i++){
                document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
                data.list[i].weather[0].icon +".png";
            }
            console.log(data)
        })
    }
}   
    
var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];
function CheckDay(day){
    if(day + d.getDay() > 6){
        return day + d.getDay() - 7;
    }
    else{
        return day + d.getDay();
    }
}
for(i = 0; i<7; i++){
    document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i)];
}