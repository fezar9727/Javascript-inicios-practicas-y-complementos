const contenedor = document.getElementById("contenedor");

const obtenerDatos = async () => {
    try {
        const respuesta = await fetch("https://jsonplaceholder.typicode.com/todos");
        
        if (!respuesta.ok) throw new Error("No se pudo conectar con la API");

        const data = await respuesta.json();
        
        // Limpiamos el contenedor antes de agregar nuevos datos
        contenedor.innerHTML = "";
        
        // Mostramos el total de tareas
        console.log(`Cargando un total de: ${data.length} tareas.`);

        const fragmento = document.createDocumentFragment();

        // Recorremos el array de datos y creamos una tarjeta para cada uno
        data.forEach(item => {
            const estadoTexto = item.completed ? 'COMPLETADA' : 'PENDIENTE';
            const estadoColor = item.completed ? 'text-info' : 'text-warning'; 
            const badgeBg = item.completed ? 'bg-info' : 'bg-warning';
            const estadoIcono = item.completed ? '✅' : '⏳';

            const article = document.createElement("article");
            article.className = "col-md-6 col-lg-4 mb-4";

            // Creamos la estructura HTML de la tarjeta utilizando template literals para mayor claridad
            article.innerHTML = `
                <div class="card h-100 bg-dark border-secondary border-opacity-50 shadow-sm">
                    <div class="card-body p-4 d-flex flex-column">
                        
                        <div class="d-flex justify-content-between align-items-center mb-4">
                            <span class="badge ${badgeBg} text-dark fw-bold text-uppercase">ID ${item.id}</span>
                            <small class="fw-bold ${estadoColor} text-uppercase">
                                ${estadoIcono} ${estadoTexto}
                            </small>
                        </div>

                        <div class="flex-grow-1 d-flex align-items-center justify-content-center">
                            <h2 class="card-title h6 fw-bold text-white text-center px-2 m-0">
                                ${item.title}
                            </h2>
                        </div>

                        <div class="d-flex align-items-center justify-content-center gap-2 mt-4 pt-3 border-top border-secondary border-opacity-25">
                            <span class="small">👤</span>
                            <span class="text-secondary fw-bold text-uppercase small tracking-wider">
                                User ID: ${item.userId}
                            </span>
                        </div>

                    </div>
                </div>
            `;

            // Agregamos efectos de hover para mejorar la interactividad
            const card = article.querySelector('.card');
            card.style.transition = "transform 0.3s ease, shadow 0.3s ease";

            card.addEventListener('mouseenter', () => {
                card.classList.replace('shadow-sm', 'shadow-lg');
                card.style.transform = 'translateY(-5px)';
            });

            card.addEventListener('mouseleave', () => {
                card.classList.replace('shadow-lg', 'shadow-sm');
                card.style.transform = 'translateY(0)';
            });

            fragmento.appendChild(article);
        });

        // Agregamos el fragmento al contenedor una sola vez
        contenedor.appendChild(fragmento);

    } catch(error) {
        // Capturamos el error y lo mostramos en la consola
        console.error(`Error detectado: ${error.message}`);
        
        // Mostramos un mensaje de error al usuario con un diseño llamativo
        contenedor.innerHTML = `
            <div class="col-12 d-flex justify-content-center align-items-center" style="min-height: 50vh;">
                <div class="text-center p-5 border border-warning border-opacity-25 rounded-4 bg-dark shadow-lg">
                    <div class="display-1 mb-4">⚠️</div>
                    <h3 class="text-warning fw-bold text-uppercase tracking-widest">Error de Carga</h3>
                    <p class="text-white-50 mb-0 mt-2 fs-5">
                        ${error.message || "No se pudo establecer conexión con el servidor."}
                    </p>
                    <button class="btn btn-outline-warning mt-4 px-4 fw-bold" onclick="location.reload()">
                        REINTENTAR CONEXIÓN
                    </button>
                </div>
            </div>
        `;
    }
};

// Llamamos a la función para cargar los datos al inicio
obtenerDatos();