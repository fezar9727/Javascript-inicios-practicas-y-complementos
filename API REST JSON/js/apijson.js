const contenedor = document.getElementById("contenedor");

const obtenerDatos = async () => {
    try {
        //function fetch trae una promesa y la esperamos con await
        const respuesta = await fetch("https://jsonplaceholder.typicode.com/todos");
        const data = await respuesta.json();
        console.log(data);
        data.forEach(datos => {
            contenedor.innerHTML += `
                <div class="col-md-6 col-lg-4 text-center">
                    <h2>${ datos.title }</h2>
                </div>
            `;
        });
    } catch(error) {    //aca los errores son atrapados por el catch
        console.error(`Error al obtener los datos: ${error}`);
    }
};

obtenerDatos();

