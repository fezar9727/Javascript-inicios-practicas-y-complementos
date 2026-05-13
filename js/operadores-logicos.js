/* 
*2. INVESTIGACIÓN: OPERADORES LÓGICOS
Los operadores lógicos son herramientas fundamentales que nos permiten conectar dos o más 
comparaciones para obtener un único resultado (verdadero o falso). Son el motor de la 
toma de decisiones compleja en el código, ya que permiten evaluar múltiples variables 
al mismo tiempo antes de ejecutar una acción.

*Los tres operadores principales en JavaScript son:

*AND (&&): 
Este operador es muy estricto. Para que el resultado final sea "true", 
TODAS las condiciones que estás comparando deben cumplirse obligatoriamente. Si una 
sola es falsa, todo el resultado se cae y es falso.

*OR (||): 
Este es más flexible. Basta con que una sola de las condiciones sea verdadera 
para que todo el resultado sea "true". Solo devuelve falso si absolutamente todas las 
condiciones son falsas.

*NOT (!): 
A diferencia de los otros, este trabaja con una sola condición y lo que hace 
es invertir su valor. Si algo es verdadero, lo vuelve falso, y viceversa. Es muy útil 
para crear validaciones de "lo que NO debe pasar".
*/


// * Ejemplo práctico: Control de acceso a un sistema premium

// * CONFIGURACIÓN INICIAL (Variables)

// Función reutilizable que valida que el usuario escriba solo "si" o "no"
// Usa while(true) para repetir la pregunta indefinidamente hasta obtener una respuesta válida
// Esto es más seguro que la recursión porque no tiene riesgo de colapsar el navegador
function preguntarSiNo(pregunta) {
    while (true) {
        const respuesta = prompt(pregunta);

        // Si el usuario cancela el prompt, devuelve null y rompería el código
        // por eso se detecta antes de hacer cualquier otra operación
        if (respuesta === null) {
            alert('Operación cancelada.');
            return false;
        }

        // Ahora sí es seguro usar .toLowerCase() porque ya sabemos que no es null
        const respuestaLower = respuesta.toLowerCase();

        // Si el usuario escribió "si" o "no", retorna el resultado y sale del while
        if (respuestaLower === 'si' || respuestaLower === 'no') {
            return respuestaLower === 'si';
        }

        // Si escribió algo diferente, avisa y el while vuelve a preguntar automáticamente
        alert('Por favor escribe solo: si o no');
    }
}

const tieneCuenta      = preguntarSiNo('¿Tienes cuenta? Escribe: si o no');
const tieneSuscripcion = preguntarSiNo('¿Tienes suscripción activa? Escribe: si o no');
const esAdministrador  = preguntarSiNo('¿Eres administrador? Escribe: si o no');
const cuentaBloqueada  = preguntarSiNo('¿Tu cuenta está bloqueada? Escribe: si o no');


// * ESTRUCTURA DE DECISIÓN
// * 1. Usamos && (AND):
// (tieneCuenta && tieneSuscripcion) → Debe tener cuenta Y suscripcion para ser usuario premium
// * 2. Usamos || (OR): 
// || esAdministrador → Permite el acceso si es usuario premium O si es administrador.
// * 3. Usamos ! (NOT): 
// y !cuentaBloqueada → Solo entra si la cuenta NO está bloqueada.

if  (((tieneCuenta && tieneSuscripcion) || esAdministrador) && !cuentaBloqueada) {
    console.log("Acceso concedido al panel de control.");
} else {
    console.log("Acceso denegado: Verifique su suscripción o el estado de su cuenta.");
}

/*
* Explicación:
El programa usa prompt() para pedirle los datos al usuario directamente en el navegador,
haciendo el ejemplo interactivo. Para manejar las preguntas de forma organizada y sin
repetir código, se creó la función preguntarSiNo() que se reutiliza para cada pregunta.

Esta función usa while(true) para repetir la pregunta indefinidamente hasta obtener una
respuesta válida, lo que es más seguro que llamarse a sí misma (recursión). Primero
verifica si el usuario canceló el prompt, lo que devolvería null y rompería el código,
por eso se detecta antes de cualquier otra operación. Luego usa .toLowerCase() para
convertir la respuesta a minúsculas automáticamente, y así funciona sin importar si el
usuario escribe "SI", "Si" o "si". Si el usuario escribe algo diferente de "si" o "no",
avisa y vuelve a preguntar automáticamente sin avanzar.

Con esos datos validados, el programa evalúa varias condiciones combinadas. Primero 
verifica si el usuario cumple alguna de estas dos opciones: tener cuenta y suscripción 
activa (usuario premium) o ser administrador. Si se cumple al menos una de ellas, pasa 
a la siguiente validación, donde se revisa que la cuenta no esté bloqueada.

Solo si se cumple una condición de acceso (premium o administrador) y además la cuenta
está activa, se concede el acceso. En caso contrario, el sistema lo rechaza.

Esto muestra cómo los operadores lógicos permiten combinar múltiples condiciones en una
sola decisión, y cómo una función reutilizable con while(true), prompt() y .toLowerCase()
hace que el programa sea robusto, interactivo y preparado para manejar errores del usuario.
*/