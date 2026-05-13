/* 
*1. INVESTIGACIÓN: CONDICIONALES ANIDADOS
Los condicionales anidados son básicamente estructuras donde un bloque "if" se encuentra 
dentro de otro bloque "if". Esto se hace cuando queremos realizar validaciones más 
específicas que dependen de una condición principal. 

*Es como un filtro de seguridad:
si no pasas la primera puerta (el primer if), el código 
ni siquiera mira lo que hay en la segunda puerta (el segundo if). Se usan mucho para 
manejar diferentes niveles de permisos o para validar datos paso a paso sin que el 
programa se confunda.
*/

// * Ejemplo práctico: Validación de acceso a un evento en Cali

// * CONFIGURACIÓN INICIAL (Variables)

// Función reutilizable que valida que el usuario escriba solo "si" o "no"
// Usa while(true) para repetir la pregunta hasta obtener una respuesta válida
function preguntarSiNo(pregunta) {
    while (true) {
        const respuesta = prompt(pregunta);

        // Si el usuario cancela el prompt, se detiene todo
        if (respuesta === null) {
            alert('Operación cancelada.');
            return false;
        }

        const respuestaLower = respuesta.toLowerCase();

        // Si es válida, retorna el resultado y sale del while
        if (respuestaLower === 'si' || respuestaLower === 'no') {
            return respuestaLower === 'si';
        }

        // Si escribió algo diferente, avisa y vuelve a preguntar
        alert('Por favor escribe solo: si o no');
    }
}

// Función reutilizable que valida que el usuario escriba un número
// Usa while(true) para repetir la pregunta hasta obtener un número válido
function preguntarNumero(pregunta) {
    while (true) {
        const respuesta = prompt(pregunta);

        // Si el usuario cancela el prompt, se detiene todo
        if (respuesta === null) {
            alert('Operación cancelada.');
            return null;
        }

        // isNaN verifica si lo ingresado NO es un número
        if (!isNaN(respuesta) && respuesta.trim() !== '') {
            // parseInt convierte el texto "20" al número real 20
            return parseInt(respuesta);
        }

        // Si no es un número válido, avisa y vuelve a preguntar
        alert('Por favor escribe solo un número.');
    }
}

const tieneEntrada = preguntarSiNo('¿Tienes entrada? Escribe: si o no');
const edadPersona  = preguntarNumero('¿Cuántos años tienes?');

// * VALIDACIÓN Y ESTRUCTURA DE DECISIÓN
if (edadPersona === null) {
    // Si canceló la pregunta de la edad, no se ejecuta nada más
    console.log('Operación cancelada por el usuario.');
} else if (tieneEntrada) {
    // Si tiene entrada, pasa a la siguiente etapa
    if (edadPersona >= 18) {
        // Si es mayor de edad, accede al área VIP
        console.log("Bienvenido al evento, puedes pasar al área VIP.");
    } else {
        // Si tiene entrada pero es menor, va al área general
        console.log("Bienvenido, pero por ser menor de edad vas al área general.");
    }
} else {
    // Si no tiene entrada, no se ejecuta nada más
    console.log("No tienes entrada. Por favor dirígete a la taquilla.");
}

/*
* Explicación:
El programa usa prompt() para pedirle datos al usuario directamente en el navegador,
haciendo el ejemplo interactivo y dinámico. Para manejar las preguntas de forma
organizada y sin repetir código, se crearon dos funciones reutilizables y escalables:
preguntarSiNo() y preguntarNumero(). Ambas usan while(true) para repetir la pregunta
indefinidamente hasta obtener una respuesta válida, lo que es más seguro que la recursión.

preguntarSiNo() pregunta si tiene entrada (si o no). Con .toLowerCase() se convierte la
respuesta a minúsculas automáticamente, para que funcione sin importar si el usuario
escribe "SI", "Si" o "si". Si el usuario escribe algo diferente de "si" o "no", avisa
y vuelve a preguntar automáticamente sin avanzar. Si cancela el prompt, se detiene todo.

preguntarNumero() pregunta la edad. Primero verifica si el usuario canceló el prompt,
lo que devolvería null y rompería el código. Luego valida con isNaN() que lo ingresado
sea realmente un número — si escribe "julio" o deja el campo vacío, avisa y vuelve a
preguntar. Solo si es un número válido, lo convierte con parseInt() para que las
comparaciones matemáticas funcionen correctamente.

Solo si la edad es un número válido, el programa evalúa las condiciones. Primero
verifica si la persona tiene entrada — si no la tiene, se detiene ahí y muestra el
mensaje correspondiente sin revisar nada más. Si sí tiene entrada, pasa a la siguiente
etapa donde se valida la edad: si es mayor de edad accede al área VIP, de lo contrario
se le asigna el área general.

Esto muestra cómo los condicionales anidados permiten tomar decisiones paso a paso,
y cómo funciones reutilizables con while(true), prompt(), .toLowerCase(), isNaN() y
parseInt() hacen que el programa sea robusto, interactivo y preparado para manejar
cualquier error del usuario.
*/