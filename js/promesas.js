// ========================================================================================================
/*
*2. INVESTIGACIÓN: LAS PROMESAS EN JAVASCRIPT
Una Promesa es un objeto que representa el éxito o el fracaso de una operación asíncrona. 
En palabras sencillas, es como cuando pides comida en un restaurante: te dan un "ticket" 
(la promesa). El ticket te asegura que recibirás la comida (éxito) o que te avisarán 
si se acabó un ingrediente (error). Mientras tanto, puedes seguir hablando con tus 
amigos sin tener que quedarte parado frente a la cocina.

*Las promesas tienen tres estados posibles:

*Pendiente (Pending): 
Es el estado inicial, cuando la operación aún no termina.

*Cumplida (Fulfilled): 
La operación se completó con éxito y ya tenemos el dato.

*Rechazada (Rejected): 
La operación falló por algún motivo (error de red, dato no encontrado).

Gracias a las promesas, JavaScript puede realizar tareas pesadas (como consultar una base 
de datos o cargar una imagen) en "segundo plano", permitiendo que el resto de la página 
siga funcionando con fluidez.
*/

// preguntarSiNo es una función reutilizable que valida que el usuario escriba solo "si" o "no"
// Usa while(true) para repetir hasta obtener una respuesta válida
function preguntarSiNo(pregunta) {
    while (true) {
        const respuesta = prompt(pregunta);

        // Si el usuario cancela el prompt, se detiene todo y se muestra un mensaje de cancelación
        if (respuesta === null) {
            alert('Operación cancelada.');
            return false;
        }

        // .toLowerCase() para que no importe si escribe "SI", "Si" o "si"
        const respuestaLower = respuesta.toLowerCase();

        // Detecta si escribió "si" o "no" y devuelve true o false respectivamente
        if (respuestaLower === 'si' || respuestaLower === 'no') {
            return respuestaLower === 'si';
        }

        // Si escribió algo diferente, avisa y vuelve a preguntar
        alert('Por favor escribe solo: si o no');
    }
}


/*
* EJEMPLO 1: Uso de .then()
.then() se ejecuta cuando la promesa se cumple correctamente (resolve).
*/

// * CONFIGURACIÓN INICIAL (Promesa simple)
// La promesa se resuelve inmediatamente con un mensaje de éxito 
const promesaEnvio = new Promise((resolve) => {
    resolve("¡El paquete ha sido entregado con éxito!");
});


// * Muestra el mensaje cuando la promesa se resuelve con éxito
promesaEnvio.then((mensaje) => {
    console.log("Resultado: " + mensaje);
});



/*
* EJEMPLO 2: Uso de .then() y .catch()
.then() maneja el resultado exitoso
.catch() maneja los errores si la promesa falla
El usuario decide si la operación será exitosa o fallida
*/

// El usuario controla si la operación tendrá éxito o fallará 
const simulaExito = preguntarSiNo('¿Quieres que la carga de datos sea exitosa? Escribe: si o no');

// * CONFIGURACIÓN INICIAL (Promesa con simulación de proceso)
const cargarDatosUsuario = new Promise((resolve, reject) => {
    // setTimeout simula una operación que tarda 2 segundos en completarse
    setTimeout(() => {
        // Dependiendo de lo que respondió el usuario, se resuelve o se rechaza la promesa
        if (simulaExito) {
            resolve("Datos de usuario cargados correctamente.");
        // Si el usuario eligió que no sea exitoso, se rechaza la promesa con un mensaje de error
        } else {
            reject("Error: No se pudo conectar con el servidor.");
        }
    // 2000 ms = 2 segundos de espera para simular la carga de datos del usuario 
    }, 2000);
});

//  Maneja el resultado de la promesa usando .then() para éxito y .catch() para error
cargarDatosUsuario
    .then((respuesta) => {
        // .then() se ejecuta si la promesa fue exitosa (resolve)
        console.log("Éxito: " + respuesta);
    })
    .catch((error) => {
        // .catch() se ejecuta si la promesa falló (reject)
        console.log("Falla: " + error);
    });
// * Dependiendo de lo que respondiste, muestra éxito o error después de 2 segundos

/*
* Explicación:
El programa usa prompt() para pedirle al usuario que decida si la operación
será exitosa o fallida, haciendo el ejemplo interactivo. La función preguntarSiNo()
usa while(true) para repetir hasta obtener una respuesta válida, .toLowerCase() para
que no importe si escribe "SI", "Si" o "si", y detecta null si cancela.

En el primer ejemplo, la promesa se resuelve instantáneamente con un mensaje fijo,
por lo que .then() recibe el resultado y lo muestra en consola de inmediato.

En el segundo ejemplo, se simula una operación que tarda 2 segundos en completarse
usando setTimeout. Dependiendo de lo que respondió el usuario, la promesa se resuelve
correctamente con resolve() o falla con reject(). Con .then() se maneja el caso
exitoso, mientras que .catch() captura y muestra el error si algo sale mal.

Esto demuestra cómo las promesas permiten manejar tareas asíncronas sin detener la
ejecución del programa, y cómo el usuario puede interactuar para ver ambos escenarios
posibles — éxito y falla — en tiempo real.
*/