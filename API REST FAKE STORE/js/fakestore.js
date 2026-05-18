const contenedor = document.getElementById("contenedor-tarjetas");

/*
 * Función asíncrona para obtener los productos de la API
 */
const obtenerItems = async () => {
    try {
        const respuesta = await fetch('https://fakestoreapi.com/products');
        
        // Verificamos si la respuesta fue exitosa, si no, lanzamos un error para que sea atrapado por el catch
        if (!respuesta.ok) throw new Error("No se pudo conectar con la API");

        const productos = await respuesta.json();
        
        // Limpiamos el contenedor antes de agregar los nuevos productos, para evitar duplicados en caso de múltiples llamadas a la función
        contenedor.innerHTML = "";

        // El bucle genera la tarjeta de cada producto y la agrega al contenedor
        productos.forEach(item => {
            contenedor.innerHTML += `
                <article class="tarjeta-producto">
                    <span class="categoria-tag">${item.category}</span>
                    
                    <div class="contenedor-imagen">
                        <img src="${item.image}" alt="${item.title}" class="imagen-producto">
                    </div>

                    <div class="cuerpo-tarjeta">
                        <h2 class="titulo-producto">${item.title}</h2>
                        <p class="info-precio">$${item.price.toFixed(2)}</p>
                    </div>
                </article>
            `;
        });

    } catch (error) {
        // Si hay un error en la petición o en el proceso de datos
        console.error(`Error: ${error.message}`);
        contenedor.innerHTML = `
            <div class="alert alert-danger text-center" role="alert" style="grid-column: 1 / -1; margin-top: 20px;">
                Error al cargar productos. Por favor, intenta más tarde.
            </div>
        `;
    }
};

// Ejecutamos la función para cargar los productos al cargar la página
obtenerItems();