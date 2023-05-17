$.getScript("assets/js/script_key.js", function() {
    getWeatherMapKey();
})

$(document).ready(function(){
    clima();
    mostrarFechaActual();
    apiRick();  
});

$(".carousel-api-icon").attr("data-bs-theme", "dark");
// Modo dark

const darkMode = () => {
    $("body").attr("data-bs-theme", "dark");
    $("#tema-icon").attr("class", "bi bi-sun-fill");
}

const lightMode = () => {
    $("body").attr("data-bs-theme", "light");
    $("#tema-icon").attr("class", "bi bi-moon-fill");
}

const cambiarTema = () => {
    $("body").attr("data-bs-theme") === "light"?
    darkMode() : lightMode();
}

$("#btn-theme").on('click', function (){
    cambiarTema();
})

function mostrarFechaActual(){
    var today = new Date();
    var options = {weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'};

    var fecha = today.toLocaleString('es', options);
    var hora = today.toLocaleTimeString('es');

    var html_hora = `<p id="card-title" class="text-center my-0">${hora}</p>`;
    var html_fecha = `<p id="card-text" class="text-center ">${fecha}</p>`;
    $('#fecha').html(html_fecha);
    $('#hora').html(html_hora);
    let tiempo = setTimeout(function() {
        mostrarFechaActual()
    }, 1000);
}



function clima(){
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            let lang = 'es';
            let units = 'metric';
            let appid = getWeatherMapKey();
            let urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${appid}`;
            $.getJSON(urlClima, function(dataClima) {
                let icon_url = `https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`;
                let desc_clima = dataClima.weather[0].description;
                let html_img = `<img id="icon-clima" class="mx-1" src="${icon_url}" alt="${dataClima.weather[0].description}"/>`;
                let html_temp = `<p class="text-center mb-0">${dataClima.main.temp}°C</p>`;   
                let html_desc = `<p class="text-center">${desc_clima}</p>`;

                $('#temperatura').html(html_temp);
                $('#descripcion-clima').html(html_desc);
                $('#img-clima').html(html_img);
            });
        });
        
    
    
    } else {
    /* geolocation IS NOT available */
    }
    
}

function myMap() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const myLatLng = { lat: lat, lng: lon};
            var mapProp= {
            center:myLatLng,
            zoom:16,
            };
            var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
            var marker = new google.maps.Marker({position: myLatLng, map,});

            marker.setMap(map);
        });
    }
}

function apiRick(){
    for (let index = 0; index < 3; index++) {
        $.getJSON(`https://rickandmortyapi.com/api/character/${index+1}`, function(data){
        let nombre = data.name;
        let img = data.image;
        let html_img = `<img id="img-api" src="${img}" class="img-fluid rounded-start" alt="..."></img>`;
        let url_episode = data.episode[1];
        let descripcion =
        `
        <p class="card-text">Status: ${data.status}</p>
        <p class="card-text">Species: ${data.species}</p>
        <p class="card-text">Gender: ${data.gender}</p>
        <p class="card-text">Origin: ${data.location.name}</p>
        `;
        $.getJSON(url_episode, function(episode){
            let eps_name = episode.name;
            console.log(eps_name);
        });
        
        $(`#img-${index+1}`).html(html_img);
        $(`#card-title-${index+1}`).html(nombre);
        $(`#card-text-${index+1}`).html(descripcion);
        });
    }
}



