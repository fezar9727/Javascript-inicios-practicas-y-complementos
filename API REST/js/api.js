const contenedor = document.getElementById("contenedor");
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");
let pagina = 1;

const obtenerPersonajes = async () => {
    try {
        const respuesta = await fetch(`https://rickandmortyapi.com/api/character?page=${pagina}`);
        
        if (!respuesta.ok) throw new Error("No se pudo conectar con la API");

        const data = await respuesta.json();
        
        contenedor.innerHTML = "";
        const fragmento = document.createDocumentFragment();

        data.results.forEach(personaje => {
            const badgeBg = personaje.status === 'Alive' ? 'bg-success' : 
                           personaje.status === 'Dead' ? 'bg-danger' : 'bg-secondary';

            const article = document.createElement("article");
            article.className = "col-sm-6 col-md-4 col-lg-3";

            article.innerHTML = `
                <div class="card h-100 bg-dark border-success border-opacity-25 shadow-sm">
                    <div class="position-relative">
                        <img src="${personaje.image}" class="card-img-top" alt="${personaje.name}">
                        <span class="badge ${badgeBg} position-absolute top-0 end-0 m-2 text-uppercase">
                            ${personaje.status}
                        </span>
                    </div>
                    <div class="card-body p-3">
                        <h2 class="h6 card-title fw-bold text-white text-uppercase">${personaje.name}</h2>
                        <p class="card-text small mb-1 text-white-50">
                            <strong class="text-info text-opacity-75">ESPECIE:</strong> ${personaje.species}
                        </p>
                        <p class="card-text small mb-0 text-white-50">
                            <strong class="text-info text-opacity-75">ORIGEN:</strong> ${personaje.origin.name}
                        </p>
                    </div>
                </div>
            `;

            // Dinamismo con JS: Hover limpio
            const card = article.querySelector('.card');
            
            card.addEventListener('mouseenter', () => {
                card.classList.replace('border-opacity-25', 'border-opacity-100');
                card.style.transform = "scale(1.03)";
                card.style.transition = "transform 0.3s ease-in-out, border 0.3s ease";
            });

            card.addEventListener('mouseleave', () => {
                card.classList.replace('border-opacity-100', 'border-opacity-25');
                card.style.transform = "scale(1)";
            });

            fragmento.appendChild(article);
        });

        contenedor.appendChild(fragmento);
        actualizarInterfaz();

    } catch (error) {
        console.error(`Error: ${error.message}`);
        contenedor.innerHTML = `
            <div class="col-12 text-center py-5">
                <div class="alert alert-warning bg-dark text-warning border-warning border-opacity-25">
                    <h4 class="fw-bold text-uppercase tracking-widest">Alerta de Sistema</h4>
                    <p class="mb-0">${error.message}</p>
                </div>
            </div>
        `;
    }
};

const actualizarInterfaz = () => {
    // Control de paginación
    btnAnterior.disabled = pagina === 1;
    btnAnterior.classList.toggle('opacity-25', pagina === 1);
    
    // Feedback visual: scroll al inicio al cambiar de página
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Eventos
btnAnterior.addEventListener("click", () => {
    if (pagina > 1) {
        pagina--;
        obtenerPersonajes();
    }
});

btnSiguiente.addEventListener("click", () => {
    pagina++;
    obtenerPersonajes();
});

// Inicio
obtenerPersonajes();