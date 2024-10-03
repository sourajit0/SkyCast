const apiKey = 'YOUR_KEY';
const apiHost = 'weatherapi-com.p.rapidapi.com';


async function getWeather(city) {
  const url = `https://${apiHost}/current.json?q=${encodeURIComponent(city)}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': apiHost
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (data.error) {
      alert(data.error.message);
      return;
    }


    const weatherCondition = data.current.condition.text.toLowerCase();
    const weatherContainer = document.getElementById('weather-container');

    // if (weatherCondition.includes('rain')) {
    //   weatherContainer.style.backgroundColor = '#3a4d5c'; // Dark blue for rain
    // } else if (weatherCondition.includes('sunny') || weatherCondition.includes('clear')) {
    //   weatherContainer.style.backgroundColor = '#f39c12'; // Sunny yellow/orange
    // } else if (weatherCondition.includes('cloud')) {
    //   weatherContainer.style.backgroundColor = '#7f8c8d'; // Cloudy gray
    // } else {
    //   weatherContainer.style.backgroundColor = '#2c3e50'; // Default dark color for other conditions
    // }

    document.getElementById('location').innerText = `${data.location.name}, ${data.location.region}, ${data.location.country}`;
    document.getElementById('temp').innerText = `Temperature: ${data.current.temp_c}°C (${data.current.temp_f}°F)`;
    document.getElementById('condition').innerText = `Condition: ${data.current.condition.text}`;
    document.getElementById('weather-icon').src = `https:${data.current.condition.icon}`;
    document.getElementById('wind').innerText = `${data.current.wind_kph} kph (${data.current.wind_mph} mph)`;
    document.getElementById('humidity').innerText = `${data.current.humidity}%`;
    document.getElementById('pressure').innerText = `${data.current.pressure_mb} mb`;


    document.getElementById('weather-info').style.display = 'block';

  } catch (error) {
    console.error('Error fetching weather data:', error);
    alert('Failed to fetch weather data. Please try again later.');
  }
}


document.getElementById('city-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const city = document.getElementById('city-input').value;
  getWeather(city);
});
