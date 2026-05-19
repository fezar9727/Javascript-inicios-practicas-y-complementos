// * TAREA 2
// ==========================================

/*
*1. INVESTIGACIÓN: LOS CICLOS (LOOPS)
Los ciclos o bucles son estructuras de control fundamentales que permiten ejecutar un 
mismo bloque de código de forma repetida mientras se cumpla una condición específica. 
Su función principal es la automatización: en lugar de escribir 100 veces la misma 
instrucción, usamos un ciclo para que la computadora lo haga por nosotros en milisegundos.

*En el desarrollo web, los ciclos son indispensables para:
Recorrer listas de datos (Arrays) que vienen de una base de datos.
Crear elementos repetitivos en el HTML (como las tarjetas de una tienda virtual).
Realizar cálculos acumulativos o procesar grandes cantidades de información.

Existen varios tipos de ciclos, pero los más usados cuando trabajamos con colecciones 
de datos son el 'for' tradicional (por su control total) y el 'for...of' (por su sencillez).
*/

// * CONFIGURACIÓN INICIAL (Array)
// Creamos un array con los nombres de algunos equipos de fútbol para usarlo en nuestros ejemplos
const equipos = ['Cali', 'América', 'Nacional', 'Millonarios', 'Junior', 'Santa Fe'];

// Función para normalizar texto eliminando acentos y convirtiendo a minúsculas
function normalizar(texto) {
    return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Función para preguntar al usuario por el equipo que quiere buscar
function preguntarEquipo(pregunta) {
    while (true) {
        const respuesta = prompt(pregunta + '\nEquipos disponibles: ' + equipos.join(', '));

        // Si el usuario cancela el prompt, se detiene todo
        if (respuesta === null) {
            alert('Operación cancelada.');
            return null;
        }

        // .trim() elimina espacios en blanco al inicio y al final
        const respuestaLimpia = respuesta.trim();

        if (respuestaLimpia === '') {
            alert('Por favor escribe el nombre de un equipo.');
            continue;
        }

        // normalizar() elimina acentos y convierte a minúsculas para que no importe
        // si el usuario escribe "america", "AMÉRICA" o "América"
        const equipoValido = equipos.find(e => normalizar(e) === normalizar(respuestaLimpia));

        if (equipoValido) {
            return equipoValido;
        }

        // Si no es un equipo valido, avisa y vuelve a preguntar automáticamente
        alert(`"${respuestaLimpia}" no es un equipo válido.\nEscribe uno de la lista.`);
    }
}

// El usuario elige el equipo que quiere buscar
const equipoBuscado = preguntarEquipo('¿Qué equipo quieres buscar en la lista?');


/*
* EJEMPLO 1: Ciclo 'for' tradicional
Es el más potente y flexible. Se compone de tres partes:

*1. Inicialización (let i = 0): 
Creamos un contador que empieza en cero.

*2. Condición (i < equipos.length): 
El ciclo sigue dando vueltas mientras el contador 
sea menor que el tamaño de la lista.

*3. Actualización (i++): 
El contador aumenta de uno en uno en cada vuelta.
Es ideal cuando necesitamos saber exactamente en qué posición (índice) estamos.
*/

if (equipoBuscado !== null) {
    console.log('\n--- Ciclo for tradicional ---');
    for (let i = 0; i < equipos.length; i++) {
        console.log("Equipo en la posición " + i + ": " + equipos[i]);
    }
    // * Recorre el array mostrando cada equipo junto con su posición (índice)

    // Además, con .findIndex() podemos mostrar en qué posición está el equipo que el usuario buscó
    const posicion = equipos.findIndex(e => normalizar(e) === normalizar(equipoBuscado));
    console.log(`\n"${equipoBuscado}" está en la posición ${posicion} de la lista.`);
}


/*
* EJEMPLO 2: Ciclo 'for...of'
Es una versión mucho más moderna y limpia introducida en ES6. Se usa específicamente 
para recorrer objetos iterables (como los Arrays). 

Aquí no necesitamos manejar contadores ni índices manualmente; el ciclo "extrae" 
directamente cada elemento de la lista en cada vuelta. Es el preferido cuando 
solo nos interesa el contenido y no la posición.
*/

if (equipoBuscado !== null) {
    console.log('\n--- Ciclo for...of ---');
    for (const equipo of equipos) {
        // Usamos normalizar() para comparar sin importar mayúsculas, minúsculas o acentos
        if (normalizar(equipo) === normalizar(equipoBuscado)) {
            console.log(`✓ Encontrado: ${equipo}`);
        } else {
            console.log("Revisando a: " + equipo);
        }
    }
    // * Recorre el array mostrando directamente cada elemento sin usar índices
}

/*
* Explicación:
El programa usa prompt() para pedirle datos al usuario directamente en el navegador,
haciendo el ejemplo interactivo y dinámico. Para garantizar que solo se ingresen
equipos válidos, se creó la función preguntarEquipo() que usa while(true) para repetir
la pregunta hasta obtener una respuesta válida. Usa .trim() para evitar espacios vacíos,
normalizar() para que no importe si el usuario escribe "america", "AMÉRICA" o "América",
y detecta null si el usuario cancela el prompt para detener todo sin errores.

El programa recorre un arreglo de equipos utilizando dos tipos de ciclos.
Primero, con el ciclo 'for' tradicional, se accede a cada elemento mediante su índice 
(posición dentro del array), lo que permite conocer tanto la posición como el valor.
Adicionalmente, con .findIndex() se muestra en qué posición exacta está el equipo
que el usuario buscó, demostrando la utilidad del índice en situaciones reales.

Luego, con el ciclo 'for...of', se recorre el mismo arreglo de forma más directa, 
obteniendo cada elemento sin necesidad de usar índices ni contadores. Aquí se usa
normalizar() para identificar y destacar el equipo buscado mientras se recorre la lista.

Esto muestra dos formas de recorrer una lista: una con mayor control (usando índices y 
posiciones) y otra más simple y legible cuando solo interesa trabajar con los valores 
directamente. Ambos permiten automatizar procesos repetitivos y trabajar de manera 
eficiente con colecciones de datos, combinados con prompt(), normalizar() y while(true)
para hacerlo interactivo, robusto y preparado para escalar.
*/