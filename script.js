window.addEventListener('load', () => {
    const claveAPI = 'd3c39f57206d5904890771c822ffaac3';
    const urlAPI = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

    const inputBusqueda = document.querySelector('input[type="text"]');
    const divError = document.querySelector('.error');
    const divClima = document.querySelector('.weather');
    const iconoClima = document.querySelector('.weather-icon');
    const temperatura = document.querySelector('.temp');
    const ciudad = document.querySelector('.city');
    const humedad = document.querySelector('.humidity');
    const viento = document.querySelector('.wind');

    const botonBusqueda = document.querySelector('button');
    botonBusqueda.addEventListener('click', () => {
        const valorCiudad = inputBusqueda.value.trim();
        if (valorCiudad) {
            const urlAPICiudad = `${urlAPI}${valorCiudad}&appid=${claveAPI}`;
            fetch(urlAPICiudad)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Ciudad no encontrada');
                    }
                    return response.json();
                })
                .then(data => {
                    const climaPrincipal = data.weather[0].main;
                    const imagenesClima = {
                        "Clouds": "images/clouds.png",
                        "Clear": "images/clear.png",
                        "Rain": "images/rain.png",
                        "Drizzle": "images/drizzle.png",
                        "Mist": "images/mist.png",
                        "Snow": "images/snow.png"
                    };
                    iconoClima.src = imagenesClima[climaPrincipal] || 'images/default.png';

                    temperatura.textContent = `${Math.round(data.main.temp)}°C`;
                    ciudad.textContent = data.name;
                    humedad.textContent = `${data.main.humidity}%`;
                    viento.textContent = `${data.wind.speed} km/h`;

                    divError.style.display = 'none';
                    divClima.style.display = 'block';
                })
                .catch(error => {
                    console.error('Error al obtener datos:', error);
                    divError.style.display = 'block';
                    divClima.style.display = 'none';
                });
        } else {
            divError.style.display = 'block';
            divClima.style.display = 'none';
        }
    });
});
