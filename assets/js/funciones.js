$.getScript("assets/js/script_key.js", function() {
    getWeatherMapKey();
})



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
    $('#fecha').html(fecha);
    $('#hora').html(hora);
    let tiempo = setTimeout(function() {
        mostrarFechaActual()
    }, 1000);
}



function clima(){
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            let units = 'metric';
            let appid = getWeatherMapKey();
            let urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${appid}`;
            $.getJSON(urlClima, function(dataClima) {
                let icon_url = `https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`;
                let html_img = `<img id="icon-clima" src="${icon_url}" alt="${dataClima.weather[0].description}"/>`;
                let html_clima = `<p id="temperatura" class="text-center">${dataClima.main.temp}°C</p>`;
                
                $('#info-clima').html(html_clima);
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

$.getJSON(`https://rickandmortyapi.com/api/character/2`, function(data){
    let nombre = data.name;
    let img = data.image;
    let html_img = `<img src="${img}" class="img-fluid rounded-start" alt="..."></img>`;
   
    $('#poke-1').html(html_img);
    $('#poke-title-1').html(nombre);
});
