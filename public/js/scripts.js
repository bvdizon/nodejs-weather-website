console.log('Client-side javascript file is loaded');
const forecast = document.getElementById('forecast');
const enterAddressForm = document.getElementById('enterAddress');
const searchForm = document.getElementById('address');

// function called if fetch is successful
const showResult = (data, address) => {
  const {
    temperature,
    weather,
    location: { name, localtime: time, region },
  } = data;

  let insertHTML = `  
    <h2>Weather in <span id="address">${address}</span></h2>
    <p id="weatherForecast">The temperature in ${address} now is at ${temperature} degrees. As of ${time}, near ${name} in ${region} is experiencing ${weather}.</p>
  `;

  forecast.innerHTML = insertHTML;
  enterAddressForm.reset();
};

// Event listeners
enterAddress.addEventListener('submit', (e) => {
  e.preventDefault();

  forecast.innerHTML = '<h3>Loading ... </h3>';

  const url = `http://localhost:3000/weather?address=${encodeURIComponent(
    enterAddressForm.address.value
  )}`;

  if (enterAddressForm.address.value === '') {
    return (forecast.innerHTML = '<h3>Please enter a valid address</h3>');
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => showResult(data, enterAddressForm.address.value));

  console.log(enterAddressForm.address.value);
});
