document.addEventListener('DOMContentLoaded', function () {
    const btnBuscar = document.getElementById('btnBuscar');
    const inpBuscar = document.getElementById('inputBuscar');
    const contenedor = document.querySelector(".container"); 
    let urlAPI; 

    btnBuscar.addEventListener("click", function () {
        let input = inpBuscar.value;
        urlAPI = `https://images-api.nasa.gov/search?q=${input}`; 
        buscarImagenes(input);
    });

    function buscarImagenes(input) {
        fetch(urlAPI)
            .then((response) => response.json())
            .then((data) => mostrarFinal(data.collection.items)) 
            .catch((error) => {
                console.error('Error al buscar imágenes: ', error);
                contenedor.innerHTML = "Ocurrió un error al buscar las imágenes.";
            });
    }

    function mostrarFinal(items) {
        contenedor.innerHTML = "";

        if (items.length === 0) {
            contenedor.innerHTML = 'No se encontraron imágenes';
            return;
        }

        items.forEach((item) => {
            const resultado = document.createElement("div");
            resultado.className = 'resultado';

            const title = item.data[0].title;
            const description = item.data[0].description;
            const imageUrl = item.links[0].href; 
            const date = item.data[0].date_created;

            resultado.innerHTML = `
                <section id="contIMG">
                    <img src="${imageUrl}">
                </section>
                <section id="contInfo">
                    <h2>${title}</h2>
                    <p>${description}</p>
                </section>
                <section id="contDate">
                    <h5>${date}</h5>
                </section>
            `;

            contenedor.appendChild(resultado);
        });
    }
});