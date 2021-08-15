console.log("hey the script is running ...");
const apiKey = "8bfc830cbf06535c2370e846738e78be";

const getCurrent = (cityName) => {
    const query = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
    fetch(query).then(response => response.json()).then((data) => {
        console.log(data);

        const template = `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${data.name} (${new Date().toLocaleDateString()}) <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png"/></h5>
                <p class="card-text">Temp: ${data.main.temp} F</p>
                <p class="card-text">Humidity: ${data.main.humidity} %</p>
                <p class="card-text">Wind Speed: ${data.wind.speed} mph</p>
            </div>
        </div>
        `;

        document.querySelector("#current").innerHTML = template;
    })
}

const getForecast = (cityName) => {
    const query = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`;
    fetch(query).then(response => response.json()).then((data) => {
        console.log(data);

        const filteredData = data.list.filter((datum) => datum.dt_txt.includes("12:00:00"));

        let template = "";
        filteredData.forEach((datum) => {
            template += `
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">(${datum.dt_txt}) <img src="https://openweathermap.org/img/w/${datum.weather[0].icon}.png"/></h5>
                    <p class="card-text">Temp: ${datum.main.temp} F</p>
                    <p class="card-text">Humidity: ${datum.main.humidity} %</p>
                    <p class="card-text">Wind Speed: ${datum.wind.speed} mph</p>
                </div>
            </div>
            `;

        })

        document.querySelector("#forecast").innerHTML = template;
    })
}

const createCityBtn = (cityName) => {
    const container = document.createElement("li");
    container.textContent = cityName;
    container.setAttribute("name",cityName);

    document.querySelector("#city-btn-container").append(container);

    document.querySelector(`[name="${cityName}"]`).addEventListener("click", () => {
            //show current weather
    getCurrent(cityName);
    // show forecast
    getForecast(cityName);
    })
}

document.querySelector("#weather-form").addEventListener("submit", (event) => {
    event.preventDefault();

    //get user input field
    const cityName = document.querySelector("#city").value;

    //show current weather
    getCurrent(cityName);
    // show forecast
    getForecast(cityName);
    //create a city btn
    createCityBtn(cityName)
});



