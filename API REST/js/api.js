const contenedor = document.getElementById("contenedor");

const obtenerPersonajes = async () => {
    try {
        //function fetch trae una promesa y la esperamos con await
        const respuesta = await fetch("https://rickandmortyapi.com/api/character");
        const data = await respuesta.json();
        console.log(data.results);
        data.results.forEach(personaje => {
            contenedor.innerHTML += `
                <div class="col-md-4 col-lg-3 text-center">
                    <h2>${ personaje.name }</h2>
                </div>
            `;
        });
    } catch(error) {    //aca los errores son atrapados por el catch
        console.error(`Error al obtener los personajes: ${error}`);
    }
};

obtenerPersonajes();

