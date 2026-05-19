/*
*3. INVESTIGACIÓN: LA FUNCIÓN FETCH
La función fetch() es una herramienta nativa de JavaScript que revolucionó la forma en 
que las aplicaciones web consumen datos. Su propósito principal es realizar peticiones 
HTTP de forma asíncrona a recursos externos (servidores, archivos JSON o APIs). 

Antes de fetch, este proceso era mucho más complicado. Ahora, fetch nos permite "ir 
a buscar" información a través de internet sin tener que recargar la página del usuario.

*Conceptos clave de Fetch:

*Basado en Promesas: 
fetch() siempre devuelve una Promesa. Esto significa que podemos 
usar .then() y .catch() para manejar la respuesta del servidor.

*Dos pasos de conversión: 
Cuando fetch recibe la respuesta, primero obtenemos un objeto 
que representa la respuesta HTTP completa. Luego, debemos usar el método .json() 
para convertir esos datos crudos en un objeto de JavaScript que podamos manipular.

*Importancia en el desarrollo: 
Es la base de casi cualquier aplicación moderna, desde 
ver el clima en una app hasta cargar los posts de una red social en tiempo real.
*/

// Función reutilizable que pide un número de personaje válido
// Usa while(true) para repetir hasta obtener un número válido
// isNaN() valida que sea número y parseInt() lo convierte al número real
function preguntarNumeroPersonaje() {
    while (true) {
        const respuesta = prompt(
            '¿Qué personaje de Rick and Morty quieres consultar?\nEscribe un número del 1 al 826:'
        );

        // Si el usuario cancela el prompt, se detiene todo
        if (respuesta === null) {
            alert('Operación cancelada.');
            return null;
        }

        // .trim() evita espacios vacíos
        // isNaN() verifica si lo ingresado NO es un número
        if (!isNaN(respuesta) && respuesta.trim() !== '') {
            // parseInt() convierte el texto a número entero
            const numero = parseInt(respuesta);

            // Validamos que el número esté dentro del rango permitido por la API (1-826)
            if (numero >= 1 && numero <= 826) {
                return numero;
            }
            alert('El número debe estar entre 1 y 826.');
        } else {
            // Si escribió texto como "veinticinco", avisa y vuelve a preguntar
            alert('Por favor escribe solo un número.\nNo se acepta texto como "veinticinco".');
        }
    }
}

// * EJEMPLO 1: Fetch con archivo local (simulando una API)
// * CONFIGURACIÓN INICIAL (URL local)
const URL = './js/usuario.json';

console.log("Iniciando petición con fetch...");

fetch(URL)
    .then(respuesta => {
        // Verificamos si la respuesta del archivo fue exitosa
        if (!respuesta.ok) {
            throw new Error("No se pudo cargar el archivo local.");
        }
        // Convertimos la respuesta a formato JSON para obtener un objeto de JavaScript
        return respuesta.json();
    })
    .then(usuario => {
        // Aquí ya tenemos el objeto de JavaScript listo para usar
        console.log("Datos recibidos con éxito:");
        console.log("Nombre del usuario: " + usuario.name);
        console.log("Ciudad: " + usuario.address.city);
    })
    .catch(error => {
        // Si hay un error en la petición o en el proceso de datos, lo capturamos aquí
        console.error("Hubo un problema con la petición: ", error.message);
    });

// * Este mensaje se ejecuta primero porque fetch es asíncrono
console.log("Este mensaje aparece antes que los datos porque fetch trabaja de forma asíncrona.");


// * EJEMPLO 2: Fetch con API real e interacción del usuario
// El usuario elige qué personaje consultar — aquí sí aplica prompt()
// porque la entrada del usuario ocurre ANTES de la petición asíncrona
const numeroPersonaje = preguntarNumeroPersonaje();

// Si el usuario cancela el prompt, se detiene todo y no se hace la petición
if (numeroPersonaje !== null) {
    console.log(`\nConsultando personaje #${numeroPersonaje}...`);

    // fetch() hace la petición HTTP a la API de Rick and Morty usando el número elegido por el usuario
    fetch(`https://rickandmortyapi.com/api/character/${numeroPersonaje}`)
        .then(respuesta => {
            // Verificamos si la respuesta fue exitosa
            if (!respuesta.ok) {
                throw new Error("No se encontró el personaje.");
            }
            // Convertimos la respuesta a formato JSON para obtener un objeto de JavaScript con los datos del personaje
            return respuesta.json();
        })
        .then(personaje => {
            // Acá ya tenemos el objeto de JavaScript con los datos del personaje
            console.log("\n--- Personaje encontrado ---");
            console.log("Nombre: "  + personaje.name);
            console.log("Estado: "  + personaje.status);
            console.log("Especie: " + personaje.species);
            console.log("Origen: "  + personaje.origin.name);
        })
        .catch(error => {
            // Si hay un error en la petición o en el proceso de datos, lo capturamos aquí
            console.error("Error con la API: " + error.message);
        });

    // * Este mensaje también se ejecuta antes que los datos de la API
    console.log("Petición enviada — esperando respuesta de la API...");
}

/*
* Explicación:
El programa tiene dos ejemplos de fetch para mostrar su versatilidad.

En el primer ejemplo, fetch() carga un archivo local que simula una API. La operación
no se ejecuta de forma inmediata sino en segundo plano, por eso el último console.log
aparece antes que los datos — eso es el comportamiento asíncrono de fetch.

En el segundo ejemplo, primero se usa prompt() con while(true) para pedirle al usuario
un número de personaje válido. isNaN() verifica que sea un número, parseInt() convierte
el texto "25" al número real 25, y se valida que esté en el rango 1-826. El prompt()
va antes del fetch() porque la entrada del usuario debe ocurrir antes de la petición.

En ambos casos, fetch() devuelve una Promesa. El primer .then() verifica si la respuesta
fue exitosa con la propiedad "ok". El segundo .then() convierte la respuesta con .json()
y accede a las propiedades del objeto. El .catch() captura cualquier error sin que el
programa falle sin control.

Esto demuestra cómo fetch() es la herramienta fundamental para consumir datos externos
en aplicaciones web modernas, tanto desde archivos locales como desde APIs reales.
*/