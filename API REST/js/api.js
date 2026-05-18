const contenedor = document.getElementById("contenedor");
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");
let pagina = 1;

const obtenerPersonajes = async () => {
    try {
        //function fetch trae una promesa y la esperamos con await
        const respuesta = await fetch(`https://rickandmortyapi.com/api/character?page=${pagina}`);
        const data = await respuesta.json();
        console.log(data.results);
        contenedor.innerHTML = "";
        data.results.forEach(personaje => {
            contenedor.innerHTML += `
                <div class="col-md-4 col-lg-3 text-center">
                    <div class="card h-100">
                        <img 
                            alt="${ personaje.name }"
                            class="card-img-top"
                            src="${ personaje.image }"
                        >
                        <div class="card-body">
                            <h4 class="card-title">
                                ${ personaje.name }
                            </h4>
                            <p class="card-text">
                                <strong>Especie:</strong> ${ personaje.species }
                            </p>
                            <p class="card-text">
                                <strong>Estado:</strong> ${ personaje.status }
                            </p>
                        </div>
                    </div>
                </div>
            `;
        });
    } catch(error) {    //aca los errores son atrapados por el catch
        console.error(`Error al obtener los personajes: ${error}`);
        contenedor.innerHTML = `
            <span class="text-danger text-center">
                Ocurrió un error al obtener los personajes.
            </span>
        `;
    }
};


btnAnterior.addEventListener("click", () => {
    if (pagina > 1) {
        pagina--;
        contenedor.innerHTML = "";
        obtenerPersonajes();
    }
});

btnSiguiente.addEventListener("click", () => {
    pagina++;
    contenedor.innerHTML = "";
    obtenerPersonajes();
});

obtenerPersonajes();


