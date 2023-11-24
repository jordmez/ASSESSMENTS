"use strict";

let formEl = document.querySelector("#search");     // CHANGED FROM SINGLE QUOTE TO DOUBLE AND ADDED HASHTAGS.
let cityInputEl = document.querySelector("#city");   // ADDED 'o' TO 'querySelectr' - spelling mistake.
let tempEl = document.querySelector("#temp");
let messageEl = document.querySelector("#message");

async function getData() {
  // Fetch data from Open Weather Map API, passing the input value as city
  let res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityInputEl.value}&appid=8f20807cea52eed92572aea82df038d5`
  );
  let data = await res.json();

  // We get temperatures back in Kelvin so we need to convert nto Celsius
  // https://www.rapidtables.com/convert/temperature/kelvin-to-celsius.html
  let temp = data.main.temp - 273.15;   // ADDED '.main'.
  temp = Math.round(temp);               // ADDED WHOLE LINE TO ROUND      // we used 'console.log(data) to identify the correct key in the object.
  tempEl.textContent = `${temp}°C`;       // CHANGED TO BACK TICKS.

  // Different temperature ranges should print different messages:
  //
  // Below 0 = Winter is coming
  // 0-10 = Sweater weather
  // 11-20 = Put a jacket on and regret it as soon as you start moving
  // Above 21 = Hotter outside than Taylor Swift's latest single

  if (temp < 0) {                                      // ADDED EQUALS SIGN SO THAT IT COVERS TEMPS FROM 0 AND BELOW.
    messageEl.textContent = "Winter is coming...";      // CHANGED THE ORDER OF THE LOGIC (MIRRORED IT).
  }  else if (temp > 20) {
        messageEl.textContent = "Hotter outside than Taylor Swift's latest single"; 
  } else if (temp > 10) {
    messageEl.textContent = "Put a jacket on and regret it as soon as you start moving";
  }  else if (temp >= 0) {                            // CHANGED FROM '>' TO '>=' TO MEET CORRECT REQUIREMENT.
    messageEl.textContent = "Sweater weather!";
  }
}

formEl.addEventListener("submit", function (e) {      // ADDED () TO 'e'.
  e.preventDefault();                                 // ADDED 'e.'.
  getData();
});