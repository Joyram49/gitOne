const cityForm = document.querySelector('form')
const card = document.querySelector('.card')
const details = document.querySelector('.details')
const image = document.querySelector('img.time')
const icon = document.querySelector('.icon img')
const forcast = new Forcast();

// updating User Intrface
const updateUI = (data)=>{
    const cityDets = data.cityDets;
    const weather = data.weather;


    //updating image
    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    image.setAttribute('src', timeSrc);

    //updating icons
    let iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc)


    //updating the city details...
    details.innerHTML =`
        <h5 class="my-2">${cityDets.EnglishName}</h5>
        <div class="my-2">${weather.WeatherText}</div>
        <div class="my-4 display-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;c</span>
        </div>
    `

    // Showing card items...
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none')
    }
}



cityForm.addEventListener('submit', e=>{
    e.preventDefault();
    
    const city  = cityForm.city.value.trim();
    cityForm.reset();

    forcast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err))
    
    localStorage.setItem('city', city);
});

if(localStorage.getItem('city')){
    forcast.updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err))
}