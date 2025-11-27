const apiKey = "bd8934559da2bb0375605efaea9ad6f6";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const forcastApiKey = "DX93C8KMYXXTY3ZJRY3EYJ3X5";
const forcastApiUrl =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const http = new XMLHttpRequest();

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// function to find users current locatiion
function findMyCoordinates() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const bdcAPI = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`;
        getAPI(bdcAPI);
      },
      (err) => {
        alert(err.message);
      }
    );
  } else {
    alert("Geolocation is not supported by your browser");
  }
}

function getAPI(bdcAPI) {
  http.open("GET", bdcAPI);
  http.send();
  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      const results = JSON.parse(this.responseText);
      checkWeather(results.locality);
    }
  };
}

findMyCoordinates();

//function to get the weather status
async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404 || city == "") {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".loader").style.display = "none";
    document.querySelector(".forcast").style.display = "none";
  } else {
    var data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " kmph";

    let weatherCondition = data.weather[0].main.toLowerCase();
    weatherIcon.src = `images/${weatherCondition}.png`;

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    document.querySelector(".loader").style.display = "none";

    checkForcast(city);
  }
}

//function to format date
function formatDate(date, format) {
  const padZero = (num) => num.toString().padStart(2, "0");
  const map = {
    yyyy: date.getFullYear(),
    yy: date.getFullYear().toString().slice(-2),
    mm: padZero(date.getMonth() + 1),
    dd: padZero(date.getDate()),
  };
  return format.replace(/yyyy|yy|mm|dd/g, (matched) => map[matched]);
}

// get the current date
const today = new Date();

//get yeaterday date
const yesterdayDate = new Date(today);
yesterdayDate.setDate(today.getDate() - 1);

//get tomorrow date
const tomorrowDate = new Date(today);
tomorrowDate.setDate(today.getDate() + 1);

let yesterday = formatDate(yesterdayDate, "yyyy-mm-dd");
let tommorow = formatDate(tomorrowDate, "yyyy-mm-dd");

//function to get whether for forcasting
async function checkForcast(city) {
  const response = await fetch(
    forcastApiUrl + city + `/${yesterday}/${tommorow}?key=${forcastApiKey}`
  );

  if (!response.ok) {
    const text = await response.text(); // read raw text if not JSON
    console.error("Forecast API error:", text);
    document.querySelector(".yesterday").innerHTML = "Maximum daily ";
    document.querySelector(".tommorow").innerHTML = "cost exceeded";
    return;
  }

  const data = await response.json();
  console.log(data);

  document.querySelector(".yesterday").innerHTML = data.days[0].conditions;
  document.querySelector(".tommorow").innerHTML = data.days[2].conditions;

  //get the 24 hour forcast

  for (let i = 0; i < 24; i++) {
    document.querySelector(".hour" + i).innerHTML =
      data.days[1].hours[i].datetime;
    document.querySelector(".temp" + i).innerHTML =
      data.days[1].hours[i].temp + "°c";
    document.querySelector(".weather" + i).innerHTML =
      data.days[1].hours[i].conditions;
  }

  document.querySelector(".forcast").style.display = "block";
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
