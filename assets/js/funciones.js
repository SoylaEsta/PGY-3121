const darkMode = () => {
    document.querySelector("body").setAttribute("data-bs-theme", "dark")
    document.querySelector("#tema-icon").setAttribute("class", "bi bi-sun-fill")
}

const lightMode = () => {
    document.querySelector("body").setAttribute("data-bs-theme", "light")
    document.querySelector("#tema-icon").setAttribute("class", "bi bi-moon-fill")
}

const cambiarTema = () => {
    document.querySelector("body").getAttribute("data-bs-theme") === "light"?
    darkMode() : lightMode();
}

$("#btn-theme").on('click', function (){
    cambiarTema();
})