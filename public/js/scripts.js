console.log('Client-side javascript file is loaded');
const foreCast = document.getElementById('forecast');
const enterAddressForm = document.getElementById('enterAddress');
const searchForm = document.getElementById('address');

// function called if fetch is successful
const showResult = (data, address) => {
  const {
    forecast,
    temperature,
    weather,
    location: { name, localtime: time, region },
  } = data;

  let insertHTML = `  
    <h2>Weather in <span id="address">${address}</span></h2>
    <p>${forecast}</p>
    <p id="weatherForecast">As of ${time}, it is ${weather} near ${name} in ${region}.</p>
  `;

  foreCast.innerHTML = insertHTML;
  enterAddressForm.reset();
};

// Event listeners
enterAddress.addEventListener('submit', (e) => {
  e.preventDefault();

  foreCast.innerHTML = '<h3>Loading ... </h3>';

  const url = `/weather?address=${encodeURIComponent(
    enterAddressForm.address.value
  )}`;

  if (enterAddressForm.address.value === '') {
    return (foreCast.innerHTML = '<h3>Please enter a valid address</h3>');
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => showResult(data, enterAddressForm.address.value));

  console.log(enterAddressForm.address.value);
});
